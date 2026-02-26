import { createContext, useContext, useReducer, useEffect, useRef, type ReactNode } from 'react';
import type { GameState, GameAction, Customer } from '../types/game';
import { gameReducer } from './gameReducer';
import { createInitialState } from './initialState';
import { saveGame, loadGame } from '../utils/storage';
import { BALANCE, starsToCustomersPerMinute, reputationToStars } from '../constants/balance';
import { DRINK_RECIPES } from '../constants/drinks';
import { MINI_EVENTS } from '../constants/events';
import { CUSTOMER_NAMES, CUSTOMER_TYPE_CONFIG } from '../constants/names';
import { randomFromArray, generateId, randomBetween } from '../utils/random';

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

function calculateOfflineData(savedState: GameState): Partial<GameState> {
  const now = Date.now();
  const elapsed = now - savedState.lastTickTime;
  const maxOffline = BALANCE.OFFLINE_MAX_HOURS * 3600 * 1000;
  const offlineMs = Math.min(elapsed, maxOffline);

  if (offlineMs < 60000) return {};

  const offlineSeconds = offlineMs / 1000;
  const activeDrinks = savedState.drinks.filter(d => d.active);
  if (activeDrinks.length === 0) return {};

  const avgProfit = activeDrinks.reduce((sum, d) => {
    const recipe = DRINK_RECIPES.find(r => r.id === d.recipeId);
    return sum + (recipe ? recipe.profit : 0);
  }, 0) / activeDrinks.length;

  const stars = reputationToStars(savedState.reputation);
  const cpm = starsToCustomersPerMinute(stars);
  const totalCustomers = Math.floor(cpm * (offlineSeconds / 60));
  const totalDrinks = totalCustomers;
  const earnings = totalDrinks * avgProfit * savedState.prestige.permanentMultiplier * BALANCE.OFFLINE_EARNING_RATE;

  return {
    offlineEarnings: Math.floor(earnings),
    offlineTime: offlineMs,
    offlineDrinksServed: totalDrinks,
    offlineCustomersServed: totalCustomers,
  };
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, null, () => {
    const saved = loadGame();
    if (saved) {
      const offlineData = calculateOfflineData(saved);
      return {
        ...saved,
        ...offlineData,
        customers: [],
        floatingTexts: [],
        activeEvents: [],
        lastTickTime: Date.now(),
      };
    }
    return createInitialState();
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK', now: Date.now() });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      saveGame(stateRef.current);
    }, 30000);

    const handleUnload = () => saveGame(stateRef.current);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const lastSpawnRef = useRef(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const s = stateRef.current;
      const stars = reputationToStars(s.reputation);
      const cpm = starsToCustomersPerMinute(stars);

      const eventMult = s.activeEvents.reduce((m, e) => {
        if (!e.resolved && e.event.effect.type === 'customerBoost' && now < e.startTime + e.event.duration) {
          return m * e.event.effect.multiplier;
        }
        return m;
      }, 1);

      const intervalMs = Math.max(
        BALANCE.MIN_CUSTOMER_INTERVAL,
        (60000 / (cpm * eventMult))
      );

      if (now - lastSpawnRef.current >= intervalMs) {
        lastSpawnRef.current = now;
        const activeDrinks = s.drinks.filter(d => d.active);
        if (activeDrinks.length === 0) return;

        const occupiedSeats = s.customers.filter(c => c.state !== 'leaving' && c.state !== 'leavingAngry').length;
        if (occupiedSeats >= s.maxSeats) return;

        const types = Object.entries(CUSTOMER_TYPE_CONFIG)
          .filter(([, cfg]) => s.level >= cfg.unlockLevel)
          .map(([type]) => type);
        const type = randomFromArray(types) as Customer['type'];
        const cfg = CUSTOMER_TYPE_CONFIG[type];
        const drink = randomFromArray(activeDrinks);

        const basePat = BALANCE.BASE_PATIENCE * cfg.patienceMult;
        const ambienceBonus = s.ambienceScore * BALANCE.AMBIENCE_PATIENCE_BONUS;

        const customer: Customer = {
          id: generateId(),
          type,
          name: randomFromArray(CUSTOMER_NAMES),
          emoji: cfg.emoji,
          patience: basePat + ambienceBonus,
          maxPatience: basePat + ambienceBonus,
          preferredDrink: drink.recipeId,
          payMultiplier: cfg.payMultiplier,
          satisfaction: 0.5,
          state: 'entering',
          seatIndex: occupiedSeats,
          orderProgress: 0,
          enterTime: now,
        };

        dispatch({ type: 'LOAD_STATE', state: { ...stateRef.current, customers: [...stateRef.current.customers, customer] } });
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const lastEventRef = useRef(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const s = stateRef.current;
      if (s.activeEvents.length > 0) return;

      const nextEventTime = lastEventRef.current + randomBetween(BALANCE.EVENT_INTERVAL_MIN, BALANCE.EVENT_INTERVAL_MAX);
      if (now >= nextEventTime && s.level >= 3) {
        lastEventRef.current = now;
        const event = randomFromArray(MINI_EVENTS);
        dispatch({ type: 'TRIGGER_EVENT', event });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

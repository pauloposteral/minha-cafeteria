import type { GameState, GameAction, Customer, Barista } from '../types/game';
import { DRINK_RECIPES } from '../constants/drinks';
import { MACHINES, getMachineCost } from '../constants/equipment';
import { DECORATIONS, getSeatsFromDecoration } from '../constants/decorations';
import { BALANCE, xpForLevel, reputationToStars, starsToCustomersPerMinute, ambienceToStars, PRESTIGE_MULTIPLIERS, PRESTIGE_CITIES } from '../constants/balance';
import { REVIEW_TEMPLATES } from '../constants/names';
import { randomFromArray, generateId, randomBetween } from '../utils/random';
import { createInitialState } from './initialState';

function calculatePrepTime(recipeId: string, barista: Barista, state: GameState): number {
  const recipe = DRINK_RECIPES.find(r => r.id === recipeId);
  if (!recipe) return 10;

  let time = recipe.prepTime;

  const speedFactor = 1 - (barista.speed / 200);
  time *= speedFactor;

  const ownedDrink = state.drinks.find(d => d.recipeId === recipeId);
  if (ownedDrink) {
    time *= (1 - ownedDrink.qualityLevel * BALANCE.DRINK_SPEED_BONUS_PER_LEVEL);
  }

  state.machines.forEach(om => {
    const machine = MACHINES.find(m => m.id === om.machineId);
    if (machine) {
      time *= (1 - machine.speedBonus * om.level * BALANCE.MACHINE_SPEED_BONUS_PER_LEVEL);
    }
  });

  time *= (1 / state.prestige.permanentMultiplier);

  return Math.max(1, time);
}

function processTick(state: GameState, now: number): GameState {
  const delta = Math.min((now - state.lastTickTime) / 1000, 5);
  if (delta <= 0) return state;

  let newState = { ...state, lastTickTime: now };
  let customers = [...newState.customers];
  let baristas = [...newState.baristas];
  let floatingTexts = [...newState.floatingTexts];
  let earnings = newState.collectableEarnings;
  let stats = { ...newState.stats };
  let reputation = newState.reputation;
  let xp = newState.xp;
  let reviews = [...newState.reviews];
  let drinks = [...newState.drinks];

  const eventMoneyMult = newState.activeEvents.reduce((m, e) => {
    if (!e.resolved && e.event.effect.type === 'moneyBoost' && now < e.startTime + e.event.duration) {
      return m * e.event.effect.multiplier;
    }
    return m;
  }, 1);

  const eventCustomerMult = newState.activeEvents.reduce((m, e) => {
    if (!e.resolved && e.event.effect.type === 'customerBoost' && now < e.startTime + e.event.duration) {
      return m * e.event.effect.multiplier;
    }
    return m;
  }, 1);

  const eventRepMult = newState.activeEvents.reduce((m, e) => {
    if (!e.resolved && e.event.effect.type === 'reputationBoost' && now < e.startTime + e.event.duration) {
      return m * e.event.effect.multiplier;
    }
    return m;
  }, 1);

  customers = customers.map(c => {
    if (c.state === 'entering') {
      return { ...c, state: 'waiting' as const };
    }
    return c;
  });

  customers = customers.map(c => {
    if (c.state === 'waiting' && !c.assignedBaristaId) {
      const barista = baristas.find(b => b.status === 'idle');
      if (barista) {
        baristas = baristas.map(b =>
          b.id === barista.id ? { ...b, status: 'working' as const, currentOrderId: c.id } : b
        );
        return { ...c, state: 'beingServed' as const, assignedBaristaId: barista.id };
      }
    }
    return c;
  });

  if (customers.filter(c => c.state === 'waiting' && !c.assignedBaristaId).length > 0 && baristas.length === 0) {
    const waitingCustomer = customers.find(c => c.state === 'waiting');
    if (waitingCustomer) {
      customers = customers.map(c =>
        c.id === waitingCustomer.id ? { ...c, state: 'beingServed' as const } : c
      );
    }
  }

  customers = customers.map(c => {
    if (c.state === 'beingServed') {
      const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
      if (!recipe) return c;

      const barista = c.assignedBaristaId ? baristas.find(b => b.id === c.assignedBaristaId) : null;
      const totalTime = barista ? calculatePrepTime(c.preferredDrink, barista, newState) : recipe.prepTime;
      const progressPerSecond = (1 / totalTime) * 100;
      const newProgress = Math.min(100, c.orderProgress + progressPerSecond * delta);

      if (newProgress >= 100) {
        return { ...c, orderProgress: 100, state: 'drinking' as const };
      }
      return { ...c, orderProgress: newProgress };
    }
    return c;
  });

  customers = customers.map(c => {
    if (c.state === 'waiting') {
      const newPatience = c.patience - BALANCE.PATIENCE_DECAY_PER_SECOND * delta;
      if (newPatience <= 0) {
        return { ...c, patience: 0, state: 'leavingAngry' as const };
      }
      return { ...c, patience: newPatience };
    }
    return c;
  });

  const completedCustomers: Customer[] = [];
  const angryCustomers: Customer[] = [];

  customers = customers.filter(c => {
    if (c.state === 'drinking') {
      completedCustomers.push(c);
      return false;
    }
    if (c.state === 'leavingAngry') {
      angryCustomers.push(c);
      return false;
    }
    return true;
  });

  completedCustomers.forEach(c => {
    const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
    if (!recipe) return;

    const ownedDrink = drinks.find(d => d.recipeId === c.preferredDrink);
    const qualityBonus = ownedDrink ? ownedDrink.qualityLevel * BALANCE.DRINK_QUALITY_BONUS_PER_LEVEL : 0;

    const patienceRatio = c.patience / c.maxPatience;
    const satisfaction = Math.min(1, 0.3 + patienceRatio * 0.4 + qualityBonus * 0.3);

    const baseEarning = recipe.profit * c.payMultiplier * newState.prestige.permanentMultiplier;
    const tip = baseEarning * (BALANCE.TIP_BASE_PERCENT + satisfaction * BALANCE.TIP_SATISFACTION_MULTIPLIER);
    const ambienceTip = newState.ambienceScore * BALANCE.AMBIENCE_TIP_BONUS;
    const totalEarning = (baseEarning + tip + ambienceTip) * eventMoneyMult;

    earnings += totalEarning;
    stats.totalCustomersServed += 1;
    stats.totalDrinksServed += 1;
    stats.totalMoneyEarned += totalEarning;
    stats.totalTipsEarned += tip;
    stats.currentDayEarnings += totalEarning;
    stats.drinkCounts[c.preferredDrink] = (stats.drinkCounts[c.preferredDrink] || 0) + 1;

    const maxDrink = Object.entries(stats.drinkCounts).sort((a, b) => b[1] - a[1])[0];
    if (maxDrink) stats.mostPopularDrink = maxDrink[0];

    drinks = drinks.map(d =>
      d.recipeId === c.preferredDrink ? { ...d, totalServed: d.totalServed + 1 } : d
    );

    xp += BALANCE.XP_PER_DRINK + BALANCE.XP_PER_CUSTOMER;
    reputation = Math.min(5, reputation + BALANCE.REP_GAIN_PER_SATISFIED * satisfaction * eventRepMult);

    if (c.assignedBaristaId) {
      baristas = baristas.map(b => {
        if (b.id === c.assignedBaristaId) {
          let newXp = b.xp + BALANCE.BARISTA_XP_PER_DRINK;
          let newLevel = b.level;
          let newSpeed = b.speed;
          let newQuality = b.quality;
          while (newXp >= BALANCE.BARISTA_LEVEL_XP * newLevel && newLevel < BALANCE.BARISTA_MAX_LEVEL) {
            newXp -= BALANCE.BARISTA_LEVEL_XP * newLevel;
            newLevel += 1;
            newSpeed = Math.min(100, newSpeed + BALANCE.BARISTA_SPEED_PER_LEVEL);
            newQuality = Math.min(100, newQuality + BALANCE.BARISTA_QUALITY_PER_LEVEL);
          }
          return { ...b, status: 'idle' as const, currentOrderId: undefined, xp: newXp, level: newLevel, speed: newSpeed, quality: newQuality };
        }
        return b;
      });
    }

    floatingTexts.push({
      id: generateId(),
      text: `+R$${totalEarning.toFixed(0)}`,
      color: '#2E7D32',
      x: 30 + Math.random() * 40,
      y: 20 + Math.random() * 30,
      createdAt: now,
    });

    if (Math.random() < BALANCE.REVIEW_CHANCE) {
      const templates = satisfaction > 0.7 ? REVIEW_TEMPLATES.good :
        satisfaction > 0.4 ? REVIEW_TEMPLATES.medium : REVIEW_TEMPLATES.bad;
      const reviewStars = satisfaction > 0.7 ? randomBetween(4, 5) :
        satisfaction > 0.4 ? randomBetween(2, 4) : randomBetween(1, 2);
      reviews.push({
        text: randomFromArray(templates),
        stars: reviewStars,
        customerName: c.name,
        timestamp: now,
      });
      if (reviews.length > 20) reviews = reviews.slice(-20);
    }
  });

  angryCustomers.forEach(c => {
    reputation = Math.max(0, reputation - BALANCE.REP_LOSS_PER_ANGRY);
    if (c.assignedBaristaId) {
      baristas = baristas.map(b =>
        b.id === c.assignedBaristaId ? { ...b, status: 'idle' as const, currentOrderId: undefined } : b
      );
    }
  });

  floatingTexts = floatingTexts.filter(ft => now - ft.createdAt < 2000);

  const activeEvents = newState.activeEvents.filter(e => now < e.startTime + e.event.duration);

  const reputationStars = reputationToStars(reputation);
  const customersPerMinute = starsToCustomersPerMinute(reputationStars) * eventCustomerMult;

  let level = newState.level;
  let xpToNextLevel = newState.xpToNextLevel;
  while (xp >= xpToNextLevel && level < BALANCE.MAX_LEVEL) {
    xp -= xpToNextLevel;
    level += 1;
    xpToNextLevel = xpForLevel(level);

    const newDrinks = DRINK_RECIPES.filter(r => r.unlockLevel === level);
    newDrinks.forEach(r => {
      if (!drinks.find(d => d.recipeId === r.id)) {
        drinks.push({ recipeId: r.id, qualityLevel: 1, totalServed: 0, active: false });
      }
    });

    floatingTexts.push({
      id: generateId(),
      text: `NIVEL ${level}!`,
      color: '#C8A951',
      x: 50,
      y: 50,
      createdAt: now,
    });
  }

  if (stats.currentDayEarnings > stats.bestDayEarnings) {
    stats.bestDayEarnings = stats.currentDayEarnings;
  }
  stats.playTime += delta;

  return {
    ...newState,
    customers,
    baristas,
    floatingTexts,
    collectableEarnings: earnings,
    stats,
    reputation,
    reputationStars,
    customersPerMinute,
    xp,
    xpToNextLevel,
    level,
    reviews,
    drinks,
    activeEvents,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TICK':
      return processTick(state, action.now);

    case 'COLLECT_EARNINGS': {
      return {
        ...state,
        money: state.money + state.collectableEarnings,
        collectableEarnings: 0,
      };
    }

    case 'BUY_DRINK_UPGRADE': {
      const drink = state.drinks.find(d => d.recipeId === action.recipeId);
      if (!drink || drink.qualityLevel >= BALANCE.MAX_DRINK_QUALITY_LEVEL) return state;
      const recipe = DRINK_RECIPES.find(r => r.id === action.recipeId);
      if (!recipe) return state;
      const cost = Math.floor(recipe.price * 10 * Math.pow(BALANCE.DRINK_UPGRADE_COST_MULTIPLIER, drink.qualityLevel));
      if (state.money < cost) return state;
      return {
        ...state,
        money: state.money - cost,
        drinks: state.drinks.map(d =>
          d.recipeId === action.recipeId ? { ...d, qualityLevel: d.qualityLevel + 1 } : d
        ),
      };
    }

    case 'TOGGLE_DRINK': {
      return {
        ...state,
        drinks: state.drinks.map(d =>
          d.recipeId === action.recipeId ? { ...d, active: !d.active } : d
        ),
      };
    }

    case 'UNLOCK_DRINK': {
      const recipe = DRINK_RECIPES.find(r => r.id === action.recipeId);
      if (!recipe || state.level < recipe.unlockLevel) return state;
      if (state.drinks.find(d => d.recipeId === action.recipeId)) return state;
      return {
        ...state,
        drinks: [...state.drinks, { recipeId: action.recipeId, qualityLevel: 1, totalServed: 0, active: true }],
      };
    }

    case 'BUY_MACHINE': {
      const machine = MACHINES.find(m => m.id === action.machineId);
      if (!machine) return state;
      if (state.machines.find(m => m.machineId === action.machineId)) return state;
      if (state.money < machine.cost || state.level < machine.unlockLevel) return state;
      return {
        ...state,
        money: state.money - machine.cost,
        machines: [...state.machines, { machineId: machine.id, level: 1 }],
      };
    }

    case 'UPGRADE_MACHINE': {
      const owned = state.machines.find(m => m.machineId === action.machineId);
      const machine = MACHINES.find(m => m.id === action.machineId);
      if (!owned || !machine || owned.level >= machine.maxLevel) return state;
      const cost = getMachineCost(machine.cost, owned.level);
      if (state.money < cost) return state;
      return {
        ...state,
        money: state.money - cost,
        machines: state.machines.map(m =>
          m.machineId === action.machineId ? { ...m, level: m.level + 1 } : m
        ),
      };
    }

    case 'HIRE_BARISTA': {
      if (state.baristas.length >= state.baristaSlots) return state;
      const cost = action.barista.salary * 10;
      if (state.money < cost) return state;
      return {
        ...state,
        money: state.money - cost,
        baristas: [...state.baristas, action.barista],
      };
    }

    case 'FIRE_BARISTA': {
      return {
        ...state,
        baristas: state.baristas.filter(b => b.id !== action.baristaId),
      };
    }

    case 'BUY_DECORATION': {
      const deco = DECORATIONS.find(d => d.id === action.decorationId);
      if (!deco || state.money < deco.cost || state.level < deco.unlockLevel) return state;

      const existing = state.decorations.find(d => d.decorationId === action.decorationId);
      const newDecos = existing
        ? state.decorations.map(d => d.decorationId === action.decorationId ? { ...d, count: d.count + 1 } : d)
        : [...state.decorations, { decorationId: action.decorationId, count: 1 }];

      const totalAmbience = newDecos.reduce((sum, od) => {
        const def = DECORATIONS.find(d => d.id === od.decorationId);
        return sum + (def ? def.ambiencePoints * od.count : 0);
      }, 0);

      const totalSeats = BALANCE.INITIAL_SEATS + newDecos.reduce((sum, od) => {
        return sum + getSeatsFromDecoration(od.decorationId) * od.count;
      }, 0);

      return {
        ...state,
        money: state.money - deco.cost,
        decorations: newDecos,
        ambienceScore: totalAmbience,
        ambienceStars: ambienceToStars(totalAmbience),
        maxSeats: totalSeats,
      };
    }

    case 'TRIGGER_EVENT': {
      return {
        ...state,
        activeEvents: [...state.activeEvents, { event: action.event, startTime: Date.now(), resolved: false }],
      };
    }

    case 'RESOLVE_EVENT': {
      return {
        ...state,
        activeEvents: state.activeEvents.map(e =>
          e.event.id === action.eventId ? { ...e, resolved: true } : e
        ),
      };
    }

    case 'PRESTIGE': {
      if (state.level < BALANCE.PRESTIGE_MIN_LEVEL) return state;
      const newPrestigeLevel = state.prestige.level + 1;
      const newMultiplier = PRESTIGE_MULTIPLIERS[Math.min(newPrestigeLevel, PRESTIGE_MULTIPLIERS.length - 1)];
      const newCity = PRESTIGE_CITIES[Math.min(newPrestigeLevel, PRESTIGE_CITIES.length - 1)];

      const fresh = createInitialState();
      return {
        ...fresh,
        prestige: {
          level: newPrestigeLevel,
          totalPrestiges: state.prestige.totalPrestiges + 1,
          permanentMultiplier: newMultiplier,
          cities: [...state.prestige.cities, newCity],
        },
        stats: {
          ...fresh.stats,
          totalCustomersServed: state.stats.totalCustomersServed,
          totalDrinksServed: state.stats.totalDrinksServed,
          totalMoneyEarned: state.stats.totalMoneyEarned,
          totalTipsEarned: state.stats.totalTipsEarned,
          bestDayEarnings: state.stats.bestDayEarnings,
          playTime: state.stats.playTime,
        },
        tutorialComplete: true,
      };
    }

    case 'DISMISS_OFFLINE': {
      const offlineEarnings = state.offlineEarnings || 0;
      return {
        ...state,
        money: state.money + offlineEarnings,
        offlineEarnings: null,
        offlineTime: null,
        offlineDrinksServed: null,
        offlineCustomersServed: null,
      };
    }

    case 'ADVANCE_TUTORIAL': {
      return { ...state, tutorialStep: state.tutorialStep + 1 };
    }

    case 'COMPLETE_TUTORIAL': {
      return { ...state, tutorialComplete: true };
    }

    case 'LOAD_STATE': {
      return action.state;
    }

    case 'CLEAR_FLOATING_TEXT': {
      return {
        ...state,
        floatingTexts: state.floatingTexts.filter(ft => ft.id !== action.id),
      };
    }

    default:
      return state;
  }
}

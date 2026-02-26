import type { GameState } from '../types/game';
import { BALANCE, xpForLevel } from '../constants/balance';

export function createInitialState(): GameState {
  const now = Date.now();
  return {
    money: BALANCE.INITIAL_MONEY,
    level: 1,
    xp: 0,
    xpToNextLevel: xpForLevel(1),
    reputation: 0.5,
    reputationStars: 1,
    customersPerMinute: 1,

    drinks: [
      { recipeId: 'cafe-coado', qualityLevel: 1, totalServed: 0, active: true },
    ],
    machines: [
      { machineId: 'cafeteira-simples', level: 1 },
    ],
    baristas: [],
    decorations: [],
    customers: [],

    maxSeats: BALANCE.INITIAL_SEATS,
    ambienceScore: 0,
    ambienceStars: 0,

    activeEvents: [],
    floatingTexts: [],
    reviews: [],

    stats: {
      totalCustomersServed: 0,
      totalDrinksServed: 0,
      totalMoneyEarned: 0,
      totalTipsEarned: 0,
      bestDayEarnings: 0,
      currentDayEarnings: 0,
      playTime: 0,
      mostPopularDrink: 'cafe-coado',
      drinkCounts: {},
    },

    prestige: {
      level: 0,
      totalPrestiges: 0,
      permanentMultiplier: 1,
      cities: ['Sao Paulo'],
    },

    unlockedDrinkSlots: 1,
    baristaSlots: BALANCE.INITIAL_BARISTA_SLOTS,
    collectableEarnings: 0,

    lastTickTime: now,
    lastSaveTime: now,
    gameStartTime: now,

    tutorialStep: 0,
    tutorialComplete: false,

    offlineEarnings: null,
    offlineTime: null,
    offlineDrinksServed: null,
    offlineCustomersServed: null,
  };
}

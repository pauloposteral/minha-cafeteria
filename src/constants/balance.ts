export const BALANCE = {
  BASE_CUSTOMER_INTERVAL: 6000,
  MIN_CUSTOMER_INTERVAL: 800,
  BASE_PATIENCE: 30,
  PATIENCE_DECAY_PER_SECOND: 1,

  DRINK_UPGRADE_COST_MULTIPLIER: 1.8,
  DRINK_QUALITY_BONUS_PER_LEVEL: 0.15,
  DRINK_SPEED_BONUS_PER_LEVEL: 0.08,
  MAX_DRINK_QUALITY_LEVEL: 5,

  MACHINE_UPGRADE_MULTIPLIER: 2.5,
  MACHINE_SPEED_BONUS_PER_LEVEL: 0.1,
  MACHINE_QUALITY_BONUS_PER_LEVEL: 0.05,

  BARISTA_XP_PER_DRINK: 10,
  BARISTA_LEVEL_XP: 100,
  BARISTA_SPEED_PER_LEVEL: 1,
  BARISTA_QUALITY_PER_LEVEL: 1,
  BARISTA_MAX_LEVEL: 50,

  BARISTA_SLOT_COSTS: [0, 5000, 15000, 50000, 150000],

  XP_PER_DRINK: 5,
  XP_PER_CUSTOMER: 2,
  XP_LEVEL_BASE: 50,
  XP_LEVEL_MULTIPLIER: 1.3,
  MAX_LEVEL: 30,

  REP_GAIN_PER_SATISFIED: 0.02,
  REP_LOSS_PER_ANGRY: 0.05,
  REP_DECAY_RATE: 0.001,

  STARS_THRESHOLDS: [0, 1, 2, 3, 4],
  CUSTOMERS_PER_STAR: [1, 2, 4, 8, 15],

  AMBIENCE_STAR_THRESHOLDS: [0, 20, 50, 100, 200],
  AMBIENCE_TIP_BONUS: 0.05,
  AMBIENCE_PATIENCE_BONUS: 0.02,

  TIP_BASE_PERCENT: 0.1,
  TIP_SATISFACTION_MULTIPLIER: 0.15,

  OFFLINE_EARNING_RATE: 0.5,
  OFFLINE_MAX_HOURS: 8,

  PRESTIGE_MIN_LEVEL: 25,

  COLLECT_RATE: 0.7,

  INITIAL_SEATS: 4,
  INITIAL_MONEY: 100,
  INITIAL_BARISTA_SLOTS: 1,

  EVENT_INTERVAL_MIN: 180000,
  EVENT_INTERVAL_MAX: 300000,
  EVENT_DURATION: 120000,

  REVIEW_CHANCE: 0.02,
};

export const PRESTIGE_CITIES = [
  'Sao Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Salvador',
  'Brasilia',
  'Porto Alegre',
  'Recife',
  'Florianopolis',
  'Internacional',
];

export const PRESTIGE_MULTIPLIERS = [1, 2, 3, 5, 8, 12, 18, 25, 35, 50, 100];

export function xpForLevel(level: number): number {
  return Math.floor(BALANCE.XP_LEVEL_BASE * Math.pow(BALANCE.XP_LEVEL_MULTIPLIER, level - 1));
}

export function reputationToStars(rep: number): number {
  if (rep >= 4) return 5;
  if (rep >= 3) return 4;
  if (rep >= 2) return 3;
  if (rep >= 1) return 2;
  if (rep >= 0.5) return 1;
  return 0;
}

export function starsToCustomersPerMinute(stars: number): number {
  return BALANCE.CUSTOMERS_PER_STAR[Math.min(stars, BALANCE.CUSTOMERS_PER_STAR.length - 1)] || 1;
}

export function ambienceToStars(score: number): number {
  if (score >= 200) return 5;
  if (score >= 100) return 4;
  if (score >= 50) return 3;
  if (score >= 20) return 2;
  if (score > 0) return 1;
  return 0;
}

export type DrinkCategory = 'espresso' | 'leite' | 'gelados' | 'specialty';

export type CustomerType = 'regular' | 'hipster' | 'executivo' | 'influencer' | 'turista' | 'critico' | 'celebridade' | 'juiz';

export type BaristaRarity = 'comum' | 'bom' | 'expert' | 'mestre' | 'lenda';

export type CustomerState = 'entering' | 'waiting' | 'ordering' | 'beingServed' | 'drinking' | 'leaving' | 'leavingAngry';

export type DecorationCategory = 'mobilia' | 'decoracao' | 'ambiente' | 'expansao';

export interface DrinkRecipe {
  id: string;
  name: string;
  category: DrinkCategory;
  price: number;
  profit: number;
  prepTime: number;
  unlockLevel: number;
  icon: string;
  funFact: string;
  requiredMachine?: string;
}

export interface OwnedDrink {
  recipeId: string;
  qualityLevel: number;
  totalServed: number;
  active: boolean;
}

export interface Machine {
  id: string;
  name: string;
  cost: number;
  unlockLevel: number;
  icon: string;
  speedBonus: number;
  qualityBonus: number;
  capacity: number;
  maxLevel: number;
  description: string;
}

export interface OwnedMachine {
  machineId: string;
  level: number;
}

export interface Barista {
  id: string;
  name: string;
  avatar: string;
  rarity: BaristaRarity;
  speed: number;
  quality: number;
  specialty: DrinkCategory;
  level: number;
  xp: number;
  salary: number;
  status: 'idle' | 'working' | 'break';
  currentOrderId?: string;
}

export interface Customer {
  id: string;
  type: CustomerType;
  name: string;
  emoji: string;
  patience: number;
  maxPatience: number;
  preferredDrink: string;
  payMultiplier: number;
  satisfaction: number;
  state: CustomerState;
  seatIndex: number;
  orderProgress: number;
  enterTime: number;
  assignedBaristaId?: string;
}

export interface Decoration {
  id: string;
  name: string;
  category: DecorationCategory;
  cost: number;
  ambiencePoints: number;
  icon: string;
  unlockLevel: number;
  description: string;
}

export interface OwnedDecoration {
  decorationId: string;
  count: number;
}

export interface MiniEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  effect: EventEffect;
  duration: number;
}

export interface EventEffect {
  type: 'customerBoost' | 'moneyBoost' | 'reputationBoost' | 'discount' | 'challenge';
  multiplier: number;
  value?: number;
}

export interface ActiveEvent {
  event: MiniEvent;
  startTime: number;
  resolved: boolean;
}

export interface FloatingTextItem {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  createdAt: number;
}

export interface Review {
  text: string;
  stars: number;
  customerName: string;
  timestamp: number;
}

export interface GameStats {
  totalCustomersServed: number;
  totalDrinksServed: number;
  totalMoneyEarned: number;
  totalTipsEarned: number;
  bestDayEarnings: number;
  currentDayEarnings: number;
  playTime: number;
  mostPopularDrink: string;
  drinkCounts: Record<string, number>;
}

export interface PrestigeData {
  level: number;
  totalPrestiges: number;
  permanentMultiplier: number;
  cities: string[];
}

export interface GameState {
  money: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  reputation: number;
  reputationStars: number;
  customersPerMinute: number;

  drinks: OwnedDrink[];
  machines: OwnedMachine[];
  baristas: Barista[];
  decorations: OwnedDecoration[];
  customers: Customer[];

  maxSeats: number;
  ambienceScore: number;
  ambienceStars: number;

  activeEvents: ActiveEvent[];
  floatingTexts: FloatingTextItem[];
  reviews: Review[];

  stats: GameStats;
  prestige: PrestigeData;

  unlockedDrinkSlots: number;
  baristaSlots: number;
  collectableEarnings: number;

  lastTickTime: number;
  lastSaveTime: number;
  gameStartTime: number;

  tutorialStep: number;
  tutorialComplete: boolean;

  offlineEarnings: number | null;
  offlineTime: number | null;
  offlineDrinksServed: number | null;
  offlineCustomersServed: number | null;
}

export type GameAction =
  | { type: 'TICK'; now: number }
  | { type: 'COLLECT_EARNINGS' }
  | { type: 'BUY_DRINK_UPGRADE'; recipeId: string }
  | { type: 'TOGGLE_DRINK'; recipeId: string }
  | { type: 'UNLOCK_DRINK'; recipeId: string }
  | { type: 'BUY_MACHINE'; machineId: string }
  | { type: 'UPGRADE_MACHINE'; machineId: string }
  | { type: 'HIRE_BARISTA'; barista: Barista }
  | { type: 'FIRE_BARISTA'; baristaId: string }
  | { type: 'BUY_DECORATION'; decorationId: string }
  | { type: 'TRIGGER_EVENT'; event: MiniEvent }
  | { type: 'RESOLVE_EVENT'; eventId: string }
  | { type: 'PRESTIGE' }
  | { type: 'DISMISS_OFFLINE' }
  | { type: 'ADVANCE_TUTORIAL' }
  | { type: 'COMPLETE_TUTORIAL' }
  | { type: 'LOAD_STATE'; state: GameState }
  | { type: 'CLEAR_FLOATING_TEXT'; id: string };

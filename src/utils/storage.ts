import type { GameState } from '../types/game';

const SAVE_KEY = 'minha-cafeteria-save';

export function saveGame(state: GameState): void {
  try {
    const data = JSON.stringify({
      ...state,
      customers: [],
      floatingTexts: [],
      activeEvents: [],
      lastSaveTime: Date.now(),
    });
    localStorage.setItem(SAVE_KEY, data);
  } catch {
    // localStorage full or unavailable
  }
}

export function loadGame(): GameState | null {
  try {
    const data = localStorage.getItem(SAVE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY);
}

export function hasSaveData(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null;
}

import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { DRINK_RECIPES } from '../../constants/drinks';
import { BALANCE } from '../../constants/balance';
import { formatMoney } from '../../utils/formatters';
import type { DrinkCategory } from '../../types/game';
import { DRINK_IMAGES, CATEGORY_COLORS } from '../../constants/assets';
import ProgressBar from '../shared/ProgressBar';
import StarRating from '../shared/StarRating';

const CATEGORIES: { id: DrinkCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'leite', label: 'Com Leite' },
  { id: 'gelados', label: 'Gelados' },
  { id: 'specialty', label: 'Specialty' },
];

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#D4A574" opacity="0.2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function UpgradeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
      <circle cx="12" cy="3" r="1" fill="#C8A951" stroke="none" />
    </svg>
  );
}

function ToggleOnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="5" width="22" height="14" rx="7" fill="#4CAF50" opacity="0.2" stroke="#4CAF50" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="4" fill="#4CAF50" />
    </svg>
  );
}

function ToggleOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="5" width="22" height="14" rx="7" fill="#D4A574" opacity="0.15" stroke="#D4A574" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="4" fill="#B8A99A" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" opacity="0.15" fill="#D4A574" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export default function MenuPanel() {
  const { state, dispatch } = useGame();
  const [category, setCategory] = useState<DrinkCategory | 'all'>('all');
  const [expandedDrink, setExpandedDrink] = useState<string | null>(null);

  const filteredRecipes = DRINK_RECIPES.filter(r =>
    category === 'all' || r.category === category
  );

  return (
    <div className="flex flex-col h-full bg-cafe-50">
      <div className="p-3 border-b border-cafe-200">
        <h2 className="text-cafe-800 font-bold font-display mb-2">Menu da Cafeteria</h2>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => {
            const colors = cat.id !== 'all' ? CATEGORY_COLORS[cat.id] : null;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  category === cat.id
                    ? colors
                      ? `${colors.bg} ${colors.text} ${colors.border} border`
                      : 'bg-cafe-500 text-white'
                    : 'bg-cafe-100 text-cafe-600 hover:bg-cafe-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {filteredRecipes.map(recipe => {
          const owned = state.drinks.find(d => d.recipeId === recipe.id);
          const isUnlocked = state.level >= recipe.unlockLevel;
          const isOwned = !!owned;
          const isExpanded = expandedDrink === recipe.id;
          const upgradeCost = owned
            ? Math.floor(recipe.price * 10 * Math.pow(BALANCE.DRINK_UPGRADE_COST_MULTIPLIER, owned.qualityLevel))
            : 0;
          const canUpgrade = owned && owned.qualityLevel < BALANCE.MAX_DRINK_QUALITY_LEVEL && state.money >= upgradeCost;
          const drinkImg = DRINK_IMAGES[recipe.id];
          const catColors = CATEGORY_COLORS[recipe.category];
          const categoryClass = `category-${recipe.category}`;

          return (
            <div
              key={recipe.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                !isUnlocked
                  ? 'bg-cafe-100/50 border-cafe-200/50 opacity-60'
                  : isOwned && owned.active
                    ? `border-cafe-300/50 shadow-sm ${categoryClass}`
                    : 'bg-white/60 border-cafe-200'
              }`}
            >
              <button
                onClick={() => setExpandedDrink(isExpanded ? null : recipe.id)}
                className="w-full p-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-cafe-200/50">
                    {drinkImg ? (
                      <img src={drinkImg} alt={recipe.name} className="w-full h-full img-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl bg-cafe-100">
                        {recipe.icon}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-cafe-800 font-medium text-sm">{recipe.name}</span>
                      {!isUnlocked && <LockIcon />}
                      {isOwned && owned.active && (
                        <span className={`text-[9px] ${catColors.bg} ${catColors.text} px-1.5 py-0.5 rounded-full border ${catColors.border}`}>
                          ATIVO
                        </span>
                      )}
                    </div>
                    {isUnlocked ? (
                      <div className="flex items-center gap-3 text-xs text-cafe-500 mt-0.5">
                        <span>R${recipe.price}</span>
                        <span className="text-green-600 font-medium">+R${recipe.profit}</span>
                        <span>{recipe.prepTime}s</span>
                        {isOwned && (
                          <div className="flex items-center gap-0.5">
                            <StarRating value={owned.qualityLevel} max={BALANCE.MAX_DRINK_QUALITY_LEVEL} size={8} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-cafe-400 mt-0.5">
                        Desbloqueia no nivel {recipe.unlockLevel}
                      </div>
                    )}
                  </div>
                  {isOwned && (
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] text-cafe-400 block">{owned.totalServed}</span>
                      <span className="text-[8px] text-cafe-400">servidos</span>
                    </div>
                  )}
                </div>

                {!isUnlocked && (
                  <div className="mt-2">
                    <ProgressBar
                      value={state.level}
                      max={recipe.unlockLevel}
                      color="bg-cafe-300/60"
                      height="h-1"
                    />
                  </div>
                )}
              </button>

              {isExpanded && isUnlocked && (
                <div className="px-3 pb-3 pt-1 border-t border-cafe-100 space-y-2">
                  <div className="flex items-start gap-2 bg-cafe-100/60 rounded-lg p-2">
                    <div className="mt-0.5 flex-shrink-0">
                      <InfoIcon />
                    </div>
                    <p className="text-xs text-cafe-600 leading-relaxed">{recipe.funFact}</p>
                  </div>

                  <div className="flex gap-2">
                    {isOwned ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: 'TOGGLE_DRINK', recipeId: recipe.id });
                          }}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            owned.active
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-cafe-100 text-cafe-500 border border-cafe-200'
                          }`}
                        >
                          {owned.active ? <ToggleOnIcon /> : <ToggleOffIcon />}
                          {owned.active ? 'Ativo' : 'Inativo'}
                        </button>

                        {owned.qualityLevel < BALANCE.MAX_DRINK_QUALITY_LEVEL && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch({ type: 'BUY_DRINK_UPGRADE', recipeId: recipe.id });
                            }}
                            disabled={!canUpgrade}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                              canUpgrade
                                ? 'bg-cafe-300/20 text-cafe-600 border border-cafe-300/50 hover:bg-cafe-300/30'
                                : 'bg-cafe-100 text-cafe-400 border border-cafe-200 cursor-not-allowed'
                            }`}
                          >
                            <UpgradeIcon />
                            Upgrade {formatMoney(upgradeCost)}
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: 'UNLOCK_DRINK', recipeId: recipe.id });
                        }}
                        className="px-3 py-2 bg-cafe-500 text-white rounded-lg text-xs font-bold hover:bg-cafe-600 transition-all active:scale-95"
                      >
                        Adicionar ao Menu
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Lock, ChevronUp, ToggleLeft, ToggleRight, Info } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { DRINK_RECIPES } from '../../constants/drinks';
import { BALANCE } from '../../constants/balance';
import { formatMoney } from '../../utils/formatters';
import type { DrinkCategory } from '../../types/game';
import ProgressBar from '../shared/ProgressBar';

const CATEGORIES: { id: DrinkCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'leite', label: 'Com Leite' },
  { id: 'gelados', label: 'Gelados' },
  { id: 'specialty', label: 'Specialty' },
];

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
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                category === cat.id
                  ? 'bg-cafe-500 text-white'
                  : 'bg-cafe-100 text-cafe-600 hover:bg-cafe-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
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

          return (
            <div
              key={recipe.id}
              className={`rounded-xl border transition-all duration-200 ${
                !isUnlocked
                  ? 'bg-cafe-100/50 border-cafe-200/50 opacity-60'
                  : isOwned && owned.active
                    ? 'bg-white border-cafe-300/50 shadow-sm'
                    : 'bg-white/60 border-cafe-200'
              }`}
            >
              <button
                onClick={() => setExpandedDrink(isExpanded ? null : recipe.id)}
                className="w-full p-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl w-8 text-center">{recipe.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-cafe-800 font-medium text-sm">{recipe.name}</span>
                      {!isUnlocked && <Lock size={12} className="text-cafe-400" />}
                      {isOwned && owned.active && (
                        <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full border border-green-200">ATIVO</span>
                      )}
                    </div>
                    {isUnlocked ? (
                      <div className="flex items-center gap-3 text-xs text-cafe-500 mt-0.5">
                        <span>R${recipe.price}</span>
                        <span className="text-green-600">+R${recipe.profit}</span>
                        <span>{recipe.prepTime}s</span>
                        {isOwned && (
                          <span className="text-cafe-400">Q{owned.qualityLevel}/{BALANCE.MAX_DRINK_QUALITY_LEVEL}</span>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-cafe-400 mt-0.5">
                        Desbloqueia no nivel {recipe.unlockLevel}
                      </div>
                    )}
                  </div>
                  {isOwned && (
                    <span className="text-xs text-cafe-400">{owned.totalServed} servidos</span>
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
                    <Info size={14} className="text-cafe-500 mt-0.5 flex-shrink-0" />
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
                          {owned.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
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
                            <ChevronUp size={14} />
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
                        className="px-3 py-2 bg-cafe-500 text-white rounded-lg text-xs font-bold hover:bg-cafe-600 transition-all"
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

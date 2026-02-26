import { useState } from 'react';
import { Lock, Check, Sofa, Palette, Music, Building2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { DECORATIONS } from '../../constants/decorations';
import { formatMoney } from '../../utils/formatters';
import type { DecorationCategory } from '../../types/game';
import StarRating from '../shared/StarRating';

const DECO_CATEGORIES: { id: DecorationCategory | 'all'; label: string; icon: typeof Sofa }[] = [
  { id: 'all', label: 'Todos', icon: Building2 },
  { id: 'mobilia', label: 'Mobilia', icon: Sofa },
  { id: 'decoracao', label: 'Decoracao', icon: Palette },
  { id: 'ambiente', label: 'Ambiente', icon: Music },
  { id: 'expansao', label: 'Expansao', icon: Building2 },
];

export default function DecorationPanel() {
  const { state, dispatch } = useGame();
  const [category, setCategory] = useState<DecorationCategory | 'all'>('all');

  const filtered = DECORATIONS.filter(d =>
    category === 'all' || d.category === category
  );

  return (
    <div className="flex flex-col h-full bg-cafe-50">
      <div className="p-3 border-b border-cafe-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-cafe-800 font-bold font-display">Decoracao</h2>
            <p className="text-xs text-cafe-500 mt-0.5">
              Melhore o ambiente para mais gorjetas e paciencia
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-xs text-cafe-500">Ambiente:</span>
              <StarRating value={state.ambienceStars} />
            </div>
            <p className="text-[10px] text-cafe-400">{state.ambienceScore} pontos</p>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {DECO_CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  category === cat.id
                    ? 'bg-cafe-500 text-white'
                    : 'bg-cafe-100 text-cafe-600 hover:bg-cafe-200'
                }`}
              >
                <Icon size={12} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {filtered.map(deco => {
          const owned = state.decorations.find(d => d.decorationId === deco.id);
          const isUnlocked = state.level >= deco.unlockLevel;
          const canBuy = isUnlocked && state.money >= deco.cost;
          const isExpansion = deco.category === 'expansao';
          const maxOwned = isExpansion ? 1 : 5;
          const atMax = owned && owned.count >= maxOwned;

          return (
            <div
              key={deco.id}
              className={`rounded-xl border p-3 transition-all ${
                !isUnlocked
                  ? 'bg-cafe-100/40 border-cafe-200/50 opacity-50'
                  : owned
                    ? 'bg-white border-cafe-300/50 shadow-sm'
                    : 'bg-white/60 border-cafe-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl w-10 h-10 flex items-center justify-center bg-cafe-100 rounded-lg">
                  {deco.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-cafe-800 font-medium text-sm">{deco.name}</span>
                    {owned && (
                      <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-green-200">
                        <Check size={8} /> x{owned.count}
                      </span>
                    )}
                    {!isUnlocked && <Lock size={12} className="text-cafe-400" />}
                  </div>
                  <p className="text-xs text-cafe-500 mt-0.5">{deco.description}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-cafe-500">
                    <span className="text-cafe-400">+{deco.ambiencePoints} ambiente</span>
                    {!isUnlocked && <span>Nivel {deco.unlockLevel}</span>}
                  </div>
                </div>

                {isUnlocked && !atMax && (
                  <button
                    onClick={() => dispatch({ type: 'BUY_DECORATION', decorationId: deco.id })}
                    disabled={!canBuy}
                    className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      canBuy
                        ? 'bg-cafe-500 text-white hover:bg-cafe-600 active:scale-95'
                        : 'bg-cafe-200 text-cafe-400 cursor-not-allowed'
                    }`}
                  >
                    {formatMoney(deco.cost)}
                  </button>
                )}
                {atMax && (
                  <span className="text-[10px] text-cafe-400">Max</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { DECORATIONS } from '../../constants/decorations';
import { formatMoney } from '../../utils/formatters';
import type { DecorationCategory } from '../../types/game';
import { DECORATION_IMAGES } from '../../constants/assets';
import StarRating from '../shared/StarRating';

const DECO_CATEGORIES: { id: DecorationCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'mobilia', label: 'Mobilia' },
  { id: 'decoracao', label: 'Decoracao' },
  { id: 'ambiente', label: 'Ambiente' },
  { id: 'expansao', label: 'Expansao' },
];

const DECO_CAT_ICONS: Record<string, () => JSX.Element> = {
  all: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  mobilia: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12V6a2 2 0 012-2h10a2 2 0 012 2v6" />
      <rect x="3" y="12" width="18" height="4" rx="1" />
      <line x1="6" y1="16" x2="6" y2="20" /><line x1="18" y1="16" x2="18" y2="20" />
    </svg>
  ),
  decoracao: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  ambiente: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  ),
  expansao: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  ),
};

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#D4A574" opacity="0.2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

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
            const IconComp = DECO_CAT_ICONS[cat.id];
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
                {IconComp && <IconComp />}
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
          const decoImg = DECORATION_IMAGES[deco.id];

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
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-cafe-200/50">
                  {decoImg ? (
                    <img src={decoImg} alt={deco.name} className="w-full h-full img-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl bg-cafe-100">
                      {deco.icon}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-cafe-800 font-medium text-sm">{deco.name}</span>
                    {owned && (
                      <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-green-200">
                        <CheckIcon /> x{owned.count}
                      </span>
                    )}
                    {!isUnlocked && <LockIcon />}
                  </div>
                  <p className="text-xs text-cafe-500 mt-0.5">{deco.description}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-cafe-500">
                    <span className="text-cafe-400 flex items-center gap-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2" strokeLinecap="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#C8A951" opacity="0.15" />
                      </svg>
                      +{deco.ambiencePoints} ambiente
                    </span>
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

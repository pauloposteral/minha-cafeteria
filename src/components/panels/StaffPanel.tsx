import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { BARISTA_NAMES, BARISTA_AVATARS } from '../../constants/names';
import { BALANCE } from '../../constants/balance';
import { formatMoney } from '../../utils/formatters';
import { randomFromArray, randomBetween, generateId } from '../../utils/random';
import type { Barista, BaristaRarity, DrinkCategory } from '../../types/game';
import { BARISTA_IMAGES, RARITY_BORDERS, RARITY_GLOWS, RARITY_BG_GRADIENTS } from '../../constants/assets';
import ProgressBar from '../shared/ProgressBar';
import Modal from '../shared/Modal';

const RARITY_CONFIG: Record<BaristaRarity, { label: string; color: string; speedRange: [number, number]; qualityRange: [number, number]; salaryRange: [number, number]; weight: number }> = {
  comum: { label: 'Comum', color: 'text-cafe-500', speedRange: [30, 50], qualityRange: [30, 50], salaryRange: [500, 800], weight: 50 },
  bom: { label: 'Bom', color: 'text-emerald-600', speedRange: [50, 70], qualityRange: [50, 70], salaryRange: [1000, 1800], weight: 30 },
  expert: { label: 'Expert', color: 'text-sky-600', speedRange: [70, 85], qualityRange: [70, 85], salaryRange: [3000, 6000], weight: 15 },
  mestre: { label: 'Mestre', color: 'text-amber-600', speedRange: [85, 95], qualityRange: [85, 95], salaryRange: [10000, 18000], weight: 4 },
  lenda: { label: 'Lenda', color: 'text-yellow-600', speedRange: [95, 100], qualityRange: [95, 100], salaryRange: [35000, 55000], weight: 1 },
};

const SPECIALTIES: DrinkCategory[] = ['espresso', 'leite', 'gelados', 'specialty'];

function FireIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0115-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 01-15 6.7L3 16" />
    </svg>
  );
}

function generateBarista(): Barista {
  const rarities = Object.entries(RARITY_CONFIG);
  const totalWeight = rarities.reduce((sum, [, cfg]) => sum + cfg.weight, 0);
  let roll = Math.random() * totalWeight;
  let rarity: BaristaRarity = 'comum';
  for (const [key, cfg] of rarities) {
    roll -= cfg.weight;
    if (roll <= 0) { rarity = key as BaristaRarity; break; }
  }

  const cfg = RARITY_CONFIG[rarity];
  const images = BARISTA_IMAGES[rarity] || [];
  return {
    id: generateId(),
    name: randomFromArray(BARISTA_NAMES),
    avatar: images.length > 0 ? randomFromArray(images) : randomFromArray(BARISTA_AVATARS),
    rarity,
    speed: randomBetween(cfg.speedRange[0], cfg.speedRange[1]),
    quality: randomBetween(cfg.qualityRange[0], cfg.qualityRange[1]),
    specialty: randomFromArray(SPECIALTIES),
    level: 1,
    xp: 0,
    salary: randomBetween(cfg.salaryRange[0], cfg.salaryRange[1]),
    status: 'idle',
  };
}

export default function StaffPanel() {
  const { state, dispatch } = useGame();
  const [showHireModal, setShowHireModal] = useState(false);
  const [candidates, setCandidates] = useState<Barista[]>([]);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());

  const openHire = () => {
    const newCandidates = [generateBarista(), generateBarista(), generateBarista()];
    setCandidates(newCandidates);
    setRevealedCards(new Set());
    setShowHireModal(true);
    setTimeout(() => {
      setRevealedCards(new Set(newCandidates.map(c => c.id)));
    }, 100);
  };

  const hireBarista = (barista: Barista) => {
    dispatch({ type: 'HIRE_BARISTA', barista });
    setShowHireModal(false);
  };

  const canHire = state.baristas.length < state.baristaSlots;

  const getBaristaImage = (barista: Barista) => {
    if (barista.avatar && barista.avatar.startsWith('http')) return barista.avatar;
    const images = BARISTA_IMAGES[barista.rarity] || [];
    return images[0] || null;
  };

  return (
    <div className="flex flex-col h-full bg-cafe-50">
      <div className="p-3 border-b border-cafe-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-cafe-800 font-bold font-display">Equipe</h2>
            <p className="text-xs text-cafe-500 mt-0.5">
              {state.baristas.length}/{state.baristaSlots} baristas
            </p>
          </div>
          {canHire && (
            <button
              onClick={openHire}
              className="flex items-center gap-1.5 px-3 py-2 bg-cafe-500 text-white rounded-lg text-xs font-bold hover:bg-cafe-600 transition-all active:scale-95"
            >
              <PlusIcon />
              Contratar
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {state.baristas.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-cafe-100 flex items-center justify-center opacity-50">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="1.5" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M8 3.5C8 2.7 9.8 1 12 1s4 1.7 4 2.5" fill="#D4A574" opacity="0.2" stroke="none" />
              </svg>
            </div>
            <p className="text-cafe-600 text-sm">Nenhum barista contratado</p>
            <p className="text-cafe-400 text-xs mt-1">Contrate baristas para preparar drinks mais rapido!</p>
            {canHire && (
              <button
                onClick={openHire}
                className="mt-4 px-4 py-2 bg-cafe-500 text-white rounded-lg text-xs font-bold hover:bg-cafe-600 transition-all"
              >
                Contratar Primeiro Barista
              </button>
            )}
          </div>
        )}

        {state.baristas.map(barista => {
          const cfg = RARITY_CONFIG[barista.rarity];
          const xpToNext = BALANCE.BARISTA_LEVEL_XP * barista.level;
          const borderClass = RARITY_BORDERS[barista.rarity] || 'border-cafe-200';
          const glowClass = RARITY_GLOWS[barista.rarity] || '';
          const bgGradient = RARITY_BG_GRADIENTS[barista.rarity] || 'from-white to-white';
          const imgSrc = getBaristaImage(barista);

          return (
            <div
              key={barista.id}
              className={`bg-gradient-to-r ${bgGradient} rounded-xl border-2 ${borderClass} p-3 ${glowClass ? `shadow-lg ${glowClass}` : 'shadow-sm'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 ${borderClass}`}>
                  {imgSrc ? (
                    <img src={imgSrc} alt={barista.name} className="w-full h-full img-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl bg-cafe-100">
                      {barista.avatar}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-cafe-800 font-medium text-sm">{barista.name}</span>
                    <span className={`text-[9px] font-bold ${cfg.color} bg-white/80 px-1.5 py-0.5 rounded-full border ${borderClass}`}>
                      {cfg.label}
                    </span>
                    <span className="text-[9px] text-cafe-400">Nv.{barista.level}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                    <div>
                      <span className="text-cafe-500">Velocidade</span>
                      <ProgressBar value={barista.speed} max={100} color="bg-sky-400" height="h-1" />
                    </div>
                    <div>
                      <span className="text-cafe-500">Qualidade</span>
                      <ProgressBar value={barista.quality} max={100} color="bg-cafe-300" height="h-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                        barista.status === 'working'
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'bg-cafe-100 text-cafe-500 border border-cafe-200'
                      }`}>
                        {barista.status === 'working' ? 'Trabalhando' : 'Livre'}
                      </span>
                      <span className="text-cafe-400 text-[10px]">
                        {barista.specialty}
                      </span>
                    </div>
                    <span className="text-[10px] text-cafe-500">{formatMoney(barista.salary)}/mes</span>
                  </div>

                  <div className="mt-1.5">
                    <div className="flex items-center justify-between text-[9px] text-cafe-400 mb-0.5">
                      <span>XP</span>
                      <span>{barista.xp}/{xpToNext}</span>
                    </div>
                    <ProgressBar value={barista.xp} max={xpToNext} color="bg-emerald-400" height="h-1" />
                  </div>
                </div>

                <button
                  onClick={() => dispatch({ type: 'FIRE_BARISTA', baristaId: barista.id })}
                  className="p-1.5 text-cafe-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Demitir"
                >
                  <FireIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={showHireModal} onClose={() => setShowHireModal(false)} title="Contratar Barista">
        <p className="text-xs text-cafe-500 mb-3">
          Escolha um candidato. Custo de contratacao: salario x10.
        </p>
        <div className="space-y-2">
          {candidates.map((candidate, idx) => {
            const cfg = RARITY_CONFIG[candidate.rarity];
            const hireCost = candidate.salary * 10;
            const canAfford = state.money >= hireCost;
            const borderClass = RARITY_BORDERS[candidate.rarity] || 'border-cafe-200';
            const bgGradient = RARITY_BG_GRADIENTS[candidate.rarity] || 'from-cafe-50 to-white';
            const isRevealed = revealedCards.has(candidate.id);
            const imgSrc = getBaristaImage(candidate);

            return (
              <div
                key={candidate.id}
                className={`bg-gradient-to-r ${bgGradient} rounded-xl border-2 ${borderClass} p-3 transition-all duration-500 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 ${borderClass}`}>
                    {imgSrc ? (
                      <img src={imgSrc} alt={candidate.name} className="w-full h-full img-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-cafe-100">
                        {candidate.avatar}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-cafe-800 font-medium text-sm">{candidate.name}</span>
                      <span className={`text-[9px] font-bold ${cfg.color} bg-white/80 px-1.5 py-0.5 rounded-full border ${borderClass}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-cafe-500">
                      <span>Vel: {candidate.speed}</span>
                      <span>Qual: {candidate.quality}</span>
                      <span>Espec: {candidate.specialty}</span>
                      <span>{formatMoney(candidate.salary)}/mes</span>
                    </div>
                  </div>
                  <button
                    onClick={() => hireBarista(candidate)}
                    disabled={!canAfford}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      canAfford
                        ? 'bg-cafe-500 text-white hover:bg-cafe-600 active:scale-95'
                        : 'bg-cafe-200 text-cafe-400 cursor-not-allowed'
                    }`}
                  >
                    {formatMoney(hireCost)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            const newCandidates = [generateBarista(), generateBarista(), generateBarista()];
            setCandidates(newCandidates);
            setRevealedCards(new Set());
            setTimeout(() => {
              setRevealedCards(new Set(newCandidates.map(c => c.id)));
            }, 100);
          }}
          className="w-full mt-3 py-2 text-xs text-cafe-500 hover:text-cafe-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <RefreshIcon />
          Novos candidatos
        </button>
      </Modal>
    </div>
  );
}

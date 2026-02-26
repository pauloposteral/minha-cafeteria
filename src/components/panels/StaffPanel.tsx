import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { BARISTA_NAMES, BARISTA_AVATARS } from '../../constants/names';
import { BALANCE } from '../../constants/balance';
import { formatMoney } from '../../utils/formatters';
import { randomFromArray, randomBetween, generateId } from '../../utils/random';
import type { Barista, BaristaRarity, DrinkCategory } from '../../types/game';
import ProgressBar from '../shared/ProgressBar';
import Modal from '../shared/Modal';

const RARITY_CONFIG: Record<BaristaRarity, { label: string; color: string; speedRange: [number, number]; qualityRange: [number, number]; salaryRange: [number, number]; weight: number }> = {
  comum: { label: 'Comum', color: 'text-stone-400', speedRange: [30, 50], qualityRange: [30, 50], salaryRange: [500, 800], weight: 50 },
  bom: { label: 'Bom', color: 'text-green-400', speedRange: [50, 70], qualityRange: [50, 70], salaryRange: [1000, 1800], weight: 30 },
  expert: { label: 'Expert', color: 'text-sky-400', speedRange: [70, 85], qualityRange: [70, 85], salaryRange: [3000, 6000], weight: 15 },
  mestre: { label: 'Mestre', color: 'text-amber-400', speedRange: [85, 95], qualityRange: [85, 95], salaryRange: [10000, 18000], weight: 4 },
  lenda: { label: 'Lenda', color: 'text-amber-300', speedRange: [95, 100], qualityRange: [95, 100], salaryRange: [35000, 55000], weight: 1 },
};

const SPECIALTIES: DrinkCategory[] = ['espresso', 'leite', 'gelados', 'specialty'];

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
  return {
    id: generateId(),
    name: randomFromArray(BARISTA_NAMES),
    avatar: randomFromArray(BARISTA_AVATARS),
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

  const openHire = () => {
    setCandidates([generateBarista(), generateBarista(), generateBarista()]);
    setShowHireModal(true);
  };

  const hireBarista = (barista: Barista) => {
    dispatch({ type: 'HIRE_BARISTA', barista });
    setShowHireModal(false);
  };

  const canHire = state.baristas.length < state.baristaSlots;

  return (
    <div className="flex flex-col h-full bg-stone-950">
      <div className="p-3 border-b border-stone-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-amber-100 font-bold">Equipe</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {state.baristas.length}/{state.baristaSlots} baristas
            </p>
          </div>
          {canHire && (
            <button
              onClick={openHire}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-600 text-stone-950 rounded-lg text-xs font-bold hover:bg-amber-500 transition-all active:scale-95"
            >
              <Plus size={14} />
              Contratar
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {state.baristas.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3 opacity-40">👨‍🍳</div>
            <p className="text-stone-500 text-sm">Nenhum barista contratado</p>
            <p className="text-stone-600 text-xs mt-1">Contrate baristas para preparar drinks mais rapido!</p>
            {canHire && (
              <button
                onClick={openHire}
                className="mt-4 px-4 py-2 bg-amber-600 text-stone-950 rounded-lg text-xs font-bold hover:bg-amber-500 transition-all"
              >
                Contratar Primeiro Barista
              </button>
            )}
          </div>
        )}

        {state.baristas.map(barista => {
          const cfg = RARITY_CONFIG[barista.rarity];
          const xpToNext = BALANCE.BARISTA_LEVEL_XP * barista.level;

          return (
            <div key={barista.id} className="bg-stone-800/60 rounded-xl border border-stone-700/30 p-3">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{barista.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-100 font-medium text-sm">{barista.name}</span>
                    <span className={`text-[9px] font-bold ${cfg.color}`}>{cfg.label}</span>
                    <span className="text-[9px] text-stone-500">Nv.{barista.level}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                    <div>
                      <span className="text-stone-500">Velocidade</span>
                      <ProgressBar value={barista.speed} max={100} color="bg-sky-500" height="h-1" />
                    </div>
                    <div>
                      <span className="text-stone-500">Qualidade</span>
                      <ProgressBar value={barista.quality} max={100} color="bg-amber-500" height="h-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                        barista.status === 'working'
                          ? 'bg-green-900/40 text-green-400'
                          : 'bg-stone-800 text-stone-500'
                      }`}>
                        {barista.status === 'working' ? 'Trabalhando' : 'Livre'}
                      </span>
                      <span className="text-stone-600">
                        Especialidade: {barista.specialty}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500">{formatMoney(barista.salary)}/mes</span>
                  </div>

                  <div className="mt-1.5">
                    <div className="flex items-center justify-between text-[9px] text-stone-500 mb-0.5">
                      <span>XP</span>
                      <span>{barista.xp}/{xpToNext}</span>
                    </div>
                    <ProgressBar value={barista.xp} max={xpToNext} color="bg-emerald-500" height="h-1" />
                  </div>
                </div>

                <button
                  onClick={() => dispatch({ type: 'FIRE_BARISTA', baristaId: barista.id })}
                  className="p-1.5 text-stone-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                  title="Demitir"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={showHireModal} onClose={() => setShowHireModal(false)} title="Contratar Barista">
        <p className="text-xs text-stone-400 mb-3">
          Escolha um candidato. Custo de contratacao: salario x10.
        </p>
        <div className="space-y-2">
          {candidates.map(candidate => {
            const cfg = RARITY_CONFIG[candidate.rarity];
            const hireCost = candidate.salary * 10;
            const canAfford = state.money >= hireCost;

            return (
              <div key={candidate.id} className="bg-stone-800/80 rounded-xl border border-stone-700/30 p-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{candidate.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-100 font-medium text-sm">{candidate.name}</span>
                      <span className={`text-[9px] font-bold ${cfg.color} bg-stone-900 px-1.5 py-0.5 rounded-full`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1.5 text-xs text-stone-400">
                      <span>Vel: {candidate.speed}</span>
                      <span>Qual: {candidate.quality}</span>
                      <span>Espec: {candidate.specialty}</span>
                      <span>Salario: {formatMoney(candidate.salary)}/mes</span>
                    </div>
                  </div>
                  <button
                    onClick={() => hireBarista(candidate)}
                    disabled={!canAfford}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      canAfford
                        ? 'bg-amber-600 text-stone-950 hover:bg-amber-500 active:scale-95'
                        : 'bg-stone-700 text-stone-500 cursor-not-allowed'
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
          onClick={() => setCandidates([generateBarista(), generateBarista(), generateBarista()])}
          className="w-full mt-3 py-2 text-xs text-stone-400 hover:text-amber-400 transition-colors"
        >
          Novos candidatos
        </button>
      </Modal>
    </div>
  );
}

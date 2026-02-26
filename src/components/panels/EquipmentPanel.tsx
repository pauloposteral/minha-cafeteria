import { Lock, ChevronUp, Check, Zap, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MACHINES, getMachineCost } from '../../constants/equipment';
import { formatMoney } from '../../utils/formatters';

export default function EquipmentPanel() {
  const { state, dispatch } = useGame();

  return (
    <div className="flex flex-col h-full bg-stone-950">
      <div className="p-3 border-b border-stone-800">
        <h2 className="text-amber-100 font-bold">Equipamentos</h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Maquinas habilitam novos drinks e aumentam eficiencia
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {MACHINES.map(machine => {
          const owned = state.machines.find(m => m.machineId === machine.id);
          const isUnlocked = state.level >= machine.unlockLevel;
          const isOwned = !!owned;
          const upgradeCost = owned ? getMachineCost(machine.cost, owned.level) : 0;
          const canUpgrade = owned && owned.level < machine.maxLevel && state.money >= upgradeCost;
          const canBuy = !isOwned && isUnlocked && state.money >= machine.cost;

          return (
            <div
              key={machine.id}
              className={`rounded-xl border p-3 transition-all ${
                !isUnlocked
                  ? 'bg-stone-900/30 border-stone-800/40 opacity-50'
                  : isOwned
                    ? 'bg-stone-800/60 border-amber-800/30'
                    : 'bg-stone-800/40 border-stone-700/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl w-10 h-10 flex items-center justify-center bg-stone-900/60 rounded-lg">
                  {machine.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-100 font-medium text-sm">{machine.name}</span>
                    {isOwned && (
                      <span className="text-[9px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Check size={8} /> Nv.{owned.level}
                      </span>
                    )}
                    {!isUnlocked && <Lock size={12} className="text-stone-500" />}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{machine.description}</p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-stone-500">
                    <span className="flex items-center gap-0.5">
                      <Zap size={10} className="text-amber-500" />
                      +{Math.round(machine.speedBonus * 100)}% velocidade
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Sparkles size={10} className="text-amber-500" />
                      +{Math.round(machine.qualityBonus * 100)}% qualidade
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                {!isUnlocked && (
                  <div className="text-xs text-stone-600">
                    Requer nivel {machine.unlockLevel}
                  </div>
                )}

                {isUnlocked && !isOwned && (
                  <button
                    onClick={() => dispatch({ type: 'BUY_MACHINE', machineId: machine.id })}
                    disabled={!canBuy}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      canBuy
                        ? 'bg-amber-600 text-stone-950 hover:bg-amber-500 active:scale-95'
                        : 'bg-stone-800 text-stone-600 cursor-not-allowed'
                    }`}
                  >
                    Comprar {formatMoney(machine.cost)}
                  </button>
                )}

                {isOwned && owned.level < machine.maxLevel && (
                  <button
                    onClick={() => dispatch({ type: 'UPGRADE_MACHINE', machineId: machine.id })}
                    disabled={!canUpgrade}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      canUpgrade
                        ? 'bg-amber-600/20 text-amber-400 border border-amber-700/50 hover:bg-amber-600/30 active:scale-95'
                        : 'bg-stone-800 text-stone-600 border border-stone-700/30 cursor-not-allowed'
                    }`}
                  >
                    <ChevronUp size={14} />
                    Upgrade Nv.{owned.level + 1} - {formatMoney(upgradeCost)}
                  </button>
                )}

                {isOwned && owned.level >= machine.maxLevel && (
                  <span className="text-xs text-amber-500 font-medium">Nivel Maximo!</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

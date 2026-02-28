import { useGame } from '../../context/GameContext';
import { MACHINES, getMachineCost } from '../../constants/equipment';
import { formatMoney } from '../../utils/formatters';
import { MACHINE_IMAGES, MACHINE_TIERS, getMachineTier } from '../../constants/assets';
import ProgressBar from '../shared/ProgressBar';

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#D4A574" opacity="0.2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2.5" strokeLinecap="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#D4A574" opacity="0.15" />
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

export default function EquipmentPanel() {
  const { state, dispatch } = useGame();

  return (
    <div className="flex flex-col h-full bg-cafe-50">
      <div className="p-3 border-b border-cafe-200">
        <h2 className="text-cafe-800 font-bold font-display">Equipamentos</h2>
        <p className="text-xs text-cafe-500 mt-0.5">
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
          const tier = getMachineTier(machine.cost);
          const tierInfo = MACHINE_TIERS[tier];
          const imgSrc = MACHINE_IMAGES[machine.id];

          return (
            <div
              key={machine.id}
              className={`rounded-xl border p-3 transition-all tier-stripe-${tier} ${
                !isUnlocked
                  ? 'bg-cafe-100/40 border-cafe-200/50 opacity-50'
                  : isOwned
                    ? 'bg-white border-cafe-300/50 shadow-sm'
                    : 'bg-white/60 border-cafe-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-cafe-200/50 relative ${
                  isOwned && owned.level >= 5 ? 'animate-glow-gold' : ''
                }`}>
                  {imgSrc ? (
                    <img src={imgSrc} alt={machine.name} className="w-full h-full img-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl bg-cafe-100">
                      {machine.icon}
                    </div>
                  )}
                  {isOwned && owned.level >= 5 && (
                    <div className="absolute inset-0 rounded-lg animate-glow-gold pointer-events-none" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-cafe-800 font-medium text-sm">{machine.name}</span>
                    {isOwned && (
                      <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-green-200">
                        Nv.{owned.level}
                      </span>
                    )}
                    {!isUnlocked && <LockIcon />}
                    <span className={`text-[8px] ${tierInfo.color} ${tierInfo.bg} px-1.5 py-0.5 rounded-full font-bold ml-auto`}>
                      {tierInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-cafe-500 mt-0.5 leading-relaxed">{machine.description}</p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-cafe-500">
                    <span className="flex items-center gap-1">
                      <SpeedIcon />
                      +{Math.round(machine.speedBonus * 100)}% vel
                    </span>
                    <span className="flex items-center gap-1">
                      <QualityIcon />
                      +{Math.round(machine.qualityBonus * 100)}% qual
                    </span>
                    <span className="text-cafe-400 text-[10px]">
                      {machine.capacity}x cap
                    </span>
                  </div>

                  {isOwned && owned.level < machine.maxLevel && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[9px] text-cafe-400 mb-0.5">
                        <span>Nivel</span>
                        <span>{owned.level}/{machine.maxLevel}</span>
                      </div>
                      <ProgressBar
                        value={owned.level}
                        max={machine.maxLevel}
                        color={`bg-gradient-to-r ${tier >= 4 ? 'from-sky-400 to-cyan-400' : tier >= 3 ? 'from-yellow-400 to-amber-400' : 'from-cafe-300 to-cafe-400'}`}
                        height="h-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                {!isUnlocked && (
                  <div className="text-xs text-cafe-400 flex items-center gap-1">
                    <LockIcon /> Requer nivel {machine.unlockLevel}
                  </div>
                )}

                {isUnlocked && !isOwned && (
                  <button
                    onClick={() => dispatch({ type: 'BUY_MACHINE', machineId: machine.id })}
                    disabled={!canBuy}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      canBuy
                        ? 'bg-cafe-500 text-white hover:bg-cafe-600 active:scale-95'
                        : 'bg-cafe-200 text-cafe-400 cursor-not-allowed'
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
                        ? 'bg-cafe-300/20 text-cafe-600 border border-cafe-300/50 hover:bg-cafe-300/30 active:scale-95'
                        : 'bg-cafe-200 text-cafe-400 border border-cafe-200 cursor-not-allowed'
                    }`}
                  >
                    <UpgradeIcon />
                    Nv.{owned.level + 1} - {formatMoney(upgradeCost)}
                  </button>
                )}

                {isOwned && owned.level >= machine.maxLevel && (
                  <span className="text-[10px] text-cafe-400 font-medium flex items-center gap-1">
                    <QualityIcon /> Nivel Maximo!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/formatters';
import { DRINK_RECIPES } from '../../constants/drinks';
import { MACHINES } from '../../constants/equipment';
import ProgressBar from '../shared/ProgressBar';

export default function CafeteriaView() {
  const { state, dispatch } = useGame();

  const handleCollect = () => {
    if (state.collectableEarnings > 0) {
      dispatch({ type: 'COLLECT_EARNINGS' });
    }
  };

  const beingServedCustomers = state.customers.filter(c => c.state === 'beingServed');

  const getMachineIcon = (machineId: string) => {
    const machine = MACHINES.find(m => m.id === machineId);
    return machine?.icon || '⚙️';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative overflow-hidden bg-[#FBF7F4]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EDE4]/50 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-4 left-6 text-6xl">☕</div>
          <div className="absolute top-20 right-8 text-4xl">🫘</div>
          <div className="absolute bottom-32 left-12 text-5xl">🌿</div>
        </div>

        <div className="relative p-4 space-y-3">
          <div className="bg-white/80 backdrop-blur rounded-xl p-3 border border-[#E8DDD0] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏪</span>
              <span className="text-[#3E2723] font-semibold text-sm">Balcao</span>
              <span className="ml-auto text-xs text-[#8B7B6B]">
                {state.baristas.length} barista{state.baristas.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {state.machines.map(om => (
                <div key={om.machineId} className="flex-shrink-0 bg-[#F5EDE4] rounded-lg p-2 text-center min-w-[60px] border border-[#E8DDD0]">
                  <div className="text-lg">{getMachineIcon(om.machineId)}</div>
                  <div className="text-[9px] text-[#8B7B6B] mt-0.5">Nv.{om.level}</div>
                </div>
              ))}
            </div>

            {state.baristas.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {state.baristas.map(b => (
                  <div
                    key={b.id}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      b.status === 'working'
                        ? 'bg-[#4CAF50]/10 text-[#2E7D32] border border-[#4CAF50]/30'
                        : 'bg-[#F5EDE4] text-[#8B7B6B] border border-[#E8DDD0]'
                    }`}
                  >
                    <span>{b.avatar}</span>
                    <span>{b.name.split(' ')[0]}</span>
                    {b.status === 'working' && (
                      <span className="animate-pulse">...</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {state.baristas.length === 0 && (
              <p className="text-[11px] text-[#B8A99A] mt-1 italic">
                Voce mesmo prepara os drinks (mais lento)
              </p>
            )}
          </div>

          {beingServedCustomers.length > 0 && (
            <div className="space-y-1.5">
              {beingServedCustomers.map(c => {
                const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
                return (
                  <div key={c.id} className="bg-[#D4A574]/10 backdrop-blur rounded-lg p-2 border border-[#D4A574]/25">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{c.emoji}</span>
                      <span className="text-xs text-[#3E2723]">{c.name}</span>
                      <span className="text-xs text-[#8B7B6B]">pediu {recipe?.icon} {recipe?.name}</span>
                    </div>
                    <ProgressBar
                      value={c.orderProgress}
                      max={100}
                      color="bg-[#D4A574]"
                      height="h-1.5"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-white/60 backdrop-blur rounded-xl p-3 border border-[#E8DDD0] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🪑</span>
              <span className="text-[#3E2723] font-medium text-sm">Salao</span>
              <span className="ml-auto text-xs text-[#8B7B6B]">
                {state.customers.length}/{state.maxSeats} lugares
              </span>
            </div>

            {state.customers.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-[#8B7B6B] text-sm">Aguardando clientes...</p>
                <p className="text-[#B8A99A] text-xs mt-1">Eles chegam a cada poucos segundos</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {state.customers.map(c => {
                  const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
                  return (
                    <div
                      key={c.id}
                      className={`relative bg-white/80 rounded-lg p-2 text-center border transition-all duration-300 ${
                        c.state === 'waiting'
                          ? c.patience / c.maxPatience < 0.3
                            ? 'border-[#E57373] animate-pulse'
                            : 'border-[#D4A574]/50'
                          : c.state === 'beingServed'
                            ? 'border-[#4CAF50]/50'
                            : c.state === 'drinking'
                              ? 'border-[#2E7D32]/50'
                              : 'border-[#E8DDD0]'
                      }`}
                    >
                      <div className="text-xl mb-0.5">{c.emoji}</div>
                      <div className="text-[9px] text-[#3E2723] truncate">{c.name}</div>
                      <div className="text-sm mt-0.5">{recipe?.icon}</div>
                      {c.state === 'waiting' && (
                        <div className="mt-1">
                          <div className="h-1 rounded-full bg-[#E8DDD0] overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                c.patience / c.maxPatience > 0.5 ? 'bg-[#4CAF50]' :
                                c.patience / c.maxPatience > 0.3 ? 'bg-[#FFC107]' : 'bg-[#E57373]'
                              }`}
                              style={{ width: `${(c.patience / c.maxPatience) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {c.state === 'beingServed' && (
                        <div className="text-[9px] text-[#4CAF50] mt-0.5">Preparando...</div>
                      )}
                      {c.state === 'drinking' && (
                        <div className="text-[9px] text-[#2E7D32] mt-0.5">Pagando!</div>
                      )}
                    </div>
                  );
                })}

                {Array.from({ length: Math.max(0, state.maxSeats - state.customers.length) }).slice(0, 4).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-[#F5EDE4]/50 rounded-lg p-2 text-center border border-[#E8DDD0]/50 border-dashed">
                    <div className="text-xl opacity-20">🪑</div>
                    <div className="text-[9px] text-[#B8A99A]">Livre</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.floatingTexts.map(ft => (
            <div
              key={ft.id}
              className="absolute pointer-events-none animate-float-up font-bold text-sm"
              style={{ left: `${ft.x}%`, top: `${ft.y}%`, color: ft.color }}
            >
              {ft.text}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-[#FBF7F4] border-t border-[#E8DDD0]">
        <button
          onClick={handleCollect}
          disabled={state.collectableEarnings <= 0}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
            state.collectableEarnings > 0
              ? 'bg-[#C8A951] text-[#3E2723] shadow-lg shadow-[#C8A951]/30 hover:shadow-[#C8A951]/50 active:scale-[0.98] animate-collect-pulse'
              : 'bg-[#E8DDD0] text-[#B8A99A] cursor-not-allowed'
          }`}
        >
          {state.collectableEarnings > 0
            ? `Coletar ${formatMoney(state.collectableEarnings)}`
            : 'Caixa vazio'}
        </button>
      </div>
    </div>
  );
}

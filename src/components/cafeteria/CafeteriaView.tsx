import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/formatters';
import { DRINK_RECIPES } from '../../constants/drinks';
import ProgressBar from '../shared/ProgressBar';

export default function CafeteriaView() {
  const { state, dispatch } = useGame();

  const handleCollect = () => {
    if (state.collectableEarnings > 0) {
      dispatch({ type: 'COLLECT_EARNINGS' });
    }
  };

  const beingServedCustomers = state.customers.filter(c => c.state === 'beingServed');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-6 text-6xl">☕</div>
          <div className="absolute top-20 right-8 text-4xl">🫘</div>
          <div className="absolute bottom-32 left-12 text-5xl">🌿</div>
        </div>

        <div className="relative p-4 space-y-3">
          <div className="bg-stone-800/60 backdrop-blur rounded-xl p-3 border border-stone-700/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏪</span>
              <span className="text-amber-200 font-semibold text-sm">Balcao</span>
              <span className="ml-auto text-xs text-stone-500">
                {state.baristas.length} barista{state.baristas.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {state.machines.map(om => (
                <div key={om.machineId} className="flex-shrink-0 bg-stone-900/80 rounded-lg p-2 text-center min-w-[60px] border border-stone-700/30">
                  <div className="text-lg">
                    {om.machineId === 'cafeteira-simples' ? '☕' :
                     om.machineId === 'espresso-basica' ? '☕' :
                     om.machineId === 'vaporizador' ? '🥛' :
                     om.machineId === 'cold-brew-tower' ? '🧊' : '⚙️'}
                  </div>
                  <div className="text-[9px] text-stone-500 mt-0.5">Nv.{om.level}</div>
                </div>
              ))}
            </div>

            {state.baristas.length > 0 && (
              <div className="flex gap-2 mt-2">
                {state.baristas.map(b => (
                  <div
                    key={b.id}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      b.status === 'working'
                        ? 'bg-green-900/40 text-green-400 border border-green-800/50'
                        : 'bg-stone-800 text-stone-400 border border-stone-700/50'
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
              <p className="text-[11px] text-stone-600 mt-1 italic">
                Voce mesmo prepara os drinks (mais lento)
              </p>
            )}
          </div>

          {beingServedCustomers.length > 0 && (
            <div className="space-y-1.5">
              {beingServedCustomers.map(c => {
                const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
                return (
                  <div key={c.id} className="bg-amber-900/20 backdrop-blur rounded-lg p-2 border border-amber-800/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{c.emoji}</span>
                      <span className="text-xs text-amber-200">{c.name}</span>
                      <span className="text-xs text-stone-400">pediu {recipe?.icon} {recipe?.name}</span>
                    </div>
                    <ProgressBar
                      value={c.orderProgress}
                      max={100}
                      color="bg-amber-500"
                      height="h-1.5"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-stone-800/40 backdrop-blur rounded-xl p-3 border border-stone-700/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🪑</span>
              <span className="text-amber-200/80 font-medium text-sm">Salao</span>
              <span className="ml-auto text-xs text-stone-500">
                {state.customers.length}/{state.maxSeats} lugares
              </span>
            </div>

            {state.customers.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-stone-600 text-sm">Aguardando clientes...</p>
                <p className="text-stone-700 text-xs mt-1">Eles chegam a cada poucos segundos</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {state.customers.map(c => {
                  const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
                  return (
                    <div
                      key={c.id}
                      className={`relative bg-stone-900/60 rounded-lg p-2 text-center border transition-all duration-300 ${
                        c.state === 'waiting'
                          ? c.patience / c.maxPatience < 0.3
                            ? 'border-red-800/50 animate-pulse'
                            : 'border-amber-800/30'
                          : c.state === 'beingServed'
                            ? 'border-green-800/50'
                            : c.state === 'drinking'
                              ? 'border-emerald-800/50'
                              : 'border-stone-700/30'
                      }`}
                    >
                      <div className="text-xl mb-0.5">{c.emoji}</div>
                      <div className="text-[9px] text-stone-500 truncate">{c.name}</div>
                      <div className="text-sm mt-0.5">{recipe?.icon}</div>
                      {c.state === 'waiting' && (
                        <div className="mt-1">
                          <div className="h-1 rounded-full bg-stone-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                c.patience / c.maxPatience > 0.5 ? 'bg-green-500' :
                                c.patience / c.maxPatience > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${(c.patience / c.maxPatience) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {c.state === 'beingServed' && (
                        <div className="text-[9px] text-green-400 mt-0.5">Preparando...</div>
                      )}
                      {c.state === 'drinking' && (
                        <div className="text-[9px] text-emerald-400 mt-0.5">Pagando!</div>
                      )}
                    </div>
                  );
                })}

                {Array.from({ length: Math.max(0, state.maxSeats - state.customers.length) }).slice(0, 4).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-stone-900/20 rounded-lg p-2 text-center border border-stone-800/20 border-dashed">
                    <div className="text-xl opacity-20">🪑</div>
                    <div className="text-[9px] text-stone-700">Livre</div>
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

      <div className="p-3 bg-stone-950 border-t border-stone-800">
        <button
          onClick={handleCollect}
          disabled={state.collectableEarnings <= 0}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
            state.collectableEarnings > 0
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98] animate-collect-pulse'
              : 'bg-stone-800 text-stone-600 cursor-not-allowed'
          }`}
        >
          {state.collectableEarnings > 0
            ? `💰 Coletar ${formatMoney(state.collectableEarnings)}`
            : '💰 Caixa vazio'}
        </button>
      </div>
    </div>
  );
}

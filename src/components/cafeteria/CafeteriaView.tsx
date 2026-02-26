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
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-cafe-50 via-cafe-50 to-cafe-100">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-4 left-6 text-6xl">☕</div>
          <div className="absolute top-20 right-8 text-4xl">🫘</div>
          <div className="absolute bottom-32 left-12 text-5xl">🌿</div>
        </div>

        <div className="relative p-4 space-y-3">
          <div className="bg-white/80 backdrop-blur rounded-xl p-3 border border-cafe-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏪</span>
              <span className="text-cafe-800 font-semibold text-sm">Balcao</span>
              <span className="ml-auto text-xs text-cafe-500">
                {state.baristas.length} barista{state.baristas.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {state.machines.map(om => (
                <div key={om.machineId} className="flex-shrink-0 bg-cafe-100 rounded-lg p-2 text-center min-w-[60px] border border-cafe-200">
                  <div className="text-lg">
                    {om.machineId === 'cafeteira-simples' ? '☕' :
                     om.machineId === 'espresso-basica' ? '☕' :
                     om.machineId === 'vaporizador' ? '🥛' :
                     om.machineId === 'cold-brew-tower' ? '🧊' : '⚙️'}
                  </div>
                  <div className="text-[9px] text-cafe-500 mt-0.5">Nv.{om.level}</div>
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
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-cafe-100 text-cafe-600 border border-cafe-200'
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
              <p className="text-[11px] text-cafe-500 mt-1 italic">
                Voce mesmo prepara os drinks (mais lento)
              </p>
            )}
          </div>

          {beingServedCustomers.length > 0 && (
            <div className="space-y-1.5">
              {beingServedCustomers.map(c => {
                const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
                return (
                  <div key={c.id} className="bg-cafe-300/15 backdrop-blur rounded-lg p-2 border border-cafe-300/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{c.emoji}</span>
                      <span className="text-xs text-cafe-800">{c.name}</span>
                      <span className="text-xs text-cafe-500">pediu {recipe?.icon} {recipe?.name}</span>
                    </div>
                    <ProgressBar
                      value={c.orderProgress}
                      max={100}
                      color="bg-cafe-300"
                      height="h-1.5"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-white/60 backdrop-blur rounded-xl p-3 border border-cafe-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🪑</span>
              <span className="text-cafe-700 font-medium text-sm">Salao</span>
              <span className="ml-auto text-xs text-cafe-500">
                {state.customers.length}/{state.maxSeats} lugares
              </span>
            </div>

            {state.customers.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-cafe-500 text-sm">Aguardando clientes...</p>
                <p className="text-cafe-400 text-xs mt-1">Eles chegam a cada poucos segundos</p>
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
                            ? 'border-red-300 animate-pulse'
                            : 'border-cafe-300/50'
                          : c.state === 'beingServed'
                            ? 'border-green-300'
                            : c.state === 'drinking'
                              ? 'border-emerald-300'
                              : 'border-cafe-200'
                      }`}
                    >
                      <div className="text-xl mb-0.5">{c.emoji}</div>
                      <div className="text-[9px] text-cafe-600 truncate">{c.name}</div>
                      <div className="text-sm mt-0.5">{recipe?.icon}</div>
                      {c.state === 'waiting' && (
                        <div className="mt-1">
                          <div className="h-1 rounded-full bg-cafe-200 overflow-hidden">
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
                        <div className="text-[9px] text-green-600 mt-0.5">Preparando...</div>
                      )}
                      {c.state === 'drinking' && (
                        <div className="text-[9px] text-emerald-600 mt-0.5">Pagando!</div>
                      )}
                    </div>
                  );
                })}

                {Array.from({ length: Math.max(0, state.maxSeats - state.customers.length) }).slice(0, 4).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-cafe-100/50 rounded-lg p-2 text-center border border-cafe-200/50 border-dashed">
                    <div className="text-xl opacity-20">🪑</div>
                    <div className="text-[9px] text-cafe-400">Livre</div>
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

      <div className="p-3 bg-cafe-50 border-t border-cafe-200">
        <button
          onClick={handleCollect}
          disabled={state.collectableEarnings <= 0}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
            state.collectableEarnings > 0
              ? 'bg-gradient-to-r from-cafe-500 to-cafe-600 text-white shadow-lg shadow-cafe-500/20 hover:shadow-cafe-500/40 active:scale-[0.98] animate-collect-pulse'
              : 'bg-cafe-200 text-cafe-400 cursor-not-allowed'
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

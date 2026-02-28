import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/formatters';
import { DRINK_RECIPES } from '../../constants/drinks';
import { MACHINES } from '../../constants/equipment';
import { BACKGROUNDS, MACHINE_IMAGES, CUSTOMER_IMAGES, DRINK_IMAGES } from '../../constants/assets';
import ProgressBar from '../shared/ProgressBar';

function BalcaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="10" width="20" height="8" rx="1" />
      <rect x="4" y="6" width="16" height="4" rx="1" fill="#F5EDE4" />
      <line x1="8" y1="10" x2="8" y2="18" opacity="0.3" />
      <line x1="16" y1="10" x2="16" y2="18" opacity="0.3" />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 12V6a2 2 0 012-2h10a2 2 0 012 2v6" />
      <rect x="3" y="12" width="18" height="4" rx="1" fill="#F5EDE4" stroke="#D4A574" />
      <line x1="6" y1="16" x2="6" y2="20" />
      <line x1="18" y1="16" x2="18" y2="20" />
    </svg>
  );
}

function CoinStack() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="18" rx="8" ry="3" fill="#C8A951" stroke="#B8952F" strokeWidth="1" />
      <ellipse cx="12" cy="14" rx="8" ry="3" fill="#D4B95F" stroke="#B8952F" strokeWidth="1" />
      <ellipse cx="12" cy="10" rx="8" ry="3" fill="#E0C96D" stroke="#B8952F" strokeWidth="1" />
    </svg>
  );
}

export default function CafeteriaView() {
  const { state, dispatch } = useGame();

  const handleCollect = () => {
    if (state.collectableEarnings > 0) {
      dispatch({ type: 'COLLECT_EARNINGS' });
    }
  };

  const beingServedCustomers = state.customers.filter(c => c.state === 'beingServed');

  const getMachineName = (machineId: string) => {
    const machine = MACHINES.find(m => m.id === machineId);
    return machine?.name || machineId;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative overflow-hidden overflow-y-auto custom-scrollbar">
        <div className="absolute inset-0 z-0">
          <img
            src={state.customers.length > 0 ? BACKGROUNDS.cafeteria : BACKGROUNDS.cafeteriaEmpty}
            alt=""
            className="w-full h-full img-cover opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7F4]/95 via-[#FBF7F4]/85 to-[#FBF7F4]/95" />
        </div>
        <div className="absolute inset-0 cafe-bg-pattern pointer-events-none z-0" />

        <div className="relative z-10 p-4 space-y-3">
          <div className="bg-white/85 backdrop-blur-sm rounded-xl p-3 border border-[#E8DDD0] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BalcaoIcon />
              <span className="text-[#3E2723] font-semibold text-sm">Balcao</span>
              <span className="ml-auto text-xs text-[#8B7B6B]">
                {state.baristas.length} barista{state.baristas.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {state.machines.map(om => {
                const imgSrc = MACHINE_IMAGES[om.machineId];
                return (
                  <div key={om.machineId} className="flex-shrink-0 bg-[#F5EDE4] rounded-lg p-1.5 text-center min-w-[64px] border border-[#E8DDD0] relative overflow-hidden">
                    <div className="w-10 h-10 mx-auto rounded-md overflow-hidden mb-0.5">
                      <img src={imgSrc} alt={getMachineName(om.machineId)} className="w-full h-full img-cover" />
                    </div>
                    <div className="text-[9px] text-[#8B7B6B] font-medium">Nv.{om.level}</div>
                    {om.level >= 5 && <div className="absolute inset-0 rounded-lg animate-glow-gold pointer-events-none" />}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[#D4A574] opacity-60 animate-steam pointer-events-none">~</div>
                  </div>
                );
              })}
            </div>

            {state.baristas.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {state.baristas.map(b => (
                  <div
                    key={b.id}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                      b.status === 'working'
                        ? 'bg-[#4CAF50]/10 text-[#2E7D32] border border-[#4CAF50]/30'
                        : 'bg-[#F5EDE4] text-[#8B7B6B] border border-[#E8DDD0]'
                    }`}
                  >
                    <span className="text-sm">{b.avatar}</span>
                    <span>{b.name.split(' ')[0]}</span>
                    {b.status === 'working' && (
                      <span className="flex gap-0.5">
                        <span className="w-1 h-1 bg-[#4CAF50] rounded-full animate-pulse" />
                        <span className="w-1 h-1 bg-[#4CAF50] rounded-full animate-pulse [animation-delay:200ms]" />
                        <span className="w-1 h-1 bg-[#4CAF50] rounded-full animate-pulse [animation-delay:400ms]" />
                      </span>
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
                const drinkImg = recipe ? DRINK_IMAGES[recipe.id] : null;
                return (
                  <div key={c.id} className="bg-[#D4A574]/10 backdrop-blur-sm rounded-lg p-2 border border-[#D4A574]/25 animate-slide-in-left">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D4A574]/30 flex-shrink-0">
                        <img src={CUSTOMER_IMAGES[c.type] || CUSTOMER_IMAGES.regular} alt="" className="w-full h-full img-cover" />
                      </div>
                      <span className="text-xs text-[#3E2723] font-medium">{c.name}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        {drinkImg && (
                          <div className="w-5 h-5 rounded overflow-hidden">
                            <img src={drinkImg} alt="" className="w-full h-full img-cover" />
                          </div>
                        )}
                        <span className="text-[10px] text-[#8B7B6B]">{recipe?.name}</span>
                      </div>
                    </div>
                    <ProgressBar value={c.orderProgress} max={100} color="bg-[#D4A574]" height="h-1.5" shimmer />
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-white/65 backdrop-blur-sm rounded-xl p-3 border border-[#E8DDD0] shadow-sm wood-pattern">
            <div className="flex items-center gap-2 mb-2">
              <SeatIcon />
              <span className="text-[#3E2723] font-medium text-sm">Salao</span>
              <span className="ml-auto text-xs text-[#8B7B6B]">
                {state.customers.length}/{state.maxSeats} lugares
              </span>
            </div>

            {state.customers.length === 0 ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-cafe-100 flex items-center justify-center opacity-40">
                  <SeatIcon />
                </div>
                <p className="text-[#8B7B6B] text-sm">Aguardando clientes...</p>
                <p className="text-[#B8A99A] text-xs mt-1">Eles chegam a cada poucos segundos</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {state.customers.map(c => {
                  const recipe = DRINK_RECIPES.find(r => r.id === c.preferredDrink);
                  const drinkImg = recipe ? DRINK_IMAGES[recipe.id] : null;
                  const patienceRatio = c.patience / c.maxPatience;
                  return (
                    <div
                      key={c.id}
                      className={`relative bg-white/90 rounded-lg p-1.5 text-center border transition-all duration-300 animate-slide-in-left ${
                        c.state === 'waiting'
                          ? patienceRatio < 0.3
                            ? 'border-[#E57373] shadow-sm shadow-red-200/50'
                            : 'border-[#D4A574]/50'
                          : c.state === 'beingServed'
                            ? 'border-[#4CAF50]/50 shadow-sm shadow-green-200/50'
                            : c.state === 'drinking'
                              ? 'border-[#2E7D32]/50'
                              : 'border-[#E8DDD0]'
                      }`}
                    >
                      <div className="w-8 h-8 mx-auto rounded-full overflow-hidden border border-cafe-200 mb-0.5">
                        <img src={CUSTOMER_IMAGES[c.type] || CUSTOMER_IMAGES.regular} alt="" className="w-full h-full img-cover" />
                      </div>
                      <div className="text-[8px] text-[#3E2723] truncate font-medium">{c.name}</div>

                      {recipe && (
                        <div className="relative mt-0.5">
                          <div className="w-5 h-5 mx-auto rounded overflow-hidden">
                            {drinkImg ? (
                              <img src={drinkImg} alt="" className="w-full h-full img-cover" />
                            ) : (
                              <span className="text-xs">{recipe.icon}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {c.state === 'waiting' && (
                        <div className="mt-1">
                          <div className="h-1 rounded-full bg-[#E8DDD0] overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                patienceRatio > 0.5 ? 'bg-[#4CAF50]' :
                                patienceRatio > 0.3 ? 'bg-[#FFC107]' : 'bg-[#E57373]'
                              }`}
                              style={{ width: `${patienceRatio * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {c.state === 'beingServed' && (
                        <div className="text-[8px] text-[#4CAF50] mt-0.5 flex items-center justify-center gap-0.5">
                          <span className="w-1 h-1 bg-[#4CAF50] rounded-full animate-pulse" />
                          Preparando
                        </div>
                      )}
                      {c.state === 'drinking' && (
                        <div className="text-[8px] text-[#2E7D32] mt-0.5 font-bold">Pagando!</div>
                      )}
                    </div>
                  );
                })}

                {Array.from({ length: Math.max(0, state.maxSeats - state.customers.length) }).slice(0, 4).map((_, i) => (
                  <div key={`empty-${i}`} className="bg-[#F5EDE4]/40 rounded-lg p-1.5 text-center border border-[#E8DDD0]/50 border-dashed flex flex-col items-center justify-center min-h-[80px]">
                    <div className="opacity-15">
                      <SeatIcon />
                    </div>
                    <div className="text-[8px] text-[#B8A99A] mt-0.5">Livre</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.floatingTexts.map(ft => (
            <div
              key={ft.id}
              className="absolute pointer-events-none animate-float-up font-bold text-sm drop-shadow-sm"
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
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            state.collectableEarnings > 0
              ? 'bg-gradient-to-r from-[#C8A951] to-[#D4B95F] text-[#3E2723] shadow-lg shadow-[#C8A951]/30 hover:shadow-[#C8A951]/50 active:scale-[0.98] animate-collect-pulse'
              : 'bg-[#E8DDD0] text-[#B8A99A] cursor-not-allowed'
          }`}
        >
          {state.collectableEarnings > 0 && <CoinStack />}
          {state.collectableEarnings > 0
            ? `Coletar ${formatMoney(state.collectableEarnings)}`
            : 'Caixa vazio'}
        </button>
      </div>
    </div>
  );
}

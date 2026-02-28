import { useGame } from '../../context/GameContext';
import { formatMoney, formatDuration, formatNumber } from '../../utils/formatters';
import { BACKGROUNDS } from '../../constants/assets';

function CoinStack() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="18" rx="8" ry="3" fill="#C8A951" stroke="#B8952F" strokeWidth="1" />
      <ellipse cx="12" cy="14" rx="8" ry="3" fill="#D4B95F" stroke="#B8952F" strokeWidth="1" />
      <ellipse cx="12" cy="10" rx="8" ry="3" fill="#E0C96D" stroke="#B8952F" strokeWidth="1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" fill="#D4A574" opacity="0.1" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    </svg>
  );
}

export default function OfflineEarningsModal() {
  const { state, dispatch } = useGame();

  if (state.offlineEarnings === null || state.offlineEarnings <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-white border border-[#E8DDD0] rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        <div className="relative p-6 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={BACKGROUNDS.sunrise} alt="" className="w-full h-full img-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5EDE4]/90 to-white/95" />
          <div className="relative">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3">
              <path d="M18 8h1a4 4 0 010 8h-1" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" fill="#D4A574" opacity="0.3" stroke="#8B4513" strokeWidth="1.5" />
              <path d="M6 1v3M10 1v3M14 1v3" stroke="#C8A951" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            </svg>
            <h2 className="text-xl font-bold text-[#3E2723] font-display">Bem-vindo de volta!</h2>
            <p className="text-sm text-[#8B7B6B] mt-1">Enquanto voce estava fora...</p>
          </div>
        </div>

        <div className="px-6 pb-4 space-y-3">
          {state.offlineTime && (
            <div className="flex items-center gap-3 text-sm">
              <ClockIcon />
              <span className="text-[#8B7B6B]">Tempo ausente:</span>
              <span className="ml-auto text-[#3E2723] font-mono">{formatDuration(state.offlineTime)}</span>
            </div>
          )}

          {state.offlineDrinksServed && (
            <div className="flex items-center gap-3 text-sm">
              <CupIcon />
              <span className="text-[#8B7B6B]">Drinks servidos:</span>
              <span className="ml-auto text-[#3E2723] font-mono">{formatNumber(state.offlineDrinksServed)}</span>
            </div>
          )}

          {state.offlineCustomersServed && (
            <div className="flex items-center gap-3 text-sm">
              <PeopleIcon />
              <span className="text-[#8B7B6B]">Clientes atendidos:</span>
              <span className="ml-auto text-[#3E2723] font-mono">{formatNumber(state.offlineCustomersServed)}</span>
            </div>
          )}

          <div className="bg-[#F5EDE4] rounded-xl p-4 border border-[#E8DDD0] text-center mt-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CoinStack />
              <span className="text-2xl font-bold text-[#2E7D32] font-mono animate-money-shimmer">
                {formatMoney(state.offlineEarnings)}
              </span>
            </div>
            <p className="text-xs text-[#8B7B6B]">Lucro acumulado</p>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => dispatch({ type: 'DISMISS_OFFLINE' })}
            className="w-full py-3.5 bg-gradient-to-r from-[#C8A951] to-[#D4B95F] text-[#3E2723] rounded-xl font-bold text-sm hover:from-[#b89940] hover:to-[#c4a94f] transition-all active:scale-[0.98] shadow-lg shadow-[#C8A951]/30"
          >
            Coletar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}

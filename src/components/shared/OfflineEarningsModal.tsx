import { Coins, Coffee, Users, Clock } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { formatMoney, formatDuration, formatNumber } from '../../utils/formatters';

export default function OfflineEarningsModal() {
  const { state, dispatch } = useGame();

  if (state.offlineEarnings === null || state.offlineEarnings <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-white border border-[#E8DDD0] rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        <div className="bg-gradient-to-b from-[#F5EDE4] to-transparent p-6 text-center">
          <div className="text-5xl mb-3">☕</div>
          <h2 className="text-xl font-bold text-[#3E2723] font-display">Bem-vindo de volta!</h2>
          <p className="text-sm text-[#8B7B6B] mt-1">Enquanto voce estava fora...</p>
        </div>

        <div className="px-6 pb-4 space-y-3">
          {state.offlineTime && (
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-[#8B7B6B]" />
              <span className="text-[#8B7B6B]">Tempo ausente:</span>
              <span className="ml-auto text-[#3E2723] font-mono">{formatDuration(state.offlineTime)}</span>
            </div>
          )}

          {state.offlineDrinksServed && (
            <div className="flex items-center gap-3 text-sm">
              <Coffee size={16} className="text-[#8B7B6B]" />
              <span className="text-[#8B7B6B]">Drinks servidos:</span>
              <span className="ml-auto text-[#3E2723] font-mono">{formatNumber(state.offlineDrinksServed)}</span>
            </div>
          )}

          {state.offlineCustomersServed && (
            <div className="flex items-center gap-3 text-sm">
              <Users size={16} className="text-[#8B7B6B]" />
              <span className="text-[#8B7B6B]">Clientes atendidos:</span>
              <span className="ml-auto text-[#3E2723] font-mono">{formatNumber(state.offlineCustomersServed)}</span>
            </div>
          )}

          <div className="bg-[#F5EDE4] rounded-xl p-4 border border-[#E8DDD0] text-center mt-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Coins size={20} className="text-[#C8A951]" />
              <span className="text-2xl font-bold text-[#2E7D32] font-mono">
                {formatMoney(state.offlineEarnings)}
              </span>
            </div>
            <p className="text-xs text-[#8B7B6B]">Lucro acumulado</p>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => dispatch({ type: 'DISMISS_OFFLINE' })}
            className="w-full py-3.5 bg-[#C8A951] text-[#3E2723] rounded-xl font-bold text-sm hover:bg-[#b89940] transition-all active:scale-[0.98] shadow-lg shadow-[#C8A951]/30"
          >
            Coletar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}

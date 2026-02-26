import { Coins, Coffee, Users, Clock } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { formatMoney, formatDuration, formatNumber } from '../../utils/formatters';

export default function OfflineEarningsModal() {
  const { state, dispatch } = useGame();

  if (state.offlineEarnings === null || state.offlineEarnings <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-white border border-cafe-200 rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        <div className="bg-gradient-to-b from-cafe-100 to-transparent p-6 text-center">
          <div className="text-5xl mb-3">☕</div>
          <h2 className="text-xl font-bold text-cafe-800 font-display">Bem-vindo de volta!</h2>
          <p className="text-sm text-cafe-500 mt-1">Enquanto voce estava fora...</p>
        </div>

        <div className="px-6 pb-4 space-y-3">
          {state.offlineTime && (
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-cafe-400" />
              <span className="text-cafe-500">Tempo ausente:</span>
              <span className="ml-auto text-cafe-700 font-mono">{formatDuration(state.offlineTime)}</span>
            </div>
          )}

          {state.offlineDrinksServed && (
            <div className="flex items-center gap-3 text-sm">
              <Coffee size={16} className="text-cafe-400" />
              <span className="text-cafe-500">Drinks servidos:</span>
              <span className="ml-auto text-cafe-700 font-mono">{formatNumber(state.offlineDrinksServed)}</span>
            </div>
          )}

          {state.offlineCustomersServed && (
            <div className="flex items-center gap-3 text-sm">
              <Users size={16} className="text-cafe-400" />
              <span className="text-cafe-500">Clientes atendidos:</span>
              <span className="ml-auto text-cafe-700 font-mono">{formatNumber(state.offlineCustomersServed)}</span>
            </div>
          )}

          <div className="bg-cafe-100 rounded-xl p-4 border border-cafe-200 text-center mt-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Coins size={20} className="text-cafe-400" />
              <span className="text-2xl font-bold text-cafe-700 font-mono">
                {formatMoney(state.offlineEarnings)}
              </span>
            </div>
            <p className="text-xs text-cafe-500">Lucro acumulado</p>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => dispatch({ type: 'DISMISS_OFFLINE' })}
            className="w-full py-3.5 bg-gradient-to-r from-cafe-500 to-cafe-600 text-white rounded-xl font-bold text-sm hover:from-cafe-600 hover:to-cafe-700 transition-all active:scale-[0.98] shadow-lg shadow-cafe-500/20"
          >
            Coletar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}

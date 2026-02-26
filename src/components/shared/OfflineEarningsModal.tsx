import { Coins, Coffee, Users, Clock } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { formatMoney, formatDuration, formatNumber } from '../../utils/formatters';

export default function OfflineEarningsModal() {
  const { state, dispatch } = useGame();

  if (state.offlineEarnings === null || state.offlineEarnings <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-stone-900 border border-amber-800/40 rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        <div className="bg-gradient-to-b from-amber-900/30 to-transparent p-6 text-center">
          <div className="text-5xl mb-3">☕</div>
          <h2 className="text-xl font-bold text-amber-100">Bem-vindo de volta!</h2>
          <p className="text-sm text-stone-400 mt-1">Enquanto voce estava fora...</p>
        </div>

        <div className="px-6 pb-4 space-y-3">
          {state.offlineTime && (
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-stone-500" />
              <span className="text-stone-400">Tempo ausente:</span>
              <span className="ml-auto text-amber-200 font-mono">{formatDuration(state.offlineTime)}</span>
            </div>
          )}

          {state.offlineDrinksServed && (
            <div className="flex items-center gap-3 text-sm">
              <Coffee size={16} className="text-stone-500" />
              <span className="text-stone-400">Drinks servidos:</span>
              <span className="ml-auto text-amber-200 font-mono">{formatNumber(state.offlineDrinksServed)}</span>
            </div>
          )}

          {state.offlineCustomersServed && (
            <div className="flex items-center gap-3 text-sm">
              <Users size={16} className="text-stone-500" />
              <span className="text-stone-400">Clientes atendidos:</span>
              <span className="ml-auto text-amber-200 font-mono">{formatNumber(state.offlineCustomersServed)}</span>
            </div>
          )}

          <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-800/30 text-center mt-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Coins size={20} className="text-amber-400" />
              <span className="text-2xl font-bold text-amber-300 font-mono">
                {formatMoney(state.offlineEarnings)}
              </span>
            </div>
            <p className="text-xs text-stone-400">Lucro acumulado</p>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => dispatch({ type: 'DISMISS_OFFLINE' })}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 rounded-xl font-bold text-sm hover:from-amber-500 hover:to-amber-400 transition-all active:scale-[0.98] shadow-lg shadow-amber-500/20"
          >
            Coletar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}

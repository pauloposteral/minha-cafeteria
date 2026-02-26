import { Coins, Star, Trophy, Users } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/formatters';
import ProgressBar from '../shared/ProgressBar';

export default function TopHUD() {
  const { state } = useGame();

  return (
    <div className="bg-stone-950/95 backdrop-blur-md border-b border-stone-800 px-4 py-2 safe-top">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">☕</span>
          <span className="text-amber-100 font-bold text-sm tracking-wide">Minha Cafeteria</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Coins size={14} className="text-amber-400" />
            <span className="text-amber-300 font-mono text-sm font-bold tabular-nums">
              {formatMoney(state.money)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <Trophy size={12} className="text-amber-500" />
          <span className="text-stone-300">Nv.{state.level}</span>
        </div>

        <div className="flex-1 max-w-[120px]">
          <ProgressBar value={state.xp} max={state.xpToNextLevel} height="h-1.5" />
        </div>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < state.reputationStars ? 'text-amber-400 fill-amber-400' : 'text-stone-700'}
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Users size={12} className="text-stone-400" />
          <span className="text-stone-400">{state.customers.length}</span>
        </div>

        <div className="text-stone-500 ml-auto">
          {formatMoney(state.collectableEarnings)}/caixa
        </div>
      </div>
    </div>
  );
}

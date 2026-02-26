import { Coins, Star, Trophy, Users } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/formatters';
import ProgressBar from '../shared/ProgressBar';

export default function TopHUD() {
  const { state } = useGame();

  return (
    <div className="bg-[#2a1814] backdrop-blur-md border-b border-[#3d2a1f] px-4 py-2 safe-top">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">☕</span>
          <span className="text-[#F5EDE4] font-bold text-sm tracking-wide font-display">MINHA CAF&#201;RIA</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Coins size={14} className="text-[#C8A951]" />
            <span className="text-[#2E7D32] font-mono text-sm font-bold tabular-nums">
              {formatMoney(state.money)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <Trophy size={12} className="text-[#D4A574]" />
          <span className="text-[#F5EDE4]">Nv.{state.level}</span>
        </div>

        <div className="flex-1 max-w-[120px]">
          <ProgressBar value={state.xp} max={state.xpToNextLevel} height="h-1.5" color="bg-[#D4A574]" bgColor="bg-[#3d2a1f]" />
        </div>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < state.reputationStars ? 'text-[#C8A951] fill-[#C8A951]' : 'text-[#3d2a1f]'}
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Users size={12} className="text-[#F5EDE4]/60" />
          <span className="text-[#F5EDE4]/60">{state.customers.length}</span>
        </div>

        <div className="text-[#D4A574]/60 ml-auto">
          {formatMoney(state.collectableEarnings)}/caixa
        </div>
      </div>
    </div>
  );
}

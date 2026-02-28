import { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/formatters';
import ProgressBar from '../shared/ProgressBar';
import StarRating from '../shared/StarRating';

function CoinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#C8A951" stroke="#B8952F" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7" stroke="#B8952F" strokeWidth="0.5" opacity="0.5" />
      <text x="12" y="16" textAnchor="middle" fill="#6B3410" fontSize="10" fontWeight="bold" fontFamily="serif">R</text>
    </svg>
  );
}

function LevelBadge({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1 bg-[#C8A951]/20 rounded-full px-2 py-0.5 border border-[#C8A951]/30">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" fill="#C8A951" stroke="#B8952F" strokeWidth="1" />
      </svg>
      <span className="text-[#F5EDE4] font-bold text-[10px]">Nv.{level}</span>
    </div>
  );
}

function CustomerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );
}

function XpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="12" rx="6" fill="#D4A574" stroke="#B8952F" strokeWidth="1" />
      <text x="12" y="15" textAnchor="middle" fill="#4A250C" fontSize="8" fontWeight="bold" fontFamily="sans-serif">XP</text>
    </svg>
  );
}

export default function TopHUD() {
  const { state } = useGame();
  const [moneyChanged, setMoneyChanged] = useState(false);
  const prevMoneyRef = useRef(state.money);

  useEffect(() => {
    if (state.money !== prevMoneyRef.current) {
      setMoneyChanged(true);
      prevMoneyRef.current = state.money;
      const timer = setTimeout(() => setMoneyChanged(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [state.money]);

  return (
    <div className="header-texture backdrop-blur-md border-b border-[#3d2a1f] px-4 py-2 safe-top">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#C8A951]/15 rounded-full flex items-center justify-center border border-[#C8A951]/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 18C6 18 6 14 6 12C6 8 9 6 12 6C15 6 18 8 18 12V18" stroke="#C8A951" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M18 12C18 12 20 12 21 13C22 14 22 16 20 17C18 18 18 16 18 16" stroke="#C8A951" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="12" cy="18" rx="7" ry="2" fill="#C8A951" opacity="0.3" />
              <path d="M5 18H19" stroke="#C8A951" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 6C10.5 4 11 3 12 3C13 3 13.5 4 14 6" stroke="#D4A574" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            </svg>
          </div>
          <span className="text-[#F5EDE4] font-bold text-sm tracking-wider font-display">MINHA CAFETERIA</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#1a0f0a] rounded-lg px-2.5 py-1 border border-[#3d2a1f]">
          <CoinIcon />
          <span className={`font-mono text-sm font-bold tabular-nums transition-colors duration-300 ${moneyChanged ? 'text-[#66BB6A] animate-money-shimmer' : 'text-[#4CAF50]'}`}>
            {formatMoney(state.money)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 text-xs">
        <LevelBadge level={state.level} />

        <div className="flex-1 max-w-[100px]">
          <ProgressBar
            value={state.xp}
            max={state.xpToNextLevel}
            height="h-1.5"
            color="bg-[#D4A574]"
            bgColor="bg-[#3d2a1f]"
            shimmer
            icon={<XpIcon />}
          />
        </div>

        <StarRating value={state.reputationStars} size={12} />

        <div className="flex items-center gap-1 text-[#F5EDE4]/50">
          <CustomerIcon />
          <span className="tabular-nums">{state.customers.length}</span>
        </div>

        <div className="text-[#C8A951]/50 ml-auto text-[10px] tabular-nums">
          {formatMoney(state.collectableEarnings)}/caixa
        </div>
      </div>
    </div>
  );
}

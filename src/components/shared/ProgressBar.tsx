interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  bgColor?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
  shimmer?: boolean;
  gradient?: boolean;
  icon?: React.ReactNode;
}

export default function ProgressBar({
  value,
  max,
  color = 'bg-cafe-300',
  bgColor = 'bg-cafe-200/50',
  height = 'h-2',
  showLabel = false,
  animated = true,
  shimmer = false,
  gradient = false,
  icon,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <div className={`${bgColor} ${height} rounded-full overflow-hidden flex-1 relative`}>
          <div
            className={`${gradient ? 'bg-gradient-to-r from-cafe-300 to-[#C8A951]' : color} ${height} rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''} ${shimmer ? 'animate-shimmer-bar' : ''}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {showLabel && (
        <p className="text-xs text-cafe-500 mt-0.5 text-right">
          {Math.floor(percent)}%
        </p>
      )}
    </div>
  );
}

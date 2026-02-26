interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  bgColor?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max,
  color = 'bg-amber-500',
  bgColor = 'bg-stone-800',
  height = 'h-2',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      <div className={`${bgColor} ${height} rounded-full overflow-hidden`}>
        <div
          className={`${color} ${height} rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-stone-400 mt-0.5 text-right">
          {Math.floor(percent)}%
        </p>
      )}
    </div>
  );
}

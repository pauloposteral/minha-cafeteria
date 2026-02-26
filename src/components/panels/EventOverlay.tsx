import { useGame } from '../../context/GameContext';
import { formatDuration } from '../../utils/formatters';

export default function EventOverlay() {
  const { state } = useGame();

  const activeEvent = state.activeEvents.find(e => !e.resolved && Date.now() < e.startTime + e.event.duration);
  if (!activeEvent) return null;

  const remaining = Math.max(0, (activeEvent.startTime + activeEvent.event.duration) - Date.now());
  const progress = ((activeEvent.event.duration - remaining) / activeEvent.event.duration) * 100;

  return (
    <div className="fixed top-16 left-3 right-3 z-40 animate-slide-down">
      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-cafe-300/50 shadow-lg shadow-cafe-500/10 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xl">{activeEvent.event.icon}</span>
          <span className="text-cafe-800 font-bold text-sm flex-1">{activeEvent.event.title}</span>
          <span className="text-xs text-cafe-500">{formatDuration(remaining)}</span>
        </div>
        <p className="text-xs text-cafe-500 mb-2">{activeEvent.event.description}</p>
        <div className="h-1 bg-cafe-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cafe-300 to-cafe-400 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

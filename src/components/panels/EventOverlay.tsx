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
      <div className="bg-stone-900/95 backdrop-blur-md rounded-xl border border-amber-800/40 shadow-2xl shadow-amber-900/20 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xl">{activeEvent.event.icon}</span>
          <span className="text-amber-200 font-bold text-sm flex-1">{activeEvent.event.title}</span>
          <span className="text-xs text-stone-400">{formatDuration(remaining)}</span>
        </div>
        <p className="text-xs text-stone-400 mb-2">{activeEvent.event.description}</p>
        <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

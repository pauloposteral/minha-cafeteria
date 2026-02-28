import { useGame } from '../../context/GameContext';
import { formatDuration } from '../../utils/formatters';
import { EVENT_IMAGES } from '../../constants/assets';
import ProgressBar from '../shared/ProgressBar';

export default function EventOverlay() {
  const { state } = useGame();

  const activeEvent = state.activeEvents.find(e => !e.resolved && Date.now() < e.startTime + e.event.duration);
  if (!activeEvent) return null;

  const remaining = Math.max(0, (activeEvent.startTime + activeEvent.event.duration) - Date.now());
  const progress = ((activeEvent.event.duration - remaining) / activeEvent.event.duration) * 100;
  const eventImg = EVENT_IMAGES[activeEvent.event.id];

  return (
    <div className="fixed top-16 left-3 right-3 z-40 animate-slide-down">
      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-cafe-300/50 shadow-lg shadow-cafe-500/10 overflow-hidden">
        {eventImg && (
          <div className="relative h-16 overflow-hidden">
            <img src={eventImg} alt="" className="w-full h-full img-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-3">
              <span className="text-xl mr-2">{activeEvent.event.icon}</span>
              <span className="text-cafe-800 font-bold text-sm flex-1">{activeEvent.event.title}</span>
              <span className="text-xs text-cafe-600 font-mono bg-white/60 px-2 py-0.5 rounded-full">{formatDuration(remaining)}</span>
            </div>
          </div>
        )}
        {!eventImg && (
          <div className="flex items-center gap-2 p-3 pb-1.5">
            <span className="text-xl">{activeEvent.event.icon}</span>
            <span className="text-cafe-800 font-bold text-sm flex-1">{activeEvent.event.title}</span>
            <span className="text-xs text-cafe-500">{formatDuration(remaining)}</span>
          </div>
        )}
        <div className="px-3 pb-2 pt-1">
          <p className="text-xs text-cafe-500 mb-1.5">{activeEvent.event.description}</p>
          <ProgressBar
            value={progress}
            max={100}
            color="bg-gradient-to-r from-cafe-300 to-[#C8A951]"
            height="h-1.5"
            shimmer
          />
        </div>
      </div>
    </div>
  );
}

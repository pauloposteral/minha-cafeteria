import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { formatMoney, formatDuration, formatNumber } from '../../utils/formatters';
import { BALANCE, PRESTIGE_CITIES, PRESTIGE_MULTIPLIERS } from '../../constants/balance';
import { DRINK_RECIPES } from '../../constants/drinks';
import { deleteSave } from '../../utils/storage';
import { CITY_BANNERS } from '../../constants/assets';
import StarRating from '../shared/StarRating';
import Modal from '../shared/Modal';

type Section = 'stats' | 'prestige' | 'reviews' | 'settings' | null;

function StatsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="12" width="4" height="9" rx="1" fill="#D4A574" opacity="0.2" />
      <rect x="10" y="7" width="4" height="14" rx="1" fill="#D4A574" opacity="0.2" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="#D4A574" opacity="0.2" />
      <line x1="3" y1="12" x2="7" y2="12" /><line x1="3" y1="21" x2="7" y2="21" />
      <line x1="10" y1="7" x2="14" y2="7" /><line x1="10" y1="21" x2="14" y2="21" />
      <line x1="17" y1="3" x2="21" y2="3" /><line x1="17" y1="21" x2="21" y2="21" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2" strokeLinecap="round">
      <path d="M6 9H3a1 1 0 01-1-1V4a1 1 0 011-1h3" /><path d="M18 9h3a1 1 0 001-1V4a1 1 0 00-1-1h-3" />
      <path d="M6 3h12v6a6 6 0 01-12 0V3z" fill="#C8A951" opacity="0.15" />
      <path d="M9 21h6" /><path d="M12 15v6" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#C8A951" opacity="0.15" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

function CoffeeSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" fill="#D4A574" opacity="0.1" />
    </svg>
  );
}

function UsersSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function CoinsSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="14" rx="7" ry="3" fill="#C8A951" stroke="#B8952F" strokeWidth="1" />
      <ellipse cx="12" cy="10" rx="7" ry="3" fill="#D4B95F" stroke="#B8952F" strokeWidth="1" />
    </svg>
  );
}

function ClockSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function StarSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#C8A951" opacity="0.15" />
    </svg>
  );
}

export default function MorePanel() {
  const { state, dispatch } = useGame();
  const [openSection, setOpenSection] = useState<Section>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const canPrestige = state.level >= BALANCE.PRESTIGE_MIN_LEVEL;
  const nextPrestigeLevel = state.prestige.level + 1;
  const nextMultiplier = PRESTIGE_MULTIPLIERS[Math.min(nextPrestigeLevel, PRESTIGE_MULTIPLIERS.length - 1)];
  const nextCity = PRESTIGE_CITIES[Math.min(nextPrestigeLevel, PRESTIGE_CITIES.length - 1)];

  const mostPopularRecipe = DRINK_RECIPES.find(r => r.id === state.stats.mostPopularDrink);

  return (
    <div className="flex flex-col h-full bg-cafe-50">
      <div className="p-3 border-b border-cafe-200">
        <h2 className="text-cafe-800 font-bold font-display">Mais</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        <button
          onClick={() => setOpenSection('stats')}
          className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-cafe-200 hover:border-cafe-300 transition-all text-left shadow-sm"
        >
          <StatsIcon />
          <div>
            <span className="text-cafe-800 text-sm font-medium">Estatisticas</span>
            <p className="text-xs text-cafe-400">Veja seus numeros</p>
          </div>
        </button>

        <button
          onClick={() => setOpenSection('prestige')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left shadow-sm overflow-hidden relative ${
            canPrestige
              ? 'bg-cafe-300/10 border-cafe-300/50 hover:border-cafe-300 animate-pulse-border'
              : 'bg-white border-cafe-200 hover:border-cafe-300'
          }`}
        >
          <TrophyIcon />
          <div>
            <span className="text-cafe-800 text-sm font-medium">Prestigio</span>
            <p className="text-xs text-cafe-400">
              {canPrestige ? 'Disponivel! Expanda para outra cidade' : `Nivel ${BALANCE.PRESTIGE_MIN_LEVEL} necessario`}
            </p>
          </div>
          {state.prestige.level > 0 && (
            <span className="ml-auto text-xs text-cafe-500 font-bold">x{state.prestige.permanentMultiplier}</span>
          )}
        </button>

        <button
          onClick={() => setOpenSection('reviews')}
          className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-cafe-200 hover:border-cafe-300 transition-all text-left shadow-sm"
        >
          <ReviewIcon />
          <div>
            <span className="text-cafe-800 text-sm font-medium">Reviews</span>
            <p className="text-xs text-cafe-400">{state.reviews.length} avaliacoes</p>
          </div>
        </button>

        <button
          onClick={() => setOpenSection('settings')}
          className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-cafe-200 hover:border-cafe-300 transition-all text-left shadow-sm"
        >
          <SettingsIcon />
          <div>
            <span className="text-cafe-800 text-sm font-medium">Configuracoes</span>
            <p className="text-xs text-cafe-400">Salvar, resetar, info</p>
          </div>
        </button>

        {state.prestige.cities.length > 1 && (
          <div className="bg-white rounded-xl p-3 border border-cafe-200 shadow-sm">
            <p className="text-xs text-cafe-500 mb-2">Suas cidades:</p>
            <div className="flex flex-wrap gap-2">
              {state.prestige.cities.map((city, i) => {
                const banner = CITY_BANNERS[city];
                return (
                  <div key={i} className="relative rounded-lg overflow-hidden border border-cafe-200">
                    {banner && (
                      <img src={banner} alt={city} className="w-24 h-14 img-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-1 left-1.5 text-[9px] text-white font-medium drop-shadow">
                      {city}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Modal open={openSection === 'stats'} onClose={() => setOpenSection(null)} title="Estatisticas">
        <div className="space-y-3">
          <StatRow icon={<CoffeeSmallIcon />} label="Drinks servidos" value={formatNumber(state.stats.totalDrinksServed)} />
          <StatRow icon={<UsersSmallIcon />} label="Clientes atendidos" value={formatNumber(state.stats.totalCustomersServed)} />
          <StatRow icon={<CoinsSmallIcon />} label="Total ganho" value={formatMoney(state.stats.totalMoneyEarned)} />
          <StatRow icon={<TrendUpIcon />} label="Gorjetas totais" value={formatMoney(state.stats.totalTipsEarned)} />
          <StatRow icon={<StarSmallIcon />} label="Melhor dia" value={formatMoney(state.stats.bestDayEarnings)} />
          <StatRow icon={<ClockSmallIcon />} label="Tempo de jogo" value={formatDuration(state.stats.playTime * 1000)} />
          {mostPopularRecipe && (
            <StatRow icon={<span className="text-sm">{mostPopularRecipe.icon}</span>} label="Mais popular" value={mostPopularRecipe.name} />
          )}
        </div>
      </Modal>

      <Modal open={openSection === 'prestige'} onClose={() => setOpenSection(null)} title="Prestigio">
        <div className="space-y-4">
          <div className="text-center">
            <TrophyIcon />
            <p className="text-cafe-800 font-bold mt-2">Prestigio {state.prestige.level}</p>
            <p className="text-xs text-cafe-500">Multiplicador atual: x{state.prestige.permanentMultiplier}</p>
          </div>

          {canPrestige ? (
            <div className="rounded-xl overflow-hidden border border-cafe-300/30">
              {CITY_BANNERS[nextCity] && (
                <div className="relative h-24">
                  <img src={CITY_BANNERS[nextCity]} alt={nextCity} className="w-full h-full img-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow">{nextCity}</span>
                </div>
              )}
              <div className="bg-cafe-300/10 p-3">
                <p className="text-cafe-700 text-sm font-medium mb-2">Abrir cafeteria em {nextCity}?</p>
                <p className="text-xs text-cafe-500 leading-relaxed">
                  Sua cafeteria sera resetada, mas voce ganha um multiplicador permanente de x{nextMultiplier} em todos os lucros.
                  Receitas desbloqueadas e estatisticas sao mantidas.
                </p>
                <button
                  onClick={() => dispatch({ type: 'PRESTIGE' })}
                  className="w-full mt-3 py-2.5 bg-gradient-to-r from-cafe-500 to-cafe-600 text-white rounded-lg font-bold text-sm hover:from-cafe-600 hover:to-cafe-700 transition-all active:scale-[0.98]"
                >
                  Prestigiar para {nextCity}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-cafe-100 rounded-xl p-3 border border-cafe-200">
              <p className="text-cafe-600 text-sm">
                Alcance nivel {BALANCE.PRESTIGE_MIN_LEVEL} para prestigiar.
              </p>
              <p className="text-xs text-cafe-400 mt-1">
                Nivel atual: {state.level}/{BALANCE.PRESTIGE_MIN_LEVEL}
              </p>
            </div>
          )}
        </div>
      </Modal>

      <Modal open={openSection === 'reviews'} onClose={() => setOpenSection(null)} title="Reviews">
        {state.reviews.length === 0 ? (
          <p className="text-cafe-400 text-sm text-center py-4">Nenhuma review ainda</p>
        ) : (
          <div className="space-y-2">
            {[...state.reviews].reverse().map((review, i) => (
              <div key={i} className="bg-cafe-50 rounded-lg p-2.5 border border-cafe-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-cafe-700 font-medium">{review.customerName}</span>
                  <StarRating value={review.stars} size={10} />
                </div>
                <p className="text-xs text-cafe-500">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal open={openSection === 'settings'} onClose={() => setOpenSection(null)} title="Configuracoes">
        <div className="space-y-3">
          <div className="bg-cafe-100 rounded-lg p-3 border border-cafe-200">
            <p className="text-xs text-cafe-600">O jogo salva automaticamente a cada 30 segundos.</p>
          </div>

          <button
            onClick={() => setConfirmReset(true)}
            className="w-full flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-100 transition-all"
          >
            <TrashIcon />
            Resetar jogo
          </button>

          {confirmReset && (
            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <p className="text-red-600 text-xs mb-2">Tem certeza? Todo o progresso sera perdido!</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    deleteSave();
                    window.location.reload();
                  }}
                  className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600"
                >
                  Sim, resetar
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 bg-cafe-200 text-cafe-600 rounded-lg text-xs"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-cafe-100 last:border-0">
      {icon}
      <span className="text-xs text-cafe-500 flex-1">{label}</span>
      <span className="text-xs text-cafe-700 font-mono">{value}</span>
    </div>
  );
}

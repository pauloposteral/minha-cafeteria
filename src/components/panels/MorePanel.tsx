import { useState } from 'react';
import { BarChart3, Award, Settings, Star, Clock, Coffee, Coins, Users, TrendingUp, Trash2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { formatMoney, formatDuration, formatNumber } from '../../utils/formatters';
import { BALANCE, PRESTIGE_CITIES, PRESTIGE_MULTIPLIERS } from '../../constants/balance';
import { DRINK_RECIPES } from '../../constants/drinks';
import { deleteSave } from '../../utils/storage';
import StarRating from '../shared/StarRating';
import Modal from '../shared/Modal';

type Section = 'stats' | 'prestige' | 'reviews' | 'settings' | null;

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
    <div className="flex flex-col h-full bg-stone-950">
      <div className="p-3 border-b border-stone-800">
        <h2 className="text-amber-100 font-bold">Mais</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        <button
          onClick={() => setOpenSection('stats')}
          className="w-full flex items-center gap-3 p-3 bg-stone-800/40 rounded-xl border border-stone-700/30 hover:bg-stone-800/60 transition-all text-left"
        >
          <BarChart3 size={20} className="text-amber-500" />
          <div>
            <span className="text-amber-100 text-sm font-medium">Estatisticas</span>
            <p className="text-xs text-stone-500">Veja seus numeros</p>
          </div>
        </button>

        <button
          onClick={() => setOpenSection('prestige')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
            canPrestige
              ? 'bg-amber-900/20 border-amber-700/40 hover:bg-amber-900/30'
              : 'bg-stone-800/40 border-stone-700/30 hover:bg-stone-800/60'
          }`}
        >
          <Award size={20} className={canPrestige ? 'text-amber-400' : 'text-stone-500'} />
          <div>
            <span className="text-amber-100 text-sm font-medium">Prestigio</span>
            <p className="text-xs text-stone-500">
              {canPrestige ? 'Disponivel! Expanda para outra cidade' : `Nivel ${BALANCE.PRESTIGE_MIN_LEVEL} necessario`}
            </p>
          </div>
          {state.prestige.level > 0 && (
            <span className="ml-auto text-xs text-amber-500 font-bold">x{state.prestige.permanentMultiplier}</span>
          )}
        </button>

        <button
          onClick={() => setOpenSection('reviews')}
          className="w-full flex items-center gap-3 p-3 bg-stone-800/40 rounded-xl border border-stone-700/30 hover:bg-stone-800/60 transition-all text-left"
        >
          <Star size={20} className="text-amber-500" />
          <div>
            <span className="text-amber-100 text-sm font-medium">Reviews</span>
            <p className="text-xs text-stone-500">{state.reviews.length} avaliacoes</p>
          </div>
        </button>

        <button
          onClick={() => setOpenSection('settings')}
          className="w-full flex items-center gap-3 p-3 bg-stone-800/40 rounded-xl border border-stone-700/30 hover:bg-stone-800/60 transition-all text-left"
        >
          <Settings size={20} className="text-stone-400" />
          <div>
            <span className="text-amber-100 text-sm font-medium">Configuracoes</span>
            <p className="text-xs text-stone-500">Salvar, resetar, info</p>
          </div>
        </button>

        {state.prestige.cities.length > 1 && (
          <div className="bg-stone-800/30 rounded-xl p-3 border border-stone-700/20">
            <p className="text-xs text-stone-500 mb-1">Suas cidades:</p>
            <div className="flex flex-wrap gap-1">
              {state.prestige.cities.map((city, i) => (
                <span key={i} className="text-xs bg-amber-900/20 text-amber-400 px-2 py-0.5 rounded-full">
                  {city}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal open={openSection === 'stats'} onClose={() => setOpenSection(null)} title="Estatisticas">
        <div className="space-y-3">
          <StatRow icon={<Coffee size={14} className="text-amber-500" />} label="Drinks servidos" value={formatNumber(state.stats.totalDrinksServed)} />
          <StatRow icon={<Users size={14} className="text-amber-500" />} label="Clientes atendidos" value={formatNumber(state.stats.totalCustomersServed)} />
          <StatRow icon={<Coins size={14} className="text-amber-500" />} label="Total ganho" value={formatMoney(state.stats.totalMoneyEarned)} />
          <StatRow icon={<TrendingUp size={14} className="text-amber-500" />} label="Gorjetas totais" value={formatMoney(state.stats.totalTipsEarned)} />
          <StatRow icon={<Star size={14} className="text-amber-500" />} label="Melhor dia" value={formatMoney(state.stats.bestDayEarnings)} />
          <StatRow icon={<Clock size={14} className="text-amber-500" />} label="Tempo de jogo" value={formatDuration(state.stats.playTime * 1000)} />
          {mostPopularRecipe && (
            <StatRow icon={<span className="text-sm">{mostPopularRecipe.icon}</span>} label="Mais popular" value={mostPopularRecipe.name} />
          )}
        </div>
      </Modal>

      <Modal open={openSection === 'prestige'} onClose={() => setOpenSection(null)} title="Prestigio">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-amber-100 font-bold">Prestigio {state.prestige.level}</p>
            <p className="text-xs text-stone-400">Multiplicador atual: x{state.prestige.permanentMultiplier}</p>
          </div>

          {canPrestige ? (
            <div className="bg-amber-900/20 rounded-xl p-3 border border-amber-800/30">
              <p className="text-amber-200 text-sm font-medium mb-2">Abrir cafeteria em {nextCity}?</p>
              <p className="text-xs text-stone-400 leading-relaxed">
                Sua cafeteria sera resetada, mas voce ganha um multiplicador permanente de x{nextMultiplier} em todos os lucros.
                Receitas desbloqueadas e estatisticas sao mantidas.
              </p>
              <button
                onClick={() => dispatch({ type: 'PRESTIGE' })}
                className="w-full mt-3 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 rounded-lg font-bold text-sm hover:from-amber-500 hover:to-amber-400 transition-all active:scale-[0.98]"
              >
                Prestigiar para {nextCity}
              </button>
            </div>
          ) : (
            <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-700/30">
              <p className="text-stone-400 text-sm">
                Alcance nivel {BALANCE.PRESTIGE_MIN_LEVEL} para prestigiar.
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Nivel atual: {state.level}/{BALANCE.PRESTIGE_MIN_LEVEL}
              </p>
            </div>
          )}
        </div>
      </Modal>

      <Modal open={openSection === 'reviews'} onClose={() => setOpenSection(null)} title="Reviews">
        {state.reviews.length === 0 ? (
          <p className="text-stone-500 text-sm text-center py-4">Nenhuma review ainda</p>
        ) : (
          <div className="space-y-2">
            {[...state.reviews].reverse().map((review, i) => (
              <div key={i} className="bg-stone-800/60 rounded-lg p-2.5 border border-stone-700/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-amber-200 font-medium">{review.customerName}</span>
                  <StarRating value={review.stars} size={10} />
                </div>
                <p className="text-xs text-stone-400">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal open={openSection === 'settings'} onClose={() => setOpenSection(null)} title="Configuracoes">
        <div className="space-y-3">
          <div className="bg-stone-800/40 rounded-lg p-3 border border-stone-700/30">
            <p className="text-xs text-stone-400">O jogo salva automaticamente a cada 30 segundos.</p>
          </div>

          <button
            onClick={() => setConfirmReset(true)}
            className="w-full flex items-center gap-2 p-3 bg-red-900/20 rounded-lg border border-red-800/30 text-red-400 text-sm hover:bg-red-900/30 transition-all"
          >
            <Trash2 size={16} />
            Resetar jogo
          </button>

          {confirmReset && (
            <div className="bg-red-900/30 rounded-lg p-3 border border-red-700/50">
              <p className="text-red-300 text-xs mb-2">Tem certeza? Todo o progresso sera perdido!</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    deleteSave();
                    window.location.reload();
                  }}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-500"
                >
                  Sim, resetar
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 bg-stone-700 text-stone-300 rounded-lg text-xs"
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
    <div className="flex items-center gap-2 py-1.5 border-b border-stone-800/50 last:border-0">
      {icon}
      <span className="text-xs text-stone-400 flex-1">{label}</span>
      <span className="text-xs text-amber-200 font-mono">{value}</span>
    </div>
  );
}

export type TabId = 'cafeteria' | 'menu' | 'equipamentos' | 'staff' | 'decoracao' | 'mais';

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

function CafeIcon({ active }: { active: boolean }) {
  const c = active ? '#C8A951' : 'currentColor';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round">
      <path d="M5 18h12c0 0 1-1 1-3V9H4v6c0 2 1 3 1 3z" />
      <path d="M18 11c1 0 3 0.5 3 2s-2 2-3 2" />
      <path d="M9 5c0.5-1.5 1-2 1-2" opacity={active ? 1 : 0.5} />
      <path d="M12 5c0.5-1.5 1-2 1-2" opacity={active ? 1 : 0.5} />
    </svg>
  );
}

function MenuIcon({ active }: { active: boolean }) {
  const c = active ? '#C8A951' : 'currentColor';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="14" y2="12" />
      <line x1="8" y1="16" x2="12" y2="16" />
    </svg>
  );
}

function EquipIcon({ active }: { active: boolean }) {
  const c = active ? '#C8A951' : 'currentColor';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function StaffIcon({ active }: { active: boolean }) {
  const c = active ? '#C8A951' : 'currentColor';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
      <path d="M9 3c0-1 1.5-2 3-2s3 1 3 2" fill={active ? '#C8A951' : 'none'} opacity="0.3" />
    </svg>
  );
}

function DecoIcon({ active }: { active: boolean }) {
  const c = active ? '#C8A951' : 'currentColor';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 21V12l4-5 4 5v9" />
      <line x1="8" y1="15" x2="16" y2="15" />
    </svg>
  );
}

function MoreIcon({ active }: { active: boolean }) {
  const c = active ? '#C8A951' : 'currentColor';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5}>
      <circle cx="12" cy="5" r="1.5" fill={c} />
      <circle cx="12" cy="12" r="1.5" fill={c} />
      <circle cx="12" cy="19" r="1.5" fill={c} />
    </svg>
  );
}

const TAB_ICONS: Record<TabId, (props: { active: boolean }) => JSX.Element> = {
  cafeteria: CafeIcon,
  menu: MenuIcon,
  equipamentos: EquipIcon,
  staff: StaffIcon,
  decoracao: DecoIcon,
  mais: MoreIcon,
};

const TAB_LABELS: Record<TabId, string> = {
  cafeteria: 'Cafe',
  menu: 'Menu',
  equipamentos: 'Equip',
  staff: 'Staff',
  decoracao: 'Deco',
  mais: 'Mais',
};

const TAB_ORDER: TabId[] = ['cafeteria', 'menu', 'equipamentos', 'staff', 'decoracao', 'mais'];

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <div className="header-texture backdrop-blur-md border-t border-[#3d2a1f] safe-bottom">
      <div className="flex items-center justify-around py-1">
        {TAB_ORDER.map(tabId => {
          const isActive = activeTab === tabId;
          const IconComponent = TAB_ICONS[tabId];
          return (
            <button
              key={tabId}
              onClick={() => onTabChange(tabId)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[48px] ${
                isActive
                  ? 'text-[#C8A951]'
                  : 'text-[#F5EDE4]/40 hover:text-[#F5EDE4]/70 active:bg-[#3d2a1f]/50'
              }`}
            >
              <IconComponent active={isActive} />
              <span className={`text-[9px] font-medium ${isActive ? 'text-[#C8A951]' : ''}`}>
                {TAB_LABELS[tabId]}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#C8A951] rounded-full animate-tab-underline" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

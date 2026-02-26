import { Coffee, BookOpen, Wrench, Users, Paintbrush, MoreHorizontal } from 'lucide-react';

export type TabId = 'cafeteria' | 'menu' | 'equipamentos' | 'staff' | 'decoracao' | 'mais';

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: typeof Coffee }[] = [
  { id: 'cafeteria', label: 'Cafe', icon: Coffee },
  { id: 'menu', label: 'Menu', icon: BookOpen },
  { id: 'equipamentos', label: 'Equip', icon: Wrench },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'decoracao', label: 'Deco', icon: Paintbrush },
  { id: 'mais', label: 'Mais', icon: MoreHorizontal },
];

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <div className="bg-cafe-800/95 backdrop-blur-md border-t border-cafe-700/50 safe-bottom">
      <div className="flex items-center justify-around py-1.5">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 min-w-[48px] ${
                isActive
                  ? 'text-cafe-300 bg-cafe-300/15'
                  : 'text-cafe-200/50 hover:text-cafe-200/80 active:bg-cafe-700/50'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[9px] font-medium ${isActive ? 'text-cafe-300' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

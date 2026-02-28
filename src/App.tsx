import { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { ToastProvider } from './components/shared/Toast';
import TopHUD from './components/layout/TopHUD';
import BottomTabBar, { type TabId } from './components/layout/BottomTabBar';
import CafeteriaView from './components/cafeteria/CafeteriaView';
import MenuPanel from './components/panels/MenuPanel';
import EquipmentPanel from './components/panels/EquipmentPanel';
import StaffPanel from './components/panels/StaffPanel';
import DecorationPanel from './components/panels/DecorationPanel';
import MorePanel from './components/panels/MorePanel';
import EventOverlay from './components/panels/EventOverlay';
import OfflineEarningsModal from './components/shared/OfflineEarningsModal';

function GameShell() {
  const [activeTab, setActiveTab] = useState<TabId>('cafeteria');

  return (
    <div className="h-screen flex flex-col bg-cafe-50 text-cafe-800 overflow-hidden">
      <TopHUD />
      <EventOverlay />

      <main className="flex-1 overflow-hidden">
        {activeTab === 'cafeteria' && <CafeteriaView />}
        {activeTab === 'menu' && <MenuPanel />}
        {activeTab === 'equipamentos' && <EquipmentPanel />}
        {activeTab === 'staff' && <StaffPanel />}
        {activeTab === 'decoracao' && <DecorationPanel />}
        {activeTab === 'mais' && <MorePanel />}
      </main>

      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <OfflineEarningsModal />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <ToastProvider>
        <GameShell />
      </ToastProvider>
    </GameProvider>
  );
}

export default App;

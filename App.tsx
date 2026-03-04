import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PlusCircle, ListTodo, Search, Menu, X, Loader2, BrainCircuit,
  Settings, Table as TableIcon, Factory, UserCheck, Scale, Compass,
  History as HistoryIcon, Lock, LogIn, LogOut, ShieldAlert, Eye, EyeOff,
  KeyRound, ShieldCheck
} from 'lucide-react';
import { ProductionOrder, OrderStatus, Priority, SystemUser, SystemConfig, WhatsappContact, ProductionSector, ProductionSubSector, AuditEntry, SheetMaterial, TubeRoundMaterial, MetalonSquareMaterial, MetalonRectMaterial, LoadHistoryEntry, EngineeringPart } from './types';

// IMPORTAÇÃO CORRIGIDA
import DashboardView from './components/DashboardView';
import NewOrderView from './components/NewOrderView'; 
import OrderListView from './components/OrderListView';
import PieceOrderFormView from './components/PieceOrderFormView';
import SettingsView from './components/SettingsView';
import WeightCalculatorView from './components/WeightCalculatorView';
import EngineeringRegistryView from './components/EngineeringRegistryView';
import HistoryView from './components/HistoryView';

const SoAcoLogo = ({ light = false, large = false }) => (
  <div className="flex items-center gap-2 select-none">
    <div className={`flex items-baseline font-black italic tracking-tighter ${large ? 'text-5xl' : 'text-2xl'}`}>
      <span className={light ? 'text-white' : 'text-[#002855]'}>SÓ</span>
      <span className="text-[#FFB800]">AÇO</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // ... (mantenha os outros estados de ordens, setores, etc, que já existem no seu arquivo original)

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} bg-[#002855] transition-all duration-300 flex flex-col z-20 shadow-2xl`}>
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && <SoAcoLogo light />}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-[#FFB800] hover:bg-white/10 p-2 rounded-xl">
            {isSidebarCollapsed ? <Menu /> : <X />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard />} label="Painel Geral" active={activeTab === 'dashboard'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<PlusCircle />} label="Nova OP" active={activeTab === 'new'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('new')} />
          <NavItem icon={<ListTodo />} label="Ordens Ativas" active={activeTab === 'list'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('list')} />
          <NavItem icon={<Scale />} label="Calculadora" active={activeTab === 'calc'} collapsed={isSidebarCollapsed} onClick={() => setActiveTab('calc')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'dashboard' && <DashboardView orders={[]} sectors={[]} subSectors={[]} users={[]} />}
          
          {/* CHAMADA CORRIGIDA AQUI */}
          {activeTab === 'new' && <NewOrderView />}
          
          {activeTab === 'list' && <OrderListView />}
          {activeTab === 'calc' && <WeightCalculatorView activeUser={null} />}
        </div>
      </main>
    </div>
  );
};

interface NavItemProps { icon: React.ReactNode; label: string; active: boolean; collapsed: boolean; onClick: () => void; }
const NavItem: React.FC<NavItemProps> = ({ icon, label, active, collapsed, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 ${active ? 'bg-[#FFB800] text-[#001a35] font-black shadow-lg shadow-[#FFB800]/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'} ${collapsed ? 'justify-center' : ''}`}>
    <div className={active ? 'text-[#001a35]' : 'text-[#FFB800]'}>{icon}</div>
    {!collapsed && <span className="text-xs uppercase tracking-widest">{label}</span>}
  </button>
);

export default App;
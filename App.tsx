import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PlusCircle, ListTodo, Search, Menu, X, Loader2,
  BrainCircuit, Settings, Table as TableIcon, Factory, UserCheck,
  Scale, Compass, History as HistoryIcon, Lock, LogIn, LogOut,
  ShieldAlert, Eye, EyeOff, KeyRound, ShieldCheck
} from 'lucide-react';

// IMPORTAÇÕES CORRIGIDAS E SINCRONIZADAS COM SUA PASTA COMPONENTS
import DashboardView from './components/DashboardView';
import NewOrderView from './components/NewOrderView'; 
import OrdersView from './components/OrdersView';       
import DetalhamentoView from './components/PieceOrderFormView'; // Agora apontando para o arquivo correto
import SettingsView from './components/SettingsView';
import WeightCalculatorView from './components/WeightCalculatorView';
import EngineeringRegistryView from './components/EngineeringRegistryView';
import HistoryView from './components/HistoryView';
import { analyzeProduction } from './services/geminiService';

// Tipagens
import { ProductionOrder, OrderStatus, Priority, SystemUser, SystemConfig, ProductionSector, ProductionSubSector, SheetMaterial, TubeRoundMaterial, MetalonSquareMaterial, MetalonRectMaterial, LoadHistoryEntry, EngineeringPart } from './types';

const SoAcoLogo = ({ light = false, large = false }) => (
  <div className="flex items-center gap-2 select-none">
    <div className={`flex items-baseline font-black italic tracking-tighter ${large ? 'text-5xl' : 'text-2xl'}`}>
      <span className="text-[#FFB800]">SÓ</span>
      <span className={light ? "text-white ml-1" : "text-[#002855] ml-1"}>AÇO</span>
    </div>
    <div className={`${large ? 'w-4 h-4' : 'w-2 h-2'} rounded-full bg-[#FFB800] mt-2 animate-pulse`}></div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'new-order' | 'piece-order' | 'weight-calc' | 'eng-registry' | 'history' | 'settings'>('dashboard');
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [loadHistory, setLoadHistory] = useState<LoadHistoryEntry[]>([]);
  const [library, setLibrary] = useState<EngineeringPart[]>([]);
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [activeUser, setActiveUser] = useState<SystemUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Estados de Materiais e Estrutura
  const [sectors, setSectors] = useState<ProductionSector[]>([]);
  const [subSectors, setSubSectors] = useState<ProductionSubSector[]>([]);
  const [sheets, setSheets] = useState<SheetMaterial[]>([]);
  const [tubesRound, setTubesRound] = useState<TubeRoundMaterial[]>([]);
  const [tubesSquare, setTubesSquare] = useState<MetalonSquareMaterial[]>([]);
  const [tubesRect, setTubesRect] = useState<MetalonRectMaterial[]>([]);
  
  const [config, setConfig] = useState<SystemConfig>({ 
    contacts: [{ id: '1', label: 'Principal', number: '5586994703472' }],
    settingsPassword: ''
  });

  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [setupMode, setSetupMode] = useState(false);

  useEffect(() => {
    const savedUsers = localStorage.getItem('sa_users');
    if (savedUsers) {
      const parsed = JSON.parse(savedUsers);
      setUsers(parsed);
      if (parsed.length === 0) setSetupMode(true);
    } else {
      setSetupMode(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.id === loginUserId);
    if (user && user.password === loginPassword) {
      setActiveUser(user);
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Senha incorreta ou usuário não selecionado.');
    }
  };

  if (setupMode) return <div className="p-20 text-[#002855] font-bold">Configurando sistema... Aguarde.</div>;
  if (!isLoggedIn) return <LoginView users={users} loginUserId={loginUserId} setLoginUserId={setLoginUserId} loginPassword={loginPassword} setLoginPassword={setLoginPassword} loginError={loginError} onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      <aside className={`bg-[#001a35] text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-2xl z-20`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen && <SoAcoLogo light />}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded transition-colors">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6 mx-auto" />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'dashboard'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<ListTodo />} label="Ordens de Serviço" active={activeTab === 'orders'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('orders')} />
          <div className="py-2"><div className="h-px bg-white/10"></div></div>
          <NavItem icon={<PlusCircle />} label="Nova OP Simples" active={activeTab === 'new-order'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('new-order')} />
          <NavItem icon={<TableIcon />} label="Detalhamento" active={activeTab === 'piece-order'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('piece-order')} />
          <NavItem icon={<Scale />} label="Cálculo de Peso" active={activeTab === 'weight-calc'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('weight-calc')} />
          <NavItem icon={<Compass />} label="Cadastro ENG" active={activeTab === 'eng-registry'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('eng-registry')} />
          <NavItem icon={<HistoryIcon />} label="Histórico Carga" active={activeTab === 'history'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('history')} />
          <div className="py-2"><div className="h-px bg-white/10"></div></div>
          <NavItem icon={<Settings />} label="Configurações" active={activeTab === 'settings'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 bg-[#001328] space-y-2">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 text-rose-500 font-bold border border-rose-500/20">
            <LogOut />
            {isSidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Pesquisar..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm" />
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[11px] font-black text-[#002855] uppercase">{activeUser?.name}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest italic">Acesso Autorizado</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-[#002855] border-2 border-[#FFB800] flex items-center justify-center text-white font-black">
                {activeUser?.name?.substring(0,2).toUpperCase()}
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          {/* RENDERIZAÇÃO DAS ABAS COM PASSAGEM DE DADOS CORRIGIDA */}
          {activeTab === 'dashboard' && <DashboardView orders={orders} sectors={sectors} subSectors={subSectors} users={users} />}
          {activeTab === 'orders' && <OrdersView orders={orders} />}
          {activeTab === 'new-order' && <NewOrderView />}
          {activeTab === 'piece-order' && <DetalhamentoView onSubmit={() => {}} onCancel={() => setActiveTab('dashboard')} sectors={sectors} subSectors={subSectors} />}
          {activeTab === 'weight-calc' && <WeightCalculatorView sheets={sheets} tubesRound={tubesRound} tubesSquare={tubesSquare} tubesRect={tubesRect} activeUser={activeUser} />}
          {activeTab === 'eng-registry' && (
            <EngineeringRegistryView 
              sheets={sheets} tubesRound={tubesRound} tubesSquare={tubesSquare} tubesRect={tubesRect}
              loadHistory={loadHistory} setLoadHistory={setLoadHistory}
              library={library} setLibrary={setLibrary} activeUser={activeUser}
            />
          )}
          {activeTab === 'history' && <HistoryView loadHistory={loadHistory} setLoadHistory={setLoadHistory} activeUser={activeUser} users={users} />}
          {activeTab === 'settings' && (
            <SettingsView 
              config={config} setConfig={setConfig} users={users} setUsers={setUsers}
              sectors={sectors} setSectors={setSectors} subSectors={subSectors} setSubSectors={setSubSectors}
              sheets={sheets} setSheets={setSheets} tubesRound={tubesRound} setTubesRound={setTubesRound}
              tubesSquare={tubesSquare} setTubesSquare={setTubesSquare} tubesRect={tubesRect} setTubesRect={setTubesRect}
            />
          )}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, collapsed, onClick }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all ${active ? 'bg-[#FFB800] text-[#001a35] font-black shadow-lg shadow-[#FFB800]/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    {icon}
    {!collapsed && <span className="font-bold">{label}</span>}
  </button>
);

const LoginView = ({ users, onLogin, ...props }: any) => (
  <div className="min-h-screen bg-[#001a35] flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl text-center border-b-8 border-[#FFB800]">
       <SoAcoLogo large />
       <p className="mt-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">Sistema de Gestão de Produção</p>
       <form onSubmit={onLogin} className="mt-10 space-y-4">
          <select value={props.loginUserId} onChange={e => props.setLoginUserId(e.target.value)} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#002855] outline-none focus:border-[#FFB800] appearance-none text-center">
             <option value="">SELECIONE SEU PERFIL</option>
             {users.map((u:any) => <option key={u.id} value={u.id}>{u.name.toUpperCase()}</option>)}
          </select>
          <input type="password" value={props.loginPassword} onChange={e => props.setLoginPassword(e.target.value)} placeholder="DIGITE SUA SENHA" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[#002855] outline-none focus:border-[#FFB800] text-center" />
          {props.loginError && <p className="text-rose-500 text-[10px] font-black uppercase">{props.loginError}</p>}
          <button className="w-full py-5 bg-[#002855] text-[#FFB800] font-black uppercase rounded-2xl flex items-center justify-center gap-3 hover:bg-[#001328] transition-all">
            <Lock size={18} /> Acessar Painel
          </button>
       </form>
    </div>
  </div>
);

export default App;
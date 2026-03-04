
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListTodo, 
  Search,
  Menu,
  X,
  Loader2,
  BrainCircuit,
  Settings,
  Table as TableIcon,
  Factory,
  UserCheck,
  Scale,
  Compass,
  History as HistoryIcon,
  Lock,
  LogIn,
  LogOut,
  ShieldAlert,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { ProductionOrder, OrderStatus, Priority, SystemUser, SystemConfig, WhatsappContact, ProductionSector, ProductionSubSector, AuditEntry, SheetMaterial, TubeRoundMaterial, MetalonSquareMaterial, MetalonRectMaterial, LoadHistoryEntry, EngineeringPart } from './types';
import DashboardView from './components/DashboardView';
import OrderFormView from './components/OrderFormView';
import OrderListView from './components/OrderListView';
import PieceOrderFormView from './components/PieceOrderFormView';
import SettingsView from './components/SettingsView';
import WeightCalculatorView from './components/WeightCalculatorView';
import EngineeringRegistryView from './components/EngineeringRegistryView';
import HistoryView from './components/HistoryView';
import { analyzeProduction } from './services/geminiService';

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
  
  const [replicateOrderData, setReplicateOrderData] = useState<ProductionOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [activeUser, setActiveUser] = useState<SystemUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSettingsUnlocked, setIsSettingsUnlocked] = useState(false);
  const [settingsUnlockInput, setSettingsUnlockInput] = useState('');

  const [setupMode, setSetupMode] = useState(false);
  const [setupName, setSetupName] = useState('');
  const [setupPass, setSetupPass] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const MASTER_PASSWORD = '104210';

  useEffect(() => {
    const savedOrders = localStorage.getItem('prod_orders');
    const savedHistory = localStorage.getItem('sa_load_history');
    const savedLibrary = localStorage.getItem('sa_eng_library');
    const savedUsers = localStorage.getItem('sa_users');
    const savedSectors = localStorage.getItem('sa_sectors');
    const savedSubSectors = localStorage.getItem('sa_subsectors');
    const savedSheets = localStorage.getItem('sa_sheets');
    const savedTubesRound = localStorage.getItem('sa_tubes_round');
    const savedTubesSquare = localStorage.getItem('sa_tubes_square');
    const savedTubesRect = localStorage.getItem('sa_tubes_rect');
    const savedConfig = localStorage.getItem('sa_config_v2');
    
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedHistory) setLoadHistory(JSON.parse(savedHistory));
    if (savedLibrary) setLibrary(JSON.parse(savedLibrary));
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
      if (parsedUsers.length === 0) setSetupMode(true);
    } else {
      setSetupMode(true);
    }
    
    if (savedSectors) setSectors(JSON.parse(savedSectors));
    if (savedSubSectors) setSubSectors(JSON.parse(savedSubSectors));
    if (savedSheets) setSheets(JSON.parse(savedSheets));
    if (savedTubesRound) setTubesRound(JSON.parse(savedTubesRound));
    if (savedTubesSquare) setTubesSquare(JSON.parse(savedTubesSquare));
    if (savedTubesRect) setTubesRect(JSON.parse(savedTubesRect));
    if (savedConfig) setConfig(JSON.parse(savedConfig));
    
    setIsLoading(false);
  }, []);

  useEffect(() => { localStorage.setItem('prod_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('sa_load_history', JSON.stringify(loadHistory)); }, [loadHistory]);
  useEffect(() => { localStorage.setItem('sa_eng_library', JSON.stringify(library)); }, [library]);
  useEffect(() => { localStorage.setItem('sa_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('sa_sectors', JSON.stringify(sectors)); }, [sectors]);
  useEffect(() => { localStorage.setItem('sa_subsectors', JSON.stringify(subSectors)); }, [subSectors]);
  useEffect(() => { localStorage.setItem('sa_sheets', JSON.stringify(sheets)); }, [sheets]);
  useEffect(() => { localStorage.setItem('sa_tubes_round', JSON.stringify(tubesRound)); }, [tubesRound]);
  useEffect(() => { localStorage.setItem('sa_tubes_square', JSON.stringify(tubesSquare)); }, [tubesSquare]);
  useEffect(() => { localStorage.setItem('sa_tubes_rect', JSON.stringify(tubesRect)); }, [tubesRect]);
  useEffect(() => { localStorage.setItem('sa_config_v2', JSON.stringify(config)); }, [config]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const user = users.find(u => u.id === loginUserId);
    if (user && user.password === loginPassword) {
      setActiveUser(user);
      setIsLoggedIn(true);
      setLoginPassword('');
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupName.trim()) {
      alert('Por favor, insira um nome');
      return;
    }
    if (!setupPass.trim()) {
      alert('Por favor, insira uma senha');
      return;
    }
    
    const newUser: SystemUser = {
      id: Date.now().toString(),
      name: setupName,
      role: 'Administrador',
      password: setupPass
    };
    
    const newUsers = [newUser];
    setUsers(newUsers);
    setActiveUser(newUser);
    setIsLoggedIn(true);
    setSetupMode(false);
    setSetupName('');
    setSetupPass('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveUser(null);
    setLoginUserId('');
    setLoginPassword('');
    setLoginError('');
    setIsSettingsUnlocked(false);
    setActiveTab('dashboard');
  };

  const addOrder = (order: ProductionOrder) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: activeUser?.name || 'Sistema',
      createdByRole: activeUser?.role || 'Visitante',
      history: [{
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        userName: activeUser?.name || 'Sistema',
        action: 'Ordem criada'
      }]
    };
    setOrders([...orders, newOrder]);
    setReplicateOrderData(null);
    setActiveTab('dashboard');
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? {
            ...order,
            status: newStatus,
            history: [...order.history, {
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              userName: activeUser?.name || 'Sistema',
              action: `Status alterado para ${newStatus}`
            }]
          }
        : order
    ));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleReplicate = (order: ProductionOrder) => {
    setReplicateOrderData(order);
    setActiveTab('new-order');
  };

  const handleSettingsUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (settingsUnlockInput === config.settingsPassword || settingsUnlockInput === MASTER_PASSWORD) {
      setIsSettingsUnlocked(true);
      setSettingsUnlockInput('');
    } else {
      alert('Senha incorreta');
      setSettingsUnlockInput('');
    }
  };

  const sendWhatsAppNotification = (order: ProductionOrder, contact: WhatsappContact) => {
    const message = `Olá! Seu pedido #${order.id} - ${order.productName} foi atualizado. Status: ${order.status}. Quantidade: ${order.quantity} ${order.unit}`;
    const whatsappLink = `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const runAiAnalysis = async () => {
    if (orders.length === 0) {
      alert('Nenhuma ordem para analisar');
      return;
    }

    setIsAnalyzing(true);
    try {
      const insight = await analyzeProduction(orders);
      setAiInsight(insight);
    } catch (error) {
      alert('Erro ao analisar: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-[#002855] via-[#001a35] to-[#000a1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <SoAcoLogo light={true} large={true} />
          <Loader2 className="w-12 h-12 text-[#FFB800] animate-spin" />
          <p className="text-[#FFB800] font-bold">Carregando aplicação...</p>
        </div>
      </div>
    );
  }

  // Tela de Setup (primeira execução)
  if (setupMode && !isLoggedIn) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-[#002855] via-[#001a35] to-[#000a1a] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-4">
              <SoAcoLogo large={true} />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black text-[#002855] uppercase italic">Bem-vindo!</h1>
              <p className="text-sm text-slate-500 font-medium">Configure o primeiro usuário administrador</p>
            </div>
            
            <form onSubmit={handleSetup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Nome do Administrador</label>
                <input 
                  type="text" 
                  value={setupName}
                  onChange={e => setSetupName(e.target.value)}
                  placeholder="João Silva"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 font-medium text-[#002855] outline-none focus:border-[#FFB800] transition-all"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Senha de Acesso</label>
                <input 
                  type="password" 
                  value={setupPass}
                  onChange={e => setSetupPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 font-medium text-[#002855] outline-none focus:border-[#FFB800] transition-all"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 bg-[#002855] text-white font-black uppercase text-sm rounded-xl shadow-lg hover:bg-[#001a35] transition-all flex items-center justify-center gap-2"
              >
                <UserCheck className="w-5 h-5" /> Criar Administrador
              </button>
            </form>
            
            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              Após a criação, você poderá adicionar mais usuários nas configurações do sistema.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Login
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-[#002855] via-[#001a35] to-[#000a1a] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-4">
              <SoAcoLogo large={true} />
            </div>
            
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black text-[#002855] uppercase italic">Acesso</h1>
              <p className="text-sm text-slate-500 font-medium">Faça login para continuar</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Usuário</label>
                <input 
                  type="text" 
                  value={loginUserId}
                  onChange={e => setLoginUserId(e.target.value)}
                  placeholder="ID do usuário"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 font-medium text-[#002855] outline-none focus:border-[#FFB800] transition-all"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Senha</label>
                <div className="relative">
                  <input 
                    type={showLoginPass ? "text" : "password"}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 font-medium text-[#002855] outline-none focus:border-[#FFB800] transition-all pr-12"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showLoginPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {loginError && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-600 text-sm font-medium">
                  {loginError}
                </div>
              )}
              
              <button 
                type="submit"
                className="w-full py-3 bg-[#002855] text-white font-black uppercase text-sm rounded-xl shadow-lg hover:bg-[#001a35] transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" /> Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Aplicação Principal (após login bem-sucedido)
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-gradient-to-b from-[#002855] to-[#001a35] text-white flex flex-col border-r border-white/10`}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          {isSidebarOpen && <SoAcoLogo light={true} />}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'dashboard'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<ListTodo />} label="Ordens de Prod." active={activeTab === 'orders'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('orders')} />
          <div className="py-2"><div className={`h-px bg-white/10 mb-2 ${!isSidebarOpen && 'mx-4'}`}></div></div>
          <NavItem icon={<PlusCircle />} label="Nova Ordem" active={activeTab === 'new-order'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('new-order')} />
          <NavItem icon={<TableIcon />} label="Ordem com Peças" active={activeTab === 'piece-order'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('piece-order')} />
          <div className="py-2"><div className={`h-px bg-white/10 mb-2 ${!isSidebarOpen && 'mx-4'}`}></div></div>
          <NavItem icon={<Scale />} label="Calc. Peso" active={activeTab === 'weight-calc'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('weight-calc')} />
          <NavItem icon={<Factory />} label="Registro Eng." active={activeTab === 'eng-registry'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('eng-registry')} />
          <NavItem icon={<HistoryIcon />} label="Histórico Carga" active={activeTab === 'history'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('history')} />
          <div className="py-2"><div className={`h-px bg-white/10 mb-2 ${!isSidebarOpen && 'mx-4'}`}></div></div>
          <NavItem icon={<Settings />} label="Configurações" active={activeTab === 'settings'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-white/5 bg-[#001328] space-y-2">
          <button onClick={runAiAnalysis} disabled={isAnalyzing} className={`w-full flex items-center gap-3 p-3 rounded-xl bg-[#FFB800]/10 hover:bg-[#FFB800]/20 transition-all text-[#FFB800] font-bold border border-[#FFB800]/20 ${!isSidebarOpen && 'justify-center'}`}>
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
            {isSidebarOpen && <span>Analista IA</span>}
          </button>
          <button onClick={handleLogout} className={`w-full flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all font-bold border border-rose-500/20 ${!isSidebarOpen && 'justify-center'}`}>
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Sair / Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Pesquisar por ID, Cliente, Produto ou Notas..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#002855] outline-none transition-all" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="h-10 w-px bg-slate-100 mx-2 hidden md:block"></div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shadow-inner group">
              <UserCheck className="w-4 h-4 text-[#002855]" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sessão Ativa</span>
                <span className="text-[11px] font-black text-[#002855] uppercase">{activeUser?.name || 'SISTEMA'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#002855]">Unidade SÓ AÇO</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{activeUser?.role || 'Visitante'}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#002855] flex items-center justify-center text-white font-black border-2 border-[#FFB800]">
                {activeUser?.name?.substring(0,2).toUpperCase() || 'SA'}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          {aiInsight && (
            <div className="mb-8 p-6 bg-[#002855]/5 border-l-4 border-[#FFB800] rounded-r-2xl relative shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#002855] font-black flex items-center gap-2 italic uppercase text-sm">
                  <BrainCircuit className="w-4 h-4 text-[#FFB800]" /> Insight SÓ AÇO
                </h3>
                <button onClick={() => setAiInsight(null)} className="text-slate-400 hover:text-red-500"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-[#002855] text-sm leading-relaxed whitespace-pre-wrap font-medium">{aiInsight}</p>
            </div>
          )}

          {activeTab === 'dashboard' && <DashboardView orders={orders} sectors={sectors} subSectors={subSectors} users={users} />}
          {activeTab === 'orders' && (
            <OrderListView 
              orders={orders} 
              sectors={sectors} 
              subSectors={subSectors} 
              onUpdateStatus={updateOrderStatus} 
              onDelete={deleteOrder} 
              onNotify={sendWhatsAppNotification}
              onReplicate={handleReplicate}
              searchQuery={searchQuery}
              activeUser={activeUser}
              users={users}
            />
          )}
          {activeTab === 'new-order' && <OrderFormView initialData={replicateOrderData} sectors={sectors} subSectors={subSectors} onSubmit={addOrder} onCancel={() => { setReplicateOrderData(null); setActiveTab('dashboard'); }} />}
          {activeTab === 'piece-order' && <PieceOrderFormView initialData={replicateOrderData} sectors={sectors} subSectors={subSectors} onSubmit={addOrder} onCancel={() => { setReplicateOrderData(null); setActiveTab('dashboard'); }} />}
          {activeTab === 'weight-calc' && <WeightCalculatorView sheets={sheets} tubesRound={tubesRound} tubesSquare={tubesSquare} tubesRect={tubesRect} activeUser={activeUser} />}
          {activeTab === 'eng-registry' && (
            <EngineeringRegistryView 
              sheets={sheets} 
              tubesRound={tubesRound} 
              tubesSquare={tubesSquare} 
              tubesRect={tubesRect} 
              loadHistory={loadHistory}
              setLoadHistory={setLoadHistory}
              library={library}
              setLibrary={setLibrary}
              activeUser={activeUser}
            />
          )}
          {activeTab === 'history' && <HistoryView loadHistory={loadHistory} setLoadHistory={setLoadHistory} activeUser={activeUser} users={users} />}
          {activeTab === 'settings' && (
            isSettingsUnlocked ? (
              <SettingsView 
                config={config} setConfig={setConfig} users={users} setUsers={setUsers} 
                sectors={sectors} setSectors={setSectors} subSectors={subSectors} setSubSectors={setSubSectors} 
                sheets={sheets} setSheets={setSheets} tubesRound={tubesRound} setTubesRound={setTubesRound} 
                tubesSquare={tubesSquare} setTubesSquare={setTubesSquare} tubesRect={tubesRect} setTubesRect={setTubesRect} 
              />
            ) : (
              <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[3rem] shadow-2xl border-2 border-slate-100 animate-in zoom-in-95 duration-500 flex flex-col items-center">
                 <div className="w-16 h-16 bg-[#002855] rounded-2xl flex items-center justify-center mb-6 shadow-lg border-2 border-[#FFB800]">
                    <KeyRound className="w-8 h-8 text-[#FFB800]" />
                 </div>
                 <h2 className="text-xl font-black text-[#002855] uppercase italic mb-2">Painel de Administração</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">Digite a senha de segurança para acessar o módulo de configurações.</p>
                 <form onSubmit={handleSettingsUnlock} className="w-full space-y-4">
                    <input 
                       type="password" 
                       value={settingsUnlockInput}
                       onChange={e => setSettingsUnlockInput(e.target.value)}
                       placeholder="SENHA DE ACESSO"
                       className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 font-black text-[#002855] outline-none focus:border-[#FFB800] text-center"
                    />
                    <button type="submit" className="w-full py-5 bg-[#002855] text-[#FFB800] font-black uppercase text-[10px] rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:bg-[#001a35] transition-all">
                       <ShieldCheck className="w-5 h-5" /> Liberar Painel
                    </button>
                 </form>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

interface NavItemProps { icon: React.ReactNode; label: string; active: boolean; collapsed: boolean; onClick: () => void; }
const NavItem: React.FC<NavItemProps> = ({ icon, label, active, collapsed, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 ${active ? 'bg-[#FFB800] text-[#001a35] font-black shadow-lg shadow-[#FFB800]/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'} ${collapsed ? 'justify-center' : ''}`}>
    <span className={`w-6 h-6 flex-shrink-0 ${active ? 'text-[#001a35]' : ''}`}>{icon}</span>
    {!collapsed && <span className="font-bold tracking-tight">{label}</span>}
  </button>
);

export default App;

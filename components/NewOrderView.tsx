import React, { useState } from 'react';
import { 
  Save, User, Package, AlertCircle, 
  MessageSquare, Factory, Calendar, 
  Hash, Layers, Clock 
} from 'lucide-react';

const NewOrderView = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    productName: '',
    quantity: 1,
    unit: 'unidades',
    deadline: '',
    priority: 'MEDIUM',
    sector: '',
    notes: ''
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 p-1">
      {/* CABEÇALHO ESTILIZADO */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-2 w-16 bg-[#FFB800] rounded-full shadow-sm"></div>
        <div>
          <h2 className="text-4xl font-black text-[#002855] italic uppercase tracking-tighter leading-none">
            Nova Ordem de Produção
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2 ml-1">Entrada de novos pedidos no sistema</p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
        {/* Detalhe estético de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-0 flex items-center justify-center">
           <PlusCircleIcon size={40} className="text-slate-100" />
        </div>

        <form className="relative z-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* CLIENTE */}
            <div className="group space-y-3">
              <label className="text-[11px] font-black text-[#002855] uppercase tracking-widest ml-2 flex items-center gap-2">
                <User size={14} className="text-[#FFB800]" /> Cliente / Destino
              </label>
              <input 
                type="text" 
                placeholder="NOME DO CLIENTE OU PROJETO"
                className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855] shadow-inner text-lg placeholder:text-slate-300 uppercase"
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              />
            </div>

            {/* PRODUTO */}
            <div className="group space-y-3">
              <label className="text-[11px] font-black text-[#002855] uppercase tracking-widest ml-2 flex items-center gap-2">
                <Package size={14} className="text-[#FFB800]" /> Descrição do Produto
              </label>
              <input 
                type="text" 
                placeholder="EX: VIGA U 6 POLEGADAS"
                className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855] shadow-inner text-lg placeholder:text-slate-300 uppercase"
                onChange={(e) => setFormData({...formData, productName: e.target.value})}
              />
            </div>

            {/* QTD E UNIDADE EM GRID INTERNO */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#002855] uppercase tracking-widest ml-2 flex items-center gap-2">
                   <Hash size={14} className="text-[#FFB800]" /> Qtd
                </label>
                <input 
                  type="number" 
                  className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-2xl font-black text-[#002855] text-xl text-center outline-none focus:border-[#FFB800]"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#002855] uppercase tracking-widest ml-2">Unidade</label>
                <select 
                  className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-2xl font-black text-[#002855] outline-none focus:border-[#FFB800] appearance-none text-center cursor-pointer"
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                >
                  <option value="unidades">PÇS (UN)</option>
                  <option value="kg">PESO (KG)</option>
                  <option value="metros">METROS (M)</option>
                </select>
              </div>
            </div>

            {/* PRAZO */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#002855] uppercase tracking-widest ml-2 flex items-center gap-2">
                <Calendar size={14} className="text-[#FFB800]" /> Prazo de Entrega
              </label>
              <input 
                type="date" 
                className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-2xl font-black text-[#002855] outline-none focus:border-[#FFB800] text-center cursor-pointer uppercase"
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>

            {/* SETOR */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#002855] uppercase tracking-widest ml-2 flex items-center gap-2">
                <Factory size={14} className="text-[#FFB800]" /> Setor Responsável
              </label>
              <select 
                className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-2xl font-black text-[#002855] outline-none focus:border-[#FFB800] appearance-none text-center cursor-pointer"
                onChange={(e) => setFormData({...formData, sector: e.target.value})}
              >
                <option value="">SELECIONE O SETOR</option>
                <option value="CORTE">CORTE E DOBRA</option>
                <option value="SOLDA">SOLDA / MONTAGEM</option>
                <option value="PINTURA">PINTURA</option>
                <option value="EXPEDICAO">EXPEDIÇÃO</option>
              </select>
            </div>

            {/* PRIORIDADE */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#002855] uppercase tracking-widest ml-2 flex items-center gap-2">
                <AlertCircle size={14} className="text-[#FFB800]" /> Nível de Urgência
              </label>
              <select 
                className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-2xl font-black text-[#002855] outline-none focus:border-[#FFB800] appearance-none text-center cursor-pointer"
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="LOW">BAIXA (ROTINA)</option>
                <option value="MEDIUM">NORMAL (FLUXO)</option>
                <option value="HIGH">ALTA (PREFERÊNCIA)</option>
                <option value="URGENT">CRÍTICA (URGENTE)</option>
              </select>
            </div>
          </div>

          {/* BOTÕES - EXATAMENTE COMO NO PRINT */}
          <div className="flex flex-col lg:flex-row items-stretch gap-6 pt-10 border-t-2 border-slate-50">
            <button 
              type="button"
              className="flex-1 bg-white border-[3px] border-[#002855] text-[#002855] hover:bg-[#002855] hover:text-[#FFB800] font-black uppercase tracking-widest py-6 px-10 rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-95 shadow-xl group"
            >
              <Save className="w-7 h-7 transition-transform group-hover:rotate-12" /> 
              <span className="text-lg">Registrar Ordem</span>
            </button>
            
            <button 
              type="button"
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase tracking-widest py-6 px-10 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 shadow-[#25D366]/20"
            >
              <MessageSquare className="w-7 h-7" /> 
              <span className="text-lg text-center leading-none">Registrar + WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Ícone decorativo auxiliar
const PlusCircleIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

export default NewOrderView;
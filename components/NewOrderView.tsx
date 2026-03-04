import React, { useState } from 'react';
import { Save, User, Package, AlertCircle, MessageSquare, Factory, Calendar, Hash } from 'lucide-react';

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-[1200px] mx-auto">
      {/* TÍTULO DA ABA COM IDENTIDADE SÓ AÇO */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1.5 w-12 bg-[#FFB800] rounded-full shadow-sm"></div>
        <h2 className="text-3xl font-black text-[#002855] italic uppercase tracking-tighter">
          Nova Ordem de Produção
        </h2>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
        <form className="space-y-8">
          
          {/* GRID DE ENTRADA - 2 COLUNAS BEM DEFINIDAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            
            {/* CAMPO: CLIENTE */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <User size={14} className="text-[#FFB800]" /> Cliente / Destino
              </label>
              <input 
                type="text" 
                placeholder="NOME DO CLIENTE OU PROJETO"
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855] uppercase shadow-inner"
                onChange={(e) => setFormData({...formData, clientName: e.target.value.toUpperCase()})}
              />
            </div>

            {/* CAMPO: PRODUTO */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <Package size={14} className="text-[#FFB800]" /> Descrição do Produto
              </label>
              <input 
                type="text" 
                placeholder="EX: ESTRUTURA METÁLICA / PEÇA ESPECÍFICA"
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855] uppercase shadow-inner"
                onChange={(e) => setFormData({...formData, productName: e.target.value.toUpperCase()})}
              />
            </div>

            {/* GRID INTERNO: QTD E UNIDADE */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <Hash size={14} className="text-[#FFB800]" /> Qtd
                </label>
                <input 
                  type="number" 
                  value={formData.quantity}
                  className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] shadow-inner outline-none focus:border-[#FFB800]"
                  onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Unidade</label>
                <select 
                  className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] shadow-inner outline-none focus:border-[#FFB800] appearance-none"
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                >
                  <option value="unidades">UNIDADES (PÇ)</option>
                  <option value="kg">PESO (KG)</option>
                  <option value="metros">METROS (M)</option>
                </select>
              </div>
            </div>

            {/* PRAZO DE ENTREGA */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <Calendar size={14} className="text-[#FFB800]" /> Prazo de Entrega
              </label>
              <input 
                type="date" 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] shadow-inner outline-none focus:border-[#FFB800] uppercase"
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>

            {/* SETOR RESPONSÁVEL */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <Factory size={14} className="text-[#FFB800]" /> Setor Responsável
              </label>
              <select 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] shadow-inner outline-none focus:border-[#FFB800] appearance-none"
                onChange={(e) => setFormData({...formData, sector: e.target.value})}
              >
                <option value="">SELECIONE O SETOR</option>
                <option value="CORTE">CORTE E DOBRA</option>
                <option value="SOLDA">SOLDA / MONTAGEM</option>
                <option value="PINTURA">PINTURA</option>
                <option value="EXPEDICAO">EXPEDIÇÃO</option>
              </select>
            </div>

            {/* NÍVEL DE URGÊNCIA */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <AlertCircle size={14} className="text-[#FFB800]" /> Nível de Urgência
              </label>
              <select 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] shadow-inner outline-none focus:border-[#FFB800] appearance-none"
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="LOW">BAIXA (ROTINA)</option>
                <option value="MEDIUM" selected>NORMAL (FLUXO)</option>
                <option value="HIGH">ALTA (URGENTE)</option>
                <option value="URGENT">CRÍTICA (PARADA)</option>
              </select>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO - IGUAIS AO PRINT */}
          <div className="flex flex-col md:flex-row items-stretch gap-6 pt-10 border-t border-slate-50">
            <button 
              type="button"
              className="flex-1 bg-white border-2 border-[#002855] text-[#002855] hover:bg-slate-50 font-black uppercase tracking-[0.1em] py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-slate-100"
            >
              <Save className="w-6 h-6" /> REGISTRAR ORDEM
            </button>
            <button 
              type="button"
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase tracking-[0.1em] py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#25D366]/20 active:scale-95"
            >
              <MessageSquare className="w-6 h-6" /> REGISTRAR + WHATSAPP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderView;
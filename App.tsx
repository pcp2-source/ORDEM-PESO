import React, { useState } from 'react';
import { Save, User, Package, AlertCircle, MessageSquare, Factory, Calendar, Hash } from 'lucide-react';

const NewOrderView = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* TÍTULO DA ABA */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1.5 w-12 bg-[#FFB800] rounded-full"></div>
        <h2 className="text-3xl font-black text-[#002855] italic uppercase tracking-tighter">
          Nova Ordem de Produção
        </h2>
      </div>

      {/* CARD PRINCIPAL - FUNDO BRANCO ARREDONDADO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl">
        <form className="space-y-8">
          
          {/* GRID PRINCIPAL - 2 COLUNAS NO PC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CLIENTE */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <User size={12} className="text-[#FFB800]" /> Cliente / Destino
              </label>
              <input 
                type="text" 
                placeholder="NOME DO CLIENTE OU PROJETO"
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855] uppercase"
              />
            </div>

            {/* PRODUTO */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <Package size={12} className="text-[#FFB800]" /> Descrição do Produto
              </label>
              <input 
                type="text" 
                placeholder="EX: VIGA U 6 POLEGADAS"
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855] uppercase"
              />
            </div>

            {/* QUANTIDADE E UNIDADE (Lado a Lado) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <Hash size={12} className="text-[#FFB800]" /> Qtd
                </label>
                <input 
                  type="number" 
                  defaultValue="1"
                  className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855]"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Unidade</label>
                <select className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] appearance-none cursor-pointer">
                  <option>Unidades (Pç)</option>
                  <option>Peso (Kg)</option>
                  <option>Metros (m)</option>
                </select>
              </div>
            </div>

            {/* PRAZO DE ENTREGA */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <Calendar size={12} className="text-[#FFB800]" /> Prazo de Entrega
              </label>
              <input 
                type="date" 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] uppercase cursor-pointer"
              />
            </div>

            {/* SETOR RESPONSÁVEL */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <Factory size={12} className="text-[#FFB800]" /> Setor Responsável
              </label>
              <select className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] appearance-none cursor-pointer">
                <option value="">SELECIONE O SETOR</option>
                <option>CORTE E DOBRA</option>
                <option>SOLDA / MONTAGEM</option>
                <option>PINTURA</option>
                <option>EXPEDIÇÃO</option>
              </select>
            </div>

            {/* NÍVEL DE URGÊNCIA */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                <AlertCircle size={12} className="text-[#FFB800]" /> Nível de Urgência
              </label>
              <select className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] appearance-none cursor-pointer">
                <option value="LOW">BAIXA</option>
                <option value="MEDIUM" selected>NORMAL</option>
                <option value="HIGH">ALTA</option>
                <option value="URGENT">URGENTE</option>
              </select>
            </div>
          </div>

          {/* BOTÕES IGUAIS AO PRINT */}
          <div className="flex flex-col md:flex-row items-stretch gap-5 pt-8 border-t border-slate-50">
            <button 
              type="button"
              className="flex-1 bg-white border-2 border-[#002855] text-[#002855] hover:bg-slate-50 font-black uppercase tracking-widest py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-slate-100"
            >
              <Save className="w-6 h-6" /> REGISTRAR ORDEM
            </button>
            <button 
              type="button"
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase tracking-widest py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95"
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
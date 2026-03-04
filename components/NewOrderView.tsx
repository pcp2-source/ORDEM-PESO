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
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1.5 w-12 bg-[#FFB800] rounded-full shadow-sm"></div>
        <h2 className="text-3xl font-black text-[#002855] italic uppercase tracking-tighter">
          Nova Ordem de Produção
        </h2>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl max-w-[1100px] mx-auto">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left">
            
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <User size={14} className="text-[#FFB800]" /> Cliente / Destino
              </label>
              <input 
                type="text" 
                placeholder="NOME DO CLIENTE"
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] font-bold text-[#002855] uppercase shadow-inner transition-all"
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <Package size={14} className="text-[#FFB800]" /> Produto
              </label>
              <input 
                type="text" 
                placeholder="DESCRIÇÃO DO MATERIAL"
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] font-bold text-[#002855] uppercase shadow-inner transition-all"
                onChange={(e) => setFormData({...formData, productName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-400 ml-2 flex items-center gap-2 uppercase tracking-widest">
                  <Hash size={14} className="text-[#FFB800]" /> Qtd
                </label>
                <input 
                  type="number" 
                  className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] shadow-inner outline-none focus:border-[#FFB800]"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Unidade</label>
                <select 
                  className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] shadow-inner outline-none focus:border-[#FFB800] appearance-none cursor-pointer"
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                >
                  <option value="unidades">PÇ (UN)</option>
                  <option value="kg">KG</option>
                  <option value="metros">METROS</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <Calendar size={14} className="text-[#FFB800]" /> Prazo
              </label>
              <input 
                type="date" 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#002855] uppercase outline-none focus:border-[#FFB800]"
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 pt-8 border-t border-slate-50">
            <button className="flex-1 bg-white border-2 border-[#002855] text-[#002855] font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:bg-slate-50 transition-all">
              <Save size={20} /> REGISTRAR ORDEM
            </button>
            <button className="flex-1 bg-[#25D366] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:opacity-95 transition-all shadow-[#25D366]/20">
              <MessageSquare size={20} /> WHATSAPP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderView;
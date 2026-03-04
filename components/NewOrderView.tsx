import React, { useState } from 'react';
import { PlusCircle, Save, Trash2, Package, Layers, Ruler } from 'lucide-react';

const NewOrderView = () => {
  const [formData, setFormData] = useState({
    cliente: '',
    produto: '',
    quantidade: '',
    material: 'Aço Carbono',
    prioridade: 'Normal'
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-12 bg-[#FFB800] rounded-full"></div>
        <h2 className="text-3xl font-black text-[#002855] italic uppercase tracking-tighter">
          Nova Ordem de Produção
        </h2>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Campo Cliente */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Cliente / Destino</label>
              <input 
                type="text" 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855]"
                placeholder="Ex: SÓ AÇO DISTRIBUIDORA"
                onChange={(e) => setFormData({...formData, cliente: e.target.value})}
              />
            </div>

            {/* Campo Produto */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Descrição do Produto</label>
              <input 
                type="text" 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] focus:bg-white transition-all font-bold text-[#002855]"
                placeholder="Ex: Chapa de Aço 1/2"
                onChange={(e) => setFormData({...formData, produto: e.target.value})}
              />
            </div>

            {/* Quantidade */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Quantidade (Pçs/Kg)</label>
              <div className="relative">
                <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="number" 
                  className="w-full p-5 pl-14 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] font-bold text-[#002855]"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Prioridade */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nível de Urgência</label>
              <select className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#FFB800] font-bold text-[#002855] appearance-none">
                <option>Normal</option>
                <option className="text-orange-500 font-bold">Urgente</option>
                <option className="text-red-600 font-bold">Crítico / Parada de Máquina</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50 flex gap-4">
            <button type="button" className="flex-1 py-5 bg-[#002855] text-[#FFB800] font-black uppercase rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] transition-transform">
              <Save size={20} /> Registrar Ordem de Serviço
            </button>
            <button type="button" className="px-8 py-5 bg-slate-100 text-slate-400 font-black uppercase rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderView;
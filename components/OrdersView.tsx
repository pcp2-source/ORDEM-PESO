import React from 'react';
import { Search, Filter, MoreVertical, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const OrdersView = () => {
  const orders = [
    { id: '1042', cliente: 'SÓ AÇO MATRIZ', produto: 'Viga U 6"', status: 'Produção', cor: 'text-orange-500', bg: 'bg-orange-50' },
    { id: '1043', cliente: 'METALÚRGICA SILVA', produto: 'Chapa 1/4', status: 'Concluído', cor: 'text-green-600', bg: 'bg-green-50' },
    { id: '1044', cliente: 'CONSTRUTORA Teresina', produto: 'Tubo Quadrado', status: 'Urgente', cor: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="h-1 w-12 bg-[#FFB800] rounded-full"></div>
          <h2 className="text-3xl font-black text-[#002855] italic uppercase tracking-tighter">
            Gerenciamento de Ordens
          </h2>
        </div>
        <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 font-black text-[#002855] text-xs uppercase hover:bg-slate-50">
          <Filter size={16} /> Filtrar Lista
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente / Destino</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produto</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 font-black text-[#002855]">#{order.id}</td>
                <td className="p-6 font-bold text-slate-600">{order.cliente}</td>
                <td className="p-6 font-bold text-[#002855]">{order.produto}</td>
                <td className="p-6">
                  <span className={`px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-tighter ${order.bg} ${order.cor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-6 text-slate-300"><MoreVertical size={20} className="cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersView;
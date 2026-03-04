import React from 'react';
import { Search, Filter, MoreVertical, Clock, CheckCircle2, AlertCircle, Package, User, Calendar } from 'lucide-react';
import { ProductionOrder } from '../types';

interface Props {
  orders?: ProductionOrder[];
}

const OrdersView: React.FC<Props> = ({ orders = [] }) => {
  // Dados de exemplo caso a lista esteja vazia
  const demoOrders = [
    { id: '1042', clientName: 'SÓ AÇO MATRIZ', productName: 'Viga U 6"', priority: 'HIGH', status: 'Produção' },
    { id: '1043', clientName: 'METALÚRGICA SILVA', productName: 'Chapa 1/4', priority: 'LOW', status: 'Concluído' },
    { id: '1044', clientName: 'CONSTRUTORA TERESINA', productName: 'Tubo Quadrado', priority: 'URGENT', status: 'Atrasado' },
  ];

  const displayOrders = orders.length > 0 ? orders : [];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-1 w-12 bg-[#FFB800] rounded-full"></div>
          <div>
            <h2 className="text-3xl font-black text-[#002855] italic uppercase tracking-tighter leading-none">
              Gerenciamento de Ordens
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Monitoramento de Fluxo de Produção</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2 shadow-sm">
              <span className="text-[10px] font-black text-[#002855]">{displayOrders.length} ORDENS ATIVAS</span>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identificação</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente / Destino</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produto / Material</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Prioridade</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayOrders.length > 0 ? (
                displayOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6 font-black text-[#002855] text-sm">#{order.id.substring(0,6)}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <User size={14} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm uppercase">{order.clientName}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#FFB800]">
                          <Package size={14} />
                        </div>
                        <span className="font-bold text-[#002855] text-sm uppercase">{order.productName}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                       <PriorityBadge priority={order.priority} />
                    </td>
                    <td className="p-6 text-center">
                       <StatusBadge status={order.status} />
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-2 text-slate-300 hover:text-[#002855] transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Search size={40} className="text-slate-200" />
                      <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Nenhuma ordem encontrada no sistema</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const styles: any = {
    LOW: 'bg-slate-100 text-slate-500',
    MEDIUM: 'bg-blue-50 text-blue-600',
    HIGH: 'bg-orange-50 text-orange-600',
    URGENT: 'bg-red-50 text-red-600 animate-pulse',
  };
  return <span className={`px-3 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-tighter ${styles[priority] || styles.LOW}`}>{priority}</span>;
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 font-black text-[9px] uppercase tracking-tighter border border-emerald-100">
      {status || 'REGISTRADO'}
    </span>
  );
};

export default OrdersView;
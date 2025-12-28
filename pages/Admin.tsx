import React from 'react';
import { Package, Users, DollarSign, Activity } from 'lucide-react';

export const Admin: React.FC = () => {
  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Orders', val: '128', icon: Package, color: 'bg-blue-500' },
            { label: 'Total Revenue', val: '₹45,200', icon: DollarSign, color: 'bg-green-500' },
            { label: 'Customers', val: '1,204', icon: Users, color: 'bg-purple-500' },
            { label: 'Pending', val: '12', icon: Activity, color: 'bg-orange-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.val}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-800 font-semibold uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1,2,3,4,5].map((o) => (
                  <tr key={o} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">#ORD-{202300 + o}</td>
                    <td className="px-6 py-4">Ramesh Kumar</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${o === 1 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        {o === 1 ? 'Pending' : 'Delivered'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">₹{(o * 150) + 100}</td>
                    <td className="px-6 py-4">Oct {10 + o}, 2023</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

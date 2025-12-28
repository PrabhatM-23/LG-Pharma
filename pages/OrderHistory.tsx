import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Clock, ArrowRight, Truck, CheckCircle, MapPin } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

const TrackingStep = ({ status, currentStatus, label, date }: { status: string, currentStatus: OrderStatus, label: string, date?: string }) => {
  const steps = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentIndex = steps.indexOf(currentStatus);
  const thisIndex = steps.indexOf(status);
  const isCompleted = thisIndex <= currentIndex;
  const isCurrent = thisIndex === currentIndex;

  return (
    <div className="flex flex-col items-center relative z-10 w-20">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
        isCompleted ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-400'
      } ${isCurrent ? 'ring-4 ring-brand-100' : ''}`}>
        {isCompleted ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-slate-400 rounded-full"></div>}
      </div>
      <p className={`text-xs mt-2 text-center font-medium ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>{label}</p>
      {isCurrent && date && <p className="text-[10px] text-brand-600 font-bold">Est: {date}</p>}
    </div>
  );
};

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Package className="text-brand-600" /> My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Package size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No past orders found</h2>
            <p className="text-slate-500 mb-8">You haven't placed any orders yet.</p>
            <Link to="/products" className="inline-flex items-center gap-2 soft-3d-btn text-white px-8 py-3 rounded-xl font-bold">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Reverse orders to show latest first */}
            {[...orders].reverse().map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                   <div className="flex gap-6 text-sm">
                     <div>
                       <span className="block text-slate-500 font-medium">Order Placed</span>
                       <span className="block text-slate-800 font-bold">{order.date}</span>
                     </div>
                     <div>
                       <span className="block text-slate-500 font-medium">Total</span>
                       <span className="block text-slate-800 font-bold">₹{order.total}</span>
                     </div>
                     <div>
                       <span className="block text-slate-500 font-medium">Order ID</span>
                       <span className="block text-slate-800 font-bold">{order.id}</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                       order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                       order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                       'bg-blue-100 text-blue-700'
                     }`}>
                       {order.status}
                     </span>
                   </div>
                </div>
                
                {/* Order Body */}
                <div className="p-6">
                  {/* Tracking System Visualization */}
                  <div className="mb-8 bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <div className="flex items-center gap-2 mb-6 text-slate-700 font-bold">
                        <Truck size={20} className="text-brand-600" />
                        <span>Tracking: <span className="font-mono text-brand-700">{order.trackingId || 'N/A'}</span></span>
                        <span className="text-sm font-normal text-slate-500 ml-2">via {order.deliveryPartner}</span>
                    </div>
                    
                    <div className="relative flex justify-between">
                       {/* Connecting Line */}
                       <div className="absolute top-4 left-0 w-full h-1 bg-slate-200 -z-0"></div>
                       <div 
                         className="absolute top-4 left-0 h-1 bg-brand-500 -z-0 transition-all duration-500" 
                         style={{ width: order.status === 'Placed' ? '10%' : order.status === 'Packed' ? '35%' : order.status === 'Shipped' ? '60%' : order.status === 'Out for Delivery' ? '85%' : '100%' }}
                       ></div>

                       <TrackingStep status="Placed" currentStatus={order.status} label="Ordered" date={order.date} />
                       <TrackingStep status="Packed" currentStatus={order.status} label="Packed" />
                       <TrackingStep status="Shipped" currentStatus={order.status} label="Shipped" />
                       <TrackingStep status="Out for Delivery" currentStatus={order.status} label="Out for Delivery" />
                       <TrackingStep status="Delivered" currentStatus={order.status} label="Delivered" date={order.estimatedDelivery} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0 p-1">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="font-bold text-slate-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 text-sm text-slate-500 flex flex-wrap gap-4">
                     {order.paymentId && (
                        <div className="flex items-center gap-2">
                           <Clock size={14} /> Payment Ref: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">{order.paymentId}</span>
                        </div>
                     )}
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${order.paymentMethod === 'COD' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                        Payment Method: <span className="font-bold text-slate-700">{order.paymentMethod}</span>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
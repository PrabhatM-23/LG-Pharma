import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Clock, ArrowRight, Truck, CheckCircle, MapPin, Search, Map as MapIcon, ChevronDown, ChevronUp, MessageCircle, Smartphone } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

const TrackingStep = ({ status, currentStatus, label, date, time, location }: { status: string, currentStatus: OrderStatus, label: string, date?: string, time?: string, location?: string }) => {
  const steps = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentIndex = steps.indexOf(currentStatus);
  const thisIndex = steps.indexOf(status);
  const isCompleted = thisIndex <= currentIndex;
  const isCurrent = thisIndex === currentIndex;

  return (
    <div className="flex flex-col items-center relative z-10 w-24">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
        isCompleted ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-400'
      } ${isCurrent ? 'ring-4 ring-brand-100 shadow-lg scale-110' : ''}`}>
        {isCompleted ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-slate-400 rounded-full"></div>}
      </div>
      <p className={`text-xs mt-3 text-center font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>{label}</p>
      
      {isCompleted && (date || time) && (
        <div className="text-[10px] text-center mt-1 text-slate-500 bg-white/80 p-1 rounded backdrop-blur-sm border border-slate-100">
          <p className="font-semibold">{date}</p>
          <p>{time}</p>
          {location && <p className="text-brand-600 truncate max-w-[80px] mx-auto" title={location}>{location}</p>}
        </div>
      )}
    </div>
  );
};

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMapId, setExpandedMapId] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ).reverse(); // Latest first

  const toggleMap = (orderId: string) => {
    setExpandedMapId(expandedMapId === orderId ? null : orderId);
  };

  const resendMessage = (phone: string | undefined, orderId: string) => {
    if(!phone) {
        alert("No phone number associated with this order.");
        return;
    }
    alert(`Tracking details for ${orderId} resent to ${phone} via WhatsApp & SMS!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Package className="text-brand-600" /> My Orders
          </h1>
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search by Order ID or Product..." 
              className="w-full bg-white border border-slate-200 rounded-full py-3 pl-12 pr-4 outline-none focus:border-brand-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Package size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No orders found</h2>
            <p className="text-slate-500 mb-8">{searchTerm ? "Try a different search term." : "You haven't placed any orders yet."}</p>
            <Link to="/products" className="inline-flex items-center gap-2 soft-3d-btn text-white px-8 py-3 rounded-xl font-bold">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOrders.map((order) => {
               // Helper to find timeline item
               const getTimelineData = (status: string) => order.timeline?.find(t => t.status === status);
               
               return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                   <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
                     <div>
                       <span className="block text-slate-500 font-medium text-xs uppercase tracking-wider">Order Placed</span>
                       <span className="block text-slate-800 font-bold">{order.date}</span>
                     </div>
                     <div>
                       <span className="block text-slate-500 font-medium text-xs uppercase tracking-wider">Total</span>
                       <span className="block text-slate-800 font-bold">₹{order.total}</span>
                     </div>
                     <div>
                       <span className="block text-slate-500 font-medium text-xs uppercase tracking-wider">Order ID</span>
                       <span className="block text-slate-800 font-bold">{order.id}</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <button 
                       onClick={() => resendMessage(order.customerPhone, order.id)}
                       className="text-xs text-brand-600 hover:text-brand-800 flex items-center gap-1 font-medium bg-white border border-brand-200 px-3 py-1.5 rounded-full hover:bg-brand-50 transition-colors"
                       title="Resend Tracking Info"
                     >
                        <Smartphone size={14} /> SMS
                     </button>
                     <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
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
                  {/* Expected Delivery Banner */}
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                     <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-start md:items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                           <Clock size={20} />
                        </div>
                        <div>
                           <p className="text-green-800 font-bold text-lg">Arriving by {order.estimatedDelivery}</p>
                           <p className="text-green-600 text-sm">Your package is on its way.</p>
                        </div>
                     </div>
                  )}

                  {/* Tracking System Visualization */}
                  <div className="mb-8 bg-slate-50/50 rounded-xl p-6 border border-slate-100 relative overflow-hidden">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-8 text-slate-700">
                        <div className="flex items-center gap-2 font-bold">
                            <Truck size={20} className="text-brand-600" />
                            <span>Tracking ID: <span className="font-mono text-brand-700 bg-brand-50 px-2 py-1 rounded">{order.trackingId || 'N/A'}</span></span>
                        </div>
                        <button 
                          onClick={() => toggleMap(order.id)}
                          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                           <MapIcon size={16} /> {expandedMapId === order.id ? 'Hide Map' : 'View on Map'}
                           {expandedMapId === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>

                    {/* Map View Toggle */}
                    {expandedMapId === order.id && (
                       <div className="mb-8 h-64 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative animate-fade-in-down">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            scrolling="no" 
                            marginHeight={0} 
                            marginWidth={0} 
                            src="https://maps.google.com/maps?q=Varanasi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                          ></iframe>
                          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-2">
                             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live Status: {order.status}
                          </div>
                       </div>
                    )}
                    
                    <div className="relative flex justify-between px-2">
                       {/* Connecting Line */}
                       <div className="absolute top-4 left-0 w-full h-1 bg-slate-200 -z-0"></div>
                       <div 
                         className="absolute top-4 left-0 h-1 bg-brand-500 -z-0 transition-all duration-1000 ease-out" 
                         style={{ width: order.status === 'Placed' ? '10%' : order.status === 'Packed' ? '35%' : order.status === 'Shipped' ? '60%' : order.status === 'Out for Delivery' ? '85%' : '100%' }}
                       ></div>

                       <TrackingStep 
                         status="Placed" 
                         currentStatus={order.status} 
                         label="Ordered" 
                         date={getTimelineData('Placed')?.date || order.date} 
                         time={getTimelineData('Placed')?.time}
                         location={getTimelineData('Placed')?.location}
                       />
                       <TrackingStep 
                         status="Packed" 
                         currentStatus={order.status} 
                         label="Packed" 
                         date={getTimelineData('Packed')?.date} 
                         time={getTimelineData('Packed')?.time}
                         location={getTimelineData('Packed')?.location}
                       />
                       <TrackingStep status="Shipped" currentStatus={order.status} label="Shipped" />
                       <TrackingStep status="Out for Delivery" currentStatus={order.status} label="Out for Delivery" />
                       <TrackingStep status="Delivered" currentStatus={order.status} label="Delivered" date={order.status === 'Delivered' ? order.estimatedDelivery : undefined} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0 p-1">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-slate-500">Quantity: {item.quantity} × ₹{item.price}</p>
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
            )})}
          </div>
        )}
      </div>
    </div>
  );
};
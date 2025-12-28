import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, QrCode, Check, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import { COMPANY_INFO } from '../data';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) => {
  const [step, setStep] = useState<'cart' | 'details' | 'payment' | 'success'>('cart');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [txnId, setTxnId] = useState('');

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = total > 500 ? 0 : 50;
  const grandTotal = total + shipping;

  const handleBack = () => {
    if (step === 'details') setStep('cart');
    if (step === 'payment') setStep('details');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const verifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification
    if (txnId.length > 5) {
      setStep('success');
      setTimeout(() => {
        clearCart();
        setStep('cart');
        onClose();
      }, 4000);
    } else {
      alert("Please enter a valid Transaction ID");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            {(step === 'details' || step === 'payment') && (
              <button 
                onClick={handleBack} 
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                aria-label="Go Back"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-lg font-bold text-slate-900">
              {step === 'cart' && 'Shopping Cart'}
              {step === 'details' && 'Shipping Details'}
              {step === 'payment' && 'Secure Payment'}
              {step === 'success' && 'Order Placed'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
             {step === 'cart' && cart.length > 0 && (
                <button 
                  onClick={() => { if(window.confirm('Are you sure you want to clear your cart?')) clearCart(); }} 
                  className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors mr-1"
                >
                   Clear All
                </button>
             )}
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <p>Your cart is empty.</p>
                  <button onClick={onClose} className="mt-4 text-brand-600 font-bold hover:underline">Start Shopping</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-slate-50" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                          <p className="text-slate-500 text-xs">₹{item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brand-600"><Minus size={14} /></button>
                            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brand-600"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'details' && (
            <form id="shipping-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required type="text" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-brand-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input required type="tel" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-brand-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <textarea required rows={3} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-brand-500" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6 text-center">
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
                <p className="text-sm text-slate-600 mb-2">Total Amount to Pay</p>
                <p className="text-4xl font-bold text-brand-700">₹{grandTotal}</p>
              </div>
              
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center">
                <QrCode size={120} className="text-slate-800 mb-4" />
                <p className="font-mono bg-slate-100 px-3 py-1 rounded text-sm mb-2 select-all">{COMPANY_INFO.upiId}</p>
                <p className="text-xs text-slate-500">Scan QR or use UPI ID to pay</p>
                <p className="text-xs font-bold text-brand-600 mt-2">Lakshmi Ganga (L.G) Pharma</p>
              </div>

              <form onSubmit={verifyPayment} className="text-left">
                <label className="block text-sm font-medium text-slate-700 mb-1">Enter UPI Transaction ID (Reference No)</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. 3284xxxx9283" 
                  className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-brand-500 mb-4" 
                  value={txnId} 
                  onChange={e => setTxnId(e.target.value)} 
                />
                <button type="submit" className="w-full soft-3d-btn text-white py-3 rounded-xl font-bold shadow-lg">Verify & Complete Order</button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                <Check size={40} strokeWidth={4} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Successful!</h3>
              <p className="text-slate-600">Thank you for choosing Lakshmi Ganga Pharma.</p>
              <p className="text-sm text-slate-500 mt-4">Redirecting to home...</p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step !== 'success' && step !== 'payment' && cart.length > 0 && (
          <div className="border-t bg-slate-50 p-6 space-y-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-slate-900 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
            
            {step === 'cart' ? (
              <button onClick={() => setStep('details')} className="w-full soft-3d-btn text-white py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all flex justify-between items-center px-6">
                Checkout <ArrowRight size={20} />
              </button>
            ) : (
              <button form="shipping-form" type="submit" className="w-full soft-3d-btn text-white py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all">
                Proceed to Pay ₹{grandTotal}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
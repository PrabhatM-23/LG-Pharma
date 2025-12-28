import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, QrCode, Check, ArrowLeft, CreditCard, Wallet, Banknote, Truck } from 'lucide-react';
import { CartItem, Order } from '../types';
import { COMPANY_INFO } from '../data';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
}

type CheckoutStep = 'cart' | 'details' | 'payment-method' | 'payment-execute' | 'success';
type PaymentMethod = 'UPI' | 'Card' | 'COD';

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart, addOrder }) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  
  // Payment states
  const [txnId, setTxnId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = total > 500 ? 0 : 50;
  const grandTotal = total + shipping;

  const handleBack = () => {
    if (step === 'details') setStep('cart');
    if (step === 'payment-method') setStep('details');
    if (step === 'payment-execute') setStep('payment-method');
  };

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment-method');
  };

  const selectPaymentMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep('payment-execute');
  };

  const completeOrder = (paymentId?: string) => {
    // Generate Delivery info
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      items: [...cart],
      total: grandTotal,
      status: 'Placed',
      paymentMethod: selectedMethod || 'COD',
      paymentId: paymentId,
      trackingId: `TRK${Math.random().toString(36).substring(7).toUpperCase()}`,
      deliveryPartner: 'Express Herbal Logistics',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
    };
    
    addOrder(newOrder);

    setStep('success');
    setTimeout(() => {
      clearCart();
      setStep('cart');
      setTxnId('');
      setFormData({ name: '', phone: '', address: '' });
      setSelectedMethod(null);
      setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
      onClose();
    }, 4000);
  };

  const handleCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      completeOrder(`TXN_CARD_${Math.random().toString(36).substring(7)}`);
    }, 2000);
  };

  const handleCODConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        completeOrder();
    }, 1500);
  };

  const verifyUPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (txnId.length > 5) {
      completeOrder(txnId);
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
            {step !== 'cart' && step !== 'success' && (
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
              {step === 'payment-method' && 'Select Payment'}
              {step === 'payment-execute' && 'Complete Payment'}
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
            <form id="shipping-form" onSubmit={submitDetails} className="space-y-4">
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

          {step === 'payment-method' && (
            <div className="space-y-4">
               <p className="text-slate-600 text-sm mb-4">Choose how you would like to pay for your order of <span className="font-bold">₹{grandTotal}</span>.</p>
               
               <button onClick={() => selectPaymentMethod('UPI')} className="w-full bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-brand-500 hover:bg-brand-50 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-brand-200 group-hover:text-brand-700">
                      <QrCode size={20} />
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-slate-800">UPI / QR Code</p>
                       <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
                    </div>
                 </div>
                 <ArrowRight size={18} className="text-slate-300 group-hover:text-brand-600" />
               </button>

               <button onClick={() => selectPaymentMethod('Card')} className="w-full bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-brand-500 hover:bg-brand-50 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-brand-200 group-hover:text-brand-700">
                      <CreditCard size={20} />
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-slate-800">Credit / Debit Card</p>
                       <p className="text-xs text-slate-500">Visa, Mastercard, RuPay (via Razorpay/SBI)</p>
                    </div>
                 </div>
                 <ArrowRight size={18} className="text-slate-300 group-hover:text-brand-600" />
               </button>

               <button onClick={() => selectPaymentMethod('COD')} className="w-full bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-brand-500 hover:bg-brand-50 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-brand-200 group-hover:text-brand-700">
                      <Banknote size={20} />
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-slate-800">Cash on Delivery</p>
                       <p className="text-xs text-slate-500">Pay when you receive the order</p>
                    </div>
                 </div>
                 <ArrowRight size={18} className="text-slate-300 group-hover:text-brand-600" />
               </button>
            </div>
          )}

          {step === 'payment-execute' && selectedMethod === 'UPI' && (
            <div className="space-y-6 text-center">
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
                <p className="text-sm text-slate-600 mb-2">Total Amount to Pay</p>
                <p className="text-4xl font-bold text-brand-700">₹{grandTotal}</p>
              </div>
              
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center">
                <QrCode size={120} className="text-slate-800 mb-4" />
                <p className="font-mono bg-slate-100 px-3 py-1 rounded text-sm mb-2 select-all">{COMPANY_INFO.upiId}</p>
                <p className="text-xs text-slate-500">Scan QR or use UPI ID to pay</p>
              </div>

              <form onSubmit={verifyUPI} className="text-left">
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

          {step === 'payment-execute' && selectedMethod === 'Card' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-5 rounded-2xl shadow-lg mb-4 relative overflow-hidden">
                <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="flex justify-between mb-6">
                  <span className="font-bold text-lg">SBI Bank / Razorpay</span>
                  <Wallet size={24} />
                </div>
                <div className="mb-4">
                   <div className="text-xs opacity-70 mb-1">Card Number</div>
                   <div className="text-lg tracking-wider font-mono">{cardDetails.number || '#### #### #### ####'}</div>
                </div>
                <div className="flex justify-between">
                   <div>
                     <div className="text-xs opacity-70 mb-1">Card Holder</div>
                     <div className="font-medium">{cardDetails.name || 'YOUR NAME'}</div>
                   </div>
                   <div>
                     <div className="text-xs opacity-70 mb-1">Expires</div>
                     <div className="font-medium">{cardDetails.expiry || 'MM/YY'}</div>
                   </div>
                </div>
              </div>

              <form onSubmit={handleCardPayment} className="space-y-3">
                <input 
                  required type="text" placeholder="Card Number (16 digits)" maxLength={16}
                  className="w-full border p-3 rounded-lg outline-none focus:border-brand-500"
                  value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '')})}
                />
                <div className="flex gap-3">
                   <input 
                    required type="text" placeholder="MM/YY" maxLength={5}
                    className="w-1/2 border p-3 rounded-lg outline-none focus:border-brand-500"
                    value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                  />
                   <input 
                    required type="password" placeholder="CVV" maxLength={3}
                    className="w-1/2 border p-3 rounded-lg outline-none focus:border-brand-500"
                    value={cardDetails.cvv} onChange={e => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                  />
                </div>
                <input 
                  required type="text" placeholder="Card Holder Name"
                  className="w-full border p-3 rounded-lg outline-none focus:border-brand-500"
                  value={cardDetails.name} onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                />
                
                <button disabled={isProcessing} type="submit" className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-800 disabled:opacity-70 transition-colors mt-2">
                  {isProcessing ? 'Processing Secure Payment...' : `Pay ₹${grandTotal}`}
                </button>
              </form>
              <p className="text-xs text-center text-slate-400 mt-2 flex items-center justify-center gap-1"><ShieldCheck size={12}/> Secured by 256-bit Encryption</p>
            </div>
          )}

          {step === 'payment-execute' && selectedMethod === 'COD' && (
             <div className="text-center py-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                  <Truck size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cash on Delivery</h3>
                <p className="text-slate-600 mb-6 px-4">You will pay <span className="font-bold">₹{grandTotal}</span> in cash to the delivery agent upon receiving your order.</p>
                <button onClick={handleCODConfirm} disabled={isProcessing} className="w-full soft-3d-btn text-white py-3 rounded-xl font-bold shadow-lg">
                  {isProcessing ? 'Placing Order...' : 'Confirm Order'}
                </button>
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
        {step !== 'success' && step !== 'payment-execute' && step !== 'payment-method' && cart.length > 0 && (
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
                Proceed to Payment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
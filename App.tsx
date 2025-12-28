import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { CartModal } from './pages/CartModal';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { CartItem, Product } from './types';

// Simple placeholders for static pages to save file count
const DoctorDesk = () => <div className="p-20 text-center font-bold text-2xl text-slate-500">Doctor's Desk & Research Center (Coming Soon)</div>;
const Careers = () => <div className="p-20 text-center font-bold text-2xl text-slate-500">Careers Page (Coming Soon)</div>;
const Blog = () => <div className="p-20 text-center font-bold text-2xl text-slate-500">Health Blog (Coming Soon)</div>;

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <Layout cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products addToCart={addToCart} cart={cart} />} />
          <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} cart={cart} setCartOpen={setCartOpen} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor-desk" element={<DoctorDesk />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
      
      <CartModal 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        clearCart={clearCart}
      />
    </Router>
  );
};

export default App;

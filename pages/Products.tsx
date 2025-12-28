import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product, CartItem } from '../types';

interface ProductsProps {
  addToCart: (product: Product) => void;
  cart: CartItem[];
}

export const Products: React.FC<ProductsProps> = ({ addToCart, cart }) => {
  const isInCart = (id: string) => cart.some(item => item.id === id);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Herbal Products</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Explore our range of natural, safe, and scientifically formulated herbal remedies.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-100">
              <div className="relative bg-slate-100 rounded-2xl overflow-hidden mb-6 aspect-square">
                 {product.isNew && (
                   <span className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                     New Arrival
                   </span>
                 )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" 
                />
                <Link to={`/products/${product.id}`} className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              
              <div className="flex flex-col flex-grow">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{product.category}</span>
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-brand-600 transition-colors line-clamp-2">{product.name}</h3>
                </Link>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-2xl font-bold text-slate-900">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product.id)}
                    className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                      isInCart(product.id) 
                      ? 'bg-green-100 text-green-700 cursor-default' 
                      : 'bg-brand-900 text-white hover:bg-brand-800 shadow-lg shadow-brand-900/20 active:scale-95'
                    }`}
                  >
                    {isInCart(product.id) ? (
                      <><Check size={18} /> Added</>
                    ) : (
                      <><Plus size={18} /> Add</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { Product, CartItem } from '../types';

interface WishlistProps {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  addToCart: (product: Product) => void;
  cart: CartItem[];
}

export const Wishlist: React.FC<WishlistProps> = ({ wishlist, toggleWishlist, addToCart, cart }) => {
  const isInCart = (id: string) => cart.some(item => item.id === id);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500" /> My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 mb-8">Save items you want to buy later.</p>
            <Link to="/products" className="inline-flex items-center gap-2 soft-3d-btn text-white px-8 py-3 rounded-xl font-bold">
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                <Link to={`/products/${product.id}`} className="w-24 h-24 bg-slate-50 rounded-xl flex-shrink-0 p-2 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-500" />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/products/${product.id}`}><h3 className="font-bold text-slate-900 line-clamp-1 hover:text-brand-600">{product.name}</h3></Link>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{product.category}</p>
                    <p className="font-bold text-lg text-slate-900 mt-1">₹{product.price}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={isInCart(product.id)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-all ${
                        isInCart(product.id)
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-brand-900 text-white hover:bg-brand-800'
                      }`}
                    >
                      <ShoppingCart size={14} /> {isInCart(product.id) ? 'In Cart' : 'Add'}
                    </button>
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
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
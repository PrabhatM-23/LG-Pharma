import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Check, Droplet, Shield, Sprout, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data';
import { CartItem, Product } from '../types';

interface ProductDetailProps {
  addToCart: (product: Product) => void;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart, cart, setCartOpen }) => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const isInCart = product ? cart.some(item => item.id === item.id) : false;

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const handleBuyNow = () => {
    if (!isInCart) addToCart(product);
    setCartOpen(true);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <Link to="/products" className="inline-flex items-center text-slate-500 hover:text-brand-600 mb-8 font-medium">
          <ArrowLeft size={18} className="mr-2" /> Back to Products
        </Link>

        <div className="bg-white rounded-[2.5rem] p-6 lg:p-12 shadow-xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                 {/* Thumbnails placeholder - using same image */}
                 {[1,2,3].map((_, i) => (
                   <div key={i} className="bg-slate-50 rounded-xl p-2 cursor-pointer border border-transparent hover:border-brand-300">
                     <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                   </div>
                 ))}
              </div>
            </div>

            {/* Content Section */}
            <div>
              <span className="text-brand-600 font-bold tracking-wide uppercase text-sm bg-brand-50 px-3 py-1 rounded-full">{product.category}</span>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-4 mb-4">{product.name}</h1>
              
              <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
                <span className="text-slate-400 text-lg mb-1">inclusive of all taxes</span>
              </div>

              <div className="flex gap-4 mb-10">
                 <button 
                  onClick={handleBuyNow}
                  className="flex-1 soft-3d-btn text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-transform flex justify-center items-center gap-2"
                >
                   <ShoppingCart size={20} /> Buy Now
                </button>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={isInCart}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg border-2 transition-all flex justify-center items-center gap-2 ${
                    isInCart 
                    ? 'border-green-200 bg-green-50 text-green-700' 
                    : 'border-slate-200 text-slate-700 hover:border-brand-600 hover:text-brand-600'
                  }`}
                >
                   {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>

              <div className="prose prose-slate max-w-none mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Product Overview</h3>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
                {product.id === 'trace-1' && (
                  <p className="font-semibold text-brand-700 mt-2">USE TRACE, REDUCE STRESS — enjoy peaceful, mosquito-free surroundings every day.</p>
                )}
              </div>

              {product.benefits && (
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="text-brand-500" /> Key Benefits
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="text-slate-700 text-sm font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.ingredients && (
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Sprout className="text-brand-500" /> Key Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 shadow-sm">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

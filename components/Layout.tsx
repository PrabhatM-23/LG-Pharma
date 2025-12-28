import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Phone, Mail, MapPin, Heart, Package } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { CartItem, Product } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: Product[];
}

export const Layout: React.FC<LayoutProps> = ({ children, cart, cartOpen, setCartOpen, wishlist }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Top Bar */}
      <div className="bg-brand-900 text-white py-2 px-4 text-xs md:text-sm hidden sm:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> {COMPANY_INFO.phone}</span>
            <span className="flex items-center gap-1"><Mail size={14} /> {COMPANY_INFO.email}</span>
          </div>
          <div className="flex gap-4">
            <span>Quality is our identity</span>
            <span>|</span>
            <span>AYUSH Approved</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-white py-4 shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-brand-800 tracking-tight">Lakshmi Ganga</span>
              <span className="text-sm md:text-base font-semibold text-brand-600 -mt-1">(L.G) Pharma</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
              <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
              <Link to="/products" className="hover:text-brand-600 transition-colors">Products</Link>
              <Link to="/about" className="hover:text-brand-600 transition-colors">About Us</Link>
              <Link to="/doctor-desk" className="hover:text-brand-600 transition-colors">Doctor's Desk</Link>
              <Link to="/contact" className="hover:text-brand-600 transition-colors">Contact</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:border-brand-500 transition-colors">
                <input type="text" placeholder="Search medicines..." className="bg-transparent outline-none text-sm w-48 text-slate-700" />
                <Search size={18} className="text-slate-400" />
              </div>

              <Link to="/orders" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-800" title="My Orders">
                <Package size={24} />
              </Link>

              <Link to="/wishlist" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-800" title="My Wishlist">
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-brand-800"
                title="Cart"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden p-2 text-slate-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-xl absolute w-full left-0 top-full">
            <Link to="/" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100">Home</Link>
            <Link to="/products" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100">Products</Link>
            <Link to="/orders" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100 flex items-center gap-2">My Orders</Link>
            <Link to="/wishlist" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100 flex items-center gap-2">Wishlist <span className="bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full text-xs">{wishlist.length}</span></Link>
            <Link to="/about" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100">About Us</Link>
            <Link to="/doctor-desk" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-100">Research</Link>
            <Link to="/contact" className="text-lg font-medium text-slate-700 py-2">Contact</Link>
            <div className="flex items-center bg-slate-100 rounded-lg px-4 py-3 mt-2">
                <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
                <Search size={18} className="text-slate-400" />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Lakshmi Ganga (L.G) Pharma</h3>
              <p className="text-sm leading-relaxed mb-6 text-slate-400">
                {COMPANY_INFO.description}
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-brand-500 transition-colors"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-brand-500 transition-colors"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-brand-500 transition-colors"></div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
                <li><Link to="/products" className="hover:text-brand-400 transition-colors">Products</Link></li>
                <li><Link to="/quality" className="hover:text-brand-400 transition-colors">Quality & Certifications</Link></li>
                <li><Link to="/blog" className="hover:text-brand-400 transition-colors">Health Tips</Link></li>
                <li><Link to="/careers" className="hover:text-brand-400 transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Products</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/products" className="hover:text-brand-400 transition-colors">Herbal Repellents</Link></li>
                <li><Link to="/products" className="hover:text-brand-400 transition-colors">Herbal Syrups</Link></li>
                <li><Link to="/products" className="hover:text-brand-400 transition-colors">Herbal Oils</Link></li>
                <li><Link to="/products" className="hover:text-brand-400 transition-colors">Immunity Boosters</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-brand-500 mt-1 flex-shrink-0" size={18} />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-brand-500 flex-shrink-0" size={18} />
                  <span>{COMPANY_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-brand-500 flex-shrink-0" size={18} />
                  <span>{COMPANY_INFO.email}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Lakshmi Ganga (L.G) Pharma. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
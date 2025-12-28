import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Leaf, HeartPulse, Star } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS, BLOGS } from '../data';

export const Home: React.FC = () => {
  const featuredProduct = PRODUCTS[0]; // TRACE

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-800 text-sm font-semibold mb-6">
              Lakshmi Ganga (L.G) Pharma
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Pure Herbs. <br />
              <span className="text-brand-600">Proven Care.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              A trusted herbal pharmaceutical company offering natural, safe, and effective healthcare products inspired by Ayurveda and traditional herbal science.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="soft-3d-btn text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:-translate-y-1">
                View Products <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="bg-white text-slate-700 px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-slate-100">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-brand-900 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-400" size={32} />
              <div>
                <p className="font-bold text-lg">Certified & Trusted</p>
                <p className="text-sm text-brand-200">Herbal Pharma Company</p>
              </div>
            </div>
            <div className="h-8 w-px bg-brand-700 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <Leaf className="text-brand-400" size={32} />
              <div>
                <p className="font-bold text-lg">AYUSH Approved</p>
                <p className="text-sm text-brand-200">Compliant with Standards</p>
              </div>
            </div>
            <div className="h-8 w-px bg-brand-700 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <HeartPulse className="text-brand-400" size={32} />
              <div>
                <p className="font-bold text-lg">100% Herbal</p>
                <p className="text-sm text-brand-200">Safe & Effective Formulations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Highlight (TRACE) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-100 rounded-full blur-2xl opacity-50 transform scale-90"></div>
              <img src={featuredProduct.image} alt="TRACE" className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform hover:scale-105 transition-transform duration-500" />
            </div>
            <div>
              <h2 className="text-brand-600 font-bold tracking-wide mb-2 uppercase text-sm">Star Product</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-6">{featuredProduct.name}</h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {featuredProduct.description}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Leaf size={16} />
                  </div>
                  <p className="font-medium">100% Herbal Formula</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <p className="font-medium">Safe for Children & Pets</p>
                </div>
              </div>
              <Link to={`/products/${featuredProduct.id}`} className="inline-block border-2 border-brand-600 text-brand-600 px-8 py-3 rounded-full font-bold hover:bg-brand-600 hover:text-white transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Product Range</h2>
            <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Herbal Repellents', 'Herbal Syrups', 'Herbal Oils'].map((category, idx) => (
              <div key={idx} className="group glass-card p-8 rounded-3xl hover:shadow-xl transition-all duration-300 cursor-pointer text-center soft-3d border-0">
                <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform text-brand-600">
                  {idx === 0 ? <ShieldCheck size={40} /> : idx === 1 ? <HeartPulse size={40} /> : <Leaf size={40} />}
                </div>
                <h3 className="text-xl font-bold mb-3">{category}</h3>
                <p className="text-slate-500 mb-6">Natural formulations for better health.</p>
                <Link to="/products" className="text-brand-600 font-semibold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                  View All <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Lakshmi Ganga (L.G) Pharma?</h2>
            <p className="text-brand-200">Quality, Trust, and Tradition combined.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {['100% Herbal', 'Scientifically Researched', 'Doctor Recommended', 'R&D Based', 'Quality Tested', 'Made in India'].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-500 mx-auto mb-4 flex items-center justify-center shadow-lg">
                   <Star size={20} className="text-white" />
                </div>
                <p className="font-medium text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Doctor's Trust & Customer Satisfaction</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
                <div className="text-4xl text-brand-200 absolute top-4 left-6">"</div>
                <p className="text-slate-600 italic mb-6 relative z-10 pt-4">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.author}</h4>
                    <p className="text-xs text-brand-600 uppercase font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Health Tips</h2>
              <p className="text-slate-500">Ayurveda-Based Articles for a better life.</p>
            </div>
            <Link to="/blog" className="text-brand-600 font-semibold hidden md:block">Read all articles</Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {BLOGS.map((blog) => (
              <div key={blog.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4">
                  <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-brand-600 text-sm font-bold uppercase tracking-wider">{blog.category}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2 group-hover:text-brand-700 transition-colors">{blog.title}</h3>
                <p className="text-slate-600 line-clamp-2">{blog.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

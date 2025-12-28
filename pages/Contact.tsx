import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Side */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-slate-600 text-lg mb-10">Have questions about our herbal products or want to partner with us? We'd love to hear from you.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Our Office</h3>
                  <p className="text-slate-600">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Phone</h3>
                  <p className="text-slate-600">{COMPANY_INFO.phone}</p>
                  <p className="text-sm text-slate-500">Mon-Sat 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Email</h3>
                  <p className="text-slate-600">{COMPANY_INFO.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl">
             <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
             <form className="space-y-4">
               <div className="grid md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-brand-500 transition-colors" placeholder="Your name" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                   <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-brand-500 transition-colors" placeholder="Mobile number" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                 <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-brand-500 transition-colors" placeholder="your@email.com" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                 <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-brand-500 transition-colors" placeholder="How can we help you?"></textarea>
               </div>
               <button type="submit" className="w-full soft-3d-btn text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 hover:shadow-xl transition-all">
                 Send Message <Send size={18} />
               </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

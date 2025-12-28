import React from 'react';
import { Target, Eye, Users, Award, History } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brand-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-brand-200 max-w-2xl mx-auto px-4">Herbal Solutions Rooted in Nature & Trust.</p>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-brand-500 pl-4">Company Overview</h2>
          <div className="prose prose-lg text-slate-600">
            <p className="mb-4">
              <span className="font-bold text-slate-900">Lakshmi Ganga (L.G) Pharma</span> is a growing Indian Ayurvedic company dedicated to providing nature-based and effective health solutions. We specialize in the development and manufacturing of high-quality Ayurvedic and herbal products that blend <span className="font-bold">traditional wisdom with modern scientific practices</span>.
            </p>
            <p className="mb-4">
              Founded in <span className="font-bold text-brand-700">November 2008</span> by <span className="font-bold text-slate-900">{COMPANY_INFO.founder}</span>, Lakshmi Ganga (L.G) Pharma began its journey as a small Ayurvedic medicine manufacturing unit. Over the years, we have steadily grown into a trusted name in the Ayurvedic pharmaceutical industry, building a legacy of <span className="font-bold">over 17 years</span>.
            </p>
            <p>
              We strive to deliver the best of Ayurveda by combining <span className="font-bold">ancient knowledge with modern innovation</span>, ensuring healthier lives for our customers.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-blue-600">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To become a leading herbal pharmaceutical brand delivering safe, effective, and natural healthcare solutions. The company focus on its power brands to enhance their visibility and distribution.
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-[2rem] border border-green-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-brand-600">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> Promote holistic health</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> Develop high-quality herbal medicines</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> Maintain global quality standards</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-500 rounded-full"></div> Serve society through natural healing</li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Core Values</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: Award, label: "Quality & Safety" },
                { icon: Eye, label: "Transparency" },
                { icon: History, label: "Innovation" },
                { icon: Users, label: "Trust" },
                { icon: Target, label: "Sustainability" }
              ].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl hover:-translate-y-2 transition-transform">
                  <val.icon className="text-brand-600 mb-4" size={32} />
                  <span className="font-bold text-slate-700">{val.label}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

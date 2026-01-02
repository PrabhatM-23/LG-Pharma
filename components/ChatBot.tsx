import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Order, Product } from '../types';

interface ChatBotProps {
  orders: Order[];
  products: Product[];
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ orders, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Namaste! I am your Lakshmi Ganga health assistant. Ask me about our herbal products or track your order.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Construct context for the AI
      const productContext = products.map(p => `${p.name} (₹${p.price}): ${p.description}`).join('\n');
      const orderContext = orders.length > 0 
        ? orders.map(o => `Order ID ${o.id}: Status ${o.status}, Total ₹${o.total}, Items: ${o.items.map(i => i.name).join(', ')}`).join('\n')
        : "User has no recent orders.";

      const systemPrompt = `
        You are a helpful customer support AI for "Lakshmi Ganga (L.G) Pharma", an Ayurvedic company.
        
        CONTEXT DATA:
        Here are our products:
        ${productContext}

        Here are the user's current orders:
        ${orderContext}

        INSTRUCTIONS:
        1. Keep answers short, polite, and helpful.
        2. If asked about order status, check the "User's current orders" section above.
        3. If asked about medical advice, recommend our products but suggest consulting a doctor for serious issues.
        4. If asked about delivery, mention we use "Express Herbal Logistics" and delivery usually takes 3-5 days.
        5. Provide prices in Rupees (₹).
      `;

      // Initialize Gemini with API Key from env
      // Ensure we use the latest key if it was updated via aistudio
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request right now.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);

    } catch (error: any) {
      console.error("AI Error:", error);
      
      // Handle "Requested entity was not found" which might indicate missing/invalid API key selection in specific environments
      if (error.message?.includes("Requested entity was not found") || error.toString().includes("Requested entity was not found")) {
        if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
           try {
             await (window as any).aistudio.openSelectKey();
             setMessages(prev => [...prev, { role: 'model', text: "I've refreshed your access key. Please ask your question again." }]);
             setIsLoading(false);
             return;
           } catch (keyError) {
             console.error("Key selection failed", keyError);
           }
        }
      }

      // Fallback logic
      let fallbackResponse = "I am having trouble connecting to the server. ";
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes('order') || lowerInput.includes('track') || lowerInput.includes('status')) {
        if (orders.length > 0) {
          const latest = orders[orders.length - 1];
          fallbackResponse = `Your latest order ${latest.id} is currently ${latest.status}.`;
        } else {
          fallbackResponse = "You don't have any orders yet.";
        }
      } else if (lowerInput.includes('product') || lowerInput.includes('price')) {
         fallbackResponse = "Please browse our Products page for the latest prices and herbal remedies.";
      } else {
         fallbackResponse += "Please try again later or contact support at +91-9876543210.";
      }

      setMessages(prev => [...prev, { role: 'model', text: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-600 text-white rounded-full shadow-lg hover:bg-brand-700 hover:scale-110 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden max-h-[500px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-brand-600 p-4 text-white flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">L.G Pharma Assistant</h3>
              <p className="text-xs text-brand-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl p-3 rounded-tl-none shadow-sm">
                  <Loader size={16} className="animate-spin text-brand-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="p-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FAQItem } from '@/types';
import { matchFAQ } from '@/lib/utils';

const SUGGESTED_PROMPTS = [
  'Admission procedure 2025–26',
  'School & office timings',
  'CBSE affiliation details',
  'Streams in Class XI & XII',
  'Bus / Transport facilities',
  'Fee structure & payment',
];

interface Message {
  sender: 'bot' | 'user';
  text: string;
  category?: string;
  isFallback?: boolean;
}

export default function FloatingAssistant({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Decent Public School, Rohini. How can I assist you today? You can ask about admissions, timings, curriculum, transport, or facilities.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query) return;

    // Add user message
    const userMsg: Message = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const match = matchFAQ(query, initialFaqs);

      if (match) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: match.answer,
            category: match.category,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: "I couldn't find an exact answer in our FAQ knowledge base for that query. Please feel free to contact our school office or submit an enquiry.",
            isFallback: true,
          },
        ]);
      }
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-navy-950 to-navy-900 text-white px-5 py-3.5 rounded-full shadow-2xl border border-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open School Assistant"
        >
          <div className="relative">
            <MessageSquare size={20} className="text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline text-amber-300">
            School Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[390px] h-[520px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white p-4 flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Bot size={20} />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-white leading-tight">DPS School Assistant</p>
                <p className="text-[11px] text-amber-300 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Predefined FAQ Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-navy-900 text-amber-400 flex items-center justify-center flex-shrink-0 text-xs mt-0.5 shadow-sm">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] text-xs sm:text-sm rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                  }`}
                >
                  {msg.category && (
                    <span className="inline-block text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                      {msg.category}
                    </span>
                  )}
                  <p>{msg.text}</p>

                  {msg.isFallback && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between text-xs font-bold text-navy-950 bg-amber-50 hover:bg-amber-100 p-2 rounded-lg transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Phone size={12} className="text-amber-600" /> Contact School Office
                        </span>
                        <ArrowRight size={12} />
                      </Link>
                      <Link
                        href="/admissions"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between text-xs font-bold text-navy-950 bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors"
                      >
                        <span>Submit Admission Enquiry</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 text-xs mt-0.5 shadow-sm">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-400 pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggested Prompt Chips */}
          <div className="px-3.5 py-2.5 bg-white border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <HelpCircle size={10} /> Suggested Questions:
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-600 rounded-full text-[11px] whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a question (e.g. fees, bus, timings)..."
              className="flex-1 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 bg-gradient-to-r from-navy-950 to-navy-900 text-amber-400 rounded-xl hover:bg-navy-900 disabled:opacity-40 transition-colors shadow-sm"
              aria-label="Send query"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  Phone,
  ArrowRight,
  Volume2,
  VolumeX,
  Globe,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { FAQItem } from '@/types';
import { matchFAQ } from '@/lib/utils';
import { useFAQs } from '@/lib/cms/useCMS';
import { WhatsAppHelpdeskModal } from './WhatsAppHelpdeskModal';

const SUGGESTED_PROMPTS_EN = [
  'Admission procedure 2025–26',
  'School & office timings',
  'CBSE affiliation details',
  'Streams in Class XI & XII',
  'Bus / Transport facilities',
  'Fee structure & payment',
];

const SUGGESTED_PROMPTS_HI = [
  'प्रवेश प्रक्रिया 2025–26 की जानकारी',
  'स्कूल और ऑफिस का समय क्या है?',
  'कक्षा 11वीं में कौन से स्ट्रीम हैं?',
  'स्कूल बस और ट्रांसपोर्ट की सुविधा',
  'फीस और भुगतान विवरण',
  'स्कूल का पता और संपर्क सूत्र',
];

const HINDI_KNOWLEDGE_BASE: Record<string, string> = {
  'admission':
    'सत्र 2025–26 के लिए प्री-स्कूल (नर्सरी) से कक्षा 11वीं तक प्रवेश खुले हैं। आप ऑनलाइन फॉर्म भर सकते हैं या स्कूल के एडमिशन डेस्क पर सुबह 8:30 से शाम 4:00 बजे तक संपर्क कर सकते हैं।',
  'timing':
    'छात्रों के लिए स्कूल का समय सुबह 7:30 बजे से दोपहर 2:00 बजे तक (सोमवार से शनिवार) है। एडमिशन एवं प्रशासनिक कार्यालय का समय सुबह 8:30 से शाम 4:00 बजे तक है।',
  'stream':
    'कक्षा 11वीं और 12वीं के लिए हम साइंस (PCM/PCB), कॉमर्स (मैथ्स के साथ/बिना मैथ्स) और ह्यूमैनिटीज़ (आर्ट्स) स्ट्रीम प्रदान करते हैं, जिसमें आधुनिक कंप्यूटर एवं रोबोटिक्स लैब्स शामिल हैं।',
  'fee':
    'फीस संरचना दिल्ली शिक्षा निदेशालय (DOE) एवं सीबीएसई के नियमों के अनुसार पारदर्शी है। फीस हर तिमाही जमा की जा सकती है। आप वेबसाइट पर स्मार्ट फीस कैलकुलेटर से अनुमान देख सकते हैं।',
  'bus':
    'स्कूल रोहिणी के सभी सेक्टरों (1 से 25), पीतमपुरा, प्रशांत विहार, शालीमार बाग और बाहरी दिल्ली के प्रमुख मार्गों पर जीपीएस (GPS) और सीसीटीवी युक्त सुरक्षित बस सेवा प्रदान करता है।',
  'contact':
    'डिसेंट पब्लिक स्कूल, सेक्टर 3, रोहिणी, नई दिल्ली 110085 (जयपुर गोल्डन हॉस्पिटल के पास)। संपर्क नंबर: 011-27948281 / +91 98188 99001।',
};

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  category?: string;
  isFallback?: boolean;
}

export default function FloatingAssistant({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const { faqs: liveFaqs } = useFAQs(initialFaqs);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Hello! Welcome to Decent Public School, Rohini. How can I assist you today? You can ask about admissions, timings, curriculum, transport, or fees in English or Hindi.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  const handleSend = (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query) return;

    const userMsg: Message = { id: 'msg-' + Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let category = 'School Assistant';
      let isFallback = false;

      const lowerQ = query.toLowerCase();

      if (language === 'hi') {
        if (lowerQ.includes('प्रवेश') || lowerQ.includes('एडमिशन') || lowerQ.includes('admission')) {
          botResponse = HINDI_KNOWLEDGE_BASE.admission;
        } else if (lowerQ.includes('समय') || lowerQ.includes('टाइम') || lowerQ.includes('timing')) {
          botResponse = HINDI_KNOWLEDGE_BASE.timing;
        } else if (lowerQ.includes('स्ट्रीम') || lowerQ.includes('11वीं') || lowerQ.includes('stream') || lowerQ.includes('विषय')) {
          botResponse = HINDI_KNOWLEDGE_BASE.stream;
        } else if (lowerQ.includes('फीस') || lowerQ.includes('fee')) {
          botResponse = HINDI_KNOWLEDGE_BASE.fee;
        } else if (lowerQ.includes('बस') || lowerQ.includes('ट्रांसपोर्ट') || lowerQ.includes('bus')) {
          botResponse = HINDI_KNOWLEDGE_BASE.bus;
        } else if (lowerQ.includes('पता') || lowerQ.includes('फोन') || lowerQ.includes('संपर्क') || lowerQ.includes('address')) {
          botResponse = HINDI_KNOWLEDGE_BASE.contact;
        } else {
          botResponse = 'नमस्ते! मुझे इस प्रश्न का सटीक उत्तर नहीं मिला। कृपया हमारे एडमिशन डेस्क (011-27948281) पर कॉल करें या सीधे व्हाट्सएप पर संदेश भेजें।';
          isFallback = true;
        }
      } else {
        const match = matchFAQ(query, liveFaqs);
        if (match) {
          botResponse = match.answer;
          category = match.category;
        } else {
          botResponse = "I couldn't find an exact answer in our FAQ database for that query. Please feel free to contact our admissions desk or connect with us on WhatsApp.";
          isFallback = true;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: botResponse,
          category,
          isFallback,
        },
      ]);
      setIsTyping(false);
    }, 400);
  };

  const suggestedPrompts = language === 'hi' ? SUGGESTED_PROMPTS_HI : SUGGESTED_PROMPTS_EN;

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        {/* Floating Trigger Button */}
        {!isOpen && (
          <div className="flex items-center gap-2">
            {/* WhatsApp Quick Button */}
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              title="Instant WhatsApp Helpdesk"
            >
              <MessageCircle className="w-6 h-6" />
            </button>

            {/* AI Assistant Button */}
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
              <span className="text-xs font-bold tracking-wide text-amber-300">
                AI School Assistant
              </span>
            </button>
          </div>
        )}

        {/* Chatbot Window */}
        {isOpen && (
          <div className="w-[92vw] sm:w-[380px] h-[500px] max-h-[75vh] sm:max-h-[78vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="bg-navy-950 px-4 py-3 text-white flex items-center justify-between border-b border-navy-900 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-inner">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-xs sm:text-sm leading-tight text-white">DPS Smart Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-amber-300 font-medium">Bilingual Helpdesk (EN / HI)</p>
                </div>
              </div>

              {/* Top Controls: Language & Close */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const nextLang = language === 'en' ? 'hi' : 'en';
                    setLanguage(nextLang);
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: 'lang-' + Date.now(),
                        sender: 'bot',
                        text:
                          nextLang === 'hi'
                            ? 'भाषा हिंदी में बदल दी गई है। आप प्रवेश, फीस, समय या बसों के बारे में कुछ भी पूछ सकते हैं।'
                            : 'Language switched to English. How can I assist you today?',
                      },
                    ]);
                  }}
                  className="px-2 py-1 rounded-lg bg-navy-900 border border-navy-800 text-[10px] font-bold text-amber-400 hover:bg-navy-800 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Switch Language"
                >
                  <Globe size={11} />
                  {language === 'en' ? 'हिंदी' : 'English'}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-navy-900 transition-colors cursor-pointer"
                  aria-label="Close Assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Intent Bar */}
            <div className="bg-amber-500/10 px-3 py-1.5 border-b border-amber-200/50 flex items-center justify-between text-[11px] text-amber-900 shrink-0">
              <span className="font-semibold flex items-center gap-1">
                <Sparkles size={12} className="text-amber-600" />
                {language === 'hi' ? 'त्वरित सहायता उपलब्ध' : 'Instant AI Answers'}
              </span>
              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="font-bold text-emerald-700 hover:underline flex items-center gap-1 text-[10px]"
              >
                <MessageCircle size={12} />
                WhatsApp Desk
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-navy-950 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={13} />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-navy-950 font-medium rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {msg.category && msg.sender === 'bot' && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 mb-1.5">
                        {msg.category}
                      </span>
                    )}

                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Audio Listen Button for Bot Messages */}
                    {msg.sender === 'bot' && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="text-[10px] text-slate-400 hover:text-amber-700 font-bold flex items-center gap-1"
                        >
                          <Volume2 size={12} />
                          {language === 'hi' ? 'उत्तर सुनें' : 'Listen Answer'}
                        </button>
                        {msg.isFallback && (
                          <button
                            onClick={() => setIsWhatsAppOpen(true)}
                            className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 hover:underline"
                          >
                            <MessageCircle size={12} />
                            WhatsApp Desk
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-6 h-6 rounded-full bg-navy-950 text-amber-400 flex items-center justify-center shrink-0">
                    <Bot size={13} />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Quick Chips */}
            <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] font-medium bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={language === 'hi' ? 'यहाँ अपना प्रश्न लिखें...' : 'Ask a question in English or Hindi...'}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-navy-950 p-2.5 rounded-xl transition-colors shrink-0 cursor-pointer shadow"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Helpdesk Modal */}
      <WhatsAppHelpdeskModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
    </>
  );
}

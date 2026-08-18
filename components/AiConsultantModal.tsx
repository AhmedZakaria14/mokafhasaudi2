'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Clock
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  suggestedActions?: string[];
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  selectedCity
}) => {
  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `أهلاً بك! أنا "المستشار الفني" لدى مؤسسة حصن المملكة لمكافحة الحشرات والوقاية البيئية بـ (${currentCityObj.name}). كيف يمكنني مساعدتك اليوم بخصوص نوع الحشرة، درجة خطورتها، أمان المبيدات، أو خطوات الإبادة؟`,
      suggestedActions: [
        'هل المبيد آمن على الأطفال والرضع؟',
        'كيف أكتشف النمل الأبيض بالأبواب؟',
        'علاج بق الفراش بدون رمي المراتب',
        'طلب فحص ومعاينة فورية'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          city: currentCityObj.name,
          pestIssue: textToSend
        })
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply || 'شكراً لتواصلك. فريقنا متواجد لخدمتك عبر الهاتف المباشر 0558141870.',
        suggestedActions: data.suggestedActions || ['طلب فحص فوري', 'التواصل عبر واتساب']
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'نحن في خدمتك على مدار الساعة في كافة مدن المملكة. يمكنك الاتصال بنا مباشرة على 0558141870 لمساعدتك فورياً.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[620px] max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 text-right overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black">مستشار الآفات الذكي (AI Consultant)</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  متصل الآن
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                استشارات فورية ومعتمدة علمياً لخدمة عملاء {currentCityObj.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-emerald-700 text-white rounded-br-none shadow-md'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold opacity-80">
                  {msg.role === 'user' ? (
                    <>
                      <User className="w-3 h-3" />
                      <span>أنت</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                      <span>مهندس حصن المملكة الذكي</span>
                    </>
                  )}
                </div>
                {msg.content}
              </div>

              {/* Suggested Quick Prompts if any */}
              {msg.suggestedActions && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                  {msg.suggestedActions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(act)}
                      className="text-[11px] font-medium bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-xl shadow-xs transition"
                    >
                      {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 p-3 rounded-2xl max-w-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>جاري تحليل المشكلة وتقديم التوصية الفنية...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="اكتب استفسارك هنا (مثلاً: ما علاج الصراصير الصغيرة بدون رائحة؟)..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
            />

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl transition flex items-center gap-1 cursor-pointer shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>مبيدات معتمدة SFDA وبلدي</span>
            </span>
            <a
              href="tel:0558141870"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>اتصال مباشر: 0558141870</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

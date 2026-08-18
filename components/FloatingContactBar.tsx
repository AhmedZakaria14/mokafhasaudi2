'use client';

import React from 'react';
import {
  PhoneCall,
  MessageSquare,
  Calculator,
  ShieldCheck
} from 'lucide-react';

interface FloatingContactBarProps {
  onOpenCalculator: () => void;
  onOpenAiConsultant: () => void;
  selectedCity: string;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({
  onOpenCalculator,
  onOpenAiConsultant,
  selectedCity
}) => {
  return (
    <>
      {/* Desktop Floating Badges (Left Side) */}
      <div className="hidden lg:flex fixed left-5 bottom-6 z-40 flex-col gap-2.5">
        {/* WhatsApp Floating button */}
        <a
          href={`https://wa.me/966558141870?text=${encodeURIComponent(
            `السلام عليكم، أود الاستفسار عن خدمة مكافحة الحشرات في (${selectedCity}) مع الضمان.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-2xl shadow-lg transition duration-150"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <div className="text-right">
            <div className="text-xs font-bold">خدمة العملاء (واتساب)</div>
            <div className="text-[10px] text-emerald-200 font-medium">رد مباشر 24/7</div>
          </div>
        </a>

        {/* Direct Call Floating button */}
        <a
          href="tel:0558141870"
          className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-2xl shadow-lg transition duration-150"
        >
          <PhoneCall className="w-5 h-5 text-amber-400" />
          <div className="text-right">
            <div className="text-xs font-bold font-mono" dir="ltr">0558141870</div>
            <div className="text-[10px] text-slate-300">الخط الساخن للفرق الميدانية</div>
          </div>
        </a>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-center">
          {/* Quick Calculator */}
          <button
            onClick={onOpenCalculator}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-[11px] font-bold cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span>حاسبة السعر</span>
          </button>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/966558141870?text=${encodeURIComponent(
              `السلام عليكم، أرغب بحجز موعد مكافحة حشرات في (${selectedCity}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 transition text-[11px] font-bold"
          >
            <MessageSquare className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span>واتساب سريع</span>
          </a>

          {/* Call button */}
          <a
            href="tel:0558141870"
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-emerald-700 text-white shadow-sm transition text-[11px] font-bold"
          >
            <PhoneCall className="w-4 h-4 mb-0.5" />
            <span>اتصال فوري</span>
          </a>
        </div>
      </div>
    </>
  );
};

'use client';

import React from 'react';
import {
  PhoneCall,
  MessageSquare,
  Calculator,
  ShieldCheck,
  Settings,
  Sparkles
} from 'lucide-react';

interface FloatingContactBarProps {
  onOpenCalculator: () => void;
  onOpenAiConsultant: () => void;
  onOpenSettings?: () => void;
  selectedCity: string;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({
  onOpenCalculator,
  onOpenAiConsultant,
  onOpenSettings,
  selectedCity
}) => {
  return (
    <>
      {/* 1. Desktop Floating Quick Badges (Left Side) */}
      <div className="hidden lg:flex fixed left-5 bottom-6 z-40 flex-col gap-2.5">
        {/* Settings button */}
        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 px-4 py-2.5 rounded-2xl shadow-lg border border-slate-200 transition duration-150 cursor-pointer"
            title="الإعدادات والتخصيص"
          >
            <Settings className="w-5 h-5 text-slate-600" />
            <div className="text-right">
              <div className="text-xs font-bold">التخصيص والمدينة</div>
              <div className="text-[10px] text-slate-500 font-medium">الفرع الحالي: {selectedCity}</div>
            </div>
          </button>
        )}

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

      {/* 2. Mobile Fixed Contact Bar - Perfect Phone Adaptability & Fixed Position */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_25px_rgba(0,0,0,0.1)] px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="grid grid-cols-4 gap-1.5 max-w-lg mx-auto text-center items-center">
          
          {/* Quick Settings & Customization */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-100/90 active:bg-slate-200 text-slate-700 transition cursor-pointer select-none"
            aria-label="الإعدادات والتخصيص"
          >
            <Settings className="w-4 h-4 text-slate-600 mb-0.5" />
            <span className="text-[10px] font-bold tracking-tight">التخصيص</span>
          </button>

          {/* Quick Calculator Tool */}
          <button
            type="button"
            onClick={onOpenCalculator}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-100/90 active:bg-slate-200 text-slate-700 transition cursor-pointer select-none"
            aria-label="حاسبة السعر"
          >
            <Calculator className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span className="text-[10px] font-bold tracking-tight">حاسبة السعر</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/966558141870?text=${encodeURIComponent(
              `السلام عليكم، أرغب بحجز موعد مكافحة حشرات في (${selectedCity}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-800 border border-emerald-200 transition select-none"
            aria-label="محادثة واتساب"
          >
            <MessageSquare className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span className="text-[10px] font-bold tracking-tight">واتساب</span>
          </a>

          {/* Call Immediate */}
          <a
            href="tel:0558141870"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-700 active:bg-emerald-800 text-white shadow-sm transition select-none"
            aria-label="اتصال فوري"
          >
            <PhoneCall className="w-4 h-4 mb-0.5 animate-pulse" />
            <span className="text-[10px] font-bold tracking-tight">اتصال فوري</span>
          </a>

        </div>
      </div>
    </>
  );
};

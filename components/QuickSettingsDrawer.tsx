'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  X,
  MapPin,
  Tag,
  Calculator,
  PhoneCall,
  MessageSquare,
  FileCheck2,
  ClipboardCheck,
  BookOpen,
  HelpCircle,
  Building2,
  Copy,
  Check,
  ShieldCheck,
  Sliders,
  Bell,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';
import Link from 'next/link';

interface QuickSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenCalculator: (coupon?: string) => void;
  onOpenAiConsultant: () => void;
}

export const QuickSettingsDrawer: React.FC<QuickSettingsDrawerProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
  onOpenCalculator,
  onOpenAiConsultant
}) => {
  const [activeTab, setActiveTab] = useState<'city' | 'tools' | 'offers' | 'shortcuts'>('city');
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Handle escape key and body scroll lock for app-like modal experience
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];
  const promoCode = 'SAUDI30';

  const handleCopyCoupon = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden text-right select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '-100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.9 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-r border-slate-200 pointer-events-auto"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700/80 flex items-center justify-center text-white">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-white flex items-center gap-1.5">
                      <span>لوحة التخصيص والإعدادات السريعة</span>
                    </h3>
                    <p className="text-[11px] text-slate-300">تخصيص مدينتك، الأدوات، والعروض الخاصة</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

          {/* Navigation Tabs inside Settings */}
          <div className="flex items-center border-b border-slate-200 bg-slate-50 px-3 pt-2 gap-1 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('city')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'city'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>المدينة والفرع</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'tools'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-700" />
              <span>الأدوات الهندسية</span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'offers'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>الكوبونات والخصم</span>
            </button>

            <button
              onClick={() => setActiveTab('shortcuts')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'shortcuts'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>روابط سريعة</span>
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Tab 1: City Customization */}
            {activeTab === 'city' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[10px]">الفرع الميداني النشط:</span>
                    <strong className="text-sm font-black text-emerald-900">{currentCityObj.name}</strong>
                    <span className="text-[11px] text-emerald-700 block">
                      منطقة {currentCityObj.regionName} ({currentCityObj.responseTimeMin} دقيقة وصول)
                    </span>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    تغيير المدينة الحالية لعرض الفرق المتاحة والأسعار المحلية:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SAUDI_CITIES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCity(c.id);
                        }}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-right border transition flex items-center justify-between cursor-pointer ${
                          selectedCity === c.id
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{c.name}</span>
                        <span
                          className={`text-[10px] font-mono ${
                            selectedCity === c.id ? 'text-emerald-200' : 'text-slate-400'
                          }`}
                        >
                          {c.responseTimeMin}د
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Smart Tools & Diagnostics */}
            {activeTab === 'tools' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-600 mb-1">
                  أدوات احترافية لحساب التكاليف وتشخيص نوع الحشرة والضمان:
                </div>

                {/* Calculator Tool */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenCalculator();
                  }}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50 hover:bg-emerald-50/50 transition text-right flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-900">
                      حاسبة التكلفة الفورية
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      احسب السعر الدقيق بناءً على نوع العقار، المساحة، والآفة المطلوبة.
                    </p>
                  </div>
                </button>

                {/* AI Pest Doctor */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenAiConsultant();
                  }}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50 hover:bg-emerald-50/50 transition text-right flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-900 flex items-center gap-1.5">
                      <span>المكتب الفني واستشارات الآفات</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">معاينة مجانية</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      تشخيص فوري للأعراض ونوع المبيد الأنسب مع الإرشادات الوقائية المعتمدة.
                    </p>
                  </div>
                </button>

                {/* Warranty Verification */}
                <Link
                  href="/#warranty-check"
                  onClick={onClose}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50 hover:bg-emerald-50/50 transition text-right flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-900">
                      فحص سريان الضمان الإلكتروني
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      تحقق من شهادة الضمان وطلب زيارات المتابعة الدورية المجانية.
                    </p>
                  </div>
                </Link>
              </div>
            )}

            {/* Tab 3: Promotional Offers & Coupons */}
            {activeTab === 'offers' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl p-4 text-white text-right space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                      كوبون نشط اليوم
                    </span>
                    <span className="text-xs text-emerald-300 font-bold">خصم 30% فوري</span>
                  </div>

                  <h4 className="font-black text-sm text-white">
                    كوبون عملاء الموقع الإلكتروني المعتمد
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    صالح للاستخدام في {currentCityObj.name} وكافة فروع المملكة مع جميع خدمات الرش والضمان.
                  </p>

                  <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl">
                    <span className="font-mono font-black text-amber-300 text-sm tracking-wider" dir="ltr">
                      {promoCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCoupon}
                      className="flex items-center gap-1 text-xs bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded-lg transition cursor-pointer"
                    >
                      {copiedCoupon ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الكوبون</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenCalculator(promoCode);
                    }}
                    className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl transition cursor-pointer"
                  >
                    تطبيق الكوبون في حاسبة السعر الآن
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Direct Navigation Shortcuts */}
            {activeTab === 'shortcuts' && (
              <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                <Link
                  href="/#services"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-900 transition"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>دليل خدمات المكافحة التخصصية</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/#pricing"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-900 transition"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <span>باقات الأسعار والضمانات المعتمدة</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/#commercial"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-900 transition"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <span>عقود المنشآت وتجديد الرخص المهنية</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/#pests-guide"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-900 transition"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>موسوعة الآفات وطرق المكافحة</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/blog"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-900 transition"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>المدونة والمقالات الهندسية</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/#faq"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-slate-900 transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-700" />
                    <span>الأسئلة المتكررة</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <a
              href="tel:0558141870"
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>الخط الساخن المباشر: 0558141870</span>
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  )}
</AnimatePresence>
  );
};

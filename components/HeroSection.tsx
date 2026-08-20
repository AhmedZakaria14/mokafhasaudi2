'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PhoneCall,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  MapPin,
  Building2,
  Home,
  HardHat,
  MessageSquare,
  Sparkles,
  Calculator,
  ChevronLeft,
  Users,
  Settings
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenCalculator: () => void;
  onOpenAiConsultant: () => void;
  onOpenSettings?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCity,
  onSelectCity,
  onOpenCalculator,
  onOpenAiConsultant,
  onOpenSettings
}) => {
  const currentCity = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  // Animated cycling offset through all cities in Saudi Arabia
  const [cycleOffset, setCycleOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCycleOffset((prev) => (prev + 1) % SAUDI_CITIES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPaused]);

  const baseIndex = Math.max(0, SAUDI_CITIES.findIndex((c) => c.id === selectedCity));
  const activeCityIndex = (baseIndex + cycleOffset) % SAUDI_CITIES.length;
  const activeAnimatedCity = SAUDI_CITIES[activeCityIndex] || currentCity;

  const [bookingTab, setBookingTab] = useState<'residential' | 'construction' | 'commercial'>('residential');
  const [selectedService, setSelectedService] = useState('مكافحة النمل الأبيض (الأرضة)');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    currentCity.featuredNeighborhoods[0] || ''
  );
  const [customerPhone, setCustomerPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 8) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setFormSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Right Column: Copy, Value Pillars & Primary CTAs */}
          <div className="lg:col-span-7 space-y-5 text-right">
            {/* Live City Badge & Dispatch Status */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-emerald-50 border border-emerald-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-950 shadow-xs">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <span className="text-emerald-900 font-bold">
                فريق الطوارئ الميداني متأهب الآن في {activeAnimatedCity.name}:
              </span>
              <span className="text-amber-800 font-extrabold font-mono bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
                وصول خلال {activeAnimatedCity.responseTimeMin} دقيقة
              </span>
            </div>

            {/* Main Headline with Smooth Emotional Animated Rotating City */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-[1.3] tracking-tight">
              شركة مكافحة حشرات ورش مبيدات معتمدة في{' '}
              <span
                className="inline-flex items-center align-baseline relative py-0.5 px-2 -mx-1 rounded-xl bg-emerald-50/70 border border-emerald-200/60 shadow-xs cursor-pointer select-none transition hover:bg-emerald-100/80"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => {
                  onSelectCity(activeAnimatedCity.id);
                  setCycleOffset((prev) => (prev + 1) % SAUDI_CITIES.length);
                }}
                title="انقر للتنقل السريع بين المدن والمناطق المشمولة"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeAnimatedCity.id}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)', scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(6px)', scale: 0.94 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block bg-gradient-to-l from-emerald-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent font-black underline decoration-amber-400 decoration-4 underline-offset-8"
                  >
                    {activeAnimatedCity.name}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Sub-headline / Trust Statement */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-medium">
              إبادة فورية وقضاء نهائي على النمل الأبيض (الأرضة)، الصراصير، بق الفراش، الفئران، وطرد الحمام
              بمبيدات ألمانية وآمنة 100% مصرحة من هيئة الغذاء والدواء SFDA مع شهادة ضمان رسمية حتى 15 سنة.
            </p>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:border-emerald-300 transition">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>مبيدات SFDA آمنة</span>
                </div>
                <div className="text-[11px] text-slate-500">بدون مغادرة المنزل وبدون روائح كريهة</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:border-emerald-300 transition">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs mb-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>شهادة ضمان رسمية</span>
                </div>
                <div className="text-[11px] text-slate-500">ضمان حقيقي حتى 15 سنة ومتابعة مجانية</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:border-emerald-300 transition">
                <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>اعتمادات الرقابة الصحية</span>
                </div>
                <div className="text-[11px] text-slate-500">عقود معتمدة لتجديد رخص المنشآت</div>
              </div>
            </div>

            {/* Primary Action Buttons (Streamlined & Clean) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* 1. Primary Urgent Action */}
              <a
                href="tel:0558141870"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>اتصال مباشر: 0558141870</span>
              </a>

              {/* 2. Secondary Direct Chat */}
              <a
                href="https://wa.me/966558141870"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-sm rounded-xl border border-emerald-300 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>محادثة واتساب فورية</span>
              </a>

              {/* 3. Settings & Secondary Tools Trigger (Progressive Disclosure) */}
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="px-4 py-3.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-emerald-900 border border-slate-300 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs"
                  title="فتح خيارات الحاسبة والضمان والإعدادات"
                >
                  <Settings className="w-4 h-4 text-slate-600" />
                  <span>الخيارات المتقدمة والحاسبة</span>
                </button>
              )}
            </div>

            {/* Track Record Stats */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-200 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">15+</div>
                <div className="text-[11px] text-slate-500">عاماً من الخبرة</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">48,000+</div>
                <div className="text-[11px] text-slate-500">عقار تمت إبادته</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-700 font-mono">13</div>
                <div className="text-[11px] text-slate-500">منطقة مخدومة</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-blue-700 font-mono">100%</div>
                <div className="text-[11px] text-slate-500">ضمان النتيجة</div>
              </div>
            </div>
          </div>

          {/* Left Column: Human-Crafted Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg relative text-right">
              {/* Card Header */}
              <div className="pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>مركز توجيه الفرق الميدانية والحجز</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    طلب معاينة وفحص مجاني في {currentCity.name}
                  </h3>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block">فريق متجول:</span>
                  <span className="text-xs font-bold text-amber-700">{currentCity.responseTimeMin} دقيقة</span>
                </div>
              </div>

              {/* Service Category Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setBookingTab('residential')}
                  className={`py-2 px-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                    bookingTab === 'residential'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-emerald-700" />
                  <span>منازل وفلل</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingTab('construction')}
                  className={`py-2 px-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                    bookingTab === 'construction'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HardHat className="w-3.5 h-3.5 text-emerald-700" />
                  <span>مشاريع بناء</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingTab('commercial')}
                  className={`py-2 px-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                    bookingTab === 'commercial'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>مطاعم وشركات</span>
                </button>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleQuickSubmit} className="space-y-3.5 text-xs">
                {/* City & Neighborhood */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                      المدينة:
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => onSelectCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      {SAUDI_CITIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                      الحي:
                    </label>
                    <select
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      {currentCity.featuredNeighborhoods.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                      <option value="حي آخر">حي آخر داخل المدينة</option>
                    </select>
                  </div>
                </div>

                {/* Pest Type */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                    الخدمة المطلوبة:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="مكافحة النمل الأبيض (الأرضة) وحقن الأبواب">
                      مكافحة النمل الأبيض (الأرضة) وحقن الأبواب والباركيه (ضمان 15 سنة)
                    </option>
                    <option value="تدفين خرساني للمباني قبل صبة النظافة">
                      تدفين خرساني للمشاريع قبل صبة النظافة
                    </option>
                    <option value="إبادة الصراصير بالمطابخ بالجل السويسري والألماني">
                      إبادة الصراصير بالمطابخ بالجل السويسري والألماني (بدون رائحة)
                    </option>
                    <option value="مكافحة بق الفراش بالبخار الحار والضباب">
                      مكافحة بق الفراش بالبخار الحار والضباب ULV
                    </option>
                    <option value="مكافحة الفئران ومحطات الطعوم الآمنة">
                      مكافحة الفئران ومحطات الطعوم الآمنة بدون روائح تحلل
                    </option>
                    <option value="تركيب شبك وطوارد الحمام والطيور">
                      تركيب شبك وأشواك ستانلس ستيل لطرد الحمام
                    </option>
                    <option value="رش العقارب والثعابين للمزارع والاستراحات">
                      رش العقارب والثعابين وحزام الأمان للمزارع والاستراحات
                    </option>
                    <option value="عقد مكافحة دوري معتمد للمطاعم والمنشآت">
                      عقد سنوي معتمد لتجديد رخص المنشآت والرقابة الصحية
                    </option>
                  </select>
                </div>

                {/* Customer Phone */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                    رقم الجوال لتأكيد الحجز وتوجيه الفني:
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="05XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none placeholder:text-slate-400"
                    required
                  />
                </div>

                {/* Perks banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>مشمول مجاناً مع طلبك اليوم:</span>
                  </div>
                  <div className="text-slate-600">
                    كشف ومسح حراري مجاني + حزام وقاية كيميائي للأسوار + خصم 30% لعملاء الموقع.
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>تأكيد الموعد وتوجيه أقرب فريق رش</span>
                </button>

                <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-2 pt-1">
                  <span>بياناتك محمية تماماً</span>
                  <span>•</span>
                  <span>لا يترتب أي رسوم على المعاينة الأولى</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

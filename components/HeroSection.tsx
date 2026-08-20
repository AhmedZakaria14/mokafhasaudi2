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
              <span>شركة مكافحة الحشرات والنمل الأبيض المعتمدة بـ</span>{' '}
              <span 
                className="inline-block relative min-w-[130px] sm:min-w-[170px] text-emerald-700 font-black cursor-pointer group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => onSelectCity(activeAnimatedCity.id)}
                title="انقر لتثبيت هذه المدينة وتصفح فروعها وأحيائها"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeAnimatedCity.id}
                    initial={{ y: 22, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -22, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="inline-block underline decoration-emerald-500/40 decoration-wavy underline-offset-8"
                  >
                    {activeAnimatedCity.name}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block mt-1 text-2xl sm:text-3xl lg:text-4xl text-slate-800 font-extrabold">
                إبادة فورية نهائية بضمان رسمي يصل إلى 15 عاماً
              </span>
            </h1>

            {/* Subtitle / Value proposition */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              مرخصون ومصرحون رسمياً من <strong className="text-slate-950 font-bold">هيئة الغذاء والدواء (SFDA)</strong> ووزارة الشؤون البلدية. نستخدم مبيدات ألمانية وأمريكية آمنة 100% بدون رائحة وبدون الحاجة لمغادرة المنزل، متواجدون في كافة مناطق ومدن المملكة بـ 54 مركز استجابة سريع.
            </p>

            {/* Micro Pillars Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 text-right shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-0.5">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>شهادة ضمان</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium">عقد إلكتروني معتمد</div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 text-right shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-0.5">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>مبيدات SFDA</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium">آمنة للأطفال وكبار السن</div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 text-right shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-0.5">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>استجابة فورية</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium">فرق متجولة 24/7</div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 text-right shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-0.5">
                  <HardHat className="w-4 h-4 shrink-0" />
                  <span>فنيون معتمدون</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium">خبرة متخصصة 12+ سنة</div>
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:0558141870"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-2xl transition shadow-md hover:shadow-lg transform active:scale-98"
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>اتصال مباشر: 0558141870</span>
              </a>

              <a
                href="https://wa.me/966558141870?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AD%D8%AC%D8%B2%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9%20%D9%84%D9%85%D9%83%D8%A7%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AD%D8%B4%D8%B1%D8%A7%D8%AA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-2xl transition shadow-md hover:shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                <span>واتساب فوري</span>
              </a>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-sm px-4 py-3.5 rounded-2xl transition shadow-xs cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>حاسبة الأسعار والضمان</span>
              </button>

              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="p-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-2xl transition shadow-xs cursor-pointer"
                  title="إعدادات الموقع وتخصيص البيانات"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Live Trust Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 text-xs text-slate-600">
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-800 font-mono">48,500+</div>
                <div className="text-[11px] text-slate-500">عملية إبادة ناجحة</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-800 font-mono">4.9 / 5.0</div>
                <div className="text-[11px] text-slate-500">تقييم 3,240+ عميل</div>
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

          {/* Left Column: Direct Dispatch & Booking Card */}
          <div className="lg:col-span-5 space-y-3">
            {/* Booking Card */}
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
                  <Building2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>مبانٍ وإنشاء</span>
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
                  <HardHat className="w-3.5 h-3.5 text-blue-700" />
                  <span>مطاعم وشركات</span>
                </button>
              </div>

              {/* Quick Booking Form */}
              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-black text-emerald-950">
                    تم استلام طلبك بنجاح!
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    يقوم مشرف الفرع في <span className="font-bold text-emerald-900">{currentCity.name}</span> بالتواصل معك هاتفياً خلال 5 دقائق لتأكيد وقت وصول الفريق الميداني.
                  </p>
                  <a
                    href="tel:0558141870"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>اتصال فوري بالطوارئ</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  {/* Select City / Region */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      المدينة / الفرع الميداني:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCity}
                        onChange={(e) => onSelectCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none appearance-none"
                      >
                        {SAUDI_CITIES.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name} ({city.region}) - استجابة {city.responseTimeMin} دقيقة
                          </option>
                        ))}
                      </select>
                      <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Select Service */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      نوع الخدمة أو الإصابة:
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="مكافحة النمل الأبيض (الأرضة)">مكافحة النمل الأبيض (الأرضة) - ضمان 15 سنة</option>
                      <option value="مكافحة بق الفراش والتبخير الشامل">مكافحة بق الفراش (تبخير نانو حراري)</option>
                      <option value="إبادة الصراصير بالمطابخ بالجل الألماني">إبادة الصراصير بالمطابخ (جل ألماني بدون رائحة)</option>
                      <option value="مكافحة القوارض والفئران">مكافحة القوارض والفئران ومحطات الطعوم</option>
                      <option value="مكافحة الحمام والطيور">تركيب أشواك وشباك طرد الحمام</option>
                      <option value="رش الدفان والأساسات قبل البناء">رش الدفان وصبة النظافة قبل البناء</option>
                      <option value="عقود مكافحة تجارية للمطاعم والمنشآت">عقود دورية وشهادات بلدي للمطاعم والمنشآت</option>
                    </select>
                  </div>

                  {/* Neighborhood / Area */}
                  {currentCity.featuredNeighborhoods.length > 0 && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        الحي / المنطقة في {currentCity.name}:
                      </label>
                      <select
                        value={selectedNeighborhood}
                        onChange={(e) => setSelectedNeighborhood(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      >
                        {currentCity.featuredNeighborhoods.map((n) => (
                          <option key={n} value={n}>
                            حي {n}
                          </option>
                        ))}
                        <option value="حي آخر">حي آخر (سيتم تحديده هاتفياً)</option>
                      </select>
                    </div>
                  )}

                  {/* Phone input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم الجوال لتأكيد الموعد:
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
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-950 space-y-1">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

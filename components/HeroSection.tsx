'use client';

import React, { useState } from 'react';
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
  Users
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenCalculator: () => void;
  onOpenAiConsultant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCity,
  onSelectCity,
  onOpenCalculator,
  onOpenAiConsultant
}) => {
  const currentCity = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  const [bookingTab, setBookingTab] = useState<'residential' | 'construction' | 'commercial'>('residential');
  const [selectedService, setSelectedService] = useState('مكافحة النمل الأبيض (الأرضة)');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    currentCity.featuredNeighborhoods[0] || ''
  );
  const [customerPhone, setCustomerPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 9) {
      alert('يرجى كتابة رقم جوال صحيح للتواصل الفوري');
      return;
    }

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setFormSubmitted(true);

    const typeLabel =
      bookingTab === 'residential'
        ? 'سكني (شقة / فيلا)'
        : bookingTab === 'construction'
        ? 'إنشائي (تدفين قبل الصبة)'
        : 'تجاري (مطعم / فندق / مستودع)';

    const message = encodeURIComponent(
      `السلام عليكم ورحمة الله،\nأرغب في حجز موعد رش ومكافحة آفات فوري:\n- التصنيف: ${typeLabel}\n- المدينة: ${currentCity.name}\n- الحي: ${selectedNeighborhood || 'غير محدد'}\n- الخدمة المطلوبة: ${selectedService}\n- رقم الجوال: ${customerPhone}\n\nيرجى تأكيد وصول الفريق الميداني وتطبيق خصم الموقع.`
    );
    window.open(`https://wa.me/966558141870?text=${message}`, '_blank');
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 pt-10 pb-16 lg:pb-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>المؤسسة الوطنية المعتمدة لمكافحة الآفات والوقاية الإنشائية</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-900 font-bold">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>ضمانات معتمدة تصل إلى 15 سنة</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1 text-emerald-800 font-semibold">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>سرعة الوصول في {currentCity.name}: <strong>{currentCity.responseTimeMin} دقيقة</strong></span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:inline text-slate-600">{currentCity.availableTeams} فرق ميدانية متجولة</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100/80 text-emerald-900 text-xs font-bold border border-emerald-200">
                <span>تغطية شاملة لجميع مدن ومحافظات المملكة العربية السعودية</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.3] tracking-tight">
                إبادة متكاملة للآفات وحقن النمل الأبيض{' '}
                <span className="text-emerald-700 underline decoration-emerald-500/40 decoration-wavy decoration-2">
                  بمبيدات معتمدة SFDA
                </span>{' '}
                وضمان رسمي حتى 15 سنة
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl pt-1">
                نعتمد منظومة الإدارة المتكاملة للآفات (IPM) بأحدث أجهزة الحقن الهيدروليكي والضباب البارد ULV. مبيدات ألمانية وأمريكية عديمة الرائحة وآمنة تماماً على الأطفال وكبار السن دون الحاجة لمغادرة المنزل أو إفراغ الأواني.
              </p>
            </div>

            {/* 3 Core Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>مبيدات مسجلة SFDA</span>
                </div>
                <div className="text-[11px] text-slate-500">مرخصة بيئياً وبدون رائحة أو إخلاء</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs mb-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>ضمان خطي موثق</span>
                </div>
                <div className="text-[11px] text-slate-500">ضمان حقيقي حتى 15 سنة ومتابعة مجانية</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>اعتمادات الرقابة الصحية</span>
                </div>
                <div className="text-[11px] text-slate-500">عقود معتمدة لتجديد رخص المنشآت</div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:0558141870"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>اتصال مباشر: 0558141870</span>
              </a>

              <a
                href="https://wa.me/966558141870"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-sm rounded-xl border border-emerald-300 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>محادثة واتساب فورية</span>
              </a>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-4 py-3.5 text-slate-700 hover:text-emerald-800 text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>حاسبة الأسعار التقديرية</span>
              </button>
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

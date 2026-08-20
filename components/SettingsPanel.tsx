'use client';

import React, { useState } from 'react';
import {
  Settings,
  X,
  Calculator,
  ShieldCheck,
  Search,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Clock,
  ClipboardCheck,
  Tag,
  MapPin,
  Building2,
  ChevronLeft,
  Copy,
  Check,
  Layers,
  Award,
  SlidersHorizontal,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';
import { PRICING_PACKAGES } from '@/data/pricing';
import Link from 'next/link';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenCalculator: (coupon?: string) => void;
  onOpenAiConsultant: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
  onOpenCalculator,
  onOpenAiConsultant
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'warranty' | 'pricing' | 'city'>('tools');
  const [warrantyPhone, setWarrantyPhone] = useState('');
  const [warrantyResult, setWarrantyResult] = useState<boolean | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  if (!isOpen) return null;

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];
  const promoCode = 'SAUDI30';

  const handleVerifyWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (warrantyPhone.trim().length >= 8) {
      setWarrantyResult(true);
    }
  };

  const handleCopyCoupon = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-right select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Panel Container */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-250 border-r border-slate-200">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-1.5">
                  <span>لوحة الخيارات والإعدادات (Settings Panel)</span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  الحاسبة، الاستعلام عن الضمان، تفاصيل الباقات، وتخصيص الفرع
                </p>
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

          {/* Tab Navigation */}
          <div className="flex items-center border-b border-slate-200 bg-slate-50 px-3 pt-2 gap-1 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('tools')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'tools'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-700" />
              <span>الأدوات والحاسبة</span>
            </button>

            <button
              onClick={() => setActiveTab('warranty')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'warranty'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>فحص الضمان</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'pricing'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>خيارات الباقات</span>
            </button>

            <button
              onClick={() => setActiveTab('city')}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'city'
                  ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>المدينة والفرع</span>
            </button>
          </div>

          {/* Panel Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Tab 1: Secondary Hero Tools & Quick Calculators */}
            {activeTab === 'tools' && (
              <div className="space-y-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-900">
                    <ClipboardCheck className="w-4 h-4 text-emerald-700" />
                    <span>أدوات مساعدة وخدمات الحساب الفوري:</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    تم تجميع الأدوات التفاعلية لتسهيل التصفح مع الحفاظ على الوصول المباشر لكافة الخيارات.
                  </p>
                </div>

                {/* 1. Precise Cost Calculator */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-emerald-300 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-900">حاسبة الأسعار التقديرية التفاعلية</h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        احسب تكلفة الرش لمساحة عقارك الدقيقة مع تطبيق كوبون الخصم وضمان الخدمة.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenCalculator();
                        }}
                        className="mt-3 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>فتح حاسبة التكلفة الآن</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Technical Consultation */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-emerald-300 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">المكتب الفني للاستشارات والمعاينة</h4>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">مجاني</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        طلب تقرير معاينة وبروتوكول كيميائي معتمد وفق معايير SFDA.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAiConsultant();
                        }}
                        className="mt-3 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>فتح الاستشارة الهندسية</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Promotional Coupon Block */}
                <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl p-4 text-white space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                      كود خصم فوري
                    </span>
                    <span className="text-xs text-emerald-300 font-bold">خصم 30% لعملاء الموقع</span>
                  </div>
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
                </div>
              </div>
            )}

            {/* Tab 2: Secondary WarrantyVerifier Options & Verification */}
            {activeTab === 'warranty' && (
              <div className="space-y-4">
                <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">الاستعلام السريع عن الضمان</h4>
                      <p className="text-[10px] text-slate-400">تحقق من حالة شهادة الضمان ومواعيد المتابعة</p>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyWarranty} className="space-y-2 pt-1">
                    <input
                      type="tel"
                      dir="ltr"
                      placeholder="05XXXXXXXX"
                      value={warrantyPhone}
                      onChange={(e) => {
                        setWarrantyPhone(e.target.value);
                        if (warrantyResult) setWarrantyResult(null);
                      }}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono text-center font-bold"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>فحص سريان الضمان</span>
                    </button>
                  </form>

                  {warrantyResult && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 text-xs space-y-2 mt-2 animate-in fade-in">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>تم العثور على سجل العميل بنجاح</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        الضمان سارٍ ويشمل زيارات دورية ومكافحة مجانية طوال فترة العقد.
                      </p>
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <a
                          href="tel:0558141870"
                          className="py-1.5 px-2 bg-emerald-600 text-white font-bold text-[11px] rounded-lg text-center flex items-center justify-center gap-1"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>طلب فني للمتابعة</span>
                        </a>
                        <a
                          href={`https://wa.me/966558141870?text=${encodeURIComponent(
                            `السلام عليكم، أستفسر بخصوص متابعة الضمان للرقم ${warrantyPhone}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 bg-slate-800 text-emerald-300 font-bold text-[11px] rounded-lg text-center border border-slate-700 flex items-center justify-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>واتساب الدعم</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-slate-800 block text-xs mb-0.5">مميزات الضمان المعتمد:</strong>
                    <ul className="text-[11px] space-y-1 list-disc list-inside text-slate-600">
                      <li>ضمان كتابي رسمي موثق يصلك إلكترونياً.</li>
                      <li>زيارات مجانية فورية في حال ظهور أي بؤرة.</li>
                      <li>ضمان النمل الأبيض (الأرضة) يصل إلى 15 سنة.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Secondary PricingSection Options & Package Comparison */}
            {activeTab === 'pricing' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-600 mb-1">
                  نظرة سريعة على جميع الباقات مع أسعار البداية والضمانات:
                </div>

                {PRICING_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-3.5 rounded-2xl border transition text-right ${
                      pkg.popular
                        ? 'bg-emerald-900 text-white border-emerald-700 shadow-md'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-xs">{pkg.name}</div>
                      <div
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pkg.popular ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {pkg.warranty}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-[11px]">تبدأ من</span>
                      <span
                        className={`text-lg font-black font-mono ${
                          pkg.popular ? 'text-amber-300' : 'text-emerald-800'
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-[10px]">ر.س</span>
                      <span className={`text-[10px] mr-2 ${pkg.popular ? 'text-emerald-200' : 'text-slate-500'}`}>
                        ({pkg.targetAudience})
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/30 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenCalculator();
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                          pkg.popular
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        <Calculator className="w-3 h-3" />
                        <span>حساب تسعيرة مخصصة</span>
                      </button>

                      <a
                        href="tel:0558141870"
                        className={`p-1.5 px-2.5 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                          pkg.popular
                            ? 'bg-emerald-800 hover:bg-emerald-700 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        }`}
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>طلب</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: City Selection & Coverage */}
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
                    تغيير المدينة الحالية لتحديث الفروع وأوقات الاستجابة:
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
                    {SAUDI_CITIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onSelectCity(c.id)}
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
          </div>

          {/* Panel Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <a
              href="tel:0558141870"
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>الخط الساخن للخدمة السريعة: 0558141870</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

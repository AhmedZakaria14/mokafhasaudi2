'use client';

import React, { useState } from 'react';
import { SAUDI_CITIES } from '@/data/regions';
import {
  Calculator,
  X,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Zap,
  Tag,
  Sparkles,
  Award,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CostCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: string;
  initialCouponCode?: string;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  isOpen,
  onClose,
  initialCity = 'riyadh',
  initialCouponCode = 'SAUDI30'
}) => {
  const [propertyType, setPropertyType] = useState('villa');
  const [pestType, setPestType] = useState('cockroaches');
  const [areaSqm, setAreaSqm] = useState(300);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [warrantyTier, setWarrantyTier] = useState('gold'); // silver, gold, permanent
  const [prevInitialCoupon, setPrevInitialCoupon] = useState(initialCouponCode);
  const [couponCode, setCouponCode] = useState(initialCouponCode);
  const [couponApplied, setCouponApplied] = useState(true);
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync initialCouponCode when changed without useEffect
  if (prevInitialCoupon !== initialCouponCode) {
    setPrevInitialCoupon(initialCouponCode);
    setCouponCode(initialCouponCode);
    setCouponApplied(true);
  }

  if (!isOpen) return null;

  // Pricing calculation algorithm
  const getBasePrice = () => {
    let base = 250;

    // Property factor
    switch (propertyType) {
      case 'apartment-small':
        base = 220;
        break;
      case 'apartment-large':
        base = 290;
        break;
      case 'floor':
        base = 350;
        break;
      case 'villa':
        base = 480;
        break;
      case 'mansion':
        base = 750;
        break;
      case 'restaurant':
        base = 450;
        break;
      case 'warehouse':
        base = 650;
        break;
      case 'construction-soil':
        base = 12 * Math.min(areaSqm, 2000);
        return base;
      default:
        base = 380;
    }

    // Pest multiplier
    let pestMultiplier = 1.0;
    if (pestType === 'termites') pestMultiplier = 1.6;
    if (pestType === 'bedbugs') pestMultiplier = 1.35;
    if (pestType === 'scorpions') pestMultiplier = 1.4;
    if (pestType === 'birds') pestMultiplier = 1.5;
    if (pestType === 'gardens') pestMultiplier = 1.3;

    // Area factor (above 300 sqm)
    let areaMultiplier = 1.0;
    if (areaSqm > 300 && propertyType !== 'construction-soil') {
      areaMultiplier = 1 + (areaSqm - 300) / 1000;
    }

    // Warranty multiplier
    let warrantyMultiplier = 1.0;
    if (warrantyTier === 'gold') warrantyMultiplier = 1.25; // includes 2 free followups
    if (warrantyTier === 'permanent') warrantyMultiplier = 1.8; // 15 years certified

    return Math.round(base * pestMultiplier * areaMultiplier * warrantyMultiplier);
  };

  const calculatedBase = getBasePrice();
  
  // Calculate discount rate based on active coupon
  const getDiscountPercent = () => {
    if (!couponApplied) return 0;
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'SAUDI30' || cleanCode === 'NEW2026' || cleanCode === 'HOSN30') {
      return 0.30;
    }
    return 0.20; // default 20%
  };

  const discountRate = getDiscountPercent();
  const finalPrice = Math.round(calculatedBase * (1 - discountRate));
  const savings = calculatedBase - finalPrice;

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (['SAUDI30', 'NEW2026', 'HOSN30', 'SAUDI2026', 'HOSN20'].includes(clean)) {
      setCouponApplied(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } else {
      alert('كوبون غير صالح. جرب كود (SAUDI30) للحصول على خصم 30% لعملاء الموقع');
      setCouponApplied(false);
    }
  };

  const handleBookQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 9) {
      alert('يرجى كتابة رقم جوال صحيح للتواصل');
      return;
    }

    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } catch {
      // ignore
    }

    setSubmitted(true);

    const msg = encodeURIComponent(
      `السلام عليكم، قمت بحساب التكلفة في موقع حصن المملكة:\n` +
      `- المدينة: ${currentCityObj.name}\n` +
      `- نوع العقار: ${propertyType}\n` +
      `- نوع الحشرة: ${pestType}\n` +
      `- المساحة: ${areaSqm} م²\n` +
      `- الباقة: ${warrantyTier === 'gold' ? 'الضمان الذهبي 12 شهر' : warrantyTier === 'permanent' ? 'ضمان 15 سنة' : 'الضمان الفضي'}\n` +
      `- التقدير بعد الخصم: ${finalPrice} ريال سعودي\n` +
      `- رقم جوالي: ${customerPhone}\n` +
      `أرغب بتثبيت الحجز وإرسال الفني.`
    );
    window.open(`https://wa.me/966558141870?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-right relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center justify-center text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">حاسبة الأسعار الفورية الذكية</h3>
              <p className="text-xs text-slate-300">
                احسب تكلفة الرش بدقة حسب مساحة عقارك ونوع الحشرة والضمان
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

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Step 1: Property Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              1. اختر نوع العقار أو المنشأة:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
              {[
                { id: 'apartment-small', label: 'شقة صغيرة (2-3 غرف)' },
                { id: 'apartment-large', label: 'شقة كبيرة / دور كامل' },
                { id: 'villa', label: 'فيلا دوبلكس / سكنية' },
                { id: 'mansion', label: 'فيلا كبيرة / قصر' },
                { id: 'restaurant', label: 'مطعم / كافيه / فندق' },
                { id: 'warehouse', label: 'مستودع / منشأة تجارية' },
                { id: 'construction-soil', label: 'تدفين أرض قيد الإنشاء' },
                { id: 'farm', label: 'استراحة / مزرعة / حديقة' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPropertyType(item.id)}
                  className={`p-2.5 rounded-xl border text-right transition ${
                    propertyType === item.id
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Pest Type & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                2. نوع الحشرة المستهدفة:
              </label>
              <select
                value={pestType}
                onChange={(e) => setPestType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
              >
                <option value="cockroaches">الصراصير (الألماني والأمريكي بالمطبخ والصرف)</option>
                <option value="termites">النمل الأبيض (الأرضة / الرمة) - ضمان 15 سنة</option>
                <option value="bedbugs">بق الفراش (بالبخار والضباب ULV)</option>
                <option value="rodents">الفئران والجرذان والقوارض</option>
                <option value="birds">طرد الحمام وشبك النوافذ والمكيفات</option>
                <option value="scorpions">العقارب والثعابين والزواحف</option>
                <option value="gardens">رش الناموس والذباب والحدائق</option>
                <option value="all-in-one">مكافحة شاملة لكافة الحشرات</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                3. المدينة:
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
              >
                {SAUDI_CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.regionName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Area Slider & Warranty Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>4. المساحة التقديرية:</span>
                <span className="text-emerald-700 font-black text-sm">{areaSqm} متر مربع</span>
              </div>
              <input
                type="range"
                min="80"
                max="1500"
                step="20"
                value={areaSqm}
                onChange={(e) => setAreaSqm(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>80 م² (شقة)</span>
                <span>500 م² (فيلا)</span>
                <span>1500 م² (قصر/مستودع)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                5. نوع باقة الضمان:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                <button
                  type="button"
                  onClick={() => setWarrantyTier('silver')}
                  className={`p-2 rounded-xl border transition ${
                    warrantyTier === 'silver'
                      ? 'bg-slate-200 border-slate-500 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  فضية (6 أشهر)
                </button>

                <button
                  type="button"
                  onClick={() => setWarrantyTier('gold')}
                  className={`p-2 rounded-xl border transition ${
                    warrantyTier === 'gold'
                      ? 'bg-amber-100 border-amber-500 text-amber-950 font-black ring-2 ring-amber-400/40'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  ذهبية (سنة VIP)
                </button>

                <button
                  type="button"
                  onClick={() => setWarrantyTier('permanent')}
                  className={`p-2 rounded-xl border transition ${
                    warrantyTier === 'permanent'
                      ? 'bg-emerald-100 border-emerald-600 text-emerald-950 font-black'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  ملكية (15 سنة)
                </button>
              </div>
            </div>
          </div>

          {/* Coupon Code Strip */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
              <Tag className="w-4 h-4 text-amber-600" />
              <span>كود الخصم الفعال: <strong className="text-amber-950 font-bold">SAUDI2026</strong> (خصم 20%)</span>
            </div>
            {couponApplied ? (
              <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تم تفعيل الخصم</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCouponApplied(true);
                  setCouponCode('SAUDI2026');
                }}
                className="text-xs text-emerald-700 font-bold underline"
              >
                تطبيق الخصم الآن
              </button>
            )}
          </div>

          {/* Pricing Result Card */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-950 text-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-500/40 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-emerald-800/60">
              <div className="text-center sm:text-right">
                <div className="text-xs text-emerald-300 font-semibold flex items-center justify-center sm:justify-start gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>السعر التقديري الشامل بعد الخصم:</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400">
                    {finalPrice}
                  </span>
                  <span className="text-sm font-bold text-slate-300">ريال سعودي</span>
                  {couponApplied && (
                    <span className="text-xs text-slate-400 line-through">
                      {calculatedBase} ريال
                    </span>
                  )}
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-emerald-400 font-bold mt-0.5">
                    وفرت: {savings} ريال سعودي اليوم!
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left text-xs text-slate-300 space-y-1 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    {warrantyTier === 'gold'
                      ? 'ضمان ذهبي 12 شهر مع زيارات مجانية'
                      : warrantyTier === 'permanent'
                      ? 'ضمان 15 سنة معتمد مع الفاتورة'
                      : 'ضمان فضي 6 أشهر'}
                  </span>
                </div>
                <div>المدينة: <strong>{currentCityObj.name}</strong></div>
                <div className="text-[11px] text-slate-400">سرعة وصول: {currentCityObj.responseTimeMin} دقيقة</div>
              </div>
            </div>

            {/* Quick Booking Phone Input inside result */}
            <form onSubmit={handleBookQuote} className="pt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  أدخل رقم جوالك لتأكيد هذا العرض واستلام الفني:
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="05XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white font-bold placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <span>تأكيد الحجز فوراً</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>✓ لا يلزم الدفع مقدماً (الدفع بعد الخدمة)</span>
                <span>✓ معاينة وفحص فوري مجاني</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

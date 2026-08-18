'use client';

import React, { useState, useEffect } from 'react';
import { SAUDI_CITIES } from '@/data/regions';
import {
  Flame,
  Clock,
  Tag,
  Copy,
  Check,
  Zap,
  PhoneCall,
  MessageSquare,
  Calculator,
  ShieldCheck,
  Sparkles,
  Gift,
  ArrowLeft,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LimitedTimeOfferBannerProps {
  selectedCity: string;
  onOpenCalculator: (couponCode?: string) => void;
}

export const LimitedTimeOfferBanner: React.FC<LimitedTimeOfferBannerProps> = ({
  selectedCity,
  onOpenCalculator
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
  });
  const [claimedCount, setClaimedCount] = useState(19);
  const maxCoupons = 25;

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];
  const promoCode = 'SAUDI30';

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 11, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClaimOffer = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
    onOpenCalculator(promoCode);
  };

  return (
    <section className="relative my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-emerald-900 border border-emerald-950 text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Right Side */}
          <div className="flex-1 text-center lg:text-right space-y-3">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                <span>عرض اليوم الحصري لعملاء الموقع</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-800 text-emerald-100 text-xs font-semibold">
                <span>تغطية فورية في {currentCityObj.name}</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                خصم 30% فوري على جميع خدمات الرش والمكافحة
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1.5 leading-relaxed">
                اطلب الآن عبر الموقع واحصل على <strong className="text-amber-300">معاينة وفحص هندسي مجاني</strong> + <strong className="text-amber-300">حزام حماية خارجي مجاناً</strong> وضمان رسمي معتمد حتى 15 سنة.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="bg-emerald-950/60 rounded-xl p-2.5 flex items-center gap-2 border border-emerald-800">
                <Gift className="w-4 h-4 text-amber-300 shrink-0" />
                <span>معاينة وكشف مجاني 100%</span>
              </div>
              <div className="bg-emerald-950/60 rounded-xl p-2.5 flex items-center gap-2 border border-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>ضمان كتابي وإعادة رش مجاني</span>
              </div>
              <div className="bg-emerald-950/60 rounded-xl p-2.5 flex items-center gap-2 border border-emerald-800 col-span-2 sm:col-span-1 justify-center sm:justify-start">
                <Zap className="w-4 h-4 text-amber-300 shrink-0" />
                <span>وصول خلال {currentCityObj.responseTimeMin} دقيقة</span>
              </div>
            </div>
          </div>

          {/* Left Side: Countdown & Coupon Action */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center lg:items-end gap-3">
            <div className="w-full sm:w-80 bg-white text-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-xs">
                <span className="flex items-center gap-1 text-slate-600 font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>ينتهي العرض خلال:</span>
                </span>
                <div className="flex items-center gap-1 font-mono font-bold text-xs" dir="ltr">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span>:</span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span>:</span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="my-3 p-2.5 bg-slate-50 border border-dashed border-emerald-600 rounded-xl flex items-center justify-between gap-2">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-semibold">كود الخصم الفوري:</div>
                  <div className="text-sm font-black font-mono text-emerald-800">{promoCode}</div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ الكود'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleClaimOffer}
                className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>تطبيق الخصم وحساب التكلفة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

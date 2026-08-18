'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PRICING_PACKAGES, PricingPackage } from '@/data/pricing';
import {
  CheckCircle2,
  ShieldCheck,
  Award,
  PhoneCall,
  ChevronLeft,
  Zap
} from 'lucide-react';

interface PricingSectionProps {
  onOpenCalculator: () => void;
  selectedCity: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenCalculator,
  selectedCity
}) => {
  return (
    <section id="pricing" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full inline-block">
            شفافية كاملة وباقات معتمدة
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">
            باقات مكافحة الحشرات والضمان المعتمد
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            اختر الباقة المناسبة لعقارك مع ضمان كتابي موثق وزيارات متابعة مشمولة طوال فترة السريان.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PACKAGES.map((pkg, idx) => {
            const isPopular = pkg.popular;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-3xl p-6 text-right flex flex-col justify-between transition-all duration-200 relative ${
                  isPopular
                    ? 'bg-emerald-900 text-white border-2 border-emerald-700 shadow-xl'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div
                    className={`absolute -top-3 right-6 text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm ${
                      isPopular
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      isPopular ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-xs mb-4 ${
                      isPopular ? 'text-emerald-100' : 'text-slate-500'
                    }`}
                  >
                    {pkg.targetAudience}
                  </p>

                  <div className="mb-4 pb-4 border-b border-slate-200/40">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-semibold">تبدأ من</span>
                      <span
                        className={`text-3xl font-black font-mono ${
                          isPopular ? 'text-amber-300' : 'text-emerald-800'
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-xs">ر.س</span>
                    </div>
                    <span
                      className={`text-[11px] block mt-1 ${
                        isPopular ? 'text-emerald-200' : 'text-slate-500'
                      }`}
                    >
                      {pkg.period}
                    </span>
                  </div>

                  {/* Warranty tag */}
                  <div
                    className={`p-2.5 rounded-xl text-xs font-bold mb-4 flex items-center gap-1.5 ${
                      isPopular
                        ? 'bg-emerald-800/80 text-emerald-100'
                        : 'bg-emerald-50 text-emerald-900'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>الضمان: {pkg.warranty}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6 text-xs">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isPopular ? 'text-amber-300' : 'text-emerald-700'
                          }`}
                        />
                        <span
                          className={isPopular ? 'text-slate-100' : 'text-slate-700'}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="tel:0558141870"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm ${
                      isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>طلب هذه الباقة</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-300 px-5 py-2.5 rounded-xl transition cursor-pointer shadow-sm"
          >
            <span>هل مساحة عقارك كبيرة؟ استخدم حاسبة التكلفة الدقيقة</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

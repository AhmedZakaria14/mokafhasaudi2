'use client';

import React from 'react';
import {
  ShieldCheck,
  Building2,
  Award,
  FileCheck2,
  BadgeCheck,
  CheckCircle2
} from 'lucide-react';

export const AccreditationStrip: React.FC = () => {
  const accreditations = [
    {
      title: 'الهيئة العامة للغذاء والدواء (SFDA)',
      subtitle: 'مبيدات ألمانية وأمريكية مرخصة ومسجلة رسمياً للسلامة والصحة',
      badge: 'اعتماد رسمي',
      feature: 'مبيدات آمنة 100% وبدون رائحة'
    },
    {
      title: 'وزارة البلديات والإسكان',
      subtitle: 'عقود وشهادات إلكترونية فورية للمنشآت وتجديد رخص الأنشطة',
      badge: 'مطابقة المعايير',
      feature: 'استيفاء اشتراطات الرقابة الصحية'
    },
    {
      title: 'كود البناء السعودي (SBC)',
      subtitle: 'معايير حقن النمل الأبيض والعزل الإنشائي قبل الصبة والخرسانات',
      badge: 'مطابق للكود',
      feature: 'حماية هيكلية متقدمة للمباني'
    },
    {
      title: 'شهادات الجودة والسلامة المهنية',
      subtitle: 'بروتوكولات الإدارة المتكاملة لمكافحة الآفات (IPM)',
      badge: 'معايير دولية',
      feature: 'إدارة متكاملة ومستدامة للآفات'
    }
  ];

  return (
    <section className="bg-slate-100 py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 px-3.5 py-1 rounded-full">
            معايير الجودة والاعتماد الوطني
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accreditations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-right flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {item.badge}
                  </span>
                  <BadgeCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <h4 className="font-black text-sm text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-emerald-900 font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{item.feature}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import {
  Check,
  X,
  ShieldCheck,
  Award,
  AlertTriangle,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisonItems = [
    {
      feature: 'اعتماد المبيدات من هيئة الغذاء والدواء SFDA',
      hosn: 'مبيدات أصلية 100% مسجلة ومصرحة بملف بيانات سلامة المادة (MSDS)',
      others: 'مبيدات مجهولة المصدر أو مركبة يدوياً تشكل خطراً على الأطفال',
      hosnPass: true
    },
    {
      feature: 'سند الضمان المكتوب ومتابعة الخدمة',
      hosn: 'ضمان كتابي موثق يصل إلى 15 سنة مع متابعات وزيارات مجانية',
      others: 'وعود شفهية أو أوراق غير ملزمة تنتهي بمجرد مغادرة العامل',
      hosnPass: true
    },
    {
      feature: 'مغادرة المنزل وإفراغ الأواني والمطبخ',
      hosn: 'لا تتطلب مغادرة المنزل إطلاقاً - مبيدات عديمة الرائحة وجل ألماني متطور',
      others: 'تتطلب مغادرة 3 إلى 5 أيام وتفريغ كافة محتويات الدواليب والأواني',
      hosnPass: true
    },
    {
      feature: 'تأهيل الفريق الفني والمهندسين',
      hosn: 'مهندسون وفنيون متخصصون ومدربون على أحدث بروتوكولات المكافحة',
      others: 'عمالة عشوائية غير مدربة تفتقر لجرعات التخفيف العلمية الصحيحة',
      hosnPass: true
    },
    {
      feature: 'الاشتراطات الفنية للمنشآت الغذائية',
      hosn: 'تقارير فنية دقيقة مطابقة لمعايير السلامة المهنية ونظام هاسب HACCP',
      others: 'افتقار للتقارير الفنية مما يعرض المنشأة لملاحظات وغرامات',
      hosnPass: true
    },
    {
      feature: 'الزيارات المجانية في حال ظهور أي حشرة',
      hosn: 'فريق طوارئ يصلك خلال 24 ساعة مجاناً دون دفع أي ريال إضافي',
      others: 'طلب مبالغ إضافية عن كل زيارة أو عدم الرد على الاتصالات',
      hosnPass: true
    }
  ];

  return (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            معايير الجودة والاعتماد
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">
            لماذا تختار مؤسسة حصن المملكة المعتمدة؟
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            مقارنة واقعية توضح الفارق الجذري بين المعالجة الهندسية المرخصة والعمالة غير المصنفة في السوق.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-slate-100 p-4 border-b border-slate-200 text-xs font-bold text-slate-700 text-right">
            <div className="col-span-5 sm:col-span-4">معيار الخدمة والأمان</div>
            <div className="col-span-4 sm:col-span-4 text-emerald-800 font-extrabold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>مؤسسة حصن المملكة المعتمدة</span>
            </div>
            <div className="col-span-3 sm:col-span-4 text-slate-500">
              العمالة غير المرخصة
            </div>
          </div>

          <div className="divide-y divide-slate-200 text-xs">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 items-center gap-2 hover:bg-white transition text-right"
              >
                <div className="col-span-5 sm:col-span-4 font-bold text-slate-900 leading-snug">
                  {item.feature}
                </div>

                <div className="col-span-4 sm:col-span-4 text-slate-700 leading-relaxed flex items-start gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{item.hosn}</span>
                </div>

                <div className="col-span-3 sm:col-span-4 text-slate-500 leading-relaxed flex items-start gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

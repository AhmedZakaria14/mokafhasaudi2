'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ScanSearch,
  FlaskConical,
  SprayCan,
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ArrowDown
} from 'lucide-react';

export const ProcessProtocol: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'الفحص والمسح الحراري الدقيق',
      desc: 'فحص ميكروي شامل لتحديد بؤر ومسارات الآفات وعش الملكة بالأجهزة الحرارية دون أي تكسير في الجدران أو البلاط.',
      icon: ScanSearch,
      highlight: 'معاينة مجانية شاملة'
    },
    {
      step: '02',
      title: 'تحديد الجرعة والمبيد المعتمد',
      desc: 'اختيار التركيبة الكيميائية المصرحة من هيئة الغذاء والدواء SFDA (ألمانية / أمريكية) حسب نوع الحشرة وطبيعة العقار.',
      icon: FlaskConical,
      highlight: 'مبيدات آمنة وبدون رائحة'
    },
    {
      step: '03',
      title: 'الحقن والرش الهيدروليكي ULV',
      desc: 'تنفيذ الرش التكتيكي والضباب البارد فائق الصغر لتغلغل المادة في أعمق الشقوق ومجاري الصرف والأركان المعزولة.',
      icon: SprayCan,
      highlight: 'بدون مغادرة المنزل'
    },
    {
      step: '04',
      title: 'التوثيق وإصدار شهادة الضمان',
      desc: 'تسليم العميل شهادة ضمان رسمية موثقة إلكترونياً بباركود تضمن إعادة الرش مجاناً طوال فترة الضمان حتى 15 عاماً.',
      icon: FileCheck2,
      highlight: 'ضمان رسمي موثق'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1 rounded-full inline-block">
            المنهجية الهندسية المعتمدة
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">
            بروتوكول المكافحة المتكاملة في 4 خطوات
          </h2>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed font-medium">
            نطبق نظام الإدارة المتكاملة للآفات (IPM) المعتمد دولياً لضمان القضاء الجذري من المصدر وعدم عودة الحشرات.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 relative text-right flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 group-hover:text-emerald-400 font-mono transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-emerald-900 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

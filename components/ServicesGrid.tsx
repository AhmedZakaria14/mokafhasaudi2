'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { PEST_SERVICES, ServiceItem } from '@/data/services';
import {
  ShieldCheck,
  Award,
  Clock,
  ChevronLeft,
  X,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Bug,
  Cpu,
  Feather,
  Flower2,
  Building,
  ShieldAlert,
  SlidersHorizontal,
  ArrowLeft,
  FileCheck2
} from 'lucide-react';

interface ServicesGridProps {
  onOpenCalculator: () => void;
  selectedCity: string;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onOpenCalculator,
  selectedCity
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'جميع الخدمات المعتمدة' },
    { id: 'termites', label: 'النمل الأبيض والإنشائي' },
    { id: 'residential', label: 'الصراصير وبق الفراش' },
    { id: 'wildlife', label: 'طرد الحمام والقوارض' },
    { id: 'farms', label: 'العقارب والمزارع' },
    { id: 'commercial', label: 'عقود الشركات والمنشآت' }
  ];

  const filteredServices = PEST_SERVICES.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'termites') return s.id === 'termites' || s.id === 'pre-construction';
    if (activeCategory === 'residential') return s.id === 'cockroaches' || s.id === 'bedbugs';
    if (activeCategory === 'wildlife') return s.id === 'birds' || s.id === 'rodents';
    if (activeCategory === 'farms') return s.id === 'scorpions' || s.id === 'agriculture';
    if (activeCategory === 'commercial') return s.id === 'commercial' || s.id === 'pre-construction';
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'Bug':
        return <Bug className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-rose-600" />;
      case 'Feather':
        return <Feather className="w-5 h-5 text-blue-600" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-emerald-600" />;
      case 'Building':
        return <Building className="w-5 h-5 text-emerald-700" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>خدمات هندسية متخصصة ومصرحة SFDA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            دليل خدمات المكافحة والإبادة الشاملة
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            نعتمد بروتوكولات مكافحة تخصصية لكل نوع من الآفات باستخدام مبيدات ألمانية وأمريكية مسجلة بهيئة الغذاء والدواء مع شهادات ضمان رسمية.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid with subtle entrance animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.45,
                  delay: (index % 4) * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 text-right"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <SafeImage
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    fallbackTitle={service.title}
                    fallbackCategory="خدمة معتمدة"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Badge on Image */}
                  <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40 flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{service.badgeText}</span>
                  </div>

                  {/* Warranty tag */}
                  <div className="absolute bottom-3 right-3 left-3 text-white">
                    <div className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>الضمان المعتمد: {service.warrantyPeriod}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shrink-0">
                        {getIcon(service.iconName)}
                      </div>
                      <h3 className="font-black text-base text-slate-900 group-hover:text-emerald-800 transition line-clamp-1">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-2 mb-3">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-200 text-[11px]">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="text-slate-600 font-medium">المبيد المعتمد:</span>
                        <span className="font-bold text-slate-900 line-clamp-1 max-w-[140px]">
                          {service.pesticideType.split(' ')[0]} {service.pesticideType.split(' ')[1]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="text-slate-600 font-medium">طريقة الرش:</span>
                        <span className="font-bold text-emerald-800">بدون إخلاء المنزل</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
                    <Link
                      href={`/services/${service.id}`}
                      className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 border border-emerald-300"
                    >
                      <span>صفحة الخدمة الكاملة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => setSelectedServiceModal(service)}
                      className="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs rounded-xl transition font-semibold cursor-pointer border border-slate-200"
                      title="معاينة سريعة"
                    >
                      تفاصيل
                    </button>

                    <a
                      href="tel:0558141870"
                      className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition flex items-center justify-center shadow-sm"
                      title="طلب فوري بالهاتف"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner with Fast Quote Trigger */}
        <div className="mt-14 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white text-right flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-emerald-700/60 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>فحص مجاني بدون أي التزام</span>
            </div>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
              هل تحتاج <span className="text-amber-300 underline decoration-amber-400/80 decoration-2 underline-offset-4">معاينة هندسية خاصة</span> لمشروعك أو فيلتك؟
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/95 leading-relaxed font-medium">
              مهندسونا المختصون جاهزون لفحص موقعك مجاناً بالأجهزة الحرارية وتقديم تقرير معتمد بنوع الحشرة والمبيد المناسب وخطة الإبادة المضمونة مع الضمان الرسمي.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto shrink-0 relative z-10">
            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>احسب السعر الدقيق</span>
              <ChevronLeft className="w-4 h-4" />
            </button>

            <a
              href="tel:0558141870"
              className="w-full sm:w-auto px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال مباشر: 0558141870</span>
            </a>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedServiceModal(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320, mass: 0.85 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-5 sm:p-6 text-slate-900 shadow-2xl relative text-right overflow-hidden max-h-[90vh] overflow-y-auto z-10 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-4 left-4 sm:top-5 sm:left-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  {getIcon(selectedServiceModal.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                    {selectedServiceModal.badgeText}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {selectedServiceModal.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {selectedServiceModal.fullDesc}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                  <span className="text-slate-500 block mb-1">المبيد الكيميائي المستخدم:</span>
                  <span className="text-emerald-800 font-bold">{selectedServiceModal.pesticideType}</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                  <span className="text-slate-500 block mb-1">مدة الضمان المعتمد:</span>
                  <span className="text-amber-800 font-bold">{selectedServiceModal.warrantyPeriod}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-slate-900 mb-2">مميزات التنفيذ وضمان الجودة:</div>
                {selectedServiceModal.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200">
                <a
                  href={`tel:0558141870`}
                  className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>طلب الفني فوراً: 0558141870</span>
                </a>

                <a
                  href={`https://wa.me/966558141870?text=${encodeURIComponent(
                    `السلام عليكم، أود حجز موعد لخدمة ${selectedServiceModal.title} مع تطبيق خصم الموقع.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl border border-slate-800 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>محادثة واتساب مباشرة</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

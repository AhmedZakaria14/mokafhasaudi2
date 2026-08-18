'use client';

import React, { useState } from 'react';
import { PEST_SERVICES, ServiceItem } from '@/data/services';
import {
  ShieldAlert,
  Feather,
  Bug,
  Sparkles,
  Cpu,
  Building,
  Calculator,
  PhoneCall,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X,
  ArrowLeft
} from 'lucide-react';

interface QuickServicesSidebarProps {
  onOpenCalculator: () => void;
  selectedCity?: string;
}

export const QuickServicesSidebar: React.FC<QuickServicesSidebarProps> = ({
  onOpenCalculator,
  selectedCity = 'الرياض'
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);

  // The most requested quick services
  const featuredServices = [
    {
      id: 'termites',
      title: 'النمل الأبيض (الأرضة)',
      tag: 'ضمان 15 سنة',
      icon: ShieldAlert,
      color: 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-200',
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
      price: 'تبدأ من 450 ر.س'
    },
    {
      id: 'birds',
      title: 'طرد الحمام والطيور',
      tag: 'شبك ستانلس غير قابل للصدأ',
      icon: Feather,
      color: 'text-blue-800 bg-blue-50 hover:bg-blue-100 border-blue-200',
      badgeColor: 'bg-blue-100 text-blue-900 border border-blue-300',
      price: 'تبدأ من 250 ر.س'
    },
    {
      id: 'cockroaches',
      title: 'إبادة الصراصير',
      tag: 'جل ألماني بدون رائحة',
      icon: Bug,
      color: 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
      price: 'تبدأ من 200 ر.س'
    },
    {
      id: 'bedbugs',
      title: 'مكافحة بق الفراش',
      tag: 'بخار فائق 180°C',
      icon: Sparkles,
      color: 'text-purple-800 bg-purple-50 hover:bg-purple-100 border-purple-200',
      badgeColor: 'bg-purple-100 text-purple-900 border border-purple-300',
      price: 'تبدأ من 300 ر.س'
    },
    {
      id: 'rodents',
      title: 'مكافحة الفئران',
      tag: 'محطات طعوم ذكية',
      icon: Cpu,
      color: 'text-rose-800 bg-rose-50 hover:bg-rose-100 border-rose-200',
      badgeColor: 'bg-rose-100 text-rose-900 border border-rose-300',
      price: 'تبدأ من 250 ر.س'
    },
    {
      id: 'commercial',
      title: 'عقود المنشآت والمطاعم',
      tag: 'عقود سنوية وزيارات دورية',
      icon: Building,
      color: 'text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border-emerald-300',
      badgeColor: 'bg-emerald-200 text-emerald-900 border border-emerald-400',
      price: 'عقود سنوية معتمدة'
    }
  ];

  const handleSelectService = (id: string) => {
    const serviceObj = PEST_SERVICES.find((s) => s.id === id);
    if (serviceObj) {
      setActiveServiceModal(serviceObj);
    } else {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Sticky Desktop Quick-Access Sidebar */}
      <aside
        aria-label="شريط الوصول السريع للخدمات"
        className="fixed top-1/2 -translate-y-1/2 right-3 z-40 hidden xl:flex flex-col items-end select-none"
      >
        {/* Toggle Collapse Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-1.5 p-1.5 rounded-lg bg-white text-slate-600 hover:text-slate-900 border border-slate-300 shadow-sm transition-transform hover:scale-105 cursor-pointer"
          title={isCollapsed ? 'إظهار شريط الخدمات' : 'تصغير الشريط'}
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4 text-emerald-700" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Sidebar Container */}
        {!isCollapsed && (
          <div className="bg-white border border-slate-300 rounded-2xl p-1.5 shadow-xl flex flex-col gap-1.5 w-[56px] items-center">
            {/* Header Mini Label */}
            <div className="text-[8px] font-bold text-slate-500 text-center uppercase tracking-wider py-0.5 border-b border-slate-100 w-full">
              الأكثر طلباً
            </div>

            {/* Quick Service Icons */}
            {featuredServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="relative group w-full flex justify-center"
                  onMouseEnter={() => setHoveredServiceId(service.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectService(service.id)}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 group-hover:scale-105 shadow-xs cursor-pointer ${service.color}`}
                    aria-label={service.title}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>

                  {/* Flyout Tooltip / Mini Card on Hover */}
                  {hoveredServiceId === service.id && (
                    <div
                      className="absolute right-[64px] top-1/2 -translate-y-1/2 w-60 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xl z-50 text-right pointer-events-none"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${service.badgeColor}`}>
                          {service.tag}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-bold">
                          {service.price}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {service.title}
                      </h4>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        انقر لمعاينة التفاصيل الهندسية ونوع المبيد المعتمد.
                      </p>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-800 font-semibold">
                        <span>معتمد من هيئة الغذاء SFDA</span>
                        <span className="flex items-center gap-0.5">
                          <span>عرض</span>
                          <ArrowLeft className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-full h-px bg-slate-200 my-0.5" />

            {/* Quick Price Calculator Trigger */}
            <div className="relative group w-full flex justify-center">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-10 h-10 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center transition-all duration-150 group-hover:scale-105 shadow-xs cursor-pointer"
                title="حاسبة الأسعار التقديرية"
              >
                <Calculator className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Urgent Call Trigger */}
            <div className="relative group w-full flex justify-center">
              <a
                href="tel:0558141870"
                className="w-10 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center transition-all duration-150 group-hover:scale-105 shadow-sm"
                title="اتصال مباشر: 0558141870"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </aside>

      {/* Service Details Modal */}
      {activeServiceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setActiveServiceModal(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl relative text-right overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveServiceModal(null)}
              className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                  {activeServiceModal.badgeText}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {activeServiceModal.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {activeServiceModal.fullDesc}
            </p>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                <span className="text-slate-500 block mb-1">المبيد المستخدم:</span>
                <span className="text-emerald-800 font-bold">{activeServiceModal.pesticideType}</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                <span className="text-slate-500 block mb-1">مدة الضمان المعتمد:</span>
                <span className="text-amber-800 font-bold">{activeServiceModal.warrantyPeriod}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-bold text-slate-900 mb-2">مميزات المعالجة في حصن المملكة:</div>
              {activeServiceModal.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200">
              <a
                href="tel:0558141870"
                className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>طلب الفني لخدمة {activeServiceModal.title}</span>
              </a>

              <a
                href={`https://wa.me/966558141870?text=${encodeURIComponent(
                  `السلام عليكم، أرغب في حجز خدمة ${activeServiceModal.title} مع تطبيق خصم الموقع.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-sm rounded-xl border border-slate-900 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>محادثة واتساب سريعة</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

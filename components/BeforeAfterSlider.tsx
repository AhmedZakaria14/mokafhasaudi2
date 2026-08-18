'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  PhoneCall
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  location: string;
  pest: string;
  pesticide: string;
  warranty: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  duration: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'معالجة تفشي النمل الأبيض (الأرضة) وحقن حلوق الأبواب',
    location: 'فيلا سكنية - حي النرجس، الرياض',
    pest: 'نمل أبيض خرساني (الأرضة)',
    pesticide: 'بايفلكس 25TC الأمريكي (مبيد معتمد SFDA)',
    warranty: '15 سنة مع شهادة رقمية',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'تم مسح كامل المبنى حرارياً وحقن أكثر من 40 فتحة ميكروية حول حلوق الأبواب والباركيه، مع القضاء التام على مستعمرة الملكة تحت البلاط.',
    duration: 'تم الإنجاز خلال ساعتين'
  },
  {
    id: '2',
    title: 'تطهير وإبادة صراصير المطبخ والمجاري بالجل الألماني',
    location: 'مطعم ومطبخ تجاري - حي الروضة، جدة',
    pest: 'الصراصير الألمانية والأمريكية',
    pesticide: 'جل ماكس فورس الألماني + ضباب ULV البارد',
    warranty: 'سنتان مع عقد بلدي رسمي',
    beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
    description: 'معالجة متقدمة لشاشات الفحص ومجاري الصرف دون الحاجة لإغلاق المطعم أو إخلاء المواد الغذائية مع الامتثال الكامل لاشتراطات أمانة جدة.',
    duration: 'تم الرش في الفترة الصباحية'
  },
  {
    id: '3',
    title: 'إبادة بق الفراش بتقنية البخار الجاف 180°C والضباب الدقيق',
    location: 'شقق فندقية مفروشة - حي الشاطئ، الدمام',
    pest: 'بق الفراش المقاوم للمبيدات التقليدية',
    pesticide: 'بخار مفرط السخونة + مركب بيرثرين بيولوجي',
    warranty: 'سنة كاملة مع زيارتين متابعة',
    beforeImg: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    description: 'القضاء الجذري على كافة أطوار الحشرة من البيوض واليرقات عبر الصدمة الحرارية ثم الرش الوقائي للحواف المنسوجة.',
    duration: 'إنجاز 12 جناح في يوم واحد'
  },
  {
    id: '4',
    title: 'تركيب شبك وأشواك طرد الحمام والطيور غير القابل للصدأ',
    location: 'برج سكني وتجاري - الخبر',
    pest: 'تجمعات الحمام والطيور على الواجهات والمكيفات',
    pesticide: 'أشواك ستانلس ستيل 316 + جل طارد شفاف',
    warranty: '10 سنوات ضد الصدأ وتغير العوامل الجوية',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'حماية كاملة للنوافذ والمكيفات والواجهات الزجاجية دون تشويه المنظر الجمالي للمبنى ومنع الروائح والفضلات نهائياً.',
    duration: 'تركيب هندسي متقن'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASE_STUDIES[activeCaseIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, position)));
  };

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const handleGlobalEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalEnd);
      window.addEventListener('touchmove', handleGlobalTouchMove);
      window.addEventListener('touchend', handleGlobalEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging]);

  return (
    <section className="py-20 bg-slate-100 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            توثيق ميداني حقيقي لنتائج المعالجة
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">
            شاهد الفرق: قبل وبعد المعالجة الهندسية
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            حرّك المقبض التفاعلي في المنتصف لمعاينة كفاءة الإبادة والتطهير الميداني على أرض الواقع في مختلف مناطق المملكة.
          </p>
        </div>

        {/* Case Studies Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CASE_STUDIES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
                activeCaseIndex === idx
                  ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-mono">
                {idx + 1}
              </span>
              <span>{item.title.split(' ')[0]} {item.title.split(' ')[1]} {item.title.split(' ')[2]}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Before/After Visual Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              className="relative h-[360px] sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-300 select-none cursor-ew-resize group bg-slate-900"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              {/* After Image (Full Background) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={activeCase.afterImg}
                  alt="بعد المعالجة"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-700/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500 shadow-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>بعد المعالجة والتطهير</span>
                </div>
              </div>

              {/* Before Image with Clip-Path */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`
                }}
              >
                <Image
                  src={activeCase.beforeImg}
                  alt="قبل المعالجة"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-rose-700/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-500 shadow-md flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>قبل المعالجة والرش</span>
                </div>
              </div>

              {/* Slider Divider Line & Thumb */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-800 border-2 border-emerald-700">
                  <div className="flex items-center gap-0.5 text-xs font-bold">
                    <ChevronRight className="w-3 h-3 -ml-1 text-slate-700" />
                    <ChevronLeft className="w-3 h-3 -mr-1 text-slate-700" />
                  </div>
                </div>
              </div>

              {/* Bottom Instruction Bar */}
              <div className="absolute bottom-3 inset-x-3 bg-slate-900/80 backdrop-blur-md rounded-xl p-2 text-center text-[11px] text-white pointer-events-none">
                اسحب المقبض يميناً ويساراً للمقارنة المباشرة
              </div>
            </div>
          </div>

          {/* Right: Technical Case Study Details */}
          <div className="lg:col-span-5 space-y-4 text-right">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2">
                  {activeCase.location}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {activeCase.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {activeCase.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500">نوع الآفة:</span>
                  <span className="text-rose-700 font-bold">{activeCase.pest}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500">المبيد المستخدم:</span>
                  <span className="text-emerald-800 font-bold">{activeCase.pesticide}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500">الضمان الصادر:</span>
                  <span className="text-amber-800 font-bold">{activeCase.warranty}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500">زمن التنفيذ:</span>
                  <span className="text-slate-800 font-mono font-bold">{activeCase.duration}</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-2">
                <a
                  href="tel:0558141870"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>طلب معاينة مماثلة لعقارك: 0558141870</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

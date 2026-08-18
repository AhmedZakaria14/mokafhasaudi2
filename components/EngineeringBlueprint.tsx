'use client';

import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Home,
  Wrench,
  Sparkles,
  ArrowLeft,
  PhoneCall
} from 'lucide-react';

interface ZoneDetail {
  id: string;
  name: string;
  zone: string;
  pests: string[];
  protocol: string;
  chemical: string;
  guarantee: string;
  highlight: string;
}

const ZONES: ZoneDetail[] = [
  {
    id: 'foundation',
    name: 'الأساسات والتربة الخرسانية',
    zone: 'تحت البلاط والخرسانة المسلحة',
    pests: ['النمل الأبيض (الأرضة)', 'حشرات التربة الرطبة'],
    protocol: 'حقن هيدروليكي ميكروي على عمق 50 سم بمسافات 80 سم حول الجدران الحاملة لتشكيل حزام كيميائي متصل.',
    chemical: 'بايفلكس 25TC الأمريكي (تركيز 0.05%)',
    guarantee: 'ضمان رسمي 15 سنة ضد النمل الأبيض',
    highlight: 'يحمي الباركيه والأثاث والأبواب الخشبية من التآكل الداخلي'
  },
  {
    id: 'kitchen',
    name: 'المطابخ والمستودعات الغذائية',
    zone: 'خلف الأفران، الثلاجات، ومفاصل الدواليب',
    pests: ['الصراصير الألمانية', 'سوس الدقيق والمؤن', 'النمل الأسود'],
    protocol: 'توزيع نقاط جل إغراء مستهدف (Baiting Points) بتقنية الميكرو-دوتس عديم الرائحة بدون إخلاء الأواني.',
    chemical: 'ماكس فورس الألماني + جل أدفنس السويسري',
    guarantee: 'سنتان مع شهادة مطابقة لسلامة الأغذية',
    highlight: 'آمن 100% على الأطعمة ومعدات الطهي ومطابق لاشتراطات بلدي'
  },
  {
    id: 'drainage',
    name: 'غرف التفتيش وشبكة الصرف',
    zone: 'البيارات، المصائد الأرضية، وخطوط الصرف الرئيسية',
    pests: ['الصراصير الأمريكية الكبيرة', 'الفئران والجرذان', 'البعوض والذباب'],
    protocol: 'توليد سحب ضباب كيميائي ساخن (Thermal Fogging) يملأ غرف التفتيش بالكامل مع محطات طعوم غير قابلة للبلل.',
    chemical: 'مبيدات فوسفورية عضوية مصرحة SFDA + مسحوق تعفير',
    guarantee: 'إبادة فورية 100% مع غلق مسارات التسلل',
    highlight: 'يقضي على بؤرة تكاثر الحشرات التي تصعد للحمامات والمطابخ'
  },
  {
    id: 'roof',
    name: 'الأسطح والواجهات وشبكات التكييف',
    zone: 'حواف المبنى، وحدات المكيفات الخارجية، والدكتات',
    pests: ['الحمام والطيور', 'فاش الطيور', 'العناكب'],
    protocol: 'تثبيت طوارد وأشواك ستانلس ستيل 316 المقاومة للحرارة مع شبك حماية مغلف بالبوليمر غير المرئي.',
    chemical: 'جل بوليمري طارد للحرارة بدون سموم',
    guarantee: '10 سنوات ضد الصدأ والعوامل الجوية',
    highlight: 'يمنع تراكم الفضلات والروائح وتلف وحدات التكييف المركزية'
  },
  {
    id: 'bedrooms',
    name: 'غرف النوم والمفروشات',
    zone: 'حواف المراتب، خلف اللوحات، وشقوق الباركيه',
    pests: ['بق الفراش', 'عتة الملابس', 'عث الغبار'],
    protocol: 'معالجة بالصدمة الحرارية المزدوجة بالبخار الجاف عند 180°C ثم رش ضبابي ميكروني بارد ULV.',
    chemical: 'مبيدات بيرثرين بيولوجية طبيعية عديمة الرائحة',
    guarantee: 'سنة كاملة مع زيارتي فحص مجانيتين',
    highlight: 'لا تترك أي بقع أو روائح وتسمح بالنوم في الغرفة بعد ساعة فقط'
  }
];

export const EngineeringBlueprint: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('foundation');
  const activeZone = ZONES.find((z) => z.id === selectedZoneId) || ZONES[0];

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            مخطط العزل والمكافحة الإنشائي
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">
            خريطة نطاقات المعالجة الشاملة للعقار
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            استكشف كيف يتعامل فريقنا الهندسي مع كل قطاع في المبنى وفق بروتوكولات مخصصة تضمن التحصين الكامل من الأساسات حتى السطح.
          </p>
        </div>

        {/* Blueprint Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Zone Selector Buttons */}
          <div className="lg:col-span-4 space-y-2 text-right">
            <div className="text-xs font-bold text-slate-500 pb-2 px-1">اختر القطاع لعرض خطة الرش:</div>
            {ZONES.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-xs text-emerald-700 font-mono mb-0.5">{zone.zone}</div>
                    <div className="text-sm font-bold text-slate-900">{zone.name}</div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Engineering Sheet */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-right">
              {/* Technical Header */}
              <div className="pb-4 mb-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>بروتوكول معتمد: {activeZone.name}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    نطاق {activeZone.zone}
                  </h3>
                </div>

                <div className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300">
                  {activeZone.guarantee}
                </div>
              </div>

              {/* Target Pests in this zone */}
              <div className="mb-5">
                <div className="text-xs font-bold text-slate-600 mb-2">الآفات المستهدفة في هذا النطاق:</div>
                <div className="flex flex-wrap gap-2">
                  {activeZone.pests.map((pest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-lg"
                    >
                      {pest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Methodological Protocol */}
              <div className="space-y-3 mb-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs font-bold text-emerald-800 mb-1.5 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-emerald-700" />
                    <span>آلية التنفيذ الميدانية:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeZone.protocol}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white border border-slate-200 rounded-2xl p-3.5">
                    <span className="text-slate-500 block mb-1">المبيد الكيميائي المصرح SFDA:</span>
                    <span className="text-emerald-800 font-bold">{activeZone.chemical}</span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-3.5">
                    <span className="text-slate-500 block mb-1">القيمة المضافة والأمان:</span>
                    <span className="text-slate-800 font-bold">{activeZone.highlight}</span>
                  </div>
                </div>
              </div>

              {/* CTA footer */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>معاينة فنية ومسح حراري مجاني لهذا النطاق</span>
                </div>

                <a
                  href="tel:0558141870"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>حجز فحص لهذا القطاع: 0558141870</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

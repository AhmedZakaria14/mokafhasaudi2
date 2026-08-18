'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    category: 'المبيدات والسلامة',
    q: 'هل المبيدات المستخدمة آمنة على الأطفال والنساء الحوامل والحيوانات الأليفة؟',
    a: 'نعم تماماً. جميع المبيدات التي نستخدمها مرخصة ومسجلة رسمياً لدى الهيئة العامة للغذاء والدواء بالمملكة العربية السعودية (SFDA) ومصنفة عديمة الرائحة وصديقة للبيئة. لا تترك أي انبعاثات ضارة ولا تتطلب غسيل الأواني أو مغادرة المنزل.'
  },
  {
    category: 'الضمان والزيارات',
    q: 'ما هي مدة الضمان المعتمد، وماذا يحدث في حال ظهور الحشرات مجدداً؟',
    a: 'نقدم ضمانات رسمية موثقة: تصل إلى 15 سنة للنمل الأبيض (الأرضة)، وسنة كاملة (الضمان الذهبي) للصراصير وبق الفراش والقوارض. في حال ظهور أي نشاط حشري خلال فترة الضمان، يلتزم فريقنا بالزيارة وإعادة المعالجة فوراً وبشكل مجاني 100% دون أي رسوم إضافية.'
  },
  {
    category: 'سرعة الوصول والتغطية',
    q: 'كم يستغرق وصول سيارة الرش والفني إلى موقعي في مدينتي؟',
    a: 'بفضل انتشار أكثر من 140 سيارة وفريق ميداني متجول في مختلف مناطق المملكة (الرياض، جدة، مكة، المدينة، الدمام، الخبر، الأحساء، القصيم، أبها، تبوك وغيرها)، يصل الفني خلال 25 إلى 35 دقيقة من تأكيد الطلب.'
  },
  {
    category: 'إجراءات التجهيز',
    q: 'هل يتطلب رش الصراصير أو النمل الأبيض إفراغ دواليب المطبخ أو الأثاث؟',
    a: 'لا يتطلب أي إفراغ لدواليب المطبخ أو الأواني. نستخدم تقنية الجل الألماني الميكروي ومكائن الضغط المركز الدقيق خلف النعلات ومفصلات الدواليب دون إحداث أي فوضى أو روائح.'
  },
  {
    category: 'عقود المنشآت والتراخيص',
    q: 'هل تصدرون شهادات وتقارير معتمدة لتجديد رخص الأنشطة والجهات الرقابية؟',
    a: 'نعم، مؤسستنا مرخصة ومصنفة رسمياً ومطابقة لاشتراطات وزارة الشؤون البلدية والقروية والإسكان، وتصدر شهادات معالجة إلكترونية وسجلات تفتيش رقمية مطابقة لمعايير الهاسب HACCP وISO لتجديد الرخص للمطاعم والمستودعات والشركات.'
  },
  {
    category: 'طرق الدفع',
    q: 'ما هي خيارات وطرق الدفع المتاحة لديكم؟',
    a: 'نوفر أقصى درجات المرونة والأمان: الدفع بعد إتمام الخدمة وفحص النتائج، عبر أجهزة نقاط البيع المتنقلة مع الفنيين (مدى، فيزا، ماستركارد، Apple Pay)، بالإضافة للتحويل البنكي وفواتير إلكترونية معتمدة.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchFaq, setSearchFaq] = useState('');

  const filteredFaqs = FAQS_DATA.filter(
    (faq) =>
      searchFaq === '' ||
      faq.q.toLowerCase().includes(searchFaq.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchFaq.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold mb-3">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>الأسئلة الشائعة والإجابات المعتمدة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            كل ما تود معرفته عن خدمات مكافحة الحشرات والضمانات
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            إجابات واضحة ومباشرة على أكثر استفسارات عملائنا في المملكة العربية السعودية.
          </p>
        </div>

        {/* Search in FAQs */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="ابحث في الأسئلة الشائعة (مثلاً: أمان المبيدات، مدة الضمان، التراخيص...)"
            value={searchFaq}
            onChange={(e) => setSearchFaq(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 pr-10 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden text-right transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-right bg-slate-50/70 hover:bg-slate-100 transition text-slate-900 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  <span className="flex-1 pl-4 leading-snug">{faq.q}</span>
                  <span className="text-emerald-700 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white border-t border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center text-emerald-950 space-y-3">
          <h4 className="font-black text-base">لديك استفسار مخصص عن حالة منزلك أو منشأتك؟</h4>
          <p className="text-xs text-emerald-800 max-w-lg mx-auto">
            مستشارونا متاحون للرد على كافة أسئلتكم وتقديم النصائح الفنية والأسعار على مدار الساعة.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <a
              href="tel:0558141870"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال فوري: 0558141870</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Home,
  HardHat,
  Send,
  Calendar,
  Clock,
  ClipboardCheck,
  Layers,
  FileCheck2
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  selectedCity
}) => {
  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  const [selectedPest, setSelectedPest] = useState('termites');
  const [propertyType, setPropertyType] = useState('villa');
  const [urgency, setUrgency] = useState('emergency');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const PEST_PROTOCOLS: Record<
    string,
    {
      name: string;
      protocol: string;
      chemical: string;
      safety: string;
      guarantee: string;
      actionTime: string;
    }
  > = {
    termites: {
      name: 'النمل الأبيض (الأرضة)',
      protocol: 'حقن هيدروليكي ميكروي بعمق 50 سم حول الأساسات والأبواب وتشكيل حزام كيميائي متصل.',
      chemical: 'بايفلكس 25TC الأمريكي / بريميس كولوني 200SC الألماني',
      safety: 'عديم الرائحة تماماً، لا يتطلب إخلاء المنزل أو نقل الأثاث.',
      guarantee: 'ضمان كتابي موثق 15 سنة مع فحص سنوي مجاني.',
      actionTime: 'استجابة فورية خلال 30 دقيقة'
    },
    cockroaches: {
      name: 'الصراصير ومستعمرات المطابخ',
      protocol: 'معالجة جافة بتقنية الميكرو-دوتس (جل إغراء بيولوجي سويسري) تعتمد على العدوى التبادلية.',
      chemical: 'ماكس فورس فورت الألماني + جل أدفنس السويسري',
      safety: 'آمن 100% على الأطعمة والأواني ومصرح لسلامة المنشآت الغذائية.',
      guarantee: 'ضمان سنة كاملة مع متابعة بعد 14 يوماً مجاناً.',
      actionTime: 'قضاء جذري خلال 48 ساعة'
    },
    bedbugs: {
      name: 'بق الفراش والمفروشات',
      protocol: 'معالجة حرارية مزدوجة بالبخار الجاف عند 180°C متبوعة برذاذ ميكروني بارد ULV لكافة الشقوق.',
      chemical: 'مبيدات بيولوجية متخصصة للقضاء على الحشرة والبيوض',
      safety: 'لا تترك أي بقع أو روائح كريهة، وإمكانية النوم في الغرفة بعد ساعة.',
      guarantee: 'ضمان مكتوب سنة كاملة مع زيارات تفقد مجانية.',
      actionTime: 'إبادة تامة من الجلسة الأولى'
    },
    rodents: {
      name: 'الفئران والجرذان',
      protocol: 'نشر محطات طعوم مغلقة آمنة (Tamper-Resistant Stations) وتتبع مسارات التسلل وغلقها هندسياً.',
      chemical: 'طعوم شمعية مجففة مضادة للتخثر تمنع روائح التحلل تماماً',
      safety: 'صناديق طعوم مقفلة بمفاتيح خاصة آمنة على الأطفال والحيوانات الأليفة.',
      guarantee: 'ضمان شامل لمنع عودة القوارض وسد الثغرات.',
      actionTime: 'تطهير وحماية كاملة للموقع'
    },
    birds: {
      name: 'الحمام والطيور على النوافذ والأسطح',
      protocol: 'تركيب طوارد ستانلس ستيل 316 مقاومة للحرارة وشبك بوليمري غير مرئي لوحدات التكييف.',
      chemical: 'جل عاكس للحرارة وميكانيكا طرد بدون إيذاء للطيور',
      safety: 'مطابق للمعايير البيئية ورفق بالحيوان ومقاوم لطقس المملكة.',
      guarantee: 'ضمان 10 سنوات ضد الصدأ والتفكك.',
      actionTime: 'حماية نهائية للواجهات'
    }
  };

  const activeProtocol = PEST_PROTOCOLS[selectedPest] || PEST_PROTOCOLS.termites;

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 8) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 text-right overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Classic Corporate Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shrink-0 shadow-sm">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">المكتب الفني للاستشارات والمعاينة الميدانية</h3>
                <span className="text-[10px] bg-emerald-800 text-emerald-100 font-bold px-2 py-0.5 rounded-full">
                  فرع {currentCityObj.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                تشخيص علمي معتمد، استعراض البروتوكول الكيميائي، وتوجيه فوري لأقرب فريق فني
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50">
          
          {/* Quick Pest Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              1. اختر نوع الآفة أو المشكلة التي ترغب في استشارتنا بشأنها:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(PEST_PROTOCOLS).map(([key, data]) => {
                const isSelected = selectedPest === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPest(key)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{data.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scientific Protocol Card (Authority Display) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>البروتوكول العلمي المعتمد لإبادة ({activeProtocol.name}):</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                {activeProtocol.guarantee}
              </span>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed space-y-2">
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 shrink-0">آلية المكافحة:</strong>
                <span>{activeProtocol.protocol}</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 shrink-0">المبيد المعتمد SFDA:</strong>
                <span className="text-emerald-900 font-bold">{activeProtocol.chemical}</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 shrink-0">معايير السلامة:</strong>
                <span className="text-slate-600">{activeProtocol.safety}</span>
              </div>
            </div>
          </div>

          {/* Direct Consultation Request Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmitConsultation} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>2. طلب معاينة ميدانية أو استشارة هاتفية من مهندس الفرع:</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 text-[11px]">نوع العقار:</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 text-xs"
                  >
                    <option value="villa">فيلا / قصر سكنى</option>
                    <option value="apartment">شقة / ملحق</option>
                    <option value="commercial">مطعم / منشأة غذائية</option>
                    <option value="construction">مشروع تحت الإنشاء (صبة نظافة)</option>
                    <option value="building">مبنى تجاري / فندق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1 text-[11px]">درجة الإلحاح:</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-900 focus:outline-none focus:border-emerald-600 text-xs font-bold"
                  >
                    <option value="emergency">🚨 طارئ (فريق متنقل الآن خلال 30 دقيقة)</option>
                    <option value="today">اليوم خلال ساعات العمل</option>
                    <option value="quote">طلب تسعيرة ومعاينة مجدولة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-[11px]">
                  رقم الجوال لتلقي التقرير والتواصل:
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="05XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono text-sm focus:outline-none focus:border-emerald-600 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-[11px]">
                  ملاحظات أو أعراض مشاهدة (اختياري):
                </label>
                <textarea
                  rows={2}
                  placeholder="مثال: ملاحظة تآكل أسفل حلوق الأبواب الخشبية أو رؤية حشرات بالمطبخ..."
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال طلب الاستشارة وتوجيه الفريق الميداني</span>
              </button>
            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-black text-emerald-950">تم تسجيل طلب المعاينة والاستشارة بنجاح!</h4>
              <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
                تم تحويل التقرير إلى المشرف الفني لفرع ({currentCityObj.name})، وسيتواصل معك مهندسنا المختص على الرقم ({customerPhone}) لترتيب المعاينة المجانية.
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <a
                  href="tel:0558141870"
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>اتصال عاجل بالمهندس: 0558141870</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>مبيدات معتمدة من هيئة الغذاء والدواء SFDA وكود البناء السعودي</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://wa.me/966558141870"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span>محادثة واتساب فورية</span>
            </a>

            <a
              href="tel:0558141870"
              className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>اتصال مباشر: 0558141870</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

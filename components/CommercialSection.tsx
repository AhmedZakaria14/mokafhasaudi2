'use client';

import React, { useState } from 'react';
import {
  Building2,
  FileCheck2,
  CheckCircle2,
  PhoneCall,
  Send,
  ShieldCheck,
  Award,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CommercialSection: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [commercialActivity, setCommercialActivity] = useState('مطعم / كافيه');
  const [city, setCity] = useState('الرياض');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setErrorMsg('يرجى كتابة رقم جوال صحيح للتواصل');
      return;
    }
    setErrorMsg('');
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <section id="commercial" className="py-16 bg-slate-100 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Info Column */}
          <div className="lg:col-span-7 text-right space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>قطاع الأعمال والشركات والمطاعم</span>
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              عقود مكافحة حشرات دورية معتمدة لاشتراطات <span className="text-emerald-800 underline decoration-amber-400 decoration-4 underline-offset-4">الأمانات والجهات الرقابية</span> وهيئة الغذاء والدواء
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              نوفر برامج مكافحة وقائية متقدمة مطابقة لاشتراطات وزارة البلديات والإسكان، الهيئة العامة للغذاء والدواء، ونظام الهاسب (HACCP) لجميع المنشآت والمستودعات والمصانع في كافة مدن المملكة.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-start gap-2 shadow-xs">
                <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">عقود دورية موثقة للمنشآت</strong>
                  <span className="text-slate-600 font-medium">عقود سنوية وزيارات مجدولة مطابقة للاشتراطات الصحية.</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-start gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">سجل زيارات ميداني موثق</strong>
                  <span className="text-slate-600 font-medium">تقارير دورية موقعة من المهندس المشرف لكل زيارة.</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-start gap-2 shadow-xs">
                <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">مبيدات مخصصة للمطابخ والمستودعات</strong>
                  <span className="text-slate-600 font-medium">جل ألماني بدون رائحة وآمن 100% على المواد الغذائية.</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-start gap-2 shadow-xs">
                <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">استجابة طوارئ خلال 12 ساعة</strong>
                  <span className="text-slate-600 font-medium">زيارات طارئة غير محدودة مجاناً طوال فترة سريان العقد.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-md text-right">
              <div className="pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  طلب عرض سعر تجاري وعقد امتثال رسمي
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  أدخل بيانات منشأتك وسيتواصل معك مهندس الحسابات التجارية خلال دقائق.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    اسم الشركة / المطعم / المؤسسة:
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="مثال: شركة النقاء للمطاعم"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      النشاط التجاري:
                    </label>
                    <select
                      value={commercialActivity}
                      onChange={(e) => setCommercialActivity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-xs"
                    >
                      <option value="مطعم / كافيه">مطعم / كافيه</option>
                      <option value="فندق / شقق مفروشة">فندق / شقق مفروشة</option>
                      <option value="مستودع / مخزن">مستودع / مخزن</option>
                      <option value="مصنع / منشأة صناعية">مصنع / منشأة صناعية</option>
                      <option value="مجمع تجاري / مول">مجمع تجاري / مول</option>
                      <option value="مستشفى / مركز طبي">مستشفى / مركز طبي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      المدينة:
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-xs"
                    >
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="الدمام">الدمام</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                      <option value="الخبر">الخبر</option>
                      <option value="القصيم">القصيم</option>
                      <option value="أبها">أبها</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    رقم الجوال للتواصل الرسمي:
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال طلب العرض التجاري</span>
                </button>

                <div className="text-center text-[10px] text-slate-500 pt-1">
                  أو اتصل بقسم المنشآت والشركات مباشرة: <strong className="text-emerald-800 font-mono">0558141870</strong>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

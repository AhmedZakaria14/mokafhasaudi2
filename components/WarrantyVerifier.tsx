'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Clock,
  FileText
} from 'lucide-react';

export const WarrantyVerifier: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 8) {
      setSubmitted(true);
    }
  };

  return (
    <section id="warranty-check" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>خدمة متابعة الضمان للعملاء</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            الاستعلام عن سريان الضمان ومواعيد المتابعة
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            أدخل رقم جوالك المسجل أثناء تنفيذ الخدمة للتواصل المباشر مع الدعم الفني وتنسيق زيارات المتابعة الدورية المجانية.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-xl mx-auto mb-6">
          <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2">
            <input
              type="tel"
              dir="ltr"
              placeholder="05XXXXXXXX"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (submitted) setSubmitted(false);
              }}
              required
              className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono text-center sm:text-right font-bold"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl transition flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>متابعة الضمان</span>
            </button>
          </form>
        </div>

        {/* Confirmation & Direct Connect Card */}
        {submitted && (
          <div className="max-w-xl mx-auto bg-slate-950 border border-emerald-500/50 rounded-3xl p-6 shadow-2xl text-right animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">استعلام رقم: {phoneNumber}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  فريق الدعم والمتابعة الفنية متاح لخدمتك فوراً
                </p>
              </div>
            </div>

            <div className="py-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الضمان يشمل زيارات دورية ومكافحة مجانية طوال فترة السريان.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خدمة عملاء مباشرة على مدار الساعة للرد على كافة الاستفسارات.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:0558141870"
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>اتصال بالدعم: 0558141870</span>
              </a>

              <a
                href={`https://wa.me/966558141870?text=${encodeURIComponent(
                  `السلام عليكم، أستفسر بخصوص متابعة الضمان للرقم ${phoneNumber}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>مراسلة واتساب فورية</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

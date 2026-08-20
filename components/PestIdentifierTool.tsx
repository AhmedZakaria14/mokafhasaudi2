'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SAUDI_PESTS, PestInfo } from '@/data/pests';
import {
  Bug,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Search,
  ClipboardCheck,
  ChevronLeft,
  CheckCircle2,
  PhoneCall,
  Activity
} from 'lucide-react';

interface PestIdentifierToolProps {
  onOpenAiConsultant: () => void;
}

export const PestIdentifierTool: React.FC<PestIdentifierToolProps> = ({
  onOpenAiConsultant
}) => {
  const [selectedPest, setSelectedPest] = useState<PestInfo>(SAUDI_PESTS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'إنشائية وخشب', 'زاحفة', 'قوارض', 'زواحف وسامة', 'طائرة'];

  const filteredPests = SAUDI_PESTS.filter(
    (p) => categoryFilter === 'all' || p.category === categoryFilter
  );

  return (
    <section id="pests-guide" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold mb-3">
            <Bug className="w-4 h-4 text-amber-700" />
            <span>الدليل العلمي المعتمد لآفات المملكة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            دليل التعرف على الحشرات وأعراض الإصابة وطرق الإبادة
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            تعرف على نوع الآفة التي تزعجك، ومستوى خطورتها، وكيف يتعامل معها خبراؤنا بأحدث التقنيات والمبيدات المعتمدة.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                categoryFilter === cat
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'جميع أنواع الآفات' : cat}
            </button>
          ))}
        </div>

        {/* Interactive Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pests Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-500 mb-2">
              اختر الحشرة لعرض التشخيص العلمي والحل الجذري:
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredPests.map((pest) => {
                const isSelected = selectedPest.id === pest.id;
                return (
                  <div
                    key={pest.id}
                    onClick={() => setSelectedPest(pest)}
                    className={`p-3.5 rounded-2xl border text-right cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={pest.image}
                          alt={pest.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{pest.name}</h4>
                        <div className="text-[11px] text-slate-500">{pest.nameEn} • {pest.category}</div>
                      </div>
                    </div>

                    <div className="text-left">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pest.severity === 'كارثي على المباني'
                            ? 'bg-red-100 text-red-700'
                            : pest.severity === 'عالي الخطورة'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {pest.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Engineering Consultation Box */}
            <div className="bg-slate-900 rounded-2xl p-4 text-white text-right space-y-2 border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ClipboardCheck className="w-4 h-4" />
                <span>هل تحتاج إلى فحص مجهري أو استشارة فنية؟</span>
              </div>
              <p className="text-xs text-slate-300">
                يمكن لمهندسينا فحص العينات وتحديد نوع الحشرة بدقة مع خطة إبادة مخصصة وضمان رسمي.
              </p>
              <button
                type="button"
                onClick={onOpenAiConsultant}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>طلب استشارة هندسية ومعاينة مجانية</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Pest Comprehensive Profile Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border-2 border-emerald-600/30 rounded-3xl p-6 sm:p-7 shadow-xl text-right space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
                    <Image
                      src={selectedPest.image}
                      alt={selectedPest.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-700 mb-0.5">{selectedPest.category}</div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{selectedPest.name}</h3>
                    <div className="text-xs text-slate-500 font-medium">{selectedPest.nameEn}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                    {selectedPest.severity}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>موسم النشاط: {selectedPest.breedingSeason}</span>
                  </span>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>أبرز علامات وأعراض الإصابة بهذه الحشرة:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedPest.symptoms.map((sym, i) => (
                    <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health and Property Risks */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-red-700">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>المخاطر الصحية والأضرار المادية:</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700 bg-red-50/60 border border-red-100 p-3.5 rounded-2xl">
                  {selectedPest.risks.map((risk, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Treatment */}
              <div className="bg-emerald-950 text-white p-4 sm:p-5 rounded-2xl space-y-2 border border-emerald-700/60">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>بروتوكول الإبادة المعتمد من حصن المملكة:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedPest.recommendedTreatment}
                </p>
              </div>

              {/* DIY Tips */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-1.5">إرشادات وقائية للأسرة:</h4>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {selectedPest.diyTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <Link
                  href={`/pests/${selectedPest.id}`}
                  className="flex-1 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl text-center border border-emerald-300 transition flex items-center justify-center gap-1.5"
                >
                  <Bug className="w-4 h-4 text-emerald-700" />
                  <span>دليل وإرشادات {selectedPest.name} الكامل</span>
                </Link>
                <a
                  href={`tel:0558141870`}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl text-center shadow transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>طلب فني لإبادة ({selectedPest.name})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

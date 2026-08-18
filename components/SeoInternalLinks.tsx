'use client';

import React from 'react';
import Link from 'next/link';
import { SAUDI_CITIES } from '@/data/regions';
import { PEST_SERVICES } from '@/data/services';
import { SAUDI_PESTS } from '@/data/pests';
import { MapPin, ShieldCheck, Bug, FileText, ChevronLeft } from 'lucide-react';

interface SeoInternalLinksProps {
  currentCityId?: string;
  currentServiceId?: string;
  currentPestId?: string;
}

export const SeoInternalLinks: React.FC<SeoInternalLinksProps> = ({
  currentCityId,
  currentServiceId,
  currentPestId
}) => {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Block 1: Targeted City + Service Matrix (High-Intent SEO Keywords) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              خدمات مكافحة الآفات الميدانية في مدن ومحافظات المملكة
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 text-xs">
            {SAUDI_CITIES.map((city) => (
              <Link
                key={city.id}
                href={`/city/${city.id}`}
                className={`p-2.5 rounded-xl border transition flex items-center justify-between group ${
                  city.id === currentCityId
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xs text-slate-700 hover:text-emerald-800'
                }`}
              >
                <span>مكافحة حشرات في {city.name}</span>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition transform group-hover:-translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Block 2: Main Pest Control Services */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              الأقسام التخصصية للرش والمكافحة والوقاية الإنشائية
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {PEST_SERVICES.map((srv) => (
              <Link
                key={srv.id}
                href={`/services/${srv.id}`}
                className={`p-3 rounded-xl border transition flex items-start justify-between group ${
                  srv.id === currentServiceId
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xs text-slate-800 hover:text-emerald-800'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-800 transition">{srv.title}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{srv.subtitle}</div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 shrink-0 mt-1 transition transform group-hover:-translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Block 3: Pest Identification Wiki Directory */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bug className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              موسوعة التعرف على الحشرات والآفات المنزلية وطرق مكافحتها
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {SAUDI_PESTS.map((pest) => (
              <Link
                key={pest.id}
                href={`/pests/${pest.id}`}
                className={`p-2.5 rounded-xl border transition flex items-center justify-between group ${
                  pest.id === currentPestId
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xs text-slate-700 hover:text-emerald-800'
                }`}
              >
                <span className="line-clamp-1 font-medium">{pest.name}</span>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Block 4: Popular City-Service Combinations */}
        {currentCityId && (
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-750 text-slate-700 mb-3">
              خدمات مكافحة الآفات الأكثر طلباً في مدينتك:
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {PEST_SERVICES.map((srv) => (
                <Link
                  key={srv.id}
                  href={`/city/${currentCityId}/${srv.id}`}
                  className="bg-white hover:bg-emerald-700 hover:text-white text-slate-700 border border-slate-200 hover:border-emerald-700 px-3 py-1.5 rounded-lg transition font-medium"
                >
                  {srv.title} في {SAUDI_CITIES.find(c => c.id === currentCityId)?.name}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

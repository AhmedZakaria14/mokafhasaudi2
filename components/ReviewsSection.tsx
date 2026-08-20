'use client';

import React, { useState } from 'react';
import { SAUDI_REVIEWS, ReviewItem } from '@/data/reviews';
import {
  Star,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');

  const citiesList = ['all', 'الرياض', 'جدة', 'الدمام', 'الخبر', 'مكة المكرمة', 'القصيم', 'أبها', 'تبوك'];

  const filteredReviews = SAUDI_REVIEWS.filter(
    (rev) => selectedCityFilter === 'all' || rev.city.includes(selectedCityFilter)
  );

  return (
    <section id="reviews" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold mb-3">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>آراء العملاء وتقييمات موثقة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            ماذا يقول عملاؤنا في مختلف مدن ومحافظات المملكة؟
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
            نفخر بثقة أكثر من 45,000 عميل في المنازل والفلل والقصور والمطاعم والشركات بتقييم عام 4.96 من 5 نجوم.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {citiesList.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCityFilter(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                selectedCityFilter === city
                  ? 'bg-emerald-800 border-emerald-900 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              {city === 'all' ? 'جميع تقييمات المملكة' : city}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-right flex flex-col justify-between shadow-sm hover:shadow-md transition"
            >
              <div>
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-xs sm:text-sm text-slate-900">{rev.author}</h4>
                      <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-700" />
                        <span>{rev.city} - {rev.neighborhood}</span>
                      </div>
                    </div>
                  </div>

                  {rev.verified && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>موثق</span>
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                  <span className="text-[11px] text-slate-500 font-medium mr-2">{rev.date}</span>
                </div>

                {/* Service Tag */}
                <div className="inline-block bg-white text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 shadow-2xs">
                  {rev.serviceUsed}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-800 leading-relaxed italic font-medium">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-600 font-medium flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>ضمان معتمد نشط</span>
                </span>
                <span>فحص دوري مجاني</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

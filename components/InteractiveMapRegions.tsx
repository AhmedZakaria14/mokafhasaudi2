'use client';

import React, { useState } from 'react';
import { SAUDI_REGIONS, SAUDI_CITIES } from '@/data/regions';
import {
  MapPin,
  Clock,
  PhoneCall,
  ShieldCheck,
  Search,
  CheckCircle2,
  Car,
  Building,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface InteractiveMapRegionsProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export const InteractiveMapRegions: React.FC<InteractiveMapRegionsProps> = ({
  selectedCity,
  onSelectCity
}) => {
  const [activeRegionTab, setActiveRegionTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCity = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  // Filter cities
  const filteredCities = SAUDI_CITIES.filter((city) => {
    const matchesRegion = activeRegionTab === 'all' || city.region === activeRegionTab;
    const matchesSearch =
      searchQuery === '' ||
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.allNeighborhoods.some((nh) => nh.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="coverage-map" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>تغطية وطنية شاملة 100%</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            نطاق التغطية والفرق الميدانية المتنقلة في كافة مدن ومحافظات المملكة
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            فرق ميدانية متخصصة وسيارات مجهزة تصل مباشرة إلى موقعك في أي حي بالمملكة خلال 25 إلى 35 دقيقة.
          </p>
        </div>

        {/* Search & Region Filter Tabs */}
        <div className="space-y-4 mb-8">
          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="ابحث عن مدينتك أو حيك السكني (مثلاً: النرجس، أبحر، الشاطئ، الهفوف، الحوية...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-3.5 pr-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 shadow-lg font-medium"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveRegionTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeRegionTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              جميع مناطق المملكة (54 مدينة ومحافظة)
            </button>
            {SAUDI_REGIONS.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegionTab(region.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeRegionTab === region.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cities Grid & Active City Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cities List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
              <span>اختر مدينتك لعرض نطاق التغطية والأحياء المخدومة:</span>
              <span>المدن المعروضة: {filteredCities.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto pr-1">
              {filteredCities.map((city) => {
                const isSelected = city.id === selectedCity;
                return (
                  <div
                    key={city.id}
                    onClick={() => onSelectCity(city.id)}
                    className={`cursor-pointer text-right p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 shadow-xl shadow-emerald-950/50 scale-[1.02]'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-white text-base">{city.name}</h4>
                          {isSelected && (
                            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                              محدد
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{city.regionName}</div>
                      </div>
                      <div className="text-left">
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3" />
                          <span>{city.responseTimeMin} دقيقة</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-emerald-400" />
                        <span>خدمة ميدانية مباشرة</span>
                      </span>
                      <span className="text-emerald-400 font-medium">مبيدات آمنة ومصرحة</span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-400 line-clamp-1">
                      <strong>أبرز الأحياء:</strong> {city.featuredNeighborhoods.slice(0, 4).join('، ')}...
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active City Details Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl text-right sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    {currentCity.regionName}
                  </div>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    خدمات مكافحة الآفات في {currentCity.name}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400">
                  <Building className="w-6 h-6" />
                </div>
              </div>

              <div className="py-4 space-y-3 text-xs text-slate-300">
                <p className="leading-relaxed text-slate-300 text-xs">
                  {currentCity.description}
                </p>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">متوسط زمن الاستجابة:</span>
                    <strong className="text-emerald-400 font-bold">{currentCity.responseTimeMin} دقيقة تقريباً</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">طريقة تقديم الخدمة:</span>
                    <strong className="text-white font-bold">زيارة ميدانية وفحص شامل للموقع</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">نطاق التغطية:</span>
                    <span className="text-slate-300 text-right">{currentCity.address}</span>
                  </div>
                </div>

                {/* Popular Pests in this City */}
                <div>
                  <div className="text-xs font-bold text-white mb-2">أبرز الآفات المعالجة في {currentCity.name}:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCity.popularPests.map((pest) => (
                      <span
                        key={pest}
                        className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] px-2 py-1 rounded-lg font-medium"
                      >
                        ✓ {pest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* All Neighborhoods Scroll */}
                <div>
                  <div className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                    <span>جميع أحياء {currentCity.name} المخدومة ({currentCity.allNeighborhoods.length} حي):</span>
                    <span className="text-[10px] text-emerald-400 font-normal">تغطية شاملة</span>
                  </div>
                  <div className="max-h-32 overflow-y-auto bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                    {currentCity.allNeighborhoods.map((nh, idx) => (
                      <span key={nh} className="inline-block hover:text-emerald-300 transition">
                        حي {nh}
                        {idx < currentCity.allNeighborhoods.length - 1 ? ' • ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Booking for this specific city */}
              <div className="pt-2 space-y-2">
                <a
                  href={`tel:0558141870`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>طلب فني في {currentCity.name}: 0558141870</span>
                </a>

                <a
                  href={`https://wa.me/966558141870?text=${encodeURIComponent(
                    `السلام عليكم، أرغب بطلب خدمة مكافحة حشرات ورش مبيدات في مدينة ${currentCity.name} مع الضمان.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl transition"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>طلب عبر واتساب (استجابة فورية)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

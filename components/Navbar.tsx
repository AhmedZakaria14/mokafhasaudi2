'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import {
  PhoneCall,
  ShieldCheck,
  Menu,
  X,
  Calculator,
  MapPin,
  ChevronDown,
  Sparkles,
  Layers,
  Building2,
  FileCheck2,
  BookOpen,
  HelpCircle,
  Tag,
  ChevronLeft
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';
import { PEST_SERVICES } from '@/data/services';

interface NavbarProps {
  onOpenCalculator?: () => void;
  onOpenAiConsultant?: () => void;
  selectedCity?: string;
  onSelectCity?: (cityId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCalculator,
  onOpenAiConsultant,
  selectedCity = 'riyadh',
  onSelectCity
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [citiesDropdown, setCitiesDropdown] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setServicesDropdown(false);
        setCitiesDropdown(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAll = () => {
    setServicesDropdown(false);
    setCitiesDropdown(false);
    setMobileMenuOpen(false);
  };

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  return (
    <header className="sticky top-0 z-50 w-full" ref={navRef}>
      {/* 1. Slim Official Badge Strip */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 border-b border-emerald-950/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-emerald-300 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1 text-white font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>مؤسسة معتمدة SFDA وبلدي</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-slate-300">مبيدات آمنة 100% بدون رائحة</span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="hidden md:inline text-amber-300">ضمان حتى 15 سنة</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:0558141870"
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold transition shadow-xs"
            >
              <PhoneCall className="w-3 h-3" />
              <span className="font-mono font-bold" dir="ltr">0558141870</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-200 border-b border-slate-200 ${
          isScrolled ? 'py-2.5 shadow-md shadow-slate-900/5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" onClick={closeAll} className="shrink-0 flex items-center">
            <BrandLogo variant="dark" size={isScrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-bold text-slate-700">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { setServicesDropdown(true); setCitiesDropdown(false); }}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdown(!servicesDropdown)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl transition cursor-pointer ${
                  servicesDropdown ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-100 hover:text-emerald-800'
                }`}
              >
                <span>خدمات المكافحة</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Clean Services Dropdown Menu */}
              {servicesDropdown && (
                <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1 mb-1">
                    أبرز خدمات الرش والوقاية:
                  </div>
                  {PEST_SERVICES.slice(0, 6).map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      onClick={closeAll}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 transition group"
                    >
                      <div>
                        <div className="text-xs font-bold">{service.title}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">{service.subtitle}</div>
                      </div>
                      <ChevronLeft className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-700 shrink-0" />
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      href="/#services"
                      onClick={closeAll}
                      className="block text-center py-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 rounded-lg hover:bg-slate-50"
                    >
                      تصفح جميع الخدمات الـ 8 ←
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cities Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { setCitiesDropdown(true); setServicesDropdown(false); }}
              onMouseLeave={() => setCitiesDropdown(false)}
            >
              <button
                type="button"
                onClick={() => setCitiesDropdown(!citiesDropdown)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl transition cursor-pointer ${
                  citiesDropdown ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-100 hover:text-emerald-800'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>المدن والفروع</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${citiesDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Clean Cities Dropdown Menu */}
              {citiesDropdown && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1 mb-1 flex items-center justify-between">
                    <span>فروع الاستجابة الفورية:</span>
                    <span className="text-[10px] text-emerald-700">25 دقيقة</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {SAUDI_CITIES.slice(0, 10).map((city) => (
                      <Link
                        key={city.id}
                        href={`/city/${city.id}`}
                        onClick={() => {
                          if (onSelectCity) onSelectCity(city.id);
                          closeAll();
                        }}
                        className={`p-2 rounded-xl text-xs font-semibold transition ${
                          city.id === selectedCity
                            ? 'bg-emerald-100 text-emerald-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-800'
                        }`}
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      href="/#coverage-map"
                      onClick={closeAll}
                      className="block text-center py-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 rounded-lg hover:bg-slate-50"
                    >
                      عرض كافة الـ 15 مدينة والمناطق ←
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/#pricing"
              onClick={closeAll}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition"
            >
              باقات الأسعار
            </Link>

            <Link
              href="/#commercial"
              onClick={closeAll}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition"
            >
              عقود الشركات
            </Link>

            <Link
              href="/#warranty-check"
              onClick={closeAll}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition"
            >
              فحص الضمان
            </Link>

            <Link
              href="/blog"
              onClick={closeAll}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-emerald-800 transition"
            >
              المدونة
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {/* AI Diagnosis */}
            <button
              type="button"
              onClick={() => {
                if (onOpenAiConsultant) onOpenAiConsultant();
                closeAll();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>طبيب الآفات</span>
            </button>

            {/* Calculator Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenCalculator) onOpenCalculator();
                closeAll();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-700" />
              <span>حاسبة التكلفة</span>
            </button>

            {/* Call Direct */}
            <a
              href="tel:0558141870"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>طلب رش فوري</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Clean Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 text-right">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => {
                  if (onOpenCalculator) onOpenCalculator();
                  closeAll();
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200"
              >
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>حاسبة التكلفة</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenAiConsultant) onOpenAiConsultant();
                  closeAll();
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>طبيب الآفات الذكي</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 text-sm font-semibold text-slate-800">
              <Link
                href="/#services"
                onClick={closeAll}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>خدمات المكافحة والرش</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/#coverage-map"
                onClick={closeAll}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>تغطية وفروع المدن (15 مدينة)</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/#pricing"
                onClick={closeAll}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-700" />
                  <span>باقات الأسعار والضمانات</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/#commercial"
                onClick={closeAll}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>عقود الشركات والمنشآت</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/#warranty-check"
                onClick={closeAll}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <span>فحص سريان الضمان</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/blog"
                onClick={closeAll}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>المدونة والاستشارات الفنية</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/#faq"
                onClick={closeAll}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  <span>الأسئلة الشائعة</span>
                </span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Mobile Call Direct */}
            <div className="pt-2">
              <a
                href="tel:0558141870"
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>اتصال مباشر: 0558141870</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

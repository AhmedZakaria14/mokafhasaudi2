'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import {
  PhoneCall,
  Clock,
  ShieldCheck,
  Menu,
  X,
  Calculator,
  MessageSquare,
  MapPin,
  ChevronDown,
  Building2,
  FileCheck
} from 'lucide-react';
import { SAUDI_CITIES } from '@/data/regions';

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
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-200">
      {/* Top Official Registry Bar */}
      <div className="bg-emerald-900 text-white text-xs py-2 px-4 border-b border-emerald-950/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Trust Highlights */}
          <div className="flex items-center gap-4 text-[11px] text-emerald-100">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>مؤسسة وطنية رائدة في مكافحة الآفات والوقاية الإنشائية</span>
            </span>
            <span className="text-emerald-700 hidden md:inline">•</span>
            <span className="hidden md:inline">مبيدات معتمدة وآمنة على البيئة</span>
            <span className="text-emerald-700 hidden lg:inline">•</span>
            <span className="hidden lg:inline">ضمانات معتمدة تصل حتى 15 سنة</span>
            <span className="text-emerald-700 hidden xl:inline">•</span>
            <span className="hidden xl:inline text-amber-200">استجابة فورية لكافة مدن ومناطق المملكة</span>
          </div>

          {/* Quick city selector & direct phone */}
          <div className="flex items-center gap-3">
            {/* City Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-white bg-emerald-800/80 hover:bg-emerald-800 px-2.5 py-1 rounded-md border border-emerald-700/60 transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <span>المدينة: <strong className="text-white">{currentCityObj.name}</strong></span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 max-h-72 overflow-y-auto">
                  <div className="text-[11px] font-bold text-slate-500 px-2 py-1 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>اختر مدينتك لطلب الخدمة:</span>
                    <span className="text-[10px] text-emerald-700">خدمة 24 ساعة</span>
                  </div>
                  {SAUDI_CITIES.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        if (onSelectCity) onSelectCity(city.id);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-right px-2.5 py-1.5 text-xs rounded-lg transition cursor-pointer ${
                        city.id === selectedCity
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{city.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">وصول {city.responseTimeMin} د</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Phone */}
            <a
              href="tel:0558141870"
              className="font-bold text-white hover:text-amber-200 transition flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 px-2.5 py-1 rounded-md text-xs shadow-sm"
            >
              <PhoneCall className="w-3 h-3" />
              <span className="font-mono font-bold" dir="ltr">0558141870</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Corporate Navigation */}
      <nav
        className={`w-full border-b border-slate-200 transition-all duration-200 ${
          isScrolled ? 'py-3 shadow-sm' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <BrandLogo variant="dark" size={isScrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <Link href="/#services" className="hover:text-emerald-800 transition py-1">
              خدمات المكافحة
            </Link>
            <Link href="/#coverage-map" className="hover:text-emerald-800 transition py-1">
              تغطية المدن بالمملكة
            </Link>
            <Link href="/#commercial" className="hover:text-emerald-800 transition py-1">
              عقود المنشآت والامتثال
            </Link>
            <Link href="/#warranty-check" className="hover:text-emerald-800 transition py-1">
              فحص الضمان
            </Link>
            <Link href="/blog" className="hover:text-emerald-800 transition py-1">
              المدونة والاستشارات
            </Link>
            <Link href="/#faq" className="hover:text-emerald-800 transition py-1">
              الأسئلة الشائعة
            </Link>
          </div>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-700" />
              <span>حاسبة التكلفة</span>
            </button>

            <a
              href="tel:0558141870"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>طلب رش فوري</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => {
                  if (onOpenCalculator) onOpenCalculator();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold"
              >
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>حاسبة التكلفة</span>
              </button>
              <a
                href="https://wa.me/966558141870"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>واتساب مباشر</span>
              </a>
            </div>

            <div className="space-y-1 text-sm font-semibold text-slate-800">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                خدمات المكافحة والرش
              </a>
              <a
                href="#coverage-map"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                فروع وتغطية الـ 13 منطقة بالمملكة
              </a>
              <a
                href="#commercial"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                عقود المنشآت والشهادات المعتمدة
              </a>
              <a
                href="#warranty-check"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                فحص سريان الضمان الإلكتروني
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                باقات الأسعار والضمانات
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                الأسئلة الشائعة وإرشادات السلامة
              </a>
            </div>

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

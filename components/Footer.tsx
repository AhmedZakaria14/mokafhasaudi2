'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { SAUDI_REGIONS } from '@/data/regions';
import {
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  FileText,
  Building,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenAiConsultant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalculator,
  onOpenAiConsultant
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-28 lg:pb-12 border-t border-slate-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 mb-12 border-b border-slate-800/80">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">مبيدات آمنة ومصرحة</div>
              <div className="text-[11px] text-slate-400">آمنة 100% وبدون رائحة</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">ضمان موثق حتى 15 سنة</div>
              <div className="text-[11px] text-slate-400">متابعة وزيارات مجانية</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">عقود المنشآت والشركات</div>
              <div className="text-[11px] text-slate-400">زيارات دورية وتقارير فنية</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">استجابة طوارئ 30 دقيقة</div>
              <div className="text-[11px] text-slate-400">فريق متجول في حيك الآن</div>
            </div>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              مؤسسة حصن المملكة المتخصصة في مكافحة الحشرات والآفات والوقاية الإنشائية والتعقيم الشامل. رواد مكافحة النمل الأبيض (الأرضة)، الصراصير، بق الفراش، القوارض، وطرد الحمام بأحدث التقنيات والمبيدات الآمنة بيئياً.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-white font-bold" dir="ltr">0558141870</span>
                <span className="text-[11px] text-emerald-400">(الخط الساخن الموحد 24/7)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خدمة ميدانية متنقلة تغطي كافة مناطق ومدن المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>إشراف هندسي وفني متخصص وضمانات موثقة</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="tel:0558141870"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>اتصال فوري: 0558141870</span>
              </a>

              <a
                href="https://wa.me/966558141870"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>واتساب مباشر</span>
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 border-r-2 border-emerald-500 pr-2">
              خدمات المكافحة والرش
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services/termites" className="hover:text-emerald-400 transition">
                  مكافحة النمل الأبيض وحقن الأرضيات
                </Link>
              </li>
              <li>
                <Link href="/services/pre-construction" className="hover:text-emerald-400 transition">
                  تدفين خرساني قبل صبة النظافة
                </Link>
              </li>
              <li>
                <Link href="/services/cockroaches" className="hover:text-emerald-400 transition">
                  إبادة الصراصير بالجل الألماني
                </Link>
              </li>
              <li>
                <Link href="/services/bedbugs" className="hover:text-emerald-400 transition">
                  مكافحة بق الفراش بالبخار والضباب
                </Link>
              </li>
              <li>
                <Link href="/services/rodents" className="hover:text-emerald-400 transition">
                  صيد وطرد الفئران والجرذان
                </Link>
              </li>
              <li>
                <Link href="/services/birds" className="hover:text-emerald-400 transition">
                  تركيب شبك وطوارد الحمام
                </Link>
              </li>
              <li>
                <Link href="/services/scorpions" className="hover:text-emerald-400 transition">
                  مكافحة العقارب والثعابين
                </Link>
              </li>
              <li>
                <Link href="/services/agriculture" className="hover:text-emerald-400 transition">
                  رش الحدائق والمسطحات الخضراء
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 border-r-2 border-emerald-500 pr-2">
              روابط سريعة وأدوات
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenCalculator} className="hover:text-emerald-400 transition text-right cursor-pointer">
                  حاسبة تكلفة الرش الفورية
                </button>
              </li>
              <li>
                <button onClick={onOpenAiConsultant} className="hover:text-emerald-400 transition text-right cursor-pointer">
                  المكتب الفني والاستشارات
                </button>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition">
                  المدونة والاستشارات الفنية
                </Link>
              </li>
              <li>
                <Link href="/pests/termite" className="hover:text-emerald-400 transition">
                  دليل النمل الأبيض (الأرضة)
                </Link>
              </li>
              <li>
                <Link href="/pests/bedbug" className="hover:text-emerald-400 transition">
                  دليل حشرة بق الفراش
                </Link>
              </li>
              <li>
                <Link href="/#warranty-check" className="hover:text-emerald-400 transition">
                  التحقق من سريان الضمان
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-400 transition">
                  الأسئلة الشائعة وإرشادات السلامة
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Coverage Regions */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 border-r-2 border-emerald-500 pr-2">
              فروع وتغطية المدن بالمملكة
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center justify-between py-0.5">
                <Link href="/city/riyadh" className="hover:text-emerald-400 transition">
                  مكافحة حشرات الرياض
                </Link>
                <span className="text-[10px] text-emerald-400">فوري</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <Link href="/city/jeddah" className="hover:text-emerald-400 transition">
                  مكافحة حشرات جدة
                </Link>
                <span className="text-[10px] text-emerald-400">فوري</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <Link href="/city/dammam" className="hover:text-emerald-400 transition">
                  مكافحة حشرات الدمام والخبر
                </Link>
                <span className="text-[10px] text-emerald-400">فوري</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <Link href="/city/makkah" className="hover:text-emerald-400 transition">
                  مكافحة حشرات مكة المكرمة
                </Link>
                <span className="text-[10px] text-emerald-400">فوري</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <Link href="/city/madinah" className="hover:text-emerald-400 transition">
                  مكافحة حشرات المدينة المنورة
                </Link>
                <span className="text-[10px] text-emerald-400">فوري</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <Link href="/city/qassim" className="hover:text-emerald-400 transition">
                  مكافحة حشرات القصيم وبريدة
                </Link>
                <span className="text-[10px] text-emerald-400">فوري</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <Link href="/city/abha" className="hover:text-emerald-400 transition">
                  مكافحة حشرات عسير وأبها
                </Link>
                <span className="text-[10px] text-emerald-400">فوري</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <Link href="/#coverage-map" className="text-emerald-400 hover:underline pt-1">
                  + تصفح جميع الـ 15 مدينة والمحافظات
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Commitments Strip */}
        <div className="py-6 border-b border-slate-800/80 text-center">
          <div className="text-[11px] font-bold text-slate-400 mb-3">
            التزامات الجودة والسلامة المهنية:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              🌿 مبيدات بدون رائحة وآمنة على الأسرة والبيئة
            </span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              🛡️ ضمانات موثقة ومتابعات مجانية
            </span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              🔬 أحدث أجهزة الحقن الهيدروليكي والبخار والضباب
            </span>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              ⚡ سرعة استجابة وفرق ميدانية متجولة
            </span>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مؤسسة حصن المملكة لمكافحة الحشرات والوقاية البيئية.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>خدمة معتمدة في كافة أرجاء المملكة</span>
            <span>•</span>
            <span>هاتف موحد: 0558141870</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PEST_SERVICES } from '@/data/services';
import { SAUDI_CITIES } from '@/data/regions';
import { SeoBreadcrumbs } from '@/components/SeoBreadcrumbs';
import { SeoInternalLinks } from '@/components/SeoInternalLinks';
import { JsonLd } from '@/components/JsonLd';
import {
  ShieldCheck,
  Award,
  PhoneCall,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  ChevronLeft,
  Sparkles,
  HelpCircle,
  Bug
} from 'lucide-react';

interface Props {
  params: Promise<{ serviceId: string }>;
}

export async function generateStaticParams() {
  return PEST_SERVICES.map((srv) => ({
    serviceId: srv.id
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceId } = await params;
  const service = PEST_SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    return {
      title: 'الخدمة غير موجودة | حصن المملكة لمكافحة الآفات'
    };
  }

  const title = `${service.title} - أفضل شركة مكافحة ورش مبيدات بالمملكة | حصن المملكة`;
  const description = `${service.shortDesc} ضمان يصل إلى ${service.warrantyPeriod}، مبيدات آمنة ومصرحة، استجابة سريعة في كافة مدن ومحافظات السعودية.`;

  return {
    title,
    description,
    keywords: [
      service.title,
      `شركة ${service.title}`,
      `افضل شركة ${service.title}`,
      `اسعار ${service.title}`,
      `رش مبيدات ${service.title}`,
      ...service.targetPests
    ],
    openGraph: {
      title,
      description,
      images: [{ url: service.heroImage }]
    },
    alternates: {
      canonical: `https://حصن-المملكة.com/services/${service.id}`
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceId } = await params;
  const service = PEST_SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  // Schema for Service and FAQPage
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: 'مؤسسة حصن المملكة لمكافحة الآفات والوقاية الإنشائية',
      telephone: '+966558141870',
      priceRange: 'SAR 180 - 1500',
      areaServed: 'SA'
    },
    offers: {
      '@type': 'Offer',
      price: service.pricingStarting,
      priceCurrency: 'SAR',
      availability: 'https://schema.org/InStock'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={[serviceSchema, faqSchema]} />

      {/* Breadcrumbs */}
      <SeoBreadcrumbs
        items={[
          { name: 'الخدمات التخصصية', url: '/#services' },
          { name: service.title, url: `/services/${service.id}` }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{service.badgeText}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {service.subtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <span className="text-slate-400 block text-[11px]">فترة الضمان:</span>
                <strong className="text-amber-300 font-bold">{service.warrantyPeriod}</strong>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <span className="text-slate-400 block text-[11px]">الأسعار تبدأ من:</span>
                <strong className="text-emerald-400 font-bold">{service.pricingStarting} ر.س</strong>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[11px]">المبيدات المستخدمة:</span>
                <strong className="text-white font-medium line-clamp-1">{service.pesticideType.split('/')[0]}</strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="tel:0558141870"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>حجز الخدمة فوراً: 0558141870</span>
              </a>

              <a
                href={`https://wa.me/966558141870?text=${encodeURIComponent(
                  `السلام عليكم، أرغب بطلب خدمة ${service.title} مع الضمان وفحص الموقع.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-sm rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>استشارة واتساب سريعة</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 aspect-[4/3]">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article & Scientific Protocol (8 cols) */}
          <div className="lg:col-span-8 space-y-10 text-right">
            
            {/* Detailed Description */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-black text-slate-900 border-r-4 border-emerald-600 pr-3">
                تفاصيل بروتوكول {service.title}
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {service.fullDesc}
              </p>
            </div>

            {/* Execution Steps */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>مراحل وخطوات تنفيذ الخدمة الهندسية:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.steps.map((step, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md inline-block mb-2">
                      {step.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Pests & Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <Bug className="w-4 h-4 text-emerald-700" />
                  <span>الآفات المستهدفة بالمعالجة:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.targetPests.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>المنشآت والأماكن المناسبة:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {service.suitableFor.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-emerald-950 mb-3">
                لماذا تختار مؤسسة حصن المملكة لتنفيذ هذه الخدمة؟
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-700" />
                <span>الأسئلة الأكثر شيوعاً حول {service.title}:</span>
              </h3>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <h4 className="font-bold text-sm text-slate-900 mb-2">
                      س: {faq.q}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ج: {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar CTA & City Direct Links (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-right">
            
            {/* Direct Order Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 sticky top-24 space-y-4">
              <div className="inline-flex items-center gap-1 bg-emerald-500 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                <span>طلب خدمة فوري</span>
              </div>

              <h3 className="text-xl font-black">احجز فحصاً مجانياً لموقعك</h3>
              <p className="text-xs text-slate-400">
                فريقنا الميداني متاح الآن في كافة مدن المملكة لتقديم المعاينة وتحديد خطة الرش المناسبة مع الضمان.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:0558141870"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition shadow"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>اتصال مباشر: 0558141870</span>
                </a>

                <a
                  href={`https://wa.me/966558141870?text=${encodeURIComponent(
                    `مرحباً، أرغب بحجز خدمة ${service.title} لمنزلي/منشأتي.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>حجز عبر واتساب 24/7</span>
                </a>
              </div>

              {/* Quick City Link List */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-300 mb-2">
                  اطلب {service.title} في مدينتك:
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {SAUDI_CITIES.map((c) => (
                    <Link
                      key={c.id}
                      href={`/city/${c.id}/${service.id}`}
                      className="bg-slate-800 hover:bg-emerald-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-md transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Internal Linking SEO Matrix */}
      <SeoInternalLinks currentServiceId={service.id} />
    </main>
  );
}

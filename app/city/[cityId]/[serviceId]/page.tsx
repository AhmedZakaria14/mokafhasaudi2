import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { SAUDI_CITIES } from '@/data/regions';
import { PEST_SERVICES } from '@/data/services';
import { SeoBreadcrumbs } from '@/components/SeoBreadcrumbs';
import { SeoInternalLinks } from '@/components/SeoInternalLinks';
import { JsonLd } from '@/components/JsonLd';
import {
  MapPin,
  Clock,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  Car,
  Star,
  Award,
  Sparkles,
  Bug,
  HelpCircle,
  ChevronLeft
} from 'lucide-react';

interface Props {
  params: Promise<{ cityId: string; serviceId: string }>;
}

export async function generateStaticParams() {
  const params: { cityId: string; serviceId: string }[] = [];
  for (const city of SAUDI_CITIES) {
    for (const service of PEST_SERVICES) {
      params.push({
        cityId: city.id,
        serviceId: service.id
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cityId, serviceId } = await params;
  const city = SAUDI_CITIES.find((c) => c.id === cityId);
  const service = PEST_SERVICES.find((s) => s.id === serviceId);

  if (!city || !service) {
    return {
      title: 'الصفحة غير موجودة | حصن المملكة'
    };
  }

  const title = `افضل شركة ${service.title} في ${city.name} - ضمان ${service.warrantyPeriod} | حصن المملكة`;
  const description = `خدمات ${service.title} المتخصصة في ${city.name} وكافة أحيائها. استجابة سريعة خلال ${city.responseTimeMin} دقيقة، مبيدات آمنة ومصرحة، بدون مغادرة المنزل. اتصل الآن: 0558141870.`;

  return {
    title,
    description,
    keywords: [
      `${service.title} في ${city.name}`,
      `شركة ${service.title} في ${city.name}`,
      `افضل شركة ${service.title} في ${city.name}`,
      `اسعار ${service.title} في ${city.name}`,
      `ارقام ${service.title} في ${city.name}`,
      ...city.featuredNeighborhoods.slice(0, 4).map((nh) => `${service.title} حي ${nh}`)
    ],
    openGraph: {
      title,
      description,
      images: [{ url: service.heroImage }]
    },
    alternates: {
      canonical: `https://حصن-المملكة.com/city/${city.id}/${service.id}`
    }
  };
}

export default async function CityServiceComboPage({ params }: Props) {
  const { cityId, serviceId } = await params;
  const city = SAUDI_CITIES.find((c) => c.id === cityId);
  const service = PEST_SERVICES.find((s) => s.id === serviceId);

  if (!city || !service) {
    notFound();
  }

  const comboSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} في ${city.name}`,
    description: service.shortDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: `مؤسسة حصن المملكة لمكافحة الآفات - ${city.name}`,
      telephone: '+966558141870',
      priceRange: 'SAR 180 - 1500',
      areaServed: {
        '@type': 'City',
        name: city.name
      }
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
    mainEntity: [
      {
        '@type': 'Question',
        name: `كم يستغرق وصول فني ${service.title} في ${city.name}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `يصل فريقنا الميداني خلال ${city.responseTimeMin} دقيقة تقريباً لجميع أحياء ${city.name}.`
        }
      },
      {
        '@type': 'Question',
        name: `ما هي مدة ضمان ${service.title} في ${city.name}؟`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `نقدم ضماناً معتمداً يصل إلى ${service.warrantyPeriod} مع زيارات ومتابعات دورية مجانية.`
        }
      },
      ...service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a
        }
      }))
    ]
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={[comboSchema, faqSchema]} />

      {/* Breadcrumbs */}
      <SeoBreadcrumbs
        items={[
          { name: `مكافحة حشرات ${city.name}`, url: `/city/${city.id}` },
          { name: service.title, url: `/city/${city.id}/${service.id}` }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>خدمة ميدانية مباشرة في مدينة {city.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              افضل شركة {service.title} في {city.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              حلول جذرية ومبيدات آمنة مصرحة من هيئة الغذاء والدواء مع ضمان معتمد يصل إلى {service.warrantyPeriod} وتغطية شاملة لكافة أحياء {city.name}.
            </p>

            {/* Quick Spec Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <span className="text-slate-400 block text-[11px]">الضمان المعتمد:</span>
                <strong className="text-amber-300 font-bold">{service.warrantyPeriod}</strong>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <span className="text-slate-400 block text-[11px]">الأسعار تبدأ من:</span>
                <strong className="text-emerald-400 font-bold">{service.pricingStarting} ر.س</strong>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[11px]">سرعة الوصول بـ{city.name}:</span>
                <strong className="text-white font-bold">{city.responseTimeMin} دقيقة</strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="tel:0558141870"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>طلب الخدمة في {city.name}: 0558141870</span>
              </a>

              <a
                href={`https://wa.me/966558141870?text=${encodeURIComponent(
                  `السلام عليكم، أرغب بطلب خدمة ${service.title} في مدينة ${city.name}.`
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 aspect-[4/3] bg-slate-900">
              <SafeImage
                src={service.heroImage}
                alt={`${service.title} في ${city.name}`}
                fill
                className="object-cover"
                fallbackTitle={`${service.title} - ${city.name}`}
                fallbackCategory="خدمة معتمدة"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-right">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-black text-slate-900 border-r-4 border-emerald-600 pr-3">
                لماذا تعتبر حصن المملكة الخيار الأول لـ {service.title} في {city.name}؟
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                نقدم في مؤسسة حصن المملكة أحدث بروتوكولات المكافحة المعتمدة لخدمة {service.title} داخل مدينة {city.name} والمناطق المجاورة. نستخدم مبيدات أوروبية وأمريكية معتمدة من الهيئة العامة للغذاء والدواء لا تسبب أي روائح كريهة ولا تتطلب مغادرة أفراد العائلة أو إفراغ الأواني، مما يضمن أقصى درجات الفعالية والسلامة البيئية.
              </p>
            </div>

            {/* Steps in this city */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>خطوات تنفيذ {service.title} في موقعك:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.steps.map((st, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                    <div className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
                      {st.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhoods targeted */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-right space-y-3">
              <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-800" />
                <span>أحياء {city.name} المشمولة بالخدمة الميدانية السريعة:</span>
              </h3>
              <p className="text-xs text-slate-600">
                تغطي سياراتنا المجهزة خدمة {service.title} في كافة أحياء {city.name}:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {city.allNeighborhoods.map((nh, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-emerald-300 text-emerald-900 text-xs px-2.5 py-1 rounded-lg font-medium shadow-2xs"
                  >
                    حي {nh}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-700" />
                <span>الأسئلة الشائعة حول {service.title} في {city.name}:</span>
              </h3>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 mb-1">
                  كم يستغرق وصول فني المكافحة في {city.name}؟
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  يصل فنيونا الميدانيون خلال {city.responseTimeMin} دقيقة تقريباً من تأكيد الطلب، مع إمكانية جدولة الموعد حسب الوقت المناسب لك.
                </p>
              </div>
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-right">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 sticky top-24 space-y-4">
              <div className="inline-flex items-center gap-1 bg-emerald-500 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                <span>استجابة فورية</span>
              </div>
              <h3 className="text-xl font-black">
                اطلب {service.title} في {city.name}
              </h3>
              <p className="text-xs text-slate-400">
                فريقنا الميداني جاهز للتوجه لموقعك في {city.name} وإجراء المعاينة الشاملة مع الضمان الخطي.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:0558141870"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition shadow"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>اتصال: 0558141870</span>
                </a>

                <a
                  href={`https://wa.me/966558141870?text=${encodeURIComponent(
                    `مرحباً، أرغب بحجز خدمة ${service.title} في مدينة ${city.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>حجز عبر واتساب</span>
                </a>
              </div>

              {/* Other services in this city */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-300 mb-2">
                  خدمات أخرى متوفرة في {city.name}:
                </div>
                <div className="flex flex-col gap-1.5 text-xs">
                  {PEST_SERVICES.filter(s => s.id !== service.id).map(otherSrv => (
                    <Link
                      key={otherSrv.id}
                      href={`/city/${city.id}/${otherSrv.id}`}
                      className="text-slate-400 hover:text-emerald-400 py-1 transition flex items-center justify-between"
                    >
                      <span className="line-clamp-1">{otherSrv.title}</span>
                      <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Internal SEO Link Matrix */}
      <SeoInternalLinks currentCityId={city.id} currentServiceId={service.id} />
    </main>
  );
}

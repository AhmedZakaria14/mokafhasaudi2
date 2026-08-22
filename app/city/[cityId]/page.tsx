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
  ChevronLeft,
  Bug,
  Building,
  Sparkles
} from 'lucide-react';

interface Props {
  params: Promise<{ cityId: string }>;
}

export async function generateStaticParams() {
  return SAUDI_CITIES.map((city) => ({
    cityId: city.id
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cityId } = await params;
  const city = SAUDI_CITIES.find((c) => c.id === cityId);

  if (!city) {
    return {
      title: 'المدينة غير موجودة | حصن المملكة لمكافحة الآفات'
    };
  }

  const title = `شركة مكافحة حشرات في ${city.name} - رش مبيدات مع الضمان | حصن المملكة`;
  const description = `افضل شركة مكافحة حشرات ورش مبيدات في ${city.name} وكافة أحيائها (${city.featuredNeighborhoods.slice(0, 5).join('، ')}). مبيدات آمنة ومصرحة، بدون مغادرة المنزل، وضمان حتى 15 سنة. اتصل الآن: 0558141870.`;

  return {
    title,
    description,
    keywords: [
      `شركة مكافحة حشرات في ${city.name}`,
      `رش مبيدات في ${city.name}`,
      `مكافحة النمل الابيض في ${city.name}`,
      `مكافحة بق الفراش في ${city.name}`,
      `ابادة الصراصير في ${city.name}`,
      `طرد الحمام في ${city.name}`,
      `اسعار رش الحشرات في ${city.name}`,
      ...city.featuredNeighborhoods.map((nh) => `مكافحة حشرات حي ${nh}`)
    ],
    openGraph: {
      title,
      description,
      images: [{ url: city.heroImage }]
    },
    alternates: {
      canonical: `https://حصن-المملكة.com/city/${city.id}`
    }
  };
}

export default async function CityDetailPage({ params }: Props) {
  const { cityId } = await params;
  const city = SAUDI_CITIES.find((c) => c.id === cityId);

  if (!city) {
    notFound();
  }

  const citySchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `مؤسسة حصن المملكة لمكافحة الآفات - فرع ${city.name}`,
    description: city.description,
    telephone: '+966558141870',
    priceRange: 'SAR 180 - 1500',
    areaServed: {
      '@type': 'City',
      name: city.name
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: city.rating.toString(),
      reviewCount: city.reviewCount.toString()
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={citySchema} />

      {/* Breadcrumbs */}
      <SeoBreadcrumbs
        items={[
          { name: 'مناطق التغطية بالمملكة', url: '/#coverage-map' },
          { name: `مكافحة حشرات ${city.name}`, url: `/city/${city.id}` }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>تغطية ميدانية شاملة لجميع أحياء {city.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              شركة مكافحة حشرات ورش مبيدات في {city.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {city.description}
            </p>

            {/* City Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <span className="text-slate-400 block text-[11px]">زمن الوصول للموقع:</span>
                <strong className="text-emerald-400 font-bold">{city.responseTimeMin} دقيقة تقريباً</strong>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <span className="text-slate-400 block text-[11px]">تقييم العملاء بالمدينة:</span>
                <strong className="text-amber-300 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{city.rating} / 5 ({city.reviewCount} تقييم)</span>
                </strong>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[11px]">الضمان المعتمد:</span>
                <strong className="text-white font-bold">يصل إلى 15 سنة</strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="tel:0558141870"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>طلب فني في {city.name}: 0558141870</span>
              </a>

              <a
                href={`https://wa.me/966558141870?text=${encodeURIComponent(
                  `السلام عليكم، أرغب بطلب فحص ورش مبيدات في مدينة ${city.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-sm rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>واتساب فوري (24/7)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 aspect-[4/3] bg-slate-900">
              <SafeImage
                src={city.heroImage}
                alt={`خدمات مكافحة الحشرات في ${city.name}`}
                fill
                className="object-cover"
                fallbackTitle={`مكافحة الحشرات في ${city.name}`}
                fallbackCategory={city.region}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main City Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Services in this City Grid */}
        <div className="space-y-6 text-right">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                خدماتنا المتخصصة
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                خدمات مكافحة الآفات المتاحة في {city.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PEST_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                      {srv.warrantyPeriod}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">
                    {srv.title} في {city.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">يبدأ من: </span>
                    <strong className="text-emerald-700 font-bold">{srv.pricingStarting} ر.س</strong>
                  </div>
                  <Link
                    href={`/city/${city.id}/${srv.id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>تفاصيل الخدمة</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neighborhoods Coverage Matrix */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 text-right space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-700" />
            <span>نطاق تغطية أحياء ومخططات {city.name}:</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            تنتشر سياراتنا المجهزة وفرق الفنيين في كافة أحياء {city.name} لضمان سرعة الوصول خلال {city.responseTimeMin} دقيقة:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
            {city.allNeighborhoods.map((nh, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-2 rounded-xl text-xs text-slate-800 font-medium text-center hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                حي {nh}
              </div>
            ))}
          </div>
        </div>

        {/* Common Pests in this City */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 text-right space-y-4">
          <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
            <Bug className="w-5 h-5 text-emerald-800" />
            <span>الآفات والحشرات الأكثر انتشاراً في {city.name} وطرق علاجها:</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            نظراً للطبيعة المناخية والجغرافية لمنطقة {city.regionName}، تنتشر بعض الآفات بكثرة ونوفر لها حلولاً متقدمة بضمان معتمد:
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {city.popularPests.map((pest, idx) => (
              <div
                key={idx}
                className="bg-white border border-emerald-300 text-emerald-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pest}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Call Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            هل تحتاج لخدمة رش مبيدات فورية في {city.name}؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            تواصل معنا الآن ليصلك الفريق الميداني خلال دقائق لمعاينة الموقع وتطبيق العلاج المناسب بمبيدات آمنة وبدون رائحة.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:0558141870"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition flex items-center gap-2 shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال فوري: 0558141870</span>
            </a>
            <a
              href={`https://wa.me/966558141870?text=${encodeURIComponent(
                `السلام عليكم، أرغب بحجز موعد رش مبيدات في مدينة ${city.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-sm rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثة واتساب</span>
            </a>
          </div>
        </div>

      </section>

      {/* Internal SEO Link Matrix */}
      <SeoInternalLinks currentCityId={city.id} />
    </main>
  );
}

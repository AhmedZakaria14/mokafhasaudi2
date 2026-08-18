import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SAUDI_PESTS } from '@/data/pests';
import { PEST_SERVICES } from '@/data/services';
import { SeoBreadcrumbs } from '@/components/SeoBreadcrumbs';
import { SeoInternalLinks } from '@/components/SeoInternalLinks';
import { JsonLd } from '@/components/JsonLd';
import {
  Bug,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info,
  ChevronLeft
} from 'lucide-react';

interface Props {
  params: Promise<{ pestId: string }>;
}

export async function generateStaticParams() {
  return SAUDI_PESTS.map((p) => ({
    pestId: p.id
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pestId } = await params;
  const pest = SAUDI_PESTS.find((p) => p.id === pestId);

  if (!pest) {
    return {
      title: 'الآفة غير موجودة | حصن المملكة'
    };
  }

  const title = `دليل مكافحة ${pest.name} في السعودية - الأعراض وطرق الإبادة | حصن المملكة`;
  const description = `تعرف على علامات وأعراض انتشار ${pest.name}، ومخاطرها الصحية، وأفضل طرق الإبادة الجذرية بمبيدات آمنة ومصرحة من هيئة الغذاء والدواء بضمان معتمد.`;

  return {
    title,
    description,
    keywords: [
      `مكافحة ${pest.name}`,
      `طرق القضاء على ${pest.name}`,
      `علامات وجود ${pest.name}`,
      `مبيد ${pest.name}`,
      `شركة مكافحة ${pest.name}`
    ],
    openGraph: {
      title,
      description,
      images: [{ url: pest.image }]
    },
    alternates: {
      canonical: `https://حصن-المملكة.com/pests/${pest.id}`
    }
  };
}

export default async function PestDetailPage({ params }: Props) {
  const { pestId } = await params;
  const pest = SAUDI_PESTS.find((p) => p.id === pestId);

  if (!pest) {
    notFound();
  }

  const pestSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `دليل التعرف على ${pest.name} وطرق مكافحتها بالمملكة`,
    description: pest.recommendedTreatment,
    image: pest.image,
    author: {
      '@type': 'Organization',
      name: 'مؤسسة حصن المملكة لمكافحة الآفات'
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={pestSchema} />

      {/* Breadcrumbs */}
      <SeoBreadcrumbs
        items={[
          { name: 'موسوعة الحشرات والآفات', url: '/#pest-identifier' },
          { name: pest.name, url: `/pests/${pest.id}` }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Bug className="w-4 h-4 text-emerald-400" />
              <span>تصنيف الآفة: {pest.category} ({pest.nameEn})</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              دليل مكافحة وإبادة {pest.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {pest.recommendedTreatment}
            </p>

            {/* Severity & Season Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
                <span className="text-slate-400 block text-[11px] mb-1">درجة الخطورة:</span>
                <strong className="text-amber-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{pest.severity}</span>
                </strong>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
                <span className="text-slate-400 block text-[11px] mb-1">موسم التكاثر والنشاط:</span>
                <strong className="text-emerald-300 font-bold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="line-clamp-1">{pest.breedingSeason}</span>
                </strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="tel:0558141870"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>طلب مكافحة {pest.name}: 0558141870</span>
              </a>

              <a
                href={`https://wa.me/966558141870?text=${encodeURIComponent(
                  `السلام عليكم، لدي مشكلة مع حشرة (${pest.name}) وأرغب بفحص فوري للموقع وعلاجها مع الضمان.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-sm rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>استشارة فنية عبر واتساب</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 aspect-[4/3]">
              <Image
                src={pest.image}
                alt={`صورة ومعلومات عن ${pest.name}`}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Guide Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-right">
            
            {/* Symptoms & Infestation Signs */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-black text-slate-900 border-r-4 border-emerald-600 pr-3">
                علامات وأعراض الإصابة بـ {pest.name} في المنزل أو المنشأة:
              </h2>
              <ul className="space-y-2.5 text-slate-700 text-xs sm:text-sm">
                {pest.symptoms.map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="font-medium">{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health & Structural Risks */}
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold text-rose-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>المخاطر والأضرار الناتجة عن إهمال مكافحة {pest.name}:</span>
              </h3>
              <ul className="space-y-2 text-rose-900 text-xs sm:text-sm">
                {pest.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-2" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Protocol */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-3">
              <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>بروتوكول العلاج المعتمد من حصن المملكة:</span>
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {pest.recommendedTreatment}
              </p>
            </div>

            {/* Prevention & DIY Tips */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>إرشادات ونصائح وقائية لمنع ظهور {pest.name}:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pest.diyTips.map((tip, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      💡 {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 text-right">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 sticky top-24 space-y-4">
              <div className="inline-flex items-center gap-1 bg-emerald-500 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                <span>إبادة جذرية مضمونة</span>
              </div>
              <h3 className="text-xl font-black">
                تخلص من {pest.name} فوراً
              </h3>
              <p className="text-xs text-slate-400">
                فريقنا الميداني مجهز بالمبيدات المعتمدة والمصرحة للتعامل الفوري مع هذه الآفة وضمان عدم عودتها.
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
                    `مرحباً، أحتاج فني متخصص لمكافحة ${pest.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>طلب فحص عبر واتساب</span>
                </a>
              </div>

              {/* Related Pests */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-300 mb-2">
                  آفات وحشرات أخرى شائعة:
                </div>
                <div className="flex flex-col gap-1.5 text-xs">
                  {SAUDI_PESTS.filter(p => p.id !== pest.id).slice(0, 6).map(otherPest => (
                    <Link
                      key={otherPest.id}
                      href={`/pests/${otherPest.id}`}
                      className="text-slate-400 hover:text-emerald-400 py-1 transition flex items-center justify-between"
                    >
                      <span className="line-clamp-1">{otherPest.name}</span>
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
      <SeoInternalLinks currentPestId={pest.id} />
    </main>
  );
}

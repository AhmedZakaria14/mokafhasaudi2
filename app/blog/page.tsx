import React from 'react';
import { Metadata } from 'next';
import { SAUDI_BLOG_POSTS } from '@/data/blog';
import { SeoBreadcrumbs } from '@/components/SeoBreadcrumbs';
import { SeoInternalLinks } from '@/components/SeoInternalLinks';
import { JsonLd } from '@/components/JsonLd';
import { BlogDirectoryClient } from '@/components/BlogDirectoryClient';
import { BookOpen, ShieldCheck, Sparkles, PhoneCall, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'موسوعة واستشارات مكافحة الآفات ورش المبيدات المعتمدة بالمملكة | حصن المملكة',
  description: 'دليل وموسوعة علمية وهندسية شاملة لمكافحة النمل الأبيض (الأرضة)، بق الفراش، صراصير المطابخ الألمانية، سوس الخشب، طرد الحمام، واشتراطات الهاسب للمنشآت في كافة مدن السعودية.',
  keywords: [
    'مدونة مكافحة الحشرات السعودية',
    'استشارات رش المبيدات بالرياض',
    'علاج النمل الابيض والارضة',
    'مكافحة بق الفراش بالحرارة والبخار',
    'اسعار رش الحشرات بالسعودية',
    'مبيدات معتمدة من هيئة الغذاء والدواء SFDA',
    'عقود مكافحة الحشرات للمطاعم والبلديات'
  ],
  alternates: {
    canonical: 'https://حصن-المملكة.com/blog'
  }
};

export default function BlogDirectoryPage() {
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'موسوعة واستشارات حصن المملكة لمكافحة الآفات والصحة العامة',
    description: 'مقالات وأدلة علمية تفصيلية تغطي مكافحة الحشرات والقوارض والوقاية الإنشائية في كافة مناطق المملكة العربية السعودية.',
    url: 'https://حصن-المملكة.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'مؤسسة حصن المملكة لمكافحة الآفات',
      logo: {
        '@type': 'ImageObject',
        url: 'https://حصن-المملكة.com/icon.png'
      }
    },
    blogPost: SAUDI_BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: '2026-08-18',
      image: post.image,
      author: {
        '@type': 'Person',
        name: post.author
      },
      url: `https://حصن-المملكة.com/blog/${post.slug}`
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <JsonLd data={blogListSchema} />

      {/* Breadcrumbs Navigation */}
      <SeoBreadcrumbs
        items={[{ name: 'الموسوعة والمدونة الفنية', url: '/blog' }]}
      />

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-emerald-900/40">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>الموسوعة الهندسية الأكبر لمكافحة الآفات بالمملكة</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
            الموسوعة العلمية لمكافحة الآفات والوقاية الإنشائية
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            أدلة مرجعية شاملة ومقالات متخصصة لا تقل عن 1500 كلمة لكل محور، تشرح بيولوجيا الحشرات، وأحدث المعايير الكيميائية المصرحة من هيئة الغذاء والدواء SFDA، مع إرشادات جغرافية دقيقة لكل مدينة ومحافظة سعودية.
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap justify-center gap-4 pt-4 text-xs text-slate-300 font-bold">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مبيدات معتمدة SFDA</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <Award className="w-4 h-4 text-amber-400" />
              <span>مهندسون زراعيون مرخصون</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{SAUDI_BLOG_POSTS.length} أدلة تفصيلية</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Blog Directory (Search, Categories & Article Grid) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <BlogDirectoryClient posts={SAUDI_BLOG_POSTS} />
      </section>

      {/* Internal SEO & Geo Link Network */}
      <SeoInternalLinks />
    </main>
  );
}

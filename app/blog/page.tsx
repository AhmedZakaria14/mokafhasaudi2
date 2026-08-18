import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SAUDI_BLOG_POSTS } from '@/data/blog';
import { SeoBreadcrumbs } from '@/components/SeoBreadcrumbs';
import { SeoInternalLinks } from '@/components/SeoInternalLinks';
import { JsonLd } from '@/components/JsonLd';
import { BookOpen, Calendar, Clock, ChevronLeft, User, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'مدونة واستشارات مكافحة الآفات ورش المبيدات | حصن المملكة',
  description: 'مقالات علمية وإرشادات هندسية متخصصة في مكافحة النمل الأبيض، بق الفراش، الصراصير، طرد الحمام، واشتراطات المنشآت بالمملكة العربية السعودية.',
  keywords: [
    'مدونة مكافحة الحشرات',
    'نصائح رش المبيدات',
    'علاج النمل الابيض في المنزل',
    'اسعار رش الحشرات بالسعودية',
    'مكافحة بق الفراش'
  ],
  alternates: {
    canonical: 'https://حصن-المملكة.com/blog'
  }
};

export default function BlogDirectoryPage() {
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'مدونة حصن المملكة لمكافحة الآفات',
    description: 'مقالات وإرشادات شاملة عن مكافحة الحشرات ورش المبيدات والوقاية الإنشائية بالمملكة.',
    blogPost: SAUDI_BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: '2026-08-15',
      image: post.image,
      url: `https://حصن-المملكة.com/blog/${post.slug}`
    }))
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={blogListSchema} />

      {/* Breadcrumbs */}
      <SeoBreadcrumbs
        items={[{ name: 'المدونة والاستشارات الفنية', url: '/blog' }]}
      />

      {/* Header Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>المرجع الشامل لمكافحة الآفات بالمملكة</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
            مدونة الاستشارات الفنية والوقاية الإنشائية
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            دليلك الهندسي والعملي للتعرف على سلوك الآفات، وأحدث تقنيات المكافحة الآمنة المصرحة من هيئة الغذاء والدواء مع أفضل الممارسات لحماية العقار والأسرة.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAUDI_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 bg-emerald-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3 text-right">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-bold text-lg text-slate-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="line-clamp-1">{post.author.split('-')[0]}</span>
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition"
                >
                  <span>قراءة المقال</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Internal SEO Links */}
      <SeoInternalLinks />
    </main>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SAUDI_BLOG_POSTS } from '@/data/blog';
import { SeoBreadcrumbs } from '@/components/SeoBreadcrumbs';
import { SeoInternalLinks } from '@/components/SeoInternalLinks';
import { JsonLd } from '@/components/JsonLd';
import {
  Calendar,
  Clock,
  User,
  Share2,
  PhoneCall,
  MessageSquare,
  ChevronLeft,
  BookOpen,
  Tag
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SAUDI_BLOG_POSTS.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = SAUDI_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'المقال غير موجود | حصن المملكة'
    };
  }

  return {
    title: `${post.title} | حصن المملكة`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article'
    },
    alternates: {
      canonical: `https://حصن-المملكة.com/blog/${post.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = SAUDI_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: '2026-08-15',
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'مؤسسة حصن المملكة لمكافحة الآفات',
      logo: {
        '@type': 'ImageObject',
        url: 'https://حصن-المملكة.com/icon.png'
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={articleSchema} />

      {/* Breadcrumbs */}
      <SeoBreadcrumbs
        items={[
          { name: 'المدونة والاستشارات', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` }
        ]}
      />

      {/* Hero / Header */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 text-right relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-400" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>وقت القراءة: {post.readTime}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Article Content */}
      <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-right">
        
        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="bg-emerald-50 border-r-4 border-emerald-600 p-5 rounded-2xl text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
          {post.excerpt}
        </div>

        {/* Formatted Content */}
        <div className="prose prose-slate max-w-none text-slate-800 space-y-6 text-sm sm:text-base leading-loose whitespace-pre-line">
          {post.content}
        </div>

        {/* Keywords Tags */}
        <div className="pt-6 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-600 mb-2.5">الكلمات الدلالية والبحثية ذات الصلة:</div>
          <div className="flex flex-wrap gap-2">
            {post.keywords.map((kw, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 text-xs px-3 py-1 rounded-lg font-medium transition"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Service Order Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="text-emerald-400 text-xs font-bold uppercase">حلول مكافحة الآفات الفورية</div>
          <h3 className="text-xl sm:text-2xl font-black">
            هل تواجه مشكلة حشرات في منزلك أو منشأتك؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            احصل على فحص فوري للموقع من مهندسي حصن المملكة مع تطبيق بروتوكول مكافحة آمن بدون رائحة وبضمان رسمي موثق.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="tel:0558141870"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال مباشر: 0558141870</span>
            </a>
            <a
              href={`https://wa.me/966558141870?text=${encodeURIComponent(
                `السلام عليكم، قرأت مقال "${post.title}" وأرغب باستشارة مجانية لموقعي.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>استشارة فورية عبر واتساب</span>
            </a>
          </div>
        </div>

      </article>

      {/* Related Articles & Internal Link Matrix */}
      <SeoInternalLinks />
    </main>
  );
}

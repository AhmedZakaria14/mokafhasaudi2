'use client';

import React from 'react';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import { SAUDI_BLOG_POSTS } from '@/data/blog';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  // Show top featured posts
  const featuredPosts = SAUDI_BLOG_POSTS.slice(0, 4);

  return (
    <section id="blog" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>المكتبة الفنية والمقالات الإرشادية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            مقالات وتوجيهات الخبراء لمكافحة الآفات بالمملكة
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
            معلومات علمية موثقة حول التراخيص، معايير المبيدات الآمنة، وكيفية التعامل مع مختلف الآفات في المنازل والمنشآت.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-right group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackTitle={post.title}
                    fallbackCategory={post.category}
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-700" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-700" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-black text-sm text-slate-900 group-hover:text-emerald-800 transition leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 border border-emerald-300 group-hover:bg-emerald-700 group-hover:text-white"
                >
                  <span>قراءة المقال والدليل الشامل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Articles Bar */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>تصفح مكتبة المقالات والاستشارات الهندسية بالكامل ({SAUDI_BLOG_POSTS.length} مقالاً)</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};


'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SAUDI_BLOG_POSTS, BlogPost } from '@/data/blog';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronLeft,
  X,
  Share2,
  Tag,
  User,
  PhoneCall
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>المكتبة الفنية والمقالات الإرشادية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            مقالات وتوجيهات الخبراء لمكافحة الآفات بالمملكة
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            معلومات علمية موثقة حول التراخيص، معايير المبيدات الآمنة، وكيفية التعامل مع مختلف الآفات في المنازل والمنشآت.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAUDI_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-right group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex-1 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 border border-emerald-200"
                >
                  <span>صفحة المقال</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setActivePost(post)}
                  className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs rounded-xl transition border border-slate-200 cursor-pointer"
                  title="قراءة سريعة"
                >
                  معاينة
                </button>
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
            <span>تصفح مكتبة المقالات والاستشارات الهندسية بالكامل</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-right relative animate-in fade-in zoom-in duration-200">
            {/* Header image banner */}
            <div className="relative h-60 w-full bg-slate-900">
              <Image
                src={activePost.image}
                alt={activePost.title}
                fill
                className="object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 left-4 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 right-6 left-6 text-white space-y-1">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <span>{activePost.category}</span>
                  <span>•</span>
                  <span>{activePost.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">{activePost.title}</h3>
                <div className="text-xs text-slate-300 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>بقلم: {activePost.author}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
              <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-2xl text-emerald-950 font-medium">
                {activePost.excerpt}
              </div>

              <div className="whitespace-pre-line space-y-4">
                {activePost.content}
              </div>

              {/* Keywords Tag Cloud */}
              <div className="pt-4 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>الكلمات المفتاحية وعمليات البحث ذات الصلة:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePost.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-lg font-medium"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking CTA inside article */}
              <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-amber-300">هل تحتاج مساعدة فنية فورية؟</div>
                  <p className="text-xs text-slate-300">فريقنا متاح في كافة مدن المملكة على مدار 24 ساعة مع ضمان معتمد.</p>
                </div>
                <a
                  href="tel:0558141870"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow whitespace-nowrap"
                >
                  اتصل الآن: 0558141870
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

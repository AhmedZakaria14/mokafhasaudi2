'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/blog';
import {
  Search,
  Calendar,
  Clock,
  User,
  ChevronLeft,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Tag,
  ArrowRight
} from 'lucide-react';

interface BlogDirectoryClientProps {
  posts: BlogPost[];
}

export const BlogDirectoryClient: React.FC<BlogDirectoryClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];

  return (
    <div className="space-y-12">
      
      {/* Search and Category Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5 text-right">
        
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="ابحث في الموسوعة (مثال: نمل أبيض، صراصير، بق الفراش، الرياض، جدة، ترخيص SFDA...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-3.5 pr-12 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-600 font-medium transition"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-3.5 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 px-2 py-1 rounded-md font-bold"
            >
              مسح
            </button>
          )}
        </div>

        {/* Category Pills Tabs */}
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-emerald-800 border-emerald-900 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? `جميع المقالات (${posts.length})` : cat}
            </button>
          ))}
        </div>

      </div>

      {/* Featured Spotlight Article (Show only when no active search/category filter) */}
      {!searchQuery && selectedCategory === 'all' && featuredPost && (
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl overflow-hidden shadow-xl border border-emerald-900 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4 text-right">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>دليل الأسبوع المميز</span>
              </span>
              <span className="text-xs text-emerald-300 font-bold bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
                {featuredPost.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-white">
              <Link href={`/blog/${featuredPost.slug}`} className="hover:text-amber-300 transition">
                {featuredPost.title}
              </Link>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 font-medium">
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                <User className="w-4 h-4 text-emerald-400" />
                <span>{featuredPost.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{featuredPost.readTime}</span>
              </span>
            </div>

            <div className="pt-3">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md active:scale-95"
              >
                <span>قراءة الدليل الكامل والمفصل</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[16/11] lg:h-full min-h-[260px] overflow-hidden bg-slate-900">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              priority
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      )}

      {/* Main Articles Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 text-right">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>المقالات والأدلة الفنية ({filteredPosts.length})</span>
          </h3>
          {filteredPosts.length === 0 && (
            <span className="text-xs text-slate-500">لا توجد نتائج مطابقة</span>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-900 text-base">لم نتمكن من العثور على مقالات تطابق بحثك</h4>
            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
              جرب البحث بكلمات أخرى مثل &quot;نمل أبيض&quot;، &quot;بق الفراش&quot;، &quot;صراصير&quot;، أو استعرض جميع المقالات.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              عرض جميع المقالات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-right"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 right-3 bg-slate-950/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-xs">
                      {post.category}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-emerald-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{post.date}</span>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <User className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="line-clamp-1">{post.author.split('-')[0]}</span>
                      </span>
                    </div>

                    <h3 className="font-black text-base text-slate-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>مرخص SFDA</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition group-hover:translate-x-[-2px]"
                  >
                    <span>قراءة المقال</span>
                    <ChevronLeft className="w-4 h-4 text-emerald-700" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

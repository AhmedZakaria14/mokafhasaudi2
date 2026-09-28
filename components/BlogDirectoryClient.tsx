'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { BlogPost } from '@/data/blog';
import {
  Search,
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Tag,
  MapPin,
  Bug,
  Filter,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface BlogDirectoryClientProps {
  posts: BlogPost[];
}

const ITEMS_PER_PAGE = 12;

export const BlogDirectoryClient: React.FC<BlogDirectoryClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedPest, setSelectedPest] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Region tabs
  const REGION_OPTIONS = [
    { id: 'all', name: 'كافة مناطق المملكة' },
    { id: 'central', name: 'المنطقة الوسطى (الرياض والمحافظات)' },
    { id: 'western', name: 'المنطقة الغربية (جدة ومكة والمدينة)' },
    { id: 'eastern', name: 'المنطقة الشرقية (الدمام والخبر والأحساء)' },
    { id: 'southern', name: 'المنطقة الجنوبية (عسير وجازان ونجران)' },
    { id: 'northern', name: 'المنطقة الشمالية (تبوك وحائل والجوف)' },
    { id: 'qassim', name: 'منطقة القصيم (بريدة وعنيزة والرس)' }
  ];

  // Pest categories
  const PEST_OPTIONS = [
    { id: 'all', name: 'جميع الآفات والتخصصات' },
    { id: 'النمل الأبيض', name: 'النمل الأبيض (الأرضة والدفان)' },
    { id: 'الصراصير', name: 'صراصير المطابخ والمجاري' },
    { id: 'بق الفراش', name: 'بق الفراش والمفروشات' },
    { id: 'طرد الحمام', name: 'طرد الحمام وشبك الطيور' },
    { id: 'القوارض', name: 'الفئران والجرذان' }
  ];

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesRegion =
        selectedRegion === 'all' || p.region === selectedRegion || p.region === 'general';
      const matchesPest =
        selectedPest === 'all' ||
        (p.pestType && p.pestType.includes(selectedPest)) ||
        p.category.includes(selectedPest) ||
        p.title.includes(selectedPest);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.city && p.city.toLowerCase().includes(q)) ||
        p.author.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesRegion && matchesPest && matchesSearch;
    });
  }, [posts, selectedRegion, selectedPest, searchQuery]);

  // Reset to page 1 on filter change
  const handleFilterChange = (type: 'region' | 'pest' | 'search', val: string) => {
    setCurrentPage(1);
    if (type === 'region') setSelectedRegion(val);
    if (type === 'pest') setSelectedPest(val);
    if (type === 'search') setSearchQuery(val);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const featuredPost = posts[0];

  return (
    <div className="space-y-10">
      
      {/* Search and Advanced Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-right">
        
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="ابحث بالمدينة أو الآفة (مثال: الرياض، جدة، نمل أبيض، صراصير، الأحساء، تبوك، الخرج، بق الفراش...)"
            value={searchQuery}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-3.5 pr-12 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-600 font-medium transition"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleFilterChange('search', '')}
              className="absolute left-4 top-3.5 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 px-2 py-1 rounded-md font-bold cursor-pointer"
            >
              مسح
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 border-t border-slate-100">
          
          {/* Region Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>تصفية حسب المنطقة الجغرافية بالمملكة:</span>
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 font-bold"
            >
              {REGION_OPTIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pest Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Bug className="w-3.5 h-3.5 text-emerald-700" />
              <span>تصفية حسب نوع الآفة أو المشكلة:</span>
            </label>
            <select
              value={selectedPest}
              onChange={(e) => handleFilterChange('pest', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 font-bold"
            >
              {PEST_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Pest Filter Pills */}
        <div className="flex flex-wrap gap-1.5 justify-center pt-2">
          {PEST_OPTIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleFilterChange('pest', p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                selectedPest === p.id
                  ? 'bg-emerald-800 border-emerald-900 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

      </div>

      {/* Featured Spotlight Article (Show only on page 1 when no query) */}
      {!searchQuery && selectedRegion === 'all' && selectedPest === 'all' && currentPage === 1 && featuredPost && (
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl overflow-hidden shadow-xl border border-emerald-900 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4 text-right">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>دليل الأسبوع المميز</span>
              </span>
              <span className="text-xs text-emerald-300 font-bold bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
                {featuredPost.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-white">
              <Link href={`/blog/${featuredPost.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition inline-flex items-baseline gap-1">
                <span>{featuredPost.title}</span>
                <ExternalLink className="w-4 h-4 text-emerald-400 inline shrink-0" />
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
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md active:scale-95"
              >
                <span>فتح الدليل الكامل في نافذة جديدة</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[16/11] lg:h-full min-h-[260px] overflow-hidden bg-slate-900">
            <SafeImage
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              priority
              className="object-cover"
              fallbackTitle={featuredPost.title}
              fallbackCategory={featuredPost.category}
            />
          </div>
        </section>
      )}

      {/* Main Articles Grid & Results Counter */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 text-right">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>الموسوعة والأدلة الفنية بالمملكة</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              عرض {paginatedPosts.length} مقال من إجمالي {filteredPosts.length} دليلاً هندسياً متخصصاً
            </p>
          </div>

          {/* Quick Page Info */}
          {totalPages > 1 && (
            <div className="text-xs text-slate-600 font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
              الصفحة {currentPage} من {totalPages}
            </div>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 shadow-xs">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-900 text-base">لم نتمكن من العثور على مقالات تطابق معايير البحث</h4>
            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
              جرب البحث باسم مدينة أخرى (مثل الرياض، جدة، الدمام، مكة، تبوك، الأحساء، بريدة) أو نوع الحشرة.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('all');
                setSelectedPest('all');
                setCurrentPage(1);
              }}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              إعادة ضبط جميع الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-right"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackTitle={post.title}
                      fallbackCategory={post.category}
                    />
                    <span className="absolute top-3 right-3 bg-slate-950/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-xs">
                      {post.category}
                    </span>
                    {post.city && (
                      <span className="absolute top-3 left-3 bg-emerald-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 backdrop-blur-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-300" />
                        <span>{post.city}</span>
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
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
                      <Link href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>مرخص SFDA</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition group-hover:translate-x-[-2px]"
                  >
                    <span>فتح المقال ↗</span>
                    <ChevronLeft className="w-4 h-4 text-emerald-700" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-slate-200">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                .map((pageNum, idx, arr) => {
                  const prev = arr[idx - 1];
                  const hasGap = prev && pageNum - prev > 1;
                  return (
                    <React.Fragment key={pageNum}>
                      {hasGap && <span className="px-1 text-slate-400 text-xs font-mono">...</span>}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-emerald-800 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition shadow-2xs"
            >
              <span>التالي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

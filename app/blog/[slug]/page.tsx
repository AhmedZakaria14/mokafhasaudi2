import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { SAUDI_BLOG_POSTS } from '@/data/blog';
import { SeoBreadcrumbs } from '@/components/SeoBreadcrumbs';
import { SeoInternalLinks } from '@/components/SeoInternalLinks';
import { JsonLd } from '@/components/JsonLd';
import { TableOfContents } from '@/components/TableOfContents';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { ShareBar } from '@/components/ShareBar';
import {
  Calendar,
  Clock,
  User,
  PhoneCall,
  MessageSquare,
  ChevronLeft,
  BookOpen,
  Tag,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Bug,
  HelpCircle,
  Calculator,
  ArrowRight
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
      type: 'article',
      publishedTime: post.date,
      authors: [post.author]
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

  // Related posts (excluding current)
  const otherPosts = SAUDI_BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  // Schema for Article and FAQPage
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: '2026-08-18',
    dateModified: '2026-08-18',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole
    },
    publisher: {
      '@type': 'Organization',
      name: 'مؤسسة حصن المملكة لمكافحة الآفات والرش الهندسي',
      url: 'https://حصن-المملكة.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://حصن-المملكة.com/icon.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://حصن-المملكة.com/blog/${post.slug}`
    },
    keywords: post.keywords.join(', ')
  };

  const faqSchema = post.faqList && post.faqList.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  } : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-16 lg:pb-0">
      <ReadingProgressBar />
      <ShareBar title={post.title} />
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Breadcrumbs Navigation */}
      <SeoBreadcrumbs
        items={[
          { name: 'المدونة والموسوعة العلمية', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` }
        ]}
      />

      {/* Article Header / Hero */}
      <header className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/50">
        <div className="max-w-5xl mx-auto space-y-5 text-right">
          
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700 transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة لجميع المقالات</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              <span>{post.category}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>دليل معتمد وموثق 2026</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author and Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center border border-emerald-400/40">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm">{post.author}</div>
                  <div className="text-[11px] text-emerald-300">{post.authorRole}</div>
                </div>
              </div>

              <span className="hidden sm:inline text-slate-600">|</span>

              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>نُشر بتاريخ: {post.date}</span>
              </span>

              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>زمن القراءة التقديري: {post.readTime}</span>
              </span>
            </div>

            {/* Quick Action CTA in Header */}
            <div className="flex items-center gap-2">
              <a
                href="tel:0558141870"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>استشارة المهندس: 0558141870</span>
              </a>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Layout with 2 Columns: Article Content + Sticky TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Article Main Column (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-8 text-right order-2 lg:order-1">
            
            {/* Featured Hero Image */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
              <SafeImage
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                fallbackTitle={post.title}
                fallbackCategory={post.category}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>حصن المملكة - تقارير وبحوث مكافحة الآفات بالمملكة</span>
              </div>
            </div>

            {/* Key Takeaways Box (ملخص النقاط الذهبية) */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 border-2 border-emerald-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm sm:text-base">
                <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
                <span>أبرز ما يتضمنه هذا الدليل المرجعي:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>معايير المبيدات المعتمدة من هيئة الغذاء والدواء SFDA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>خطوات القضاء الجذري على الحشرات بدون مغادرة المسكن.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>سند الضمان الموثق بالفاتورة الضريبية وحقوق العميل.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>التغطية الميدانية في جميع مدن ومحافظات المملكة.</span>
                </li>
              </ul>
            </div>

            {/* Markdown Body Content with High Typography Styling */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
              <div className="blog-article-content text-slate-800 text-sm sm:text-base leading-loose space-y-6">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: ({ href, children, ...props }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:text-emerald-900 font-bold underline decoration-emerald-500/50 hover:decoration-emerald-700 underline-offset-4 transition inline-flex items-center gap-0.5 mx-1"
                        {...props}
                      >
                        <span>{children}</span>
                        <span className="text-[10px] text-emerald-500 font-mono">↗</span>
                      </a>
                    )
                  }}
                >
                  {post.content}
                </Markdown>
              </div>

              {/* Verified Chemical Badges Footer */}
              <div className="mt-10 pt-6 border-t border-slate-200 bg-slate-50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>معايير السلامة والجودة: SFDA Approved | ISO 22000 | HACCP</span>
                </div>
                <div className="text-slate-500 font-medium">
                  تمت المراجعة الفنية بواسطة اللجنة الهندسية بمؤسسة حصن المملكة
                </div>
              </div>
            </div>

            {/* Author Credential Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 text-right">
              <div className="w-16 h-16 rounded-2xl bg-emerald-900 text-amber-300 font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                {post.author.charAt(3) || 'م'}
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-black text-slate-900 text-base">{post.author}</h4>
                  <span className="text-[11px] bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                    خبير معتمد
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{post.authorRole}</p>
                <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                  متخصص في تصميم بروتوكولات المكافحة الإنشائية والكيميائية المعتمدة للمنازل والمنشآت التجارية بالمملكة العربية السعودية، مع خبرة تتجاوز 14 عاماً في معايير الهيئة العامة للغذاء والدواء والجهات الرقابية.
                </p>
              </div>
            </div>

            {/* Frequently Asked Questions FAQ Accordion for this Article */}
            {post.faqList && post.faqList.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-black text-lg">
                  <HelpCircle className="w-5 h-5 text-emerald-700" />
                  <h3>أسئلة شائعة وإجابات علمية حول المقال</h3>
                </div>
                <div className="space-y-3">
                  {post.faqList.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2"
                    >
                      <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                        <span className="text-emerald-700 font-black">س:</span>
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pr-4 border-r-2 border-emerald-400">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Keywords Tags */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-900">
                الكلمات الدلالية ومحاور البحث ذات الصلة بالمملكة:
              </div>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-800 hover:bg-emerald-100 hover:text-emerald-950 border border-slate-200 text-xs px-3 py-1.5 rounded-xl font-medium transition cursor-default"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* High Conversion CTA Box */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-emerald-900 shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>احصل على حماية معتمدة بضمان كتابي</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black">
                هل تحتاج لمكافحة فورية في منزلك أو منشأتك مع ضمان كامل؟
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-2xl">
                يقدم مهندسو حصن المملكة كشفاً ميدانياً دقيقاً، مع تطبيق خطة علاجية مخصصة بدون مغادرة المنزل وبدون رائحة، مع سند ضمان رسمي موثق بالفاتورة الضريبية.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:0558141870"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>اتصال مباشر: 0558141870</span>
                </a>

                <a
                  href={`https://wa.me/966558141870?text=${encodeURIComponent(
                    `السلام عليكم، اطلعت على مقال: "${post.title}" وأرغب في استشارة فنية وحجز موعد كشف.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-bold text-xs sm:text-sm rounded-xl border border-emerald-700 transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>محادثة واتساب سريعة</span>
                </a>

                <Link
                  href="/#quote-calculator"
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>حاسبة الأسعار التقديرية</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Sidebar Column (4 cols on lg) - Sticky TOC & Internal GEO Links */}
          <aside className="lg:col-span-4 space-y-6 order-1 lg:order-2">
            
            {/* Sticky Table of Contents Component */}
            <TableOfContents items={post.tableOfContents} />

            {/* Related Services Links Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base border-b border-slate-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>الخدمات التخصصية المرتبطة بالمقال</span>
              </div>
              <div className="space-y-2">
                {post.relatedServices.map((srv, idx) => (
                  <Link
                    key={idx}
                    href={srv.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-950 border border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-800 transition group"
                  >
                    <span>{srv.title}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-emerald-700 font-mono">↗</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Pests Wiki Links Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base border-b border-slate-100 pb-3">
                <Bug className="w-5 h-5 text-emerald-700" />
                <span>موسوعة الحشرات ذات الصلة</span>
              </div>
              <div className="space-y-2">
                {post.relatedPests.map((pst, idx) => (
                  <Link
                    key={idx}
                    href={pst.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-950 border border-slate-200 hover:border-emerald-300 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-800 transition group"
                  >
                    <span>{pst.title}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-emerald-700 font-mono">↗</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Geo City Hubs Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base border-b border-slate-100 pb-3">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <span>فروع التغطية الميدانية بالمملكة</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                {post.relatedCities.map((cty, idx) => (
                  <Link
                    key={idx}
                    href={cty.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-50 hover:bg-emerald-800 hover:text-white border border-slate-200 rounded-xl text-center text-slate-700 transition font-bold"
                  >
                    مكافحة في {cty.name} ↗
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Contact Widget */}
            <div className="bg-emerald-900 text-white rounded-3xl p-6 text-center space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-900 font-black mx-auto flex items-center justify-center shadow-xs">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="font-black text-base">طوارئ الرش والمكافحة 24/7</h4>
              <p className="text-xs text-emerald-100 font-medium">
                فرق متنقلة مجهزة بأحدث المعدات تصلك خلال 60 دقيقة في كافة الأحياء.
              </p>
              <a
                href="tel:0558141870"
                className="block w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow transition"
              >
                اتصل الآن: 0558141870
              </a>
            </div>

          </aside>

        </div>

        {/* Other Recommended Articles Section */}
        {otherPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200 text-right">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  مقالات واستشارات هندسية أخرى قد تهمك
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  اكتشف المزيد من الأدلة الموثقة لحماية منزلك وعقارك في مختلف مدن المملكة.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 hover:text-emerald-800 font-bold text-xs rounded-xl transition shadow-2xs"
              >
                <span>تصفح كافة المقالات ({SAUDI_BLOG_POSTS.length})</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((other) => (
                <article
                  key={other.id}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <SafeImage
                        src={other.image}
                        alt={other.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackTitle={other.title}
                        fallbackCategory={other.category}
                      />
                      <span className="absolute top-3 right-3 bg-emerald-950/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-xs">
                        {other.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{other.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{other.readTime}</span>
                        </span>
                      </div>

                      <h4 className="font-black text-sm text-slate-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug">
                        <Link href={`/blog/${other.slug}`}>
                          {other.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                        {other.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/blog/${other.slug}`}
                      className="w-full py-2.5 px-4 bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-950 border border-slate-200 hover:border-emerald-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <span>قراءة الدليل الكامل</span>
                      <ChevronLeft className="w-4 h-4 text-emerald-700" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Global Internal SEO & Geo Matrix */}
      <SeoInternalLinks />
    </main>
  );
}

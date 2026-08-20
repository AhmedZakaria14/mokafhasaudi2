'use client';

import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  PhoneCall
} from 'lucide-react';

interface ShareBarProps {
  title: string;
  url?: string;
}

export const ShareBar: React.FC<ShareBarProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  };

  const getShareLinks = () => {
    const currentUrl = getShareUrl();
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    return {
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      rawUrl: currentUrl
    };
  };

  const shareLinks = getShareLinks();

  const handleCopyLink = async () => {
    try {
      const shareUrl = getShareUrl();
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = getShareUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      {/* ================= DESKTOP FLOATING SIDEBAR (LEFT SIDE FOR RTL LAYOUT) ================= */}
      <aside
        aria-label="مشاركة المقال على وسائل التواصل"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-40 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider py-1 border-b border-slate-100 w-full text-center">
          مشاركة
        </span>

        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          title="مشاركة عبر واتساب"
          className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 active:scale-95 group"
        >
          {/* WhatsApp Icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.855 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.742-5.767-5.742zm9.969 5.766c0 5.506-4.475 9.98-9.969 9.98-1.745 0-3.377-.45-4.807-1.242L2 23l2.361-5.064c-.87-1.468-1.36-3.167-1.36-4.996 0-5.506 4.475-9.98 9.969-9.98 5.494 0 10 4.474 10 9.98z" />
          </svg>
        </a>

        {/* Twitter / X */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          title="مشاركة على منصة إكس (تويتر)"
          className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-950 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 active:scale-95 group"
        >
          {/* X / Twitter Icon */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="مشاركة على لينكد إن"
          className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 active:scale-95 group"
        >
          {/* LinkedIn Icon */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66z" />
          </svg>
        </a>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          title={copied ? 'تم نسخ الرابط' : 'نسخ رابط المقال'}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 active:scale-95 cursor-pointer relative ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-4 h-4" />}
          {copied && (
            <span className="absolute -left-20 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md whitespace-nowrap animate-in fade-in">
              تم النسخ!
            </span>
          )}
        </button>

        {/* Quick Call */}
        <div className="pt-1 mt-1 border-t border-slate-100 w-full flex flex-col items-center">
          <a
            href="tel:0558141870"
            title="اتصال طوارئ 0558141870"
            className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white flex items-center justify-center transition shadow-xs hover:scale-110 active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
          </a>
        </div>
      </aside>

      {/* ================= MOBILE FIXED BOTTOM SHARE BAR ================= */}
      <div
        aria-label="شريط المشاركة السريع للهاتف"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-800 flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>مشاركة:</span>
          </span>

          {/* WhatsApp */}
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center active:scale-95 transition"
            aria-label="مشاركة عبر واتساب"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.855 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.742-5.767-5.742zm9.969 5.766c0 5.506-4.475 9.98-9.969 9.98-1.745 0-3.377-.45-4.807-1.242L2 23l2.361-5.064c-.87-1.468-1.36-3.167-1.36-4.996 0-5.506 4.475-9.98 9.969-9.98 5.494 0 10 4.474 10 9.98z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 border border-slate-300 flex items-center justify-center active:scale-95 transition"
            aria-label="مشاركة على إكس"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center active:scale-95 transition"
            aria-label="مشاركة على لينكد إن"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66z" />
            </svg>
          </a>

          {/* Copy / Native Share */}
          <button
            type="button"
            onClick={handleNativeShare}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}
            aria-label="نسخ الرابط"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* CTA Phone Direct */}
        <a
          href="tel:0558141870"
          className="px-3.5 py-2 bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow transition"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>اتصال: 0558141870</span>
        </a>
      </div>
    </>
  );
};

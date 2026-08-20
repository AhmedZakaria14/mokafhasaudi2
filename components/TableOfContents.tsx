'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { BlogTOCItem } from '@/data/blog';

interface TableOfContentsProps {
  items: BlogTOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 180;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          return;
        }
      }
      if (headingElements.length > 0 && window.scrollY < 200) {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="فهرس محتويات المقال"
      className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto text-right"
    >
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base">
          <List className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>فهرس المحتويات والعناوين</span>
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-500 hover:text-slate-800 text-xs flex items-center gap-1 font-bold transition p-1 rounded-md"
          title={isCollapsed ? 'توسيع الفهرس' : 'طي الفهرس'}
        >
          <span>{isCollapsed ? 'توسيع' : 'طي'}</span>
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed && (
        <ul className="space-y-2 text-xs font-medium">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`transition-all duration-200 ${
                  item.level === 3 ? 'pr-4 text-[11px]' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => scrollToHeading(item.id)}
                  className={`w-full text-right py-1.5 px-3 rounded-xl transition flex items-start gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-950'
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isActive ? 'text-amber-300 fill-amber-300' : 'text-slate-400'
                    }`}
                  />
                  <span className="line-clamp-2 leading-relaxed">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span>{items.length} أقسام ومحاور علمية</span>
        <span className="text-emerald-800 font-bold">موثق من SFDA</span>
      </div>
    </nav>
  );
};

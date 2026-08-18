'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { JsonLd } from './JsonLd';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const SeoBreadcrumbs: React.FC<SeoBreadcrumbsProps> = ({ items }) => {
  const allItems: BreadcrumbItem[] = [
    { name: 'الرئيسية', url: '/' },
    ...items
  ];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://حصن-المملكة.com${item.url}`
    }))
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-100 border-b border-slate-200 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-emerald-700 font-medium transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </Link>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <React.Fragment key={idx}>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {isLast ? (
                  <span className="font-bold text-emerald-900 line-clamp-1" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-emerald-700 font-medium transition line-clamp-1"
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </>
  );
};

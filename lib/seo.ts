export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://hosnalmamlaka.sa/#organization',
    name: 'شركة حصن المملكة لمكافحة الحشرات والتعقيم ورش المبيدات',
    alternateName: ['حصن المملكة لمكافحة الآفات', 'Hosn Al Mamlaka Pest Control Saudi Arabia'],
    url: 'https://hosnalmamlaka.sa',
    logo: 'https://hosnalmamlaka.sa/logo.png',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    description: 'أفضل شركة مكافحة حشرات ورش مبيدات وتدفين النمل الأبيض بضمان 15 سنة في كافة مدن وأحياء المملكة العربية السعودية معتمدة رسمياً ومطابقة لاشتراطات هيئة الغذاء والدواء SFDA.',
    telephone: '+966558141870',
    priceRange: 'SAR 199 - SAR 1800',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'طريق الملك فهد، حي الصحافة',
      addressLocality: 'الرياض',
      addressRegion: 'منطقة الرياض',
      postalCode: '13321',
      addressCountry: 'SA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.774265,
      longitude: 46.738586
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.96',
      reviewCount: '4890',
      bestRating: '5',
      worstRating: '1'
    },
    areaServed: [
      { '@type': 'City', name: 'الرياض' },
      { '@type': 'City', name: 'جدة' },
      { '@type': 'City', name: 'الدمام' },
      { '@type': 'City', name: 'مكة المكرمة' },
      { '@type': 'City', name: 'المدينة المنورة' },
      { '@type': 'City', name: 'الخبر' },
      { '@type': 'City', name: 'الأحساء' },
      { '@type': 'City', name: 'الطائف' },
      { '@type': 'City', name: 'تبوك' },
      { '@type': 'City', name: 'أبها وخميس مشيط' },
      { '@type': 'City', name: 'القصيم (بريدة وعنيزة)' },
      { '@type': 'City', name: 'حائل' },
      { '@type': 'City', name: 'جازان' },
      { '@type': 'City', name: 'نجران' },
      { '@type': 'City', name: 'ينبع' },
      { '@type': 'City', name: 'الخرج' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات مكافحة الآفات والحشرات',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'مكافحة النمل الأبيض (الأرضة) مع ضمان 15 سنة'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'إبادة الصراصير بالجل الألماني بدون مغادرة المنزل'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'القضاء على بق الفراش بالحرارة والضباب ULV'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'مكافحة الفئران والقوارض بمحطات الطعوم الذكية'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تركيب طارد الحمام وشبك النوافذ والمكيفات ستانلس ستيل'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'عقود المطاعم والشركات المعتمدة للتراخيص والرقابة الصحية'
          }
        }
      ]
    }
  };
}

export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };
}

import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic, Tajawal } from 'next/font/google';
import './globals.css';
import { SiteProvider } from '@/components/SiteProvider';

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'شركة حصن المملكة الوطنية لمكافحة الحشرات والوقاية الإنشائية | معتمدة رسمياً SFDA والأمانات',
  description: 'المؤسسة الوطنية الرائدة في مكافحة الآفات والحشرات، حقن وتدفين النمل الأبيض (الأرضة) بضمان 15 سنة، إبادة الصراصير وبق الفراش والقوارض وطرد الحمام بمبيدات معتمدة من هيئة الغذاء والدواء SFDA ووزارة البلديات والإسكان. خدمة 24 ساعة بكافة مدن المملكة. اتصل: 0558141870.',
  keywords: [
    'شركة مكافحة حشرات بالرياض',
    'رش مبيدات معتمدة SFDA',
    'مكافحة النمل الأبيض والأرضة',
    'حقن مبيدات النمل الابيض بضمان 15 سنة',
    'تدفين خرساني للمباني قبل الصبة',
    'رش الصراصير بالجل الالماني',
    'مكافحة بق الفراش بالحرارة والبخار',
    'طرد الحمام وتركيب الشبك',
    'عقود مكافحة حشرات المنشآت والتراخيص',
    'شركة مكافحة حشرات بجدة',
    'شركة رش مبيدات بالدمام والشرقية',
    'حصن المملكة للخدمات البيئية'
  ],
  authors: [{ name: 'شركة حصن المملكة للخدمات البيئية ومكافحة الآفات' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'شركة حصن المملكة الوطنية لمكافحة الحشرات والتعقيم',
    description: 'معتمدون لدى هيئة الغذاء والدواء SFDA والجهات الرقابية. حلول هندسية متكاملة لإبادة الآفات مع ضمانات موثقة تصل إلى 15 عاماً وسرعة وصول في 25 دقيقة بكافة مناطق المملكة.',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شركة حصن المملكة لمكافحة الحشرات والوقاية الإنشائية',
    description: 'المؤسسة المعتمدة الأولى بالمملكة العربية السعودية لمكافحة الآفات ورش المبيدات - هاتف: 0558141870',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'PestControlBusiness',
    name: 'مؤسسة حصن المملكة لمكافحة الآفات والوقاية الإنشائية',
    url: 'https://حصن-المملكة.com',
    logo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80',
    telephone: '+966558141870',
    priceRange: 'SAR 180 - 1500',
    areaServed: {
      '@type': 'Country',
      name: 'المملكة العربية السعودية'
    },
    paymentAccepted: 'Cash, Credit Card, Mada, Bank Transfer',
    currenciesAccepted: 'SAR',
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
    ]
  };

  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexArabic.variable} ${tajawal.variable}`}>
      <body className="antialiased bg-slate-50 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootOrgSchema) }}
        />
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}

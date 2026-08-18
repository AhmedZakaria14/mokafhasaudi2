'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingContactBar } from '@/components/FloatingContactBar';
import { QuickServicesSidebar } from '@/components/QuickServicesSidebar';
import { CostCalculator } from '@/components/CostCalculator';
import { AiConsultantModal } from '@/components/AiConsultantModal';
import { SAUDI_CITIES } from '@/data/regions';

interface SiteContextType {
  selectedCity: string;
  setSelectedCity: (cityId: string) => void;
  openCalculator: (coupon?: string) => void;
  openAiConsultant: () => void;
}

const SiteContext = createContext<SiteContextType>({
  selectedCity: 'riyadh',
  setSelectedCity: () => {},
  openCalculator: () => {},
  openAiConsultant: () => {}
});

export const useSite = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<string>('riyadh');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState<boolean>(false);
  const [activeCoupon, setActiveCoupon] = useState<string>('SAUDI30');

  const openCalculator = (couponCode?: string) => {
    if (couponCode) {
      setActiveCoupon(couponCode);
    }
    setIsCalculatorOpen(true);
  };

  const openAiConsultant = () => {
    setIsAiConsultantOpen(true);
  };

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  return (
    <SiteContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        openCalculator,
        openAiConsultant
      }}
    >
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
        {/* Global Unified Header */}
        <Navbar
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          onOpenCalculator={() => openCalculator()}
          onOpenAiConsultant={openAiConsultant}
        />

        {/* Page Content */}
        <div className="flex-1 w-full">{children}</div>

        {/* Global Unified Footer */}
        <Footer
          onOpenCalculator={() => openCalculator()}
          onOpenAiConsultant={openAiConsultant}
        />

        {/* Global Desktop Floating Sticky Sidebar */}
        <QuickServicesSidebar
          onOpenCalculator={() => openCalculator()}
          selectedCity={currentCityObj.name}
        />

        {/* Global Mobile Quick Action Bar */}
        <FloatingContactBar
          selectedCity={currentCityObj.name}
          onOpenCalculator={() => openCalculator()}
          onOpenAiConsultant={openAiConsultant}
        />

        {/* Global Cost Calculator Modal */}
        <CostCalculator
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          initialCity={selectedCity}
          initialCouponCode={activeCoupon}
        />

        {/* Global AI Pest Consultant Modal */}
        <AiConsultantModal
          isOpen={isAiConsultantOpen}
          onClose={() => setIsAiConsultantOpen(false)}
          selectedCity={selectedCity}
        />
      </div>
    </SiteContext.Provider>
  );
};

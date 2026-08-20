'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingContactBar } from '@/components/FloatingContactBar';
import { QuickServicesSidebar } from '@/components/QuickServicesSidebar';
import { SettingsPanel } from '@/components/SettingsPanel';
import { CostCalculator } from '@/components/CostCalculator';
import { AiConsultantModal } from '@/components/AiConsultantModal';
import { SAUDI_CITIES } from '@/data/regions';

interface SiteContextType {
  selectedCity: string;
  setSelectedCity: (cityId: string) => void;
  openCalculator: (coupon?: string) => void;
  openAiConsultant: () => void;
  openSettingsPanel: () => void;
}

const SiteContext = createContext<SiteContextType>({
  selectedCity: 'riyadh',
  setSelectedCity: () => {},
  openCalculator: () => {},
  openAiConsultant: () => {},
  openSettingsPanel: () => {}
});

export const useSite = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<string>('riyadh');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
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

  const openSettingsPanel = () => {
    setIsSettingsOpen(true);
  };

  const currentCityObj = SAUDI_CITIES.find((c) => c.id === selectedCity) || SAUDI_CITIES[0];

  return (
    <SiteContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        openCalculator,
        openAiConsultant,
        openSettingsPanel
      }}
    >
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-600 selection:text-white relative">
        {/* Global Fixed Header with Integrated Settings Trigger */}
        <Navbar
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          onOpenCalculator={() => openCalculator()}
          onOpenAiConsultant={openAiConsultant}
          onOpenSettings={openSettingsPanel}
        />

        {/* Page Content with top padding to account for fixed header + bottom padding for mobile fixed contact bar */}
        <div className="flex-1 w-full pt-[75px] sm:pt-[84px] pb-16 lg:pb-0">{children}</div>

        {/* Global Unified Footer */}
        <Footer
          onOpenCalculator={() => openCalculator()}
          onOpenAiConsultant={openAiConsultant}
        />

        {/* Global Quick Services Sidebar */}
        <QuickServicesSidebar
          onOpenCalculator={() => openCalculator()}
          selectedCity={currentCityObj.name}
        />

        {/* Global Mobile Bottom Fixed Action Bar & Floating ⚙️ Settings Trigger */}
        <FloatingContactBar
          selectedCity={currentCityObj.name}
          onOpenCalculator={() => openCalculator()}
          onOpenAiConsultant={openAiConsultant}
          onOpenSettings={openSettingsPanel}
        />

        {/* Consolidated SettingsPanel with Progressive Disclosure */}
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          onOpenCalculator={(coupon) => openCalculator(coupon)}
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

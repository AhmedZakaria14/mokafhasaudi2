'use client';

import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { AccreditationStrip } from '@/components/AccreditationStrip';
import { LimitedTimeOfferBanner } from '@/components/LimitedTimeOfferBanner';
import { ServicesGrid } from '@/components/ServicesGrid';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { EngineeringBlueprint } from '@/components/EngineeringBlueprint';
import { ProcessProtocol } from '@/components/ProcessProtocol';
import { InteractiveMapRegions } from '@/components/InteractiveMapRegions';
import { PestIdentifierTool } from '@/components/PestIdentifierTool';
import { PricingSection } from '@/components/PricingSection';
import { ComparisonTable } from '@/components/ComparisonTable';
import { CommercialSection } from '@/components/CommercialSection';
import { WarrantyVerifier } from '@/components/WarrantyVerifier';
import { ReviewsSection } from '@/components/ReviewsSection';
import { BlogSection } from '@/components/BlogSection';
import { FaqSection } from '@/components/FaqSection';
import { useSite } from '@/components/SiteProvider';

export default function HomePage() {
  const { selectedCity, setSelectedCity, openCalculator, openAiConsultant, openSettingsPanel } = useSite();

  return (
    <main className="w-full flex flex-col relative">
      {/* 1. Primary Authority Hero & Direct Dispatch Terminal */}
      <HeroSection
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenCalculator={() => openCalculator()}
        onOpenAiConsultant={openAiConsultant}
        onOpenSettings={openSettingsPanel}
      />

      {/* 2. Official Regulatory Accreditation Strip */}
      <AccreditationStrip />

      {/* 3. Limited-Time Offer Banner */}
      <div className="pt-6 bg-slate-100">
        <LimitedTimeOfferBanner
          selectedCity={selectedCity}
          onOpenCalculator={(coupon) => openCalculator(coupon)}
        />
      </div>

      {/* 4. Categorized Services Grid & Technical Specs */}
      <ServicesGrid
        selectedCity={selectedCity}
        onOpenCalculator={() => openCalculator()}
      />

      {/* 5. Interactive Before & After Treatment Evidence */}
      <BeforeAfterSlider />

      {/* 6. Interactive Engineering Blueprint & Treatment Zones */}
      <EngineeringBlueprint />

      {/* 7. 4-Step Scientific IPM Protocol */}
      <ProcessProtocol />

      {/* 8. Saudi 13 Regions & 54 Governorates Live Coverage */}
      <InteractiveMapRegions
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      {/* 9. Scientific Pest Identification & Wiki Guide */}
      <PestIdentifierTool
        onOpenAiConsultant={openAiConsultant}
      />

      {/* 10. Certified SFDA Standards vs Unlicensed Market Comparison */}
      <ComparisonTable />

      {/* 11. Commercial & B2B Contracts Section */}
      <CommercialSection />

      {/* 12. Transparent Pricing Packages & Official Guarantees */}
      <PricingSection
        selectedCity={selectedCity}
        onOpenCalculator={() => openCalculator()}
        onOpenSettings={openSettingsPanel}
      />

      {/* 13. Electronic Warranty Verification Tool */}
      <WarrantyVerifier />

      {/* 14. Customer Reviews Across Saudi Cities */}
      <ReviewsSection />

      {/* 15. Safety & Technical Knowledge Hub */}
      <BlogSection />

      {/* 16. Frequently Asked Questions */}
      <FaqSection />
    </main>
  );
}

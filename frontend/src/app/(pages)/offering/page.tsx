// app/pricing/page.tsx
'use client';
import React, { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import PlanFeatures from './_components/PlanFeatures';
import FaqAccordion from './_components/FaqAccordian';
import Footer from '@/app/_components/Footer';
import ClientPricing from './ClientPricing';

export default function PricingPage() {
  // Lift state so server and client share initial toggle
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="mt-26 [@media(min-width:1750px)]:mt-36 font-lato text-[#003F5C]">
      {/* Header */}
      <div className="mt-10 m-4 text-center">
        <h1 className="font-extrabold text-[36px] md:text-[50px] [@media(min-width:1750px)]:text-[72px] mb-4">
          Flexible Plans, Instant Access – At<br />a Price You Love!
        </h1>
        <p className="font-normal text-[18px] [@media(min-width:1750px)]:text-[28px]">
          We offer flexible plans designed for instant access to cutting-edge solutions...
        </p>
      </div>

      {/* Free Plan (static) */}

      {/* Client-only portion in Suspense */}
      <Suspense fallback={<div className="text-center py-12">Loading plans…</div>}>
        <ClientPricing initialAnnual={isAnnual} onToggle={setIsAnnual} />
      </Suspense>

      {/* Rest of the page */}
      <PlanFeatures />
      <FaqAccordion />
      <Footer />
    </div>
  );
}

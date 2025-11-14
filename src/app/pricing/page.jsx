'use client';

import React, { useState } from 'react';
import { PricingPlan } from '@/components/pricing/PricingPlan';
import { FAQSection } from '@/components/pricing/FAQSection';
import { TestimonialsSection } from '@/components/pricing/TestimonialsSection';

const monthlyPlans = [
  {
    title: 'BASIS',
    price: 'GRATIS',
    description: 'Perfect voor nieuwkomers die de kracht van ProConnect willen ontdekken',
    features: [
      'Basis zichtbaarheid in zoekresultaten om gevonden te worden',
      '1 privé contact per maand om kansen te verkennen',
      'Professioneel profiel om jezelf te presenteren'
    ],
    buttonText: 'Start Gratis',
    popular: false
  },
  {
    title: 'PRO',
    price: '€19.99',
    period: 'per maand',
    description: 'Voor professionals die hun netwerk willen uitbreiden',
    features: [
      'Verhoogde zichtbaarheid voor meer exposure',
      '15 privé contacten per maand voor meer kansen',
      'Uitgebreid profiel met portfolio showcase'
    ],
    buttonText: 'Word Pro',
    popular: true
  },
  {
    title: 'PREMIUM',
    price: '€49.99',
    period: 'per maand',
    description: 'Voor ondernemers die willen excelleren',
    features: [
      'Maximale zichtbaarheid voor optimaal bereik',
      'Onbeperkt contact voor grenzeloze mogelijkheden',
      'Prioriteit in zoekresultaten voor maximale exposure'
    ],
    buttonText: 'Ga Premium',
    popular: false
  }
];

const yearlyPlans = [
  {
    title: 'BASIS',
    price: 'GRATIS',
    description: 'Perfect voor nieuwkomers die de kracht van ProConnect willen ontdekken',
    features: [
      'Basis zichtbaarheid in zoekresultaten om gevonden te worden',
      '1 privé contact per maand om kansen te verkennen',
      'Professioneel profiel om jezelf te presenteren'
    ],
    buttonText: 'Start Gratis',
    popular: false
  },
  {
    title: 'PRO',
    price: '€191.90',
    period: 'per jaar',
    description: 'Voor professionals die hun netwerk willen uitbreiden',
    features: [
      'Verhoogde zichtbaarheid voor meer exposure',
      '15 privé contacten per maand voor meer kansen',
      'Uitgebreid profiel met portfolio showcase',
      'Bespaar €48 met jaarlijks abonnement'
    ],
    buttonText: 'Word Pro',
    popular: true,
    savings: '20% korting'
  },
  {
    title: 'PREMIUM',
    price: '€479.90',
    period: 'per jaar',
    description: 'Voor ondernemers die willen excelleren',
    features: [
      'Maximale zichtbaarheid voor optimaal bereik',
      'Onbeperkt contact voor grenzeloze mogelijkheden',
      'Prioriteit in zoekresultaten voor maximale exposure',
      'Bespaar €120 met jaarlijks abonnement'
    ],
    buttonText: 'Ga Premium',
    popular: false,
    savings: '20% korting'
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const activePlans = isYearly ? yearlyPlans : monthlyPlans;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#27AAE2]/10 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 px-4">
        <div className="absolute inset-0">
          {/* ProConnect-themed background pattern */}
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5" />
          <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-gradient-to-br from-[#27AAE2]/10 to-transparent" />
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#27AAE2]/10 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#27AAE2]/10 text-[#27AAE2] rounded-full text-sm font-medium mb-8">
            Investeer in uw toekomst {isYearly && '- Bespaar 20% met jaarlijks abonnement'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#27AAE2]">Vergroot uw bereik</span>{' '}
            <span className="text-gray-900">met ProConnect</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Kies het plan dat bij u past en begin direct met het uitbreiden van uw netwerk
          </p>
          <div className="inline-flex items-center p-1 bg-white rounded-full shadow-lg">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full transition-all ${
                !isYearly ? 'bg-[#27AAE2] text-white' : 'text-gray-600'
              } font-medium`}
            >
              Maandelijks
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full transition-all ${
                isYearly ? 'bg-[#27AAE2] text-white' : 'text-gray-600'
              } font-medium`}
            >
              Jaarlijks
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePlans.map((plan, index) => (
              <PricingPlan key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-[#27AAE2]">Vergelijk</span> de mogelijkheden
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left">Functie</th>
                  <th className="py-4 px-6 text-center">BASIS</th>
                  <th className="py-4 px-6 text-center">PRO</th>
                  <th className="py-4 px-6 text-center">PREMIUM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Zichtbaarheid in zoekresultaten',
                  'Aantal privé contacten per maand',
                  'Profielpagina aanpassingen',
                  'Besparing op jaarbasis'
                ].map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-6">{feature}</td>
                    <td className="py-4 px-6 text-center">
                      {index === 3 ? '-' : 'Basis'}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {index === 3 && isYearly ? '€48' : 'Verhoogd'}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {index === 3 && isYearly ? '€120' : 'Maximaal'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

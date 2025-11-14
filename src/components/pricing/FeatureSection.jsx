import React from 'react';
import { FeatureCard } from './FeatureCard';
import { Users, Search, MessageSquare, Star } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Netwerk Uitbreiding',
    description: 'Bereik meer potentiële klanten en partners binnen uw vakgebied.'
  },
  {
    icon: Search,
    title: 'Verhoogde Zichtbaarheid',
    description: 'Word beter gevonden door relevante zoekopdrachten in uw regio.'
  },
  {
    icon: MessageSquare,
    title: 'Direct Contact',
    description: 'Communiceer rechtstreeks met geïnteresseerde partijen.'
  },
  {
    icon: Star,
    title: 'Professional Profiel',
    description: 'Presenteer uzelf professioneel met een uitgebreid profiel.'
  }
];

export const FeatureSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Waarom kiezen voor ProConnect?
          </h2>
          <p className="text-xl text-gray-600">
            Ontdek de voordelen die u helpen groeien
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

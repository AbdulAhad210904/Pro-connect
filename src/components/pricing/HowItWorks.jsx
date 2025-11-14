import React from 'react';
import { UserPlus, Search, MessageSquare, Star } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Maak een account',
    description: 'Begin met het aanmaken van uw professionele profiel'
  },
  {
    icon: Search,
    title: 'Word gevonden',
    description: 'Laat potentiële klanten u vinden via ons platform'
  },
  {
    icon: MessageSquare,
    title: 'Start gesprekken',
    description: 'Communiceer direct met geïnteresseerde partijen'
  },
  {
    icon: Star,
    title: 'Groei uw netwerk',
    description: 'Bouw duurzame relaties op en vergroot uw bereik'
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Hoe werkt het?
          </h2>
          <p className="text-xl text-gray-600">
            In vier eenvoudige stappen aan de slag
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#27AAE2]/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-[#27AAE2]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Shield, Clock, CreditCard } from 'lucide-react';
import { NewsLetterForm } from './NewsLetterForm';
import { PricingFooterLinkProps } from '../Registration2/types';

const PricingfooterLinks: PricingFooterLinkProps[] = [
  { label: 'Over ons', href: '/about' },
  { label: 'Privacybeleid', href: '/privacy' },
  { label: 'Servicevoorwaarden', href: '/terms' },
  { label: 'Steun', href: '/support' }
];

const features = [
  {
    icon: Shield,
    title: 'Veilig betalen',
    description: 'Beveiligde transacties via trusted payment providers'
  },
  {
    icon: Clock,
    title: 'Direct toegang',
    description: 'Start meteen na bevestiging van uw betaling'
  },
  {
    icon: CreditCard,
    title: 'Flexibel opzegbaar',
    description: 'Maandelijks opzegbaar, geen lange termijn contract'
  }
];

export const PricingFooter: React.FC = () => (
  <footer className="bg-sky-500 text-white py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold">PRO--CONNECT.COM</h2>
        <img 
          src="/footer-logo.svg" 
          alt="Pro Connect Footer Logo" 
          className="mt-4 h-8"
        />
        <p className="mt-6 text-sm opacity-90">
          Copyright {new Date().getFullYear()}. Alle rechten voorbehouden
        </p>
      </div>
      
      <div className="space-y-8">
        <nav className="grid grid-cols-2 gap-4">
          {PricingfooterLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm hover:text-sky-100 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <NewsLetterForm onSubmit={(email) => console.log('Newsletter signup:', email)} />
        </div>
    </div>
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#27AAE2]/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#27AAE2]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </footer>
);
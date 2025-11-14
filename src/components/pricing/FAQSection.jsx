'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Wat is inbegrepen in het gratis plan?",
    answer: "Het gratis BASIS plan bevat basiszichtbaarheid in zoekresultaten, 1 privé contact per maand, een standaard profielpagina, basis klantenondersteuning en toegang tot onze community."
  },
  {
    question: "Kan ik op elk moment upgraden of downgraden?",
    answer: "Ja, u kunt op elk moment uw abonnement aanpassen. De wijzigingen gaan in bij de volgende factureringsperiode en het resterende tegoed wordt verrekend."
  },
  {
    question: "Hoe werkt de verhoogde zichtbaarheid?",
    answer: "Met PRO en PREMIUM plannen krijgt u voorrang in zoekresultaten. PREMIUM gebruikers verschijnen bovenaan, gevolgd door PRO gebruikers, en daarna BASIS gebruikers."
  },
  {
    question: "Wat betekent onbeperkt contact?",
    answer: "Met het PREMIUM plan kunt u onbeperkt contact opnemen met potentiële klanten. Er zijn geen maandelijkse limieten en u kunt zo veel berichten versturen als u wilt."
  },
  {
    question: "Is er een minimale contractperiode?",
    answer: "Nee, al onze plannen zijn maandelijks opzegbaar. U zit nergens aan vast en kunt op elk moment uw abonnement beëindigen."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Veelgestelde vragen
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

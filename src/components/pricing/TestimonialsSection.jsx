'use client';

import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "ProConnect heeft mijn bedrijf echt naar een hoger niveau getild. De premium functies zijn elke cent waard.",
    author: "Lisa van den Berg",
    role: "Interieurontwerper",
    image: "/testimonial1.jpg"
  },
  {
    quote: "De zichtbaarheid die ik krijg door het Pro plan heeft me zoveel nieuwe klanten opgeleverd.",
    author: "Mark de Vries",
    role: "Zelfstandig aannemer",
    image: "/testimonial2.jpg"
  },
  {
    quote: "Zelfs met het basis plan heb ik al geweldige resultaten behaald. Een fantastisch platform!",
    author: "Sophie Jansen",
    role: "Freelance schilder",
    image: "/testimonial3.jpg"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Wat onze gebruikers zeggen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

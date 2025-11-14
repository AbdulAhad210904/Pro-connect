import React from 'react';
import Image from 'next/image';

export const TestimonialCard = ({ quote, author, role, image }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-gray-600 italic mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={image} alt={author} layout="fill" objectFit="cover" />
        </div>
        <div className="ml-3">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export default function ContentCard({ title, children }) {
  return (
    <div className="flex flex-col w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50">
        <h3 className="text-xl md:text-2xl font-medium text-center">{title}</h3>
      </div>
      <div className="px-6 py-4">
        <div className="text-sm md:text-base font-light leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}


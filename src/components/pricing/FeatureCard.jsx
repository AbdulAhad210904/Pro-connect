import React from 'react';

export const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-sky-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

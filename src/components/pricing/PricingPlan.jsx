import React from 'react';
import { Check } from 'lucide-react';

export const PricingPlan = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  popular,
  savings
}) => {
  return (
    <div className={`relative bg-white rounded-2xl shadow-lg border ${
      popular ? 'border-[#27AAE2]' : 'border-gray-200'
    } p-8`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#27AAE2] text-white px-4 py-1 rounded-full text-sm font-medium">
            Meest gekozen
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold">{price}</span>
          {period && (
            <span className="text-gray-500 ml-2">{period}</span>
          )}
        </div>
        {savings && (
          <span className="inline-block mt-2 bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
            {savings}
          </span>
        )}
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-[#27AAE2] mt-1 mr-3 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          popular
            ? 'bg-[#27AAE2] text-white hover:bg-[#27AAE2]/90'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

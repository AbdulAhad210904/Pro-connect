'use client';

import Image from 'next/image';

const paymentLogos = {
  iDEAL: '/payment-logos/ideal.png',
  PayPal: '/payment-logos/PayPal.png',
  Bancontact: '/payment-logos/Bancontact.png',
  SEPA: '/payment-logos/SEPA.svg',
  'Visa/Mastercard': '/payment-logos/card.png'
};

export function PaymentMethod({ title, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        flex
        flex-col
        items-center
        justify-center
        p-6
        rounded-xl
        transition-all
        duration-200
        ${
          isSelected
            ? 'bg-[#27AAE2]/10 border-2 border-[#27AAE2] shadow-lg'
            : 'bg-white border-2 border-gray-100 hover:border-[#27AAE2]/30 hover:bg-[#27AAE2]/5'
        }
      `}
    >
      {/* Logo */}
      <div className={`relative mb-3 grayscale-[0.2] hover:grayscale-0 transition-all ${
        title === 'Visa/Mastercard' ? 'w-24 h-16' : 'w-16 h-12'
      }`}>
        <Image
          src={paymentLogos[title]}
          alt={`${title} logo`}
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <span className={`text-sm font-medium ${
        isSelected ? 'text-[#27AAE2]' : 'text-gray-600'
      }`}>
        {title}
      </span>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <svg
            className="w-5 h-5 text-[#27AAE2]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

'use client';

import React, { useState } from 'react';

interface NewsLetterFormProps {
  onSubmit: (email: string) => void;
}

export const NewsLetterForm: React.FC<NewsLetterFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      onSubmit(email); // Call the parent's onSubmit function with the email
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#27AAE2]/5 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Blijf op de hoogte</h2>
        <p className="text-xl text-gray-600 mb-8">
          Ontvang updates over nieuwe features en aanbiedingen
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Uw email adres"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#27AAE2] focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-2 bg-[#27AAE2] text-white rounded-lg hover:bg-[#27AAE2]/90 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Verzenden...' : 'Aanmelden'}
            </button>
          </div>
          {status === 'success' && (
            <p className="mt-2 text-green-600">Bedankt voor uw aanmelding!</p>
          )}
          {status === 'error' && (
            <p className="mt-2 text-red-600">
              Er is iets misgegaan. Probeer het later opnieuw.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

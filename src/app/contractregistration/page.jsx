"use client";

import React from "react";

const InputField = ({ label, type = "text", required = false }) => (
  <div className="flex flex-col space-y-2">
    <label className="font-medium text-gray-700">{label}</label>
    <input
  type={type}
  required={required}
  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
/>

  </div>
);

const ContractRegistrationForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      companyName,
      vatNumber,
      address: {
        street,
        postalCode,
        city,
        country,
      },
      phoneNumber,
      mobileNumber,
      email,
      position,
      workArea,
      specializations,
    };
    try {
      const response = await fetch("/api/register-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        router.push("/contract-success");
      } else {
        console.error("Failed to submit contract registration");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <main className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          CONTRACT<span className="text-sky-500">REGISTRATIE</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Bedrijfsnaam */}
          <InputField label="Bedrijfsnaam" required />

          {/* BTW Number / KVK Number */}
          <InputField label="BTW Number-KVK Number" required />

          {/* Address Section */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-medium">Adres</h2>
            <InputField label="Straat" required />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Postcode" required />
              <InputField label="Stad" required />
              <InputField label="Land" required />
            </div>
          </div>

          {/* Contact Details */}
          <InputField label="Bedrijfstelefoonnummer" type="tel" required />
          <InputField label="Mobiel nummer" type="tel" />
          <InputField label="E-mailadres bedrijf" type="email" required />

          {/* Additional Information */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-medium">Extra informatie</h2>
            <InputField label="Positie in het bedrijf" required />
            <InputField label="Werkgebied" required />
            <InputField label="Specialisaties" required />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-sky-500 text-white text-lg rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Abonneren
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ContractRegistrationForm;

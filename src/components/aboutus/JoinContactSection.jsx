export function JoinContactSection() {
  return (
    <section className="w-full py-16 px-4 md:px-12 space-y-32">
      {/* Join Our Success Story Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-black">Sluit </span>
          <span className="text-sky-500">u aan bij ons succesverhaal</span>
        </h2>

        <div className="relative bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Paragraph with Quotation Marks */}
          <p className="relative text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            {/* Opening Quote Mark */}
            {/* <span className="absolute -top-6 -left-1 text-6xl text-sky-500">
              "
            </span> */}
            Bij Pro Connect geloven we in de kracht van samenwerking en
            innovatie. Of u nu een bedrijf, freelancer, werkzoekende of
            werknemer bent, wij hebben de tools en middelen om u te helpen
            slagen. Sluit u aan bij ons netwerk en ontdek de voordelen van een
            veelzijdig en toekomstgericht platform.
            {/* Closing Quote Mark */}
            {/* <span className="absolute bottom-1 text-6xl text-sky-500 rotate-180">
              "
            </span> */}
          </p>

          <p className="text-lg md:text-xl font-medium text-gray-800">
            Sluit u vandaag nog aan en word onderdeel van de Pro
            Connect-community!
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="text-black">Neem contact </span>
          <span className="text-sky-500">met ons op</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-700">
          Heeft u vragen of wilt u meer weten over onze diensten? Voel je vrij
          om contact met ons op te nemen!
        </p>
      </div>
    </section>
  );
}

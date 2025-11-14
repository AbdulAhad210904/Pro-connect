import Image from "next/image";

export function WhatWeDoSection() {
  return (
    <section
      className="px-4 md:px-12 py-8 md:py-16 w-full bg-[#27AAE2]"
      aria-label="What we do section"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold">
          <span className="text-black">Wat </span>
          <span className="text-white">wij doen</span>
        </h2>
      </div>

      <div className="space-y-8">
        {/* Hoofdstructuur */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Hoofdstructuur</h3>
          <p className="text-base leading-relaxed text-black">
            Welkom bij Pro Connect, waar vijf hoofdcategorieën van gebruikers
            samenkomen: Particulieren, Aannemers, Werkzoekenden, Werknemers, en
            Bedrijven. Elke categorie is zorgvuldig ontworpen om te voorzien in
            specifieke behoeften, terwijl het platform als geheel een
            samenhangend en verbonden netwerk blijft. Bij Pro Connect geloven we
            sterk in de kracht van verbinding en samenwerking. Word vandaag nog
            onderdeel van onze groeiende gemeenschap en ontdek de voordelen van
            een geïntegreerd platform dat echt werkt voor jou.
          </p>
        </div>

        {/* Interconnectiviteit */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Interconnectiviteit</h3>
          <p className="text-base leading-relaxed text-black">
            Op Pro Connect is iedereen met elkaar verbonden, waardoor u de
            vrijheid heeft om uw eigen pad te kiezen. Of u nu een project wilt
            plaatsen, op zoek bent naar werk, of uw vaardigheden wilt
            ontwikkelen, ons platform biedt de tools en ondersteuning die u
            nodig heeft om uw doelen te bereiken. Sluit u aan bij Pro Connect en
            ervaar de mogelijkheden van een werkelijk geïntegreerd platform.
            Samen bereiken we meer!
          </p>
        </div>

        {/* Categories and diagram */}
        <div className="flex flex-col items-center">
          <Image
            src="/categories-diagram.png"
            alt="ProConnect User Categories Diagram"
            width={800}
            height={800}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

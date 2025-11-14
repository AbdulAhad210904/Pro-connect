import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-8 md:py-16 w-full" aria-label="Welcome section">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <h1 className="text-3xl md:text-5xl font-semibold text-neutral-800 mb-4">
          Welkom <span className="text-sky-500">bij ProConnect</span>
        </h1>
        <p className="text-base md:text-lg font-light leading-relaxed text-black">
          Bij Pro Connect streven we ernaar een uitgebreid platform aan
          te bieden dat de kloof overbrugt tussen bedrijven, vakmannen,
          werkzoekenden en werknemers. Ons doel is om een ​​robuuste en
          gebruiksvriendelijke marktplaats te creëren waar iedereen kan
          profiteren van de mogelijkheden die wij bieden. Hieronder
          vindt u meer informatie over wie we zijn, wat we doen en
          waarom u voor Pro Connect zou moeten kiezen
        </p>
      </div>
      <div className="w-full md:w-1/2 md:pl-8">
        <Image
          src="/platformoverview.png"
          alt="ProConnect Platform Overview"
          width={400}
          height={400}
          layout="responsive"
          className="object-contain"
        />
      </div>
    </section>
  )
}

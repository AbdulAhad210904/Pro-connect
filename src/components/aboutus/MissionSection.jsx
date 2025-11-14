import Image from 'next/image'

export function MissionSection() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-8 md:py-16 w-full" aria-label="Mission section">
      <div className="w-[80%] md:w-2/5 mb-8 md:mb-0 md:pr-8">
        <Image
          src="/mission.png"
          alt="ProConnect Mission Illustration"
          width={400}
          height={400}
          layout="responsive"
          className="object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-right md:pl-8">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          <span className="text-black">Onze</span>{" "}
          <span className="text-sky-500">Missie</span>
        </h2>
        <p className="text-base md:text-lg font-light leading-relaxed text-black">
          Pro Connect is een innovatief 5-in-1-platform dat is ontworpen
          om een ​​breed scala aan diensten aan te bieden binnen één
          gebruiksvriendelijke omgeving. Onze missie is het creëren van
          een veelzijdige marktplaats waar bedrijven vacatures kunnen
          plaatsen, aanemers opdrachten kunnen vinden, werkzoekenden hun
          CV&apos;s kunnen uploaden en werknemers kunnen profiteren van
          innovatieve beloningssystemen zoals crypto.
        </p>
      </div>
    </section>
  )
}


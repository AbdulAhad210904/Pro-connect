export function FeaturesSection() {
  return (
    <section className="w-full py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Features Title */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-20">
          <span className="text-black">Onze </span>
          <span className="text-sky-500">kenmerken</span>
        </h2>

        {/* Features Grid with Connections */}
        <div className="relative">
          {/* Dotted Lines (visible only on md and above) */}
          

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-32">
            {/* Innovation Feature */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Innovatie</h3>
              <p className="text-gray-600 leading-relaxed">
                Pro Connect blijft evolueren met de nieuwste technologieën,
                zoals AI-gestuurde matchmaking, sentimentanalyse en
                voorspellende analyses.
              </p>
            </div>

            {/* Security Feature */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Veiligheid en privacy</h3>
              <p className="text-gray-600 leading-relaxed">
                Wij zorgen ervoor dat alle gegevens veilig worden opgeslagen en
                voldoen aan de hoogste normen op het gebied van
                gegevensbescherming.
              </p>
            </div>

            {/* User-Friendly Feature */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">
                Gebruikers vriendelijkheid
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ons platform is ontworpen met de gebruiker in gedachten, met
                intuïtieve interface en een naadloze ervaring.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="pt-16 border-t">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-20">
            <span className="text-black">Waarom </span>
            <span className="text-sky-500">voor ons kiezen?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Complete Solution */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-sky-500 mb-4">1.</div>
              <h3 className="text-xl font-semibold">Volledige oplossing</h3>
              <p className="text-gray-600 leading-relaxed">
                Een 5-in-1 platform dat bedrijven, vakmannen, werkzoekenden en
                werknemers bij elkaar brengt.
              </p>
            </div>

            {/* Innovative Technologies */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-sky-500 mb-4">2.</div>
              <h3 className="text-xl font-semibold">
                Innovatieve technologieën
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Utilize the latest AI and blockchain technologies for an
                efficient and secure experience.
              </p>
            </div>

            {/* Reliability */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-sky-500 mb-4">3.</div>
              <h3 className="text-xl font-semibold">Betrouwbaarheid</h3>
              <p className="text-gray-600 leading-relaxed">
                Vertrouwd door duizenden gebruikers wereldwijd met positieve
                feedback en bewezen resultaten.
              </p>
            </div>

            {/* Support */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-sky-500 mb-4">4.</div>
              <h3 className="text-xl font-semibold">Steun</h3>
              <p className="text-gray-600 leading-relaxed">
                Ons supportteam staat altijd klaar om te helpen bij vragen en
                problemen, zodat u zich kunt concentreren op wat er echt toe
                doet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

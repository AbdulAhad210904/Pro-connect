
export function SupportGuides() {
    return (
      <div className="flex flex-col items-center px-6 pt-20 space-y-20">
        {/* Guides Section */}
        <div className="text-center w-full max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Gidsen <span className="text-sky-500">en tutorials</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Blader door onze uitgebreide verzameling handleidingen en tutorials
            voor stapsgewijze instructies voor het gebruik van ons platform.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sky-500 text-lg md:text-xl">
            <a href="#" className="hover:underline">
              Gids voor individuen
            </a>
            <a href="#" className="hover:underline">
              Gids voor professionals
            </a>
            <a href="#" className="hover:underline">
              Video uitleg
            </a>
          </div>
        </div>
  
        {/* Community Forum Section */}
        <div className="text-center w-full max-w-4xl pb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Gemeenschaps<span className="text-sky-500">forum</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Kom bij onze <span className="text-sky-500">gemeenschapsforum</span>{" "}
            om in contact te komen met andere gebruikers, tips en trucs te delen
            en hulp te krijgen van de community.
          </p>
          <p className="mt-8 text-lg md:text-xl text-gray-700">
            Maandag - vrijdag: 9.00 - 17.00 uur
            <br />
            Zaterdag - zondag: Gesloten
          </p>
        </div>
      </div>
    );
  }
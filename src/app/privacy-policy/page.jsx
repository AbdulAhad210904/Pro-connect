import React from 'react';
import Head from 'next/head';
import PolicyCard from '../../components/PolicyCard';

const policyData = [
  {
    title: "Invoering",
    points: [
      "Dit privacybeleid is van toepassing op alle gebruikers van Pro-connect.com, zowel vakmensen als particulieren",
      "Door ons platform te gebruiken, gaat u akkoord met dit privacybeleid"
    ]
  },
  {
    title: "Gegevensverzameling",
    points: [
      "Persoonlijke gegevens zoals naam, adres, e-mailadres en telefoonnummer.",
      "Gebruiksgegevens zoals IP-adressen en browserinformatie."
    ]
  },
  {
    title: "Gebruik van gegevens",
    points: [
      "Dienstverlening: om onze diensten te leveren, te verbeteren en te personaliseren.",
      "Communicatie: om met u te communiceren over uw account en onze diensten.",
      "Beveiliging: om de veiligheid van ons platform te garanderen."
    ]
  },
  {
    title: "Geen gegevens delen",
    points: [
      "Uw persoonsgegevens worden niet gedeeld met derden.",
      "Jouw gegevens blijven strikt vertrouwelijk en worden uitsluitend intern binnen ons platform gebruikt."
    ]
  },
  {
    title: "Dataveiligheid",
    points: [
      "Wij nemen alle noodzakelijke technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of vernietiging."
    ]
  },
  {
    title: "Cookies en tracking",
    points: [
      "Wij gebruiken geen cookies of trackingtechnologieën die persoonlijke gegevens verzamelen.",
      "Alle cookies die wij gebruiken zijn uitsluitend voor functionele doeleinden en kunnen door u worden beheerd via uw browserinstellingen."
    ]
  },
  {
    title: "Gebruikersrechten",
    points: [
      "Recht op toegang: U kunt toegang vragen tot uw persoonlijke gegevens die wij bewaren.",
      "Recht op correctie: U kunt verzoeken om correctie van eventuele onjuiste of onvolledige gegevens."
    ]
  },
  {
    title: "Wijzigingen in het privacybeleid",
    points: [
      "We kunnen dit privacybeleid van tijd tot tijd bijwerken.",
      "Wij zullen u op de hoogte stellen van wijzigingen door het nieuwe beleid op onze website te plaatsen.",
      "Wij raden u aan dit beleid regelmatig te raadplegen."
    ]
  }
];

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacybeleid - ProConnect</title>
        <meta name="description" content="Privacybeleid voor gebruikers van ProConnect" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="mb-16 pb-20 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between">
  <div className="lg:w-1/2 ">
    <h2 className="text-4xl lg:text-5xl font-semibold mb-6 text-gray-900">
      <span className="">Privacybeleid</span>
    </h2>
    <h2 className="text-4xl lg:text-5xl font-semibold mb-6 text-gray-900">
      <span className="text-sky-500"> Voor gebruikers</span>
    </h2>
    <p className="text-lg font-light leading-relaxed text-black max-w-3xl mx-auto lg:mx-0">
      Welkom bij ProConnect. Wij waarderen uw privacy en verzekeren u dat uw persoonlijke gegevens bij ons veilig zijn. Dit privacybeleid is opgesteld om u te informeren over de manier waarop wij uw gegevens verzamelen, gebruiken en beschermen.
    </p>
  </div>
  
  <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center items-center hidden lg:block">
  <img 
    src="/privacy-policy.png"
    alt="Privacy Icon" 
    className="max-w-full h-auto mx-auto"
  />
</div>

</div>
          <div className="space-y-8">
            {/* Policy Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {policyData.slice(0, 4).map((policy, index) => (
                <PolicyCard key={index} {...policy} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {policyData.slice(4, 8).map((policy, index) => (
                <PolicyCard key={index} {...policy} />
              ))}
            </div>
          </div>
        </div>

        <div className=" py-16 mt-16 text-center">
          <h3 className="text-4xl font-semibold text-sky-500"><span className='text-gray-900'>Neem contact</span>  met ons op</h3>
          <p className="mt-7 text-lg text-neutral-800 max-w-3xl mx-auto">
            Als u vragen of opmerkingen heeft over dit privacybeleid of onze gegevensverwerkingspraktijken,
            kunt u contact met ons opnemen via:
          </p>
          <address className="mt-7 font-bold text-neutral-800">
            E-mail: <span className="font-light">contact@pro-connect.com</span>
          </address>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;

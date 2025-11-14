import React from "react";
import ContentCard from "@/components/termsofservices/ContentCard";
import SectionTitle from "@/components/termsofservices/SectionTitle";

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-[1393px] px-4 md:px-8">
        <div className="mb-20 pt-12">
          <SectionTitle regular="Algemene" highlighted="bepalingen" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContentCard title="Definities">
            Voor de doeleinden van deze servicevoorwaarden zijn de volgende
            definities van toepassing:
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <span className="font-bold">Platform: </span>
                  Pro--Connect.com, een online marktplaats voor het verbinden
                  van particulieren en professionals voor klusjesmannen en
                  bouwprojecten.
                </li>
                <li>
                  <span className="font-bold">Gebruiker: </span>
                  iedere natuurlijke of rechtspersoon die gebruik maakt van het
                  Platform.
                </li>
                <li>
                  <span className="font-bold">Professioneel: </span>
                  elke professionele dienstverlener die diensten aanbiedt via
                  het Platform.
                </li>
                <li>
                  <span className="font-bold">Individueel: </span>
                  elke gebruiker die een professional zoekt voor een klusjesman
                  of bouwproject.
                </li>
              </ul>
            </ContentCard>

            <ContentCard title="Aanvaarding van de voorwaarden">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Door toegang te krijgen tot en gebruik te maken van het
                  Platform, gaat de Gebruiker akkoord met deze
                  servicevoorwaarden.
                </li>
                <li>
                  Als de Gebruiker niet akkoord gaat met deze voorwaarden, mag
                  hij het Platform niet gebruiken.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle regular="Gebruik" highlighted="van het platform" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContentCard title="Registratie en accountbeheer">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Om het Platform te gebruiken, moet de Gebruiker een account
                  aanmaken met nauwkeurige en actuele informatie.
                </li>
                <li>
                  De Gebruiker is verantwoordelijk voor het handhaven van de
                  vertrouwelijkheid van zijn accountinformatie en alle
                  activiteiten die plaatsvinden onder zijn account.
                </li>
              </ul>
            </ContentCard>
            <ContentCard title="Gedragsregels voor gebruikers">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  De Gebruiker gaat ermee akkoord het Platform niet te gebruiken
                  voor illegale of ongeoorloofde doeleinden.
                </li>
                <li>
                  De Gebruiker mag geen schadelijke inhoud plaatsen, inclusief
                  maar niet beperkt tot lasterlijke, beledigende of obscene
                  inhoud.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle regular="Gebruiker" highlighted="sinhoud" />
          <div className="mt-12">
            <ContentCard title="Inhoud plaatsen">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  De Gebruiker behoudt alle rechten op de inhoud die hij op het
                  Platform plaatst.
                </li>
                <li>
                  Door inhoud op het Platform te plaatsen, verleent de Gebruiker
                  Pro-connect.com een ​​niet-exclusieve, royaltyvrije,
                  wereldwijde licentie om deze inhoud te gebruiken,
                  reproduceren, wijzigen en distribueren met het doel diensten
                  te verlenen.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle
            regular="Privacy"
            highlighted="en gegevensbescherming"
          />
          <div className="mt-12">
            <ContentCard title="Gegevensverzameling en -gebruik">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Pro--connect.com verzamelt en gebruikt persoonlijke gegevens
                  in overeenstemming met het Privacybeleid, dat een integraal
                  onderdeel is van deze servicevoorwaarden.
                </li>
                <li>
                  Raadpleeg het Privacybeleid voor meer informatie over hoe wij
                  uw persoonlijke gegevens verzamelen, gebruiken en beschermen.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle
            regular="Aansprakelijkheid"
            highlighted="en schadeloosstelling"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContentCard title="Beperking van aansprakelijkheid">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Pro-connect.com is niet aansprakelijk voor enige directe,
                  indirecte, incidentele, speciale of gevolgschade die voortvloeit
                  uit het gebruik van het Platform.
                </li>
                <li>
                  Alle overeenkomsten en transacties die via het Platform worden
                  uitgevoerd, zijn uitsluitend tussen het Particulier en de
                  Professional. Pro-connect.com is geen partij bij deze
                  overeenkomsten en aanvaardt hiervoor geen verantwoordelijkheid
                  of aansprakelijkheid.
                </li>
              </ul>
            </ContentCard>
            <ContentCard title="Schadeloosstelling">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  De Gebruiker vrijwaart van alle claims, eisen en schade,
                  inclusief redelijke advocatenkosten, die voortvloeien uit het
                  gebruik van het Platform door de Gebruiker of de schending van
                  deze servicevoorwaarden.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle
            regular="Intellectuele"
            highlighted="eigendomsrechten"
          />
          <div className="mt-12">
            <ContentCard title="Eigendom van inhoud en materialen">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Alle inhoud en materialen op het Platform, inclusief maar niet
                  beperkt tot tekst, afbeeldingen, logo&apos;s en software, zijn
                  eigendom van Pro--Connect.com of zijn licentiegevers en worden
                  beschermd door toepasselijke auteursrechten en andere
                  intellectuele eigendomsrechten.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle regular="Wijzigingen" highlighted="en beëindiging" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContentCard title="Wijzigingen in de Voorwaarden">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Pro-connect.com behoudt zich het recht voor om deze
                  servicevoorwaarden op elk moment te wijzigen.
                </li>
                <li>
                  We zullen Gebruikers op de hoogte stellen van wijzigingen door
                  de herziene voorwaarden op de website te plaatsen.
                </li>
                <li>
                  Gebruikers worden aangemoedigd deze voorwaarden regelmatig te
                  raadplegen.
                </li>
              </ul>
            </ContentCard>
            <ContentCard title="Beëindiging van de dienst">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Pro-connect.com behoudt zich het recht voor om de toegang van
                  de Gebruiker tot het Platform te beëindigen als de Gebruiker
                  deze voorwaarden schendt.
                </li>
                <li>
                  De Gebruiker kan zijn account op elk moment beëindigen door
                  contact met ons op te nemen via contact@pro--connect.com.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle
            regular="Toepasselijk recht"
            highlighted="en geschillenbeslechting"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContentCard title="Toepasselijk recht">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Deze servicevoorwaarden worden beheerst door en geïnterpreteerd
                  in overeenstemming met de wetten van België.
                </li>
              </ul>
            </ContentCard>
            <ContentCard title="Geschillenbeslechting">
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Geschillen die voortvloeien uit of verband houden met het
                  gebruik van het Platform zullen uitsluitend worden voorgelegd
                  aan de bevoegde rechtbanken in België.
                </li>
              </ul>
            </ContentCard>
          </div>
        </div>
      </div>
      <div className=" pb-16 mt-16 text-center">
          <h3 className="text-4xl font-semibold text-sky-500"><span className='text-gray-900'>Neem contact</span>  met ons op</h3>
          <p className="mt-7 text-lg text-neutral-800 max-w-3xl mx-auto">
            Als u vragen of opmerkingen heeft over dit privacybeleid of onze gegevensverwerkingspraktijken,
            kunt u contact met ons opnemen via:
          </p>
          <address className="mt-7 font-bold text-neutral-800">
            E-mail: <span className="font-light">contact@pro-connect.com</span>
          </address>
        </div>
    </div>
  );
}

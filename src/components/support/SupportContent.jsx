export function SupportContent() {
    return (
      <div className="flex flex-col items-center px-6 pt-20 space-y-20">
        {/* FAQ Section */}
        <div className="text-center w-full max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Veelgestelde <span className="text-sky-500">vragen (FAQ)</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Bekijk ons ​​gedeelte met{" "}
            <span className="font-medium text-sky-500">veelgestelde vragen</span>{" "}
            voor antwoorden op de meest gestelde vragen. Deze sectie wordt
            regelmatig bijgewerkt om u zo snel mogelijk te helpen.
          </p>
        </div>
  
        {/* Contact Support Section */}
        <div className="text-center w-full max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Contact opnemen{" "}
            <span className="text-sky-500">met ondersteuning</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Als uw vraag niet wordt beantwoord in de FAQ-sectie, kunt u contact
            opnemen met ons ondersteuningsteam:
          </p>
          <div className="mt-6 text-lg md:text-xl text-gray-800">
            <span className="font-bold">E-mail:</span>{" "}
            <a
              href="mailto:contact@pro--connect.com"
              className="hover:text-sky-500 transition-colors"
            >
              contact@pro--connect.com
            </a>
          </div>
          <p className="mt-6 text-lg md:text-xl text-gray-700">
            Onze ondersteuning is beschikbaar van maandag tot en met vrijdag van
            9.00 uur tot 17.00 uur.
          </p>
        </div>
      </div>
    );
  }
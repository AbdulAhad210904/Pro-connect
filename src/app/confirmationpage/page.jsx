export default function ConfirmationPage() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* Content Section */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          INSCHRIJVING <span className="text-sky-500">BEVESTIGD</span>
        </h1>
        <p className="text-center text-gray-600 mt-4 px-4 max-w-lg">
          Bedankt dat u zich als Vakman bij ons heeft aangemeld. U heeft het
          abonnement gekozen. Wij hebben een bevestigingsmail gestuurd.
        </p>
        <button
          className="
            mt-8
            bg-sky-500
            hover:bg-sky-600
            text-white
            font-medium
            px-6
            py-3
            rounded-full
            shadow-md
            transition-colors
            duration-200
          "
        >
          Ga naar het dashboard
        </button>
      </div>
    </div>
  );
}

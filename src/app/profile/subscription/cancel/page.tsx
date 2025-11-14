'use client'

export default function CancelSubscription() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[calc(100vh-96px)]"> {/* Flex container for centering */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-center text-3xl font-bold mb-2">
              Annuleer <span className="text-[#27aae2]">abonnement</span>
            </h1>
            <p className="text-center text-gray-600 mb-12">
              We raden u aan nog eens goed na te denken. Als u problemen ondervindt, kan ons ondersteuningsteam u helpen.
            </p>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold mb-2">
                  huidig <span className="text-[#27aae2]">abonnement</span>
                </h2>
              </div>

              <div className="mb-8">
                <h3 className="text-[#27aae2] text-xl font-bold text-center mb-2">BASIS</h3>
                <p className="text-xl font-bold text-center mb-6">FREE</p>
                
                <ul className="space-y-4">
                  <li className="flex items-center justify-center">
                    <span className="text-gray-600">• Basiszichtbaarheid</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="text-gray-600">• 1x prive contact</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="text-gray-600">• Standaard profielpagina</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <button 
                  className="bg-gray-200 text-gray-800 py-2 px-8 rounded-md hover:bg-gray-300 transition-colors"
                >
                  annuleer abonnement
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

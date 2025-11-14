'use client'

export default function SubscriptionPlans() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[calc(100vh-96px)]"> {/* Flex container for centering */}
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-center text-3xl font-bold mb-2">
              KIES <span className="text-[#27aae2]">UW PLAN</span>
            </h1>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {/* Basic Plan */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-[#27aae2] text-2xl font-bold mb-2">BASIS</h2>
                  <p className="text-xl font-bold">FREE</p>
                </div>
                
                <ul className="space-y-4 mb-8 text-left flex-1">
                  <li className="flex items-center">
                    <span className="text-gray-600">• Basiszichtbaarheid</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600">• 1x prive contact</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600">• Standaard profielpagina</span>
                  </li>
                </ul>
                
                <button 
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  geabonneerd
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-[#27aae2] text-2xl font-bold mb-2">PRO</h2>
                  <p className="text-xl font-bold">€ 19.99 per maand</p>
                </div>
                
                <ul className="space-y-4 mb-8 text-left flex-1">
                  <li className="flex items-center">
                    <span className="text-gray-600">• Verhoogde zichtbaarheid</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600">• 15x prive contact</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600">• Verbeterde profielpagina</span>
                  </li>
                </ul>
                
                <button 
                  className="w-full bg-[#27aae2] text-white py-2 px-4 rounded-md hover:bg-[#2299cc] transition-colors"
                >
                  Kies dit abonnement
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-[#27aae2] text-2xl font-bold mb-2">PREMIUM</h2>
                  <p className="text-xl font-bold">€ 49.99 per maand</p>
                </div>
                
                <ul className="space-y-4 mb-8 text-left flex-1">
                  <li className="flex items-center">
                    <span className="text-gray-600">• Verhoogde zichtbaarheid</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600">• Unlimited contact</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600">• Premium profielpagina</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600">• prioriteit in de zoekresultaten</span>
                  </li>
                </ul>
                
                <button 
                  className="w-full bg-[#27aae2] text-white py-2 px-4 rounded-md hover:bg-[#2299cc] transition-colors"
                >
                  Kies dit abonnement
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { Star } from 'lucide-react'
const feedbacks = [
  {
    id: 1,
    title: "Marketing Specialist",
    description: "this was an amazing experience, he work on time and completed everything as i wanted.Loved his work.",
    rating: 4
  },
  {
    id: 2,
    title: "Marketing Specialist",
    description: "this was an amazing experience, he work on time and completed everything as i wanted.Loved his work.",
    rating: 4
  },
  {
    id: 3,
    title: "Marketing Specialist",
    description: "this was an amazing experience, he work on time and completed everything as i wanted.Loved his work.",
    rating: 4
  }
]

export default function FeedPage() {
  return ( 
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />

        <div className="relative z-10 mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Feedback</h2>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">All the feedbacks are listed here</h2>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="mb-8">
            <button className="bg-[#27aae2] text-white px-6 py-2 rounded-md hover:bg-[#2299cc] transition-colors">
              From project providers
            </button>
          </div>

          {/* Feedback Cards */}
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div 
                key={feedback.id}
                className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">
                  project titel: {feedback.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feedback.description}
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index}
                      className={`w-5 h-5 ${
                        index < feedback.rating 
                          ? "fill-[#27aae2] text-[#27aae2]" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


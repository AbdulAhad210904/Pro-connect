'use client'

import Link from 'next/link'

interface ForumCategory {
  title: string
  description: string
  href: string
}

const categories: ForumCategory[] = [
  {
    title: "General discussion",
    description: "Discuss everything related to the platform",
    href: "/community/general"
  },
  {
    title: "Bug reporting",
    description: "Report bugs and technical issues.",
    href: "/community/bugs"
  },
  {
    title: "Feature requests",
    description: "Suggest new features and improvements",
    href: "/community/features"
  },
  {
    title: "User Feedback",
    description: "Share and discuss your experiences",
    href: "/feedback"
  },
  {
    title: "News and Updates",
    description: "Official announcements and updates",
    href: "/community/news"
  },
  {
    title: "Freelancer Discussion",
    description: "Opportunities and growth",
    href: "/community/discussion"
  }
]

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="relative z-10 mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Community forum</h1>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">Welcome to the Pro-Connect Community Forum! Share your experiences, ask questions and talk to other users</h2>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="block group"
            >
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 h-[200px] flex flex-col text-justify">
                <h2 className="text-xl font-medium text-[#27aae2] mb-3 group-hover:text-[#2299cc]">
                  {category.title}
                </h2>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}


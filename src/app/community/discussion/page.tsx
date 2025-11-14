'use client'

export default function DiscussionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="relative z-10 mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Freelancers Discussion</h1>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">Connect with fellow freelancers on Pro Connect</h2>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
  <h2 className="text-3xl font-bold mb-8">Popular Discussions</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Discussion Card 1 */}
    <div className="bg-[#EFEFEF] rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-3">Finding and Offering Projects</h3>
      <p className="text-gray-600 mb-4">Discover new opportunities and showcase your skills to potential clients</p>
      <p className="text-sm text-gray-500">12 comments</p>
    </div>

    {/* Discussion Card 2 */}
    <div className="bg-[#efefef] rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-3">Skills and Portfolio Development</h3>
      <p className="text-gray-600 mb-4">Enhance your skills and build a standout portfolio to attract more clients</p>
      <p className="text-sm text-gray-500">8 comments</p>
    </div>

    {/* Discussion Card 3 */}
    <div className="bg-[#EFEFEF] rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-3">Client Management</h3>
      <p className="text-gray-600 mb-4">Master the art of managing client relationships and effective communication</p>
      <p className="text-sm text-gray-500">20 comments</p>
    </div>
  </div>
</main>
    </div>
  )
}


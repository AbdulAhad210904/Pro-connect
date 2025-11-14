import { HeroSection } from '@/components/aboutus/HeroSection'
import { MissionSection } from '@/components/aboutus/MissionSection'
import { WhatWeDoSection } from '@/components/aboutus/WhatWeDoSection'
import { FeaturesSection } from '@/components/aboutus/FeaturesSection'
import { JoinContactSection } from '@/components/aboutus/JoinContactSection'

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto">
          <HeroSection />
          <MissionSection />
        </div>
        {/* Full-width What We Do Section */}
        <div className="w-full">
          <WhatWeDoSection />
        </div>
        <div className="max-w-5xl mx-auto">
          <FeaturesSection />
          <JoinContactSection />
        </div>
      </main>
    </div>
  )
}

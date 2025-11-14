import { TestimonialCard } from "@/components/pricing/TestimonialCard";
import { testimonials } from "@/components/pricing/testimonials";
import { CTASection } from "@/components/pricing/CTASection";
import HowItWorks from "@/components/pricing/HowItWorks";
import FeatureSection from "@/components/pricing/FeatureSection";
import { PricingHeader } from "@/components/pricing/PricingHeader";

const PricingLandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <PricingHeader />
      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeatureSection />
        <HowItWorks />
        {/* Testimonials Section */}
        <section className="mb-24">
          <h1 className="text-4xl font-semibold text-sky-500 text-center mb-16">
            WAT ONZE VAKMANNEN ZEGGEN
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  );
};

export default PricingLandingPage;

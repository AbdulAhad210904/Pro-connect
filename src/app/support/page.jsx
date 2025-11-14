import { SupportHeader } from "@/components/support/SupportHeader";
import { SupportContent } from "@/components/support/SupportContent";
import { SupportGuides } from "@/components/support/SupportGuides";

export default function Support() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Full-Width Header */}
        <SupportHeader />
        {/* Centered Content */}
        <div className="w-full">
          <SupportContent />
          <SupportGuides />
        </div>
      </main>
    </div>
  );
}

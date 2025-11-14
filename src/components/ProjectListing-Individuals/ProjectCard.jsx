"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectDetails } from "./ProjectDetails";

export function ProjectCard() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <article className="flex flex-col items-center justify-center px-6 py-8 w-full text-base font-light text-black bg-white rounded-lg shadow-md max-md:px-4 max-md:mt-6 max-md:max-w-full relative">
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-semibold mb-4">
    Project Title
  </div>
  {/* Images Section */}
  <div className="flex gap-">
    <div className="relative shrink-0 w-[150px] h-[150px]">
      <Image
        src="/ImagePlaceholder.png"
        alt="Project Image 1"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="relative shrink-0 w-[150px] h-[150px]">
      <Image
        src="/ImagePlaceholder.png"
        alt="Project Image 2"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  </div>

  {/* Text Section */}
  <div className="mt-4 ml-4 max-md:ml-2 text-center">
    <span className="font-semibold">Categorie</span>: Schilderij
  </div>
  <div className="mt-2 ml-4 max-md:ml-2 text-center">
    <span className="font-semibold">Locatie</span>: New York, NY
  </div>
  <div className="mt-2 ml-4 max-md:ml-2 text-center">
    <span className="font-semibold">Budget</span>: $1000-$2000
  </div>

  {/* Button to show project details */}
  <button
    onClick={() => setShowDetails(true)}
    className="self-center px-6 py-2 mt-6 text-sm text-white bg-sky-500 rounded-lg w-[180px] max-md:px-4 max-md:mt-4 hover:bg-sky-600 transition-colors"
  >
    Details bekijken
  </button>
</article>


      {/* Project Details Modal */}
      {showDetails && (
        <ProjectDetails
          project={{
            // Add relevant project data here if needed
            title: "Schilderij Project",
            location: "New York, NY",
            budget: "$1000-$2000",
            description: "Detailed description of the project goes here.",
          }}
          open={showDetails}
          onOpenChange={setShowDetails}
        />
      )}
    </>
  );
}

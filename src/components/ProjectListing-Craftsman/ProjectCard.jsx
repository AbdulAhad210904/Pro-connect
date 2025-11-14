"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProjectDetails } from "./ProjectDetails";
import { CircleCheck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export function ProjectCard({ project }) {
  const [showDetails, setShowDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));
    return `nog ${days} dagen`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    if (project.images.length > 1) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [project.images]);

  return (
    <>
      <article className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
        {/* Project Image Slider */}
        <div className="relative h-48 w-full bg-gray-100">
          {project.images?.length > 0 ? (
            <>
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-200"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                    {project.images.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Geen afbeelding
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700">
              {project.category}
            </span>
          </div>

          {/* Already Applied Badge */}
          {project.alreadyApplied && (
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                <CircleCheck className="h-5 w-5 text-green-500" />
              </div>
            </div>
          )}

          {/* Deadline Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700">
              <Clock className="h-4 w-4" />
              {formatDate(project.deadline)}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3 line-clamp-1">
            {project.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-24">Locatie:</span>
              <span>{project.location.city}, {project.location.country}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium w-24">Budget:</span>
              <span>{project.budget.currency} {project.budget.min.toLocaleString()} - {project.budget.max.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6 line-clamp-2">
            {project.description}
          </p>

          <button
            onClick={() => setShowDetails(true)}
            className="w-full px-4 py-2.5 bg-[#27aae2] text-white rounded-lg font-medium hover:bg-[#2596be] transition-colors"
          >
            Details bekijken
          </button>
        </div>
      </article>

      {showDetails && (
        <ProjectDetails
          project={project}
          open={showDetails}
          onOpenChange={setShowDetails}
        />
      )}
    </>
  );
}


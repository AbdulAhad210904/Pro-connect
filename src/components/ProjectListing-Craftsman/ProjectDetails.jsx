import { useState, useEffect } from 'react';
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ProjectListing-Craftsman/dialog";
import { ProposalSubmissionModal } from "./ProposalSubmissionModal";
import axiosInstance from "@/utils/axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export function ProjectDetails({ project, open, onOpenChange }) {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [canApply, setCanApply] = useState(true);
  const [contactsRemaining, setContactsRemaining] = useState(null);

  useEffect(() => {
    const checkCanApply = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const craftsmanId = decodedToken.userId;
          
          const response = await axiosInstance.post('/api/projects/check-can-apply', { craftsmanId });
          setCanApply(true);
          setContactsRemaining(response.data.contactsRemaining);
        } catch (error) {
          if (error.data.message==="Contact limit reached for your current plan" && error.status === 403) {
            setCanApply(false);
          } else {
            console.error("Error checking if can apply:", error);
          }
        }
      }
    };

    checkCanApply();
  }, []);

  const getButtonClass = () => {
    if (project.alreadyApplied) {
      return 'bg-green-500 text-white cursor-not-allowed';
    } else if (!canApply) {
      return 'bg-red-500 text-white cursor-not-allowed';
    } else {
      return 'bg-[#00A6E6] text-white hover:bg-[#0095d0]';
    }
  };

  const getButtonText = () => {
    if (project.alreadyApplied) {
      return 'Applied';
    } else if (!canApply) {
      return "Can't Apply";
    } else {
      return 'Apply';
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-xl font-medium">{project.title}</DialogTitle>
          </DialogHeader>

          {/* Image Section */}
          {project.images?.length > 0 && (
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {project.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Project image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-6 overflow-y-auto flex-grow pr-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-gray-100 flex-shrink-0">
                <Image
                  src={project.postedBy?.profilePicture || '/user.png'}
                  alt="User avatar"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600">{project.postedBy.firstName} {project.postedBy.lastName}</span>
            </div>

            <div className="space-y-3">
              <div className="flex">
                <span className="text-sm font-medium w-24">Category:</span>
                <span className="text-sm text-gray-600">{project.category}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium w-24">Location:</span>
                <span className="text-sm text-gray-600">{project.location.city}, {project.location.country}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium w-24">Budget:</span>
                <span className="text-sm text-gray-600">{project.budget.currency} {project.budget.min}-{project.budget.max}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium w-24">Deadline:</span>
                <span className="text-sm text-gray-600">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not specified'}
                </span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium w-24">Status:</span>
                <span className="text-sm text-gray-600">{project.status}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Description:</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6 border-t flex-shrink-0">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (!project.alreadyApplied && canApply) {
                  setIsProposalModalOpen(true);
                }
              }}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${getButtonClass()}`}
              disabled={project.alreadyApplied || !canApply}
            >
              {getButtonText()}
            </button>
          </div>
          {contactsRemaining !== null && canApply && (
            <p className="text-sm text-gray-600 mt-2">
              Contacts remaining: {contactsRemaining}
            </p>
          )}
          {!canApply && (
            <p className="text-sm text-red-500 mt-2">
              You&#39;ve reached the contact limit for your current plan. Please upgrade to apply for more projects.
            </p>
          )}
        </DialogContent>
      </Dialog>

      <ProposalSubmissionModal
        project={project}
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
      />
    </>
  );
}
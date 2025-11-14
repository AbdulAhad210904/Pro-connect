"use client"

import { useState, useEffect } from "react"
import { Star, MessageCircle, X, Loader } from 'lucide-react'
import { useRouter } from "next/navigation";
import axiosInstance from '@/utils/axios';
import FeedbackModal from "./FeedbackModal";

export default function CraftsmanProjectModal({
  isOpen,
  onClose,
  project,
  modalType
}) {
  const [individualReview, setIndividualReview] = useState(null)
  const [craftsmanReview, setCraftsmanReview] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (modalType === "completed" && project._id) {
        fetchReview(project._id)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, modalType, project._id])

  
  const fetchReview = async (projectId) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/projectreview/${projectId}`);
      if (response.data) {
        setIndividualReview(response.data.individualReview || null);
        setCraftsmanReview(response.data.craftsmanReview || null);
      }
    } catch (error) {
      console.error('Error fetching review:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  if (!isOpen) return null

  const navigateToChat = () => {
    router.push(`/dashboard/craftsman/projectchat/${project._id}/${project.postedBy._id}`);
  };
  
  const handleGiveFeedback = () => {
    setIsFeedbackModalOpen(true);
  };
  const renderAppliedProjectContent = () => (
    // console.log(project),
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Category:</h3>
          <span>{project.category}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Location:</h3>
          <span>{`${project.location.city}, ${project.location.state}, ${project.location.country}`}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Status:</h3>
          <span className={`px-2 py-1 rounded-full text-sm ${
            project.applicants[0]?.status === "Interview Scheduled" 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          }`}>
            {project.applicants[0]?.status}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Job Description:</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Budget:</h3>
        <p className="text-sm text-gray-600">{`${project.budget.currency} ${project.budget.min} - ${project.budget.currency} ${project.budget.max}`}</p>
      </div>
      {project.applicants[0]?.status === "Interview Scheduled" && (
        <div className="space-y-2">
          <h3 className="font-medium">Next Steps:</h3>
          <p className="text-sm text-gray-600">
            Prepare for the interview scheduled on {new Date(project.applicants[0].interviewDate).toLocaleDateString()}
          </p>
        </div>
      )}
      <div className="flex  space-x-2 justify-evenly">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          Close
        </button>
        <button className="px-4 py-2 bg-[#00A6E6] text-white rounded-md hover:bg-[#0095d0] flex items-center">
          Cancel Application
        </button>
        <button className="px-4 py-2 bg-[#00A6E6] text-white rounded-md hover:bg-[#0095d0] flex items-center">
          <MessageCircle 
            onClick={navigateToChat}
          className=" h-5 w-5" />
        </button>
      </div>
    </div>
  )

  const renderCurrentProjectContent = () => (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Client:</h3>
          <span>{project.postedBy.firstName} {project.postedBy.lastName}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Project Status:</h3>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {project.status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Deadline:</h3>
          <span>{new Date(project.deadline).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Project Details:</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
      <div className="flex justify-evenly space-x-2">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          Close
        </button>
        <button className="px-4 py-2 bg-[#00A6E6] text-white rounded-md hover:bg-[#0095d0] flex items-center" onClick={navigateToChat}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat with Client
        </button>
      </div>
    </div>
  )

  
  const renderCompletedProjectContent = () => (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Client:</h3>
          <span>{`${project.postedBy.firstName} ${project.postedBy.lastName}`}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Completion Date:</h3>
          <span>{new Date(project.completionDate).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="border border-dashed border-gray-300 rounded-lg p-4 space-y-4">
        <h3 className="font-medium mb-2">Feedback Details:</h3>
        
        {/* Individual's Feedback */}
        <div className="space-y-2">
          <h4 className="font-medium">Feedback from Individual:</h4>
          {isLoading ? (
            <div className="flex justify-center items-center h-20">
              <Loader className="animate-spin" size={24} color="#00A6E6" />
            </div>
          ) : individualReview ? (
            <>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= individualReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{individualReview.comment}</p>
            </>
          ) : (
            <p className="text-sm text-gray-600">No feedback provided by the individual yet.</p>
          )}
        </div>
  
        {/* Craftsman's Feedback */}
        <div className="space-y-2">
          <h4 className="font-medium">Feedback from Craftsman:</h4>
          {isLoading ? (
            <div className="flex justify-center items-center h-20">
              <Loader className="animate-spin" size={24} color="#00A6E6" />
            </div>
          ) : craftsmanReview ? (
            <>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= craftsmanReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{craftsmanReview.comment}</p>
            </>
          ) : (
            <p className="text-sm text-gray-600">No feedback provided by the craftsman yet.</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button 
          className="px-4 py-2 bg-[#00A6E6] text-white rounded-md hover:bg-[#0095d0]"
          onClick={handleGiveFeedback}
        >
          Give Feedback
        </button>
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        {modalType === "applied" && renderAppliedProjectContent()}
        {modalType === "current" && renderCurrentProjectContent()}
        {modalType === "completed" && renderCompletedProjectContent()}
        {modalType === "completed" && (
          <FeedbackModal
            isOpen={isFeedbackModalOpen}
            onClose={() => setIsFeedbackModalOpen(false)}
            projectId={project._id}
            revieweeId={project.postedBy._id}
          />
        )}
      </div>
    </div>
  )
}
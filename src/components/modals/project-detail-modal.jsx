"use client";

import { useState,useEffect } from "react";
import Modal from "./modal";
import { useDispatch } from 'react-redux';
import { updateProject } from "@/store/posted-projects/projectThunk";
import { Star, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import FeedbackModal from './FeedbackModal';


const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [individualReview, setIndividualReview] = useState(null);
  const [craftsmanReview, setCraftsmanReview] = useState(null);

  useEffect(() => {
    if (isOpen && project.status === 'completed') {
      fetchReviews()
    }
  }, [isOpen, project.status, project._id])

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/api/projectreview/${project._id}`)
      if (response.data) {
        setIndividualReview(response.data.individualReview || null)
        setCraftsmanReview(response.data.craftsmanReview || null)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }


  const handleViewApplicant = () => {
    router.push(`/dashboard/individual/applicants/${project._id}`);
  };

  const handleDelete = () => {
    console.log("Delete project");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProject(project);
  };

  const handleMarkAsCompleted = async () => {
    try {
      await axiosInstance.post('/api/projects/completeproject', {
        projectId: project._id,
      });
      // Force reload
      window.location.reload();
    } catch (error) {
      console.error("Error marking project as completed:", error);
    }
  };

  const handleGiveFeedback = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
  };

  const handleChat = () => {
    if (project._id && project.assignedTo) {
      router.push(`/dashboard/individual/projectchat/${project._id}/${project.assignedTo}`);
    } else {
      console.error("Project ID or assignedTo is missing");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        [name]: value
      }
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProject({ id: project._id, updatedData: editedProject })).unwrap();
      setIsEditing(false);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update project:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const renderButtons = () => {
    if (isEditing) return null;

    switch (project.status) {
      case 'open':
        return [
          {
            label: "View Applicants",
            onClick: handleViewApplicant,
            variant: "primary",
          },
          {
            label: "Delete Project",
            onClick: handleDelete,
            variant: "danger",
          },
          {
            label: "Edit Project Details",
            onClick: handleEdit,
            variant: "primary",
          },
        ];
      case 'in-progress':
        return [
          {
            label: "Mark as Completed",
            onClick: handleMarkAsCompleted,
            variant: "primary",
          },
          {
            label: <MessageCircle />,
            onClick: handleChat,
            variant: "primary",
          },
        ];
      case 'completed':
        return individualReview ? [] : [
          {
            label: "Give Your Feedback",
            onClick: handleGiveFeedback,
            variant: "default",
          }
        ];
      default:
        return [];
    }
  };

  const renderRatingStars = (rating) => {
    if (project.status !== 'completed' || rating < 1 || rating > 5) return null;
  
    return (
      <div className="flex items-center justify-center mt-4">
        {[...Array(rating)].map((_, index) => (
          <Star
            key={index}
            className="w-8 h-8 text-blue-500 fill-white stroke-2"
          />
        ))}
      </div>
    );
  };
  

  const renderContent = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedProject.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedProject.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={editedProject.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Sub Category</label>
            <input
              type="text"
              id="subCategory"
              name="subCategory"
              value={editedProject.subCategory || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="min" className="block text-sm font-medium text-gray-700">Minimum Budget</label>
            <input
              type="number"
              id="min"
              name="min"
              value={editedProject.budget.min}
              onChange={handleBudgetChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="max" className="block text-sm font-medium text-gray-700">Maximum Budget</label>
            <input
              type="number"
              id="max"
              name="max"
              value={editedProject.budget.max}
              onChange={handleBudgetChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
            <input
              type="text"
              id="currency"
              name="currency"
              value={editedProject.budget.currency}
              onChange={handleBudgetChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={editedProject.location.city}
              onChange={handleLocationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={editedProject.location.state}
              onChange={handleLocationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={editedProject.location.country}
              onChange={handleLocationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={editedProject.deadline ? new Date(editedProject.deadline).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={editedProject.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold">Description:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.description}
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold">Category:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.category}
          </p>
        </div>

        {project?.subCategory && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Sub Category:</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {project.subCategory}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-lg sm:text-xl font-bold">Budget:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.budget?.min} - {project?.budget?.max} {project?.budget?.currency}
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold">Location:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.location?.city}, {project?.location?.state}, {project?.location?.country}
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold">Post Date:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.postDate ? new Date(project.postDate).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold">Deadline:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline set"}
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold">Status:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.status}
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold">Applicants:</h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {project?.applicants?.length || 0}
          </p>
        </div>

        {project?.assignedTo && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Assigned To:</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {project.assignedTo}
            </p>
          </div>
        )}

        {project?.completionDate && (
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Completion Date:</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {new Date(project.completionDate).toLocaleDateString()}
            </p>
          </div>
        )}
        {project.status === 'completed' && (
          <div className="space-y-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold mb-3">Individual&apos;s Feedback:</h3>
              {individualReview ? (
                <>
                  {renderRatingStars(individualReview.rating)}
                  <p className="text-gray-700 text-sm sm:text-base mt-2">{individualReview.comment}</p>
                </>
              ) : (
                <p className="text-gray-700 text-sm sm:text-base">No feedback provided yet.</p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-3">Craftsman&apos;s Feedback:</h3>
              {craftsmanReview ? (
                <>
                  {renderRatingStars(craftsmanReview.rating)}
                  <p className="text-gray-700 text-sm sm:text-base mt-2">{craftsmanReview.comment}</p>
                </>
              ) : (
                <p className="text-gray-700 text-sm sm:text-base">No feedback provided yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Project Title: ${project?.title || "Untitled Project"}`}
        buttons={renderButtons()}
      >
        {renderContent()}
      </Modal>
      {project.status === 'completed' && !individualReview && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={handleFeedbackModalClose}
          projectId={project._id}
          revieweeId={project.assignedTo}
        />
      )}
    </>
  );
};

export default ProjectDetailsModal;
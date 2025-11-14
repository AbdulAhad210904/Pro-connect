'use client';

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProjectDetailsModal from "@/components/modals/project-detail-modal";
import { fetchUserProjects } from "@/store/posted-projects/projectThunk";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Loader } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function IndividualDashboard() {
  const dispatch = useDispatch();
  const { userProjects, loading, error } = useSelector((state) => state.projects);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        if (!userId) {
          console.error('UserId not found in token');
          return;
        }

        dispatch(fetchUserProjects(userId));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchProjects();
  }, [dispatch]);

  const filteredProjects = useMemo(() => {
    return userProjects.filter(project => project.status === activeTab);
  }, [userProjects, activeTab]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={48} color="#00A6E6" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <ToastContainer />
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-[#1D97CC] text-white relative overflow-hidden px-4 py-20 sm:py-32 md:py-40">
        <div className="absolute inset-0">
          <div className="absolute -left-32 -top-20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-[#0000001A] rounded-full"></div>
          <div className="absolute -right-32 -bottom-32 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-[#0000001A] rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Individual Dashboard
          </h1>
          <p className="text-sm sm:text-md md:text-lg lg:text-xl">
            Post projects and bring in the best craftsman in town
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap justify-center sm:justify-evenly items-center space-y-4 sm:space-y-0 px-2 sm:px-8 space-x-0 sm:space-x-4">
            <button
              onClick={() => setActiveTab("open")}
              className={`w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "open"
                  ? "bg-[#00A6E6] text-white"
                  : "text-[#00A6E6] hover:bg-gray-100"
              }`}
            >
              Open Projects
            </button>
            <button
              onClick={() => setActiveTab("in-progress")}
              className={`w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "in-progress"
                  ? "bg-[#00A6E6] text-white"
                  : "text-[#00A6E6] hover:bg-gray-100"
              }`}
            >
              In Progress Projects
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "completed"
                  ? "bg-[#00A6E6] text-white"
                  : "text-[#00A6E6] hover:bg-gray-100"
              }`}
            >
              Completed Projects
            </button>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00A6E6] mb-6 sm:mb-8">
          {activeTab === "open" ? "Posted projects" : 
           activeTab === "in-progress" ? "Current projects" : 
           "Finished projects"}
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
                {project.title}
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Categorie: </span>
                  {project.category}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Locatie: </span>
                  {`${project.location.city}, ${project.location.state}, ${project.location.country}`}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Budget: </span>
                  {`${project.budget.currency} ${project.budget.min} - ${project.budget.currency} ${project.budget.max}`}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Deadline: </span>
                  {project?.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline set"}
                </p>
                <div className="pb-10"></div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No projects found for this status.</p>
        )}

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          <button className="w-2.5 h-2.5 rounded-full bg-[#00A6E6]" />
          <button className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          <button className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* Project Details Modal */}
      {isModalOpen && (
        <ProjectDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </div>
    </>
  );
}
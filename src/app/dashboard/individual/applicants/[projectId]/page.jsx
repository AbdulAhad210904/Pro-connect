'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import { Loader, Check, MessageSquareText } from 'lucide-react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';


export default function ProjectApplicantsPage() {
  const router = useRouter();
  const { projectId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigningCraftsman, setAssigningCraftsman] = useState(null);

  useEffect(() => {
    const fetchUserIdAndApplicants = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const fetchedUserId = decodedToken.userId;
        if (!fetchedUserId) {
          throw new Error('UserId not found in token');
        }
        const response = await axiosInstance.get(`/api/projects/getapplicants/${projectId}`);
        setApplicants(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch applicants");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdAndApplicants();
  }, [projectId]);
console.log(applicants);
const handleAssignCraftsman = async (applicant) => {
  setAssigningCraftsman(applicant._id);
  try {
    await axiosInstance.post('/api/projects/assign', {
      projectId,
      craftsmanId: applicant.craftsmanId
    });

    // Update the local state to reflect the assignment
    setApplicants(prevApplicants =>
      prevApplicants.map(app => ({
        ...app,
        status: app._id === applicant._id ? 'accepted' : app.status === 'pending' ? 'rejected' : app.status
      }))
    );

    toast.success('Craftsman assigned successfully');
  } catch (error) {
    console.error('Error assigning craftsman:', error);
    toast.error('Failed to assign craftsman');
  } finally {
    setAssigningCraftsman(null);
  }
};

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="animate-spin text-[#00A6E6]" size={48} />
    </div>
  );
}

if (error) {
  return (
    <div className="flex items-center justify-center min-h-screen text-red-500">
      {error}
    </div>
  );
}

return (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="bg-[#00A6E6] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full bg-[#0000001A] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full bg-[#0000001A] translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2">
          View Applicants
        </h1>
        <p className="text-white text-sm sm:text-base opacity-90">
          Manage and review all the applicants for your project posting.
        </p>
      </div>
    </div>

    {/* Applicants List */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant._id}
            className="border-b border-gray-100 py-6 px-4 sm:px-6 flex items-center rounded-md shadow-lg justify-between transition-all hover:bg-gray-50"
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {applicant.fullName}
              </h3>
              <p className="text-sm text-gray-500">
                Status: {applicant.status || 'Pending'}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  applicant.status === 'accepted'
                    ? 'bg-green-500'
                    : applicant.status === 'rejected'
                      ? 'bg-red-500'
                      : 'bg-[#00A6E6]'
                } text-white hover:opacity-80 transition-colors`}
                title={applicant.status === 'accepted' ? 'Assigned' : 'Assign Craftsman'}
                onClick={() => handleAssignCraftsman(applicant)}
                disabled={assigningCraftsman === applicant._id || applicant.status === 'accepted' || applicant.status === 'rejected'}
              >
                {assigningCraftsman === applicant._id ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00A6E6] text-white hover:bg-[#0095d0] transition-colors"
                title="View Proposal Details"
                onClick={() =>
                  router.push(
                    `/dashboard/individual/projectchat/${projectId}/${applicant.craftsmanId}`
                  )
                }
              >
                <MessageSquareText className="w-5 h-5" />
              </button>

            </div>
          </div>
        ))}

        {applicants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No applicants found for this project.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
}
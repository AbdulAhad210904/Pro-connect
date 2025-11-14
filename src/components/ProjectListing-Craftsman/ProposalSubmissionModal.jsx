import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ProjectListing-Craftsman/dialog";
import { applyToProject } from "@/store/posted-projects/projectThunk";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function ProposalSubmissionModal({ project, isOpen, onClose }) {
  const [proposal, setProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const token = Cookies.get("token");
    if (!token) {
      setError("You must be logged in to submit a proposal.");
      setIsSubmitting(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const craftsmanId = decodedToken.userId;
      console.log("Craftsman ID: ", craftsmanId);
      const applicationData = {
        craftsmanId,
        proposal
      };

      await dispatch(applyToProject({ id: project._id, applicationData })).unwrap();
      onClose();
    } catch (error) {
      setError(error.message || "Failed to submit proposal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Submit Proposal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="proposal" className="block text-sm font-medium text-gray-700">
              Your Proposal
            </label>
            <textarea
              id="proposal"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-white bg-[#00A6E6] rounded-md hover:bg-[#0095d0] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
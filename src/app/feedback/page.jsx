'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewFeedback } from '@/store/user-feedback/feedbackThunk';

export default function FeedbackPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feedbackType, setFeedbackType] = useState('Company');
    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs (you can expand validation logic here)
        if (!title || !description) {
            alert('Please fill out all fields.');
            return;
        }

        // Create feedback data
        const feedbackData = {
            title,
            description,
            recordAs: feedbackType,
        };

        // Dispatch the thunk to create feedback
        dispatch(createNewFeedback(feedbackData))
            .then(() => {
                alert('Feedback submitted successfully!');
                // Clear the form
                setTitle('');
                setDescription('');
                setFeedbackType('Company');
            })
            .catch((error) => {
                console.error('Error submitting feedback:', error);
                alert('Failed to submit feedback. Please try again.');
            });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
                <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
                <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
                <div className="relative z-10 mx-auto text-center text-white">
                    <h1 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">User Feedback</h1>
                    <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">Provide detailed feedback to help us improve</h2>
                </div>
            </section>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
                <div className="bg-white rounded-lg">
                    <h2 className="text-2xl font-semibold mb-8">Deel uw ervaring</h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-lg">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-lg">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent resize-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="feedbackType" className="block text-lg">
                                Record Feedback as:
                            </label>
                            <div className="relative">
                                <select
                                    id="feedbackType"
                                    name="feedbackType"
                                    value={feedbackType}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent appearance-none bg-white"
                                >
                                    {/* <option value="Company">Company</option> */}
                                    <option value="Freelancer">Freelancer</option>
                                    {/* <option value="JobSeeker">Job Seeker</option> */}
                                    <option value="Employee">Employee</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-3 bg-[#27aae2] text-white rounded-lg hover:bg-[#2299cc] transition-colors duration-200"
                        >
                            Indienen
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

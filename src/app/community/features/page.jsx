'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThumbsUp, ThumbsDown,Loader } from 'lucide-react'
import {
  fetchFeatureRequests,
  createFeatureRequest,
  upvoteFeatureRequest,
  downvoteFeatureRequest,
} from '@/store/feature-requests/requestsThunk'
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export default function FeatureRequestPage() {
  const dispatch = useDispatch()
  const { requests, loading } = useSelector((state) => state.featureRequest)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [visibleRequests, setVisibleRequests] = useState(3)
  const [loading2,setLoading2] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchFeatureRequests())
  
      const token = Cookies.get("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  setLoading2(false);
  
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    const newRequest = { title, description }
    dispatch(createFeatureRequest(newRequest))
    setTitle('')
    setDescription('')
  }

  const handleVote = (id, type) => {
    if (type === 'like') {
      dispatch(upvoteFeatureRequest(id))
    } else {
      dispatch(downvoteFeatureRequest(id))
    }
  }

  const handleLoadMore = () => {
    setVisibleRequests((prev) => prev + 3)
  }
  if (loading2) return <div className='flex flex-col min-h-screen justify-center items-center'><Loader width={50} height={50}></Loader></div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Functieverzoeken</h1>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">
            Wij waarderen uw inbreng! Stel nieuwe functies of verbeteringen voor om ons te helpen Pro-Connect te verbeteren
          </h2>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg">
          <h2 className="text-2xl font-semibold mb-8">Dien een functieverzoek in</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-lg">
                Functietitel:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-lg">
                Functiebeschrijving:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#27aae2] text-white rounded-lg hover:bg-[#2299cc] transition-colors duration-200"
            >
              Indienen
            </button>
          </form>

          {/* Requests */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Recente functieverzoeken</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {requests.slice(0, visibleRequests).map((request) => (
                  <div key={request._id} className="p-6 border border-gray-200 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">{request.title}</h4>
                    <p className="text-gray-600 mb-4">{request.description}</p>
                    <div className="flex gap-4">


                    <button
  className={`flex items-center gap-1 sm:gap-2 ${
    request.upvotes.includes(userId) ? 'text-blue-500' : 'text-gray-500'
  } hover:text-[#27aae2]`}
  onClick={() => handleVote(request._id, 'like')}
>
  <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
  <span className="text-xs sm:text-sm">{request.upvotes.length}</span>
</button>

<button
  className={`flex items-center gap-1 sm:gap-2 ${
    request.downvotes.includes(userId) ? 'text-blue-500' : 'text-gray-500'
  } hover:text-[#27aae2]`}
  onClick={() => handleVote(request._id, 'dislike')}
>
  <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
  <span className="text-xs sm:text-sm">{request.downvotes.length}</span>
</button>



      
                    </div>
                  </div>
                ))}
              </div>
            )}
            {visibleRequests < requests.length && (
              <button
                onClick={handleLoadMore}
                className="text-[#27aae2] hover:underline flex mx-auto"
              >
                Meer laden...
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

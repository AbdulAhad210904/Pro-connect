'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsWithComments, createPost, createPostComment, upvotePost, downvotePost, upvoteComment, downvoteComment } from '@/store/forum-posts/forumThunk';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, Loader,MessageSquare,ChevronDown,ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export default function GeneralPage() {
  const dispatch = useDispatch();
  const { posts, error } = useSelector((state) => state.posts);
  
  const [newPost, setNewPost] = useState('');
  const [newReply, setNewReply] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [collapsedReplies, setCollapsedReplies] = useState({});
  const [loading2,setLoading2] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchPostsWithComments());
   
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

  }, [dispatch]);



   if (loading2) return <div className='flex flex-col min-h-screen justify-center items-center'><Loader width={50} height={50}></Loader></div>;
  if (error) return <div className='flex flex-col min-h-screen justify-center items-center'>Error: {error}</div>;

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      dispatch(createPost({ content: newPost }));
      setNewPost(''); 
    }
  };

  const handleReplySubmit = (postId) => {
    if (newReply.trim()) {
      dispatch(createPostComment({ postId, commentData: { content: newReply } }));
      setNewReply(''); 
    }
  };

  const handleUpvote = (postId) => {
    dispatch(upvotePost(postId));
  };

  const handleDownvote = (postId) => {
    dispatch(downvotePost(postId));
  };

  const handleUpvoteReply = (replyId) => {
    const postId = replyId;
    dispatch(upvoteComment(postId));
  };

  const handleDownvoteReply = (replyId) => {
    dispatch(downvoteComment(replyId));
  };

  const toggleReplies = (postId) => {
    setCollapsedReplies((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const toggleReply = (postId) => {
    setSelectedPostId(prevState => prevState === postId ? null : postId);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-8">
          {/* Post Creation Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Plaats een vraag of opmerking</h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <input
                type="text"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Waar denk je aan?"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-2 bg-[#27aae2] text-white rounded-lg hover:bg-[#2299cc] transition-colors duration-200"
                >
                  Na
                </button>
              </div>
            </form>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{post.author.name}</h3>
                    <p className="text-sm text-gray-500"> {formatDistanceToNow(new Date(post.timestamp))} ago</p>
                  </div>
                </div>
                <p className="text-gray-800">{post.content}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-4">
                  <button
  className={`flex items-center gap-1 sm:gap-2 ${
    post.likes.includes(userId) ? 'text-blue-500' : 'text-gray-500'
  } hover:text-[#27aae2]`}
  onClick={() => handleUpvote(post.id)}
>
  <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
  <span className="text-xs sm:text-sm">{post.likes.length}</span>
</button>

<button
  className={`flex items-center gap-1 sm:gap-2 ${
    post.dislikes.includes(userId) ? 'text-blue-500' : 'text-gray-500'
  } hover:text-[#27aae2]`}
  onClick={() => handleDownvote(post.id)}
>
  <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
  <span className="text-xs sm:text-sm">{post.dislikes.length}</span>
</button>

                  </div>
                  <button
                    onClick={() => toggleReplies(post.id)}
                    className="ml-auto flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-[#27aae2]"
                  >
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">{post.replies.length} antwoorden</span>
                    {!collapsedReplies[post.id] ? <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />}
                  </button>
                
                  <button
                    className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-[#27aae2] text-white rounded-lg hover:bg-[#2299cc] transition-colors duration-200"
                    onClick={() => toggleReply(post.id)}
                  >
                    Antwoord
                  </button>
                </div>
                {selectedPostId === post.id && (
                  <div className="mt-4">
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Write your reply here..."
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-[#27aae2] text-white rounded-lg"
                      onClick={() => handleReplySubmit(post.id)}
                    >
                      Post Reply
                    </button>
                  </div>
                )}
                {collapsedReplies[post.id] && post.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-12">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          <Image
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <h4 className="font-medium">{reply.author.name}</h4>
                            <p className="text-xs text-gray-500"> {formatDistanceToNow(new Date(reply.timestamp))} ago</p>
                          </div>
                        </div>
                        <p className="text-gray-800 text-sm">{reply.content}</p>
                        <div className="flex items-center gap-2 sm:gap-4">
                        <button
  className={`flex items-center gap-1 sm:gap-2 ${
    reply.likes.includes(userId) ? 'text-blue-500' : 'text-gray-500'
  } hover:text-[#27aae2]`}
  onClick={() => handleUpvoteReply(reply.id)}
>
  <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
  <span className="text-xs sm:text-sm">{reply.likes.length}</span>
</button>

<button
  className={`flex items-center gap-1 sm:gap-2 ${
    reply.dislikes.includes(userId) ? 'text-blue-500' : 'text-gray-500'
  } hover:text-[#27aae2]`}
  onClick={() => handleDownvoteReply(reply.id)}
>
  <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
  <span className="text-xs sm:text-sm">{reply.dislikes.length}</span>
</button>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* <button className="text-[#27aae2] hover:underline w-full text-center">
              Load More...
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}

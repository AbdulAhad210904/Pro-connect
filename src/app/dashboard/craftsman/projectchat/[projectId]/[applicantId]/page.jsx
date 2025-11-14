'use client';

import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axiosInstance from '@/utils/axios';
import { Send, Menu } from 'lucide-react';

export default function CraftsmanChatPage() {
  const { projectId, applicantId } = useParams();
  const [userId, setUserId] = useState('none');
  const [firstName, setFirstName] = useState('none');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const socketRef = useRef(null);
  const sidebarRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(null);

  // const projects = [
  //   { id: 1, title: 'Project 1', color: 'bg-orange-400' },
  //   { id: 2, title: 'Project 2', color: 'bg-green-400' },
  // ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userId) {
        setUserId(decodedToken.userId);
        setFirstName(decodedToken.firstName);
        initializeChat(decodedToken.userId);
      } else {
        console.error('UserId not found in token');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [projectId, applicantId]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:8000');
    }
  
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      socketRef.current = null;
    };
  }, []);
  
  useEffect(() => {
    if (chatId && socketRef.current) {
      console.log('Joining chat:', chatId);
      socketRef.current.emit('join chat', chatId);
  
      socketRef.current.on('new message', (message) => {
        console.log('Received new message:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      return () => {
        if (socketRef.current) {
          socketRef.current.emit('leave chat', chatId);
          socketRef.current.off('new message');
        }
      };
    }
  }, [chatId]);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/projects/getproject/${projectId}`);
        setCurrentProject(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const initializeChat = async (userId) => {
    try {
      const response = await axiosInstance.post(`/api/chats/initialize/${projectId}/${applicantId}`);
      setChatId(response.data._id);
      setMessages(response.data.messages);
      console.log( userId);
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && chatId) {
      try {
        const response = await axiosInstance.post(`/api/chats/send/${chatId}`, { content: newMessage });
        console.log('Message sent:', response.data);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />

        <div className="relative z-10 mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Chat Room</h2>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">Communicate with project owners</h2>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-1 md:m-20 shadow-2xl min-h-[600px] md:min-h-[750px] overflow-hidden relative">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`absolute md:relative flex flex-col w-64 bg-white border-r transition-all duration-200 ease-in-out h-full z-50 ${
            isSidebarOpen ? 'left-0' : '-left-64'
          } md:left-0`}
        >
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-8">Chats</h1>
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Projects</h2>
              {currentProject && (
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-gray-700">{currentProject.title}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col w-full relative">
          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black/30 md:hidden z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          {/* Chat Header */}
          <div className="bg-[#5BB4E5] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="md:hidden" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl">Project Chat (Craftsman)</h2>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50" style={{ height: 'calc(100vh - 400px)', maxHeight: '600px' }}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl py-2 px-4 max-w-[80%] ${
                  message.senderId === userId ? 'bg-gray-500 text-white' : 'bg-[#5BB4E5] text-white'
                }`}>
                  {message.senderId !== userId && <p className="font-semibold mb-1">{firstName}:</p>}
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5BB4E5]"
              />
              <button
                type="submit"
                className="bg-[#5BB4E5] text-white p-2 rounded-lg hover:bg-[#4A9FD0] transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
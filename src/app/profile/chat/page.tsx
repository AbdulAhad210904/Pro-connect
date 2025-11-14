'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Menu } from 'lucide-react'

export default function ChatInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [message, setMessage] = useState('')

  const projects = [
    { id: 1, title: 'project title', color: 'bg-orange-400' },
    { id: 2, title: 'project title', color: 'bg-green-400' }
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const sidebarRef = useRef<HTMLDivElement>(null)
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle message submission here
      setMessage('')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return ( 
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />

        <div className="relative z-10 mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Chat Room</h2>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">Communicate with selected applicants and projects</h2>
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
              {projects.map((project) => (
                <div key={project.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                  <span className="text-gray-700">{project.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col w-full relative">
          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black/30 md:hidden z-40"
              onClick={closeSidebar}
            />
          )}
          {/* Chat Header */}
          <div className="bg-[#5BB4E5] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="md:hidden" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl">Functietitel</h2>
            </div>
            <div className="flex space-x-4">
              {/* <button className="hover:bg-[#4A9FD0] p-2 rounded-full">
                <Video className="h-6 w-6" />
              </button>
              <button className="hover:bg-[#4A9FD0] p-2 rounded-full">
                <Phone className="h-6 w-6" />
              </button> */}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            <div className="flex justify-end">
              <div className="bg-gray-500 text-white rounded-2xl py-2 px-4 max-w-[80%]">
                <p>Hi, How are you?</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-[#5BB4E5] text-white rounded-2xl py-2 px-4 max-w-[80%]">
                <p className="font-semibold mb-1">John Doe:</p>
                <p>Hi, Thanks for responding</p>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
  )
}


'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper/modules"
import { fetchNews } from '@/store/news-updates/newsThunk'


export default function NewsPage() {
  const dispatch = useDispatch()
  const { items: news, loading, error } = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="relative z-10 mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">News & Updates</h1>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">Stay informed with the latest news, updates, and events from pro--connect.com</h2>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading news...</p>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load news: {error}</p>
        ) : (
          <>
            {/* Recent News Section */}
            <section className="mb-16 bg-gray-100 px-6">
              <h2 className="text-2xl font-bold mb-8 p-6">Recent nieuws</h2>
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="w-full h-[300px] sm:h-[300px]"
              >
                {news
                  .filter(item => item.type === 'news')
                  .map(item => (
                    <SwiperSlide key={item._id}>
                      <div className="bg-white rounded-lg shadow-md p-6 h-[250px] flex flex-col">
                        <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                        <p className="mb-4 flex-grow line-clamp-4">{item.description}</p>
                        <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </section>

            {/* Upcoming Events Section */}
            <section className="mb-16 bg-gray-100 px-6">
              <h2 className="text-2xl font-bold mb-8 p-6">aankomende evenementen</h2>
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="w-full h-[300px] sm:h-[300px]"
              >
                {news
                  .filter(item => item.type === 'update')
                  .map(item => (
                    <SwiperSlide key={item._id}>
                      <div className="bg-white rounded-lg shadow-md p-6 h-[250px] flex flex-col">
                        <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                        <p className="mb-4 flex-grow line-clamp-4">{item.description}</p>
                        <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </section>
          </>
        )}

        {/* Newsletter Section */}
        <section className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Abonneer op onze nieuwsbrief</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2">E-mail:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2]"
              />
            </div>
            <button className="w-full bg-[#27aae2] hover:bg-[#1f8ebf] text-white font-bold py-2 px-4 rounded-md transition duration-300">
              Abonneren
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

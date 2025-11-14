import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import ReviewCard from "./review-card";
import { fetchAllFeedbacks } from '@/store/user-feedback/feedbackThunk';

const Testimonials = () => {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector((state) => state.feedbacks);

  useEffect(() => {
    dispatch(fetchAllFeedbacks());
  }, [dispatch]);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 xl:px-40">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">
        REVIEWS <span className="text-[#27aae2]">AND</span> TESTIMONIALS
      </h1>
      <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">What Our Users Say</p>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1380: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="h-[300px] sm:h-[280px]"
      >
        {feedbacks.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCard
              name={`${review.feedbackBy.firstName} ${review.feedbackBy.lastName}`}
              title={review.recordAs}
              review={review.description}
              rating={4} // Assuming a default rating for now
              date={new Date(review.createdAt).toLocaleDateString()}
              avatarUrl={review.feedbackBy.profilePicture || "/user.png"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold">Meet our top traders of the month</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 mt-4 sm:mt-6 max-w-xs sm:max-w-sm mx-auto">
          <img
            src="/user.png"
            alt="Top Trader"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4"
          />
          <h3 className="text-base sm:text-lg font-semibold">Kiara Advain</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">Completed 50+ successful projects</p>
          <div className="flex items-center justify-center">
            <span className="text-yellow-400 text-base sm:text-lg">
              {'★'.repeat(5)}
            </span>
          </div>
          <a
            href="#"
            className="text-blue-500 text-sm sm:text-base font-medium mt-3 sm:mt-4 inline-block hover:underline"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

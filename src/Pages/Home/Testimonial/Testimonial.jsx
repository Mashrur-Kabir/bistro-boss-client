import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./Testimonial.css";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaQuoteLeft, FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";

const testimonials = [
  {
    id: 1,
    rating: 4,
    name: "Jane Doe",
    review:
      "Various version have evolved over the years, sometimes by accident, sometimes on purpose. It is a long established fact that a reader will be distracted by the readable content.",
  },
  {
    id: 2,
    rating: 5,
    name: "John Smith",
    review:
      "Absolutely loved the food and service! Everything was served fresh and delicious. Highly recommend it to anyone who enjoys fine dining.",
  },
  {
    id: 3,
    rating: 3,
    name: "Emily Carter",
    review:
      "Good experience overall. Some dishes were better than others. Will come back for sure and try more from the menu.",
  },
  {
    id: 4,
    rating: 5,
    name: "Michael Lee",
    review:
      "The ambiance, taste, and service were all top-notch. It’s hard to find places that get all of these right — they nailed it!",
  },
];

const Testimonial = () => {
  const swiperRef = useRef(null);
  const intervalRef = useRef(null);

  // Function to start autoplay
  const startAutoPlay = () => {
    clearInterval(intervalRef.current); // Clear any existing timer

    intervalRef.current = setInterval(() => {
      const swiper = swiperRef.current?.swiper;
      if (swiper) {
        const nextIndex = (swiper.activeIndex + 1) % testimonials.length;
        swiper.slideTo(nextIndex);
      }
    }, 5000); // 5 seconds
  };

  // Start autoplay on mount
  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Reset autoplay on navigation interaction
  const handleManualNavigation = (direction) => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    if (direction === "prev") {
      swiper.slidePrev();
    } else if (direction === "next") {
      swiper.slideNext();
    }

    startAutoPlay(); // ✅ Reset timer
  };

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 py-20 text-center font-quicksand">
      <SectionTitle heading="TESTIMONIALS" subheading="What Our Clients Say" />

      <Swiper
        ref={swiperRef}
        modules={[Navigation, EffectFade]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        effect="fade"
        loop
        className="mt-5 testimonial-swiper"
        onTouchStart={startAutoPlay}         // ✅ Resets when swipe begins
        onSlideChange={startAutoPlay}        // ✅ Resets on any slide change (even programmatic)
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col justify-center items-center h-[360px] px-4">
              <Rating
                readonly
                initialRating={item.rating}
                fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                emptySymbol={<FaRegStar className="text-gray-400 text-xl" />}
                className="mb-4"
              />
              <FaQuoteLeft className="text-4xl text-black mb-4" />
              <p className="text-gray-700 text-base md:text-lg max-w-2xl leading-relaxed">
                {item.review}
              </p>
              <h4 className="text-yellow-600 font-bold mt-4 text-lg uppercase tracking-wide">
                {item.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons (same styling) */}
        <div
          className="swiper-button-prev"
          onClick={() => handleManualNavigation("prev")}
        ></div>
        <div
          className="swiper-button-next"
          onClick={() => handleManualNavigation("next")}
        ></div>
      </Swiper>
    </section>
  );
};

export default Testimonial;

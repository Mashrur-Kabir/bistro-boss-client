import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Categories = () => {
  const slides = [
    { image: slide1, label: "SALADS" },
    { image: slide2, label: "PIZZAS" },
    { image: slide3, label: "SOUPS" },
    { image: slide4, label: "DESSERTS" },
    { image: slide5, label: "DRINKS" },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 mt-20 font-quicksand">
      <section>
        <SectionTitle
        subheading={"From 11:00am to 10:00pm"}
        heading={"Order Online"}
        >
        </SectionTitle>
        <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
        >
            {Array.from({ length: Math.ceil(slides.length / 4) }, (_, i) => (
            <SwiperSlide key={i}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {slides.slice(i * 4, i * 4 + 4).map((item, index) => (
                    <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-md"
                    >
                    <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover"
                    />
                    <div className="absolute bottom-4 left-0 w-full text-center">
                        <p className="text-white font-tang text-2xl font-semibold drop-shadow-md tracking-wide">
                        {item.label}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Categories;

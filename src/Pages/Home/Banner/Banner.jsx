import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';

const images = [img1, img2, img3, img4, img5, img6];

const Banner = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto">
    <style>
    {`
        .carousel .thumbs-wrapper {
        display: flex;
        justify-content: center;
        }

        .carousel .thumbs {
        display: flex;
        justify-content: center;
        gap: 6px;
        }

        .carousel .thumb {
        height: 50px;
        border-radius: 6px;
        overflow: hidden;
        margin: 0;
        }

        .carousel .thumb img {
        height: 100%;
        width: 100%;
        }
    `}
    </style>

      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={true}
        showStatus={false}
        showIndicators={true}
        stopOnHover={false}
        transitionTime={600}
        swipeable={true}
        dynamicHeight={false}
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="object-cover w-full h-[60vh] md:h-[85vh]" />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;

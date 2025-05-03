import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"; // use your actual image path

const Featured = () => {
  return (
    <section
      className="font-quicksand relative bg-fixed bg-center bg-cover text-white py-20"
      style={{ backgroundImage: `url(${featuredImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4">
        <SectionTitle heading="FROM OUR MENU" subheading="Check it out" />

        <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
          {/* Left Image */}
          <img
            src={featuredImg}
            alt="Featured"
            className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
          />

          {/* Right Content */}
          <div className="md:w-1/2 space-y-3 text-white">
            <p className="text-sm">March 20, 2023</p>
            <h3 className="text-2xl font-semibold">WHERE CAN I GET SOME?</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>

            {/* Read More Button */}
            <button className="relative mt-4 inline-block text-sm uppercase font-semibold group">
                {/* Text */}
                <span className="relative z-10 text-white group-hover:text-yellow-500 transition-colors duration-300">
                    Read More
                </span>
                {/* Top underline: white → shrinks */}
                <span className="absolute left-0 bottom-[-3px] w-full h-[1.5px] bg-white transition-all duration-300 group-hover:bg-yellow-500 group-hover:w-0" />
                {/* Bottom underline: yellow → grows */}
                <span className="absolute right-0 bottom-[-4px] w-0 h-[3px] bg-yellow-500 transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;

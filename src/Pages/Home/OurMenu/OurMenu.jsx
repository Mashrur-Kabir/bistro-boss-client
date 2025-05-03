import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const OurMenu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data.slice(0, 6)); // show only first 6 items
      });
  }, []);

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 mt-20 font-quicksand">
      <SectionTitle heading="FROM OUR MENU" subheading="Check it out" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {menu.map((item, index) => (
          <div key={item._id || index} className="flex items-start gap-4">
            {/* Left Icon (circle with quarter shape) */}
            <div className="w-16 h-16 shadow-gray-600 shadow-lg rounded-[999px] rounded-tl-none overflow-hidden shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-3xl font-tang md:text-4xl tracking-wide">
                  {item.name} <span className="text-gray-400">---------------------</span>
                </h3>
                <p className="text-yellow-500 font-bold text-sm md:text-base">${item.price}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.recipe}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <NavLink
            to="/showallmenu"
            className="relative inline-block text-sm uppercase font-semibold text-black group transition-colors duration-500 hover:text-yellow-500"
            >
            View Full Menu

            {/* Black underline (default) */}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-500 group-hover:w-0"></span>

            {/* Yellow underline (appears on hover) */}
            <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-yellow-500 transition-all duration-500 group-hover:w-full"></span>
        </NavLink>
      </div>
    </section>
  );
};

export default OurMenu;

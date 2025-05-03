import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {

  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 my-20 font-quicksand">
      <SectionTitle heading="CHEF RECOMMENDS" subheading="Should Try" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {popular.map((item) => (
          <div
            key={item._id}
            className="bg-[#F3F3F3] rounded-lg overflow-hidden shadow-sm flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center flex-1 flex flex-col justify-between">
              <h3 className="text-4xl font-bold mb-2 font-tang">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.recipe}</p>

              {/* Button */}
              <button className="relative mx-auto w-fit text-sm text-yellow-600 font-semibold uppercase tracking-wide group overflow-hidden px-4 py-2 border border-yellow-600 rounded-md transition-all duration-500 hover:text-white">
                <span className="absolute inset-0 bg-yellow-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                <span className="relative z-10">Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;

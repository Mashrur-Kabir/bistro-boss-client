import { Link } from "react-router-dom";

const CategoryMenu = ({ items = [], category }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {items.map((item) => (
                <div key={item._id} className="flex items-start gap-4">
                    {/* Left Icon */}
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
                        {item.name}
                        <span className="text-gray-400"> ------------------</span>
                        </h3>
                        <p className="text-yellow-500 font-bold text-sm md:text-base">
                        ${item.price}
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.recipe}</p>
                    </div>
                </div>
                ))}
            </div>
            <button className="mt-12 relative mx-auto w-fit text-sm text-yellow-600 font-semibold uppercase tracking-wide group overflow-hidden px-4 py-2 border border-yellow-600 rounded-md transition-all duration-500 hover:text-white">
                <span className="absolute inset-0 bg-yellow-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                <Link to={`/order/${category}`} className="relative z-10">Order Now</Link>
            </button>
        </div>
    );
  };
  
  export default CategoryMenu;

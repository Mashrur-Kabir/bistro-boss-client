import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cover from "../Shared/Cover/Cover";
import orderBanner from "../../assets/shop/banner2.jpg";
import useMenu from "../../Hooks/useMenu";
import './Order.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Title } from "react-head";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

const Order = () => {
  const [menu] = useMenu();
  // Rename the variable for clarity
  const { categories: categoryParam } = useParams();
  const initialIndex = categories.indexOf(categoryParam);
  const [tabIndex, setTabIndex] = useState(initialIndex === -1 ? 0 : initialIndex);

  const filteredItems = categories.map((category) =>
    menu.filter((item) => item.category === category)
  );

  //data by axios
  const axiosSecure = useAxiosSecure();

  // getting user info for adding user-specific food on carts
  const {user} = useAuth();

  const navigate = useNavigate(); // direct to /login if user not logged in
  const location = useLocation();

  //refetch
  const [, refetch] = useCart(); 

  // adding selected items to cart
  const handleAddToCart = (food) => {
    if (user && user.email) {
      Swal.fire({
        title: "Add to Cart?",
        text: `Add "${food.name}" to your cart?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#d97706",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then((result) => {
        if (result.isConfirmed) {
          // Send cart item to DB
          const cartItem = {
            menuId: food._id,
            email: user.email,
            name: food.name,
            menuImage: food.image,
            price: food.price
          }
          //console.log(cartItem)
          axiosSecure.post('/carts', cartItem) //posting added carts via backend
          .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
              Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                text: `"${food.name}" has been successfully added.`,
                timer: 1100,
                showConfirmButton: false,
              });
              //refetch the cart to update cart item count. when new user will log in and add to cart, this will update the count on cart instantly
              refetch();
            }
          })
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Adding Failed",
        text: "Please login to proceed",
        confirmButtonColor: "#d97706",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}}); // direct to login page with location
        }
      });
    }
  };

  return (
    <div className="font-quicksand mb-20">
      <Title>Bistro Boss | Order</Title>
      <Cover
        image={orderBanner}
        title="OUR MENU"
        subtitle="Would you like to try a dish?"
        containerClass="mb-24 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[620px]"
        middleContentClass="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[620px] xl:min-h-[670px]"
        overlayClass="px-40 py-20 md:px-64 md:py-32"
        titleClass="text-4xl md:text-6xl"
        subtitleClass="text-sm md:text-lg tracking-wide"
        strength={600}
        blur={{ min: -20, max: 20 }}
      />

      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        selectedTabClassName="tab-active"
      >
        <TabList className="flex justify-center space-x-8 mb-12 border-b-2 border-gray-200">
          {categories.map((cat, idx) => (
            <Tab
              key={idx}
              className="uppercase text-sm font-semibold tracking-wider relative pb-2 cursor-pointer text-gray-900 hover:text-yellow-500 transition-colors duration-300 tab-item focus:outline-none"
            >
              {cat}
            </Tab>
          ))}
        </TabList>

        {filteredItems.map((items, i) => (
          <TabPanel key={i}>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 animate-fade-in">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-sm font-semibold">
                      ${item.price}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <h3 className="text-4xl md:text-[2.6rem] font-bold text-center mb-1 font-tang">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {item.recipe}
                    </p>
                    <button onClick={() => handleAddToCart(item)} className="mt-6 relative mx-auto w-fit text-sm text-yellow-600 font-semibold uppercase tracking-wide group overflow-hidden px-4 py-2 border border-yellow-600 rounded-md transition-all duration-500 hover:text-white">
                      <span className="absolute inset-0 bg-yellow-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                      <span className="relative z-10">Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>

    </div>
  );
};

export default Order;

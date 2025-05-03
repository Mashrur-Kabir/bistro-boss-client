import { FaWallet, FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa";

const DashboardHome = () => {
  const cards = [
    { value: 1000, label: "Revenue", bg: "from-purple-500 to-pink-500", icon: <FaWallet size={50} /> },
    { value: 1500, label: "Customers", bg: "from-yellow-400 to-orange-300", icon: <FaUsers size={50} /> },
    { value: 103, label: "Products", bg: "from-pink-400 to-rose-300", icon: <FaBoxOpen size={50} /> },
    { value: 500, label: "Orders", bg: "from-sky-400 to-blue-300", icon: <FaShoppingCart size={50} /> },
  ];

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 font-tang">Hi, Welcome Back!</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.bg} text-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105`}
          >
            <div className="flex items-center gap-4">
              <div className="text-white">{card.icon}</div>
              <div>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-lg">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-center font-semibold mb-4">Sales Overview (Bar Chart)</p>
          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-600">
            Bar Chart Placeholder
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-center font-semibold mb-4">Category Distribution (Pie Chart)</p>
          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-600">
            Pie Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

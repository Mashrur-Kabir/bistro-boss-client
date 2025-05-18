import { FaWallet, FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetching admin stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Fetching order stats for charts
  const { data: chartdata = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  const cards = [
    {
      value: stats.revenue,
      label: "Revenue",
      bg: "from-purple-500 to-pink-500",
      icon: <FaWallet size={50} />,
    },
    {
      value: stats.users,
      label: "Customers",
      bg: "from-yellow-400 to-orange-300",
      icon: <FaUsers size={50} />,
    },
    {
      value: stats.menuItems,
      label: "Products",
      bg: "from-pink-400 to-rose-300",
      icon: <FaBoxOpen size={50} />,
    },
    {
      value: stats.orders,
      label: "Orders",
      bg: "from-sky-400 to-blue-300",
      icon: <FaShoppingCart size={50} />,
    },
  ];

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 font-tang">
        Hi, Welcome Back! {user?.displayName}
      </h1>

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
        {/* Bar Chart */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-center font-semibold mb-10">Items Sold (Bar Chart)</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartdata} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#8884d8">
                <LabelList dataKey="quantity" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-center font-semibold mb-10">Category Distribution (Pie Chart)</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartdata}
                dataKey="quantity"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {chartdata.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

/*
The aggregate pipeline is a powerful feature in MongoDB used for data aggregation—meaning you can process and transform documents in a collection to produce computed results, summaries, or filtered outputs.

🧠 Think of it like this:
It's a sequence of stages (like filters, transformers, counters, etc.), where each stage processes the data and passes it on to the next.
📦 Example Use Case:
You have a orders collection, and you want to calculate total revenue per customer.

🔧 Pipeline Example:
db.orders.aggregate([
  { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } },
  { $sort: { totalSpent: -1 } }
])

🔍 Common Stages:
$match	Filters documents (like a WHERE clause)
$group	Groups documents by a key (like SQL GROUP BY)
$project	Reshapes documents (like SELECT fields)
$sort	Sorts the results
$limit	Limits the number of results
$lookup	Joins another collection
$unwind	Deconstructs arrays into individual docs

In short: the aggregate pipeline allows you to create complex queries for reporting, analytics, and transformations—all inside MongoDB without fetching everything to the app.
*/
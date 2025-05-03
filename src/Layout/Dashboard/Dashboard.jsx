import { Outlet } from "react-router-dom";
import Sidebar from "../../Pages/Shared/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 font-quicksand h-screen">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
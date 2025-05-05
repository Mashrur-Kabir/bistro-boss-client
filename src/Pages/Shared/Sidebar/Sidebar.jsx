import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaHome,
  FaUtensils,
  FaBook,
  FaUsers,
  FaList,
  FaShoppingCart,
  FaEnvelope,
  FaHotel,
  FaCartArrowDown
} from 'react-icons/fa';
import { RiHome3Fill } from "react-icons/ri";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdOutlinePreview, MdOutlinePayment } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAdmin from '../../../Hooks/useAdmin';

const SidebarLink = ({ to, icon, label, isSidebarOpen }) => (
  <NavLink
    to={to}
    end    // ← ensures exact-match only
    className={({ isActive }) =>
      `flex items-center ${
        isSidebarOpen ? 'justify-start px-4' : 'justify-center px-0'
      } py-2 transition-all duration-300 cursor-pointer group rounded-full
        ${isActive ? 'bg-orange-600 text-white' : 'text-white hover:bg-orange-600'}`
    }
  >
    {({ isActive }) => (
      <>
        <div
          className={`text-lg transition-all duration-300 ${
            isActive ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]' : ''
          }`}
        >
          {icon}
        </div>
        {isSidebarOpen && (
          <span className="ml-3 group-hover:translate-x-2 transition-transform whitespace-nowrap">
            {label}
          </span>
        )}
      </>
    )}
  </NavLink>
);

const Sidebar = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const [isAdmin] = useAdmin();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <div
        className={`bg-orange-700 text-white min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } p-4 flex flex-col`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`mb-6 self-end text-white hover:text-yellow-300 transition-all duration-200 ${
            isSidebarOpen ? '' : 'mx-auto'
          }`}
        >
          <FaBars />
        </button>

        {/* Animated Bistro Text */}
        <div
          className={`transition-all duration-500 ${
            isSidebarOpen ? 'h-[60px] mb-6' : 'h-0 mb-0'
          } overflow-hidden`}
        >
          <div
            className={`transition-all duration-500 transform ${
              isSidebarOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-14 delay-0'
            }`}
          >
            <h2 className="text-2xl font-bold font-varcon">
              BISTRO BOSS
              <br />
              <span className="text-sm font-normal">RESTAURANT</span>
            </h2>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 space-y-2">
          {
            isAdmin ?
            <>
                <SidebarLink
                  to="dashboardhome"
                  icon={<FaHome />}
                  label="Admin Home"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="managecart"
                  icon={<FaUtensils />}
                  label="Manage Items"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="additems"
                  icon={<HiClipboardDocumentList className='text-xl' />}
                  label="Add Items"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="bookings"
                  icon={<FaBook />}
                  label="Manage Bookings"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="allusers"
                  icon={<FaUsers />}
                  label="All Users"
                  isSidebarOpen={isSidebarOpen}
                />
            </>
            :
            <>
                <SidebarLink
                  to="dashboarduser"
                  icon={<FaHome />}
                  label="User Home"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="reservation"
                  icon={<FaHotel />}
                  label="Reservation"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="cartitems"
                  icon={<FaCartArrowDown />}
                  label="My Cart"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="addreview"
                  icon={<MdOutlinePreview className='text-xl'/>}
                  label="Add Review"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="mybooking"
                  icon={<FaBook />}
                  label="My Booking"
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink
                  to="payment"
                  icon={<MdOutlinePayment />}
                  label="Payment"
                  isSidebarOpen={isSidebarOpen}
                />
            </>
          }

          <hr className="border-orange-400 my-4" />

          {/* common/shared */}
          <SidebarLink
            to="/"
            icon={<RiHome3Fill />}
            label="Home"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarLink
            to="menu"
            icon={<FaList />}
            label="Menu"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarLink
            to="shop"
            icon={<FaShoppingCart />}
            label="Shop"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarLink
            to="contact"
            icon={<FaEnvelope />}
            label="Contact"
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

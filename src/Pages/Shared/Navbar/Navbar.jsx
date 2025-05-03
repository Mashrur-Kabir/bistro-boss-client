import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Navbar.css';
import { AuthContext } from '../../../Providers/AuthProvider';
import useCart from '../../../Hooks/useCart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have successfully logged out.',
          confirmButtonText: 'Close',
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          backdrop: true,
        });
      })
      .catch((err) => {
        console.error('Logout error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: err.message || 'Something went wrong.',
          confirmButtonText: 'Close',
        });
      });
  };
  
   
  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/dashboard', label: 'DASHBOARD' },
    { to: '/showallmenu', label: 'MENU' },
    { to: '/order/salad', label: 'ORDER' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white font-quicksand">
      <div className="flex justify-between items-center px-4 md:px-12 py-4 backdrop-blur-sm bg-black/10">
        {/* Logo */}
        <div className="text-left">
          <h1 className="text-2xl leading-5 font-varcon">BISTRO BOSS</h1>
          <p className="text-xs tracking-[0.3em]">RESTAURANT</p>
        </div>

        {/* Hamburger Menu */}
        <div
          className={`md:hidden text-2xl cursor-pointer transition-transform duration-200 ${
            isOpen ? 'scale-90' : 'scale-100'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible
            flex-col md:flex md:flex-row md:items-center md:space-x-6 text-[12px] font-semibold
            absolute md:static top-16 left-0 w-full md:w-auto bg-[#000000cc] md:bg-transparent
            px-6 py-4 md:py-0 md:px-0 ${
              isOpen ? 'flex max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:opacity-100 md:flex'
            }`}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `relative block md:inline px-2 md:px-3 py-2 md:py-1 transition duration-300 ${
                  isActive
                    ? 'text-yellow-400 font-bold text-[15px]'
                    : 'text-white/70 hover:text-white'
                }`
              }
            >
              <span className="hover-underline-animation">{label}</span>
            </NavLink>
          ))}

          {/* LOGIN or LOGOUT Link */}
          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `relative block md:inline px-2 md:px-3 py-2 md:py-1 transition duration-300 ${
                  isActive
                    ? 'text-yellow-400 font-bold text-[15px]'
                    : 'text-white/70 hover:text-white'
                }`
              }
            >
              <span className="hover-underline-animation">LOGIN</span>
            </NavLink>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="block w-full md:w-auto text-left md:text-center text-white/70 hover:text-white px-2 md:px-3 py-2 md:py-1 text-[12px] font-semibold transition duration-300"
            >
              <span className="hover-underline-animation">LOGOUT</span>
            </button>
          )}

          {/* Cart + Icons */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="relative cursor-pointer">
              <NavLink to='dashboard/cartitems'><FaShoppingCart className="text-xl hover:text-white transition" /></NavLink>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                +{cart.length}
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <FaUserCircle className="text-2xl cursor-pointer hover:text-white transition" />
              <span>{user?.displayName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

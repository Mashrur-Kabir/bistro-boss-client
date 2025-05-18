import { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/login.json";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from "react-simple-captcha";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss"; // Optional: for better styling
import "./Login.css";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Title } from "react-head";
import SignInSocial from "../../Components/SignInSocial/SignInSocial";

const Login = () => {
  const [animationKey, setAnimationKey] = useState(Date.now());
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"; //locations from where the users were directed to login page

  // Load CAPTCHA on mount
  useEffect(() => {
    loadCaptchaEnginge(6); // 6 character captcha
  }, []);

  // Replay animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //context
  const {signIn} = useContext(AuthContext);

  //handle login--------------------------------------------------
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
  
    if (!validateCaptcha(captchaInput)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Captcha",
        text: "Please enter the correct text from the image.",
        confirmButtonColor: "#d97706",
      });
      setCaptchaInput("");
      return;
    }
  
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user)
        Swal.fire({
          icon: "success",
          title: "Welcome Back",
          text: "Login successful!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(from, {replace: true}); // redirect
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonColor: "#d97706",
        });
      });
  
    form.reset();
    setCaptchaInput("");
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 px-4 font-quicksand">
      <Title>Bistro Boss | Login</Title>
      <div className="flex flex-col md:flex-row items-center justify-center w-2/3 md:w-full max-w-4xl p-8 rounded-xl bg-white shadow-2xl animate-fade-in-up border border-yellow-300">

        {/* Lottie Animation */}
        <div className="hidden md:flex w-1/2 pr-8 justify-center items-center overflow-hidden">
          <Lottie
            key={animationKey}
            animationData={animationData}
            loop={false}
            className="transform scale-125 md:scale-[2]"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-yellow-600 mb-6 font-tang">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="email here"
                className="w-full px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="password here"
                className="w-full px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                required
              />
            </div>

            {/* CAPTCHA */}
            <div>
              <LoadCanvasTemplate />
              <input
                type="text"
                placeholder="Enter the text above"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white font-semibold bg-yellow-500 rounded-md btn-3d hover:bg-yellow-600 active:scale-95 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* signin with google */}
          <SignInSocial></SignInSocial>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link to='/signup' className="text-yellow-600 underline cursor-pointer">Sign up</Link> or go to <Link to='/' className="text-yellow-600 underline cursor-pointer">home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

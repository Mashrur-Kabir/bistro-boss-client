import { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/register.json";
import "../Login/Login.css";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "react-head";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import "sweetalert2/src/sweetalert2.scss"; // (optional but enhances style)
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SignInSocial from "../../Components/SignInSocial/SignInSocial";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [animationKey, setAnimationKey] = useState(Date.now());
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(name, photoURL)
        .then(()=> {
            const userInfo = { //for user info in database. check user api in backend
              name: name,
              email: email,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
              if(res.data.insertedId){
                console.log("user profile info updated and user added to db");
                Swal.fire({
                    icon: "success",
                    title: "Account Created",
                    text: `Welcome, ${name}!`,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
              }
            })
        })
        form.reset();
        navigate('/') //if profile details are not showing in UI: dont navigate like here. bring logout from your context provider. logout and inside the .then() of logout navigate to /login page.   
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed, Try Again",
          text: error.message,
          confirmButtonColor: "#d97706",
        });
        form.reset();
      });
    console.log("Registration attempted by:", name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 px-4 font-quicksand">
      <Title>Bistro Boss | Sign Up</Title>
      <div className="flex flex-col md:flex-row items-center justify-center w-2/3 md:w-full max-w-4xl p-8 rounded-xl bg-white shadow-2xl animate-fade-in-up border border-yellow-300">

        {/* Lottie Animation */}
        <div className="hidden md:flex w-1/2 pr-8 justify-center items-center overflow-hidden">
          <Lottie
            key={animationKey}
            animationData={animationData}
            loop={false}
            className="transform scale-125 md:scale-[1.75]"
          />
        </div>

        {/* Registration Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-yellow-600 mb-6 font-tang">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="your full name"
                className="w-full px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                required
              />
            </div>

            {/* PicURL */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Photo</label>
              <input
                name="photoURL"
                type="text"
                placeholder="PhotoURL"
                className="w-full px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                required
              />
            </div>

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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white font-semibold bg-yellow-500 rounded-md btn-3d hover:bg-yellow-600 active:scale-95 transition-all duration-300"
            >
              Register
            </button>
          </form>

          {/* signup with google */}
          <SignInSocial label="Sign up with Google" ></SignInSocial>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link to='/login' className="text-yellow-600 underline cursor-pointer">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

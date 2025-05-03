import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SignInSocial = ({ label = "Sign in with Google" }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"; //locations from where the users were directed to login page

    //for google signin
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic() //because it doesnt need to be secured

    //handle google signin-----------------------------------------
    const handleGoogleSignIn = () => {
    googleSignIn()
        .then(result => {
        console.log(result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName
        };
        axiosPublic.post('/users', userInfo)
            .then(res => {
            console.log(res.data);
            Swal.fire({
                icon: "success",
                title: "Welcome Back",
                text: "Login successful!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            navigate(from, { replace: true }); 
            });
        })
        .catch(error => {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.message,
            confirmButtonColor: "#d97706",
        });
        });
    };

    return (
        <div>
            {/* signin with google */}
            <div onClick={handleGoogleSignIn} className="mt-8 text-center">
                <div className="flex items-center justify-center mb-6">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 font-medium text-sm">
                    or
                </span>
                <div className="flex-grow border-t border-gray-300" />
                </div>

                <button className="group relative w-56 h-12 border border-gray-400 rounded-md shadow-md overflow-hidden transition-all duration-300">
                {/* Icon wrapper to animate position */}
                <div
                    className="absolute left-6 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2 z-10"
                >
                    <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                    />
                </div>

                {/* Text fades out on hover */}
                <span className="text-gray-700 font-semibold transition-opacity duration-300 group-hover:opacity-0 ml-12">
                    {label}
                </span>
                </button>
            </div>
        </div>
    );
};

export default SignInSocial;
import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

// It's just a simple Axios instance that points to your backend.

// No token, no interceptors.

// Use this for routes like:
// Login
// Register
// Public data fetching
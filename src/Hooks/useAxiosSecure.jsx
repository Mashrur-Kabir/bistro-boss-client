import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const {logOut} = useAuth();

    //request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use((config) => { //config is the request object — it contains details like URL, headers, method, etc.
        const token = localStorage.getItem('access-token')
        console.log("request stopped by interceptor", token)
        config.headers.authorization = `Bearer ${token}`;
        return config; 
    }, function (error){
        //do something with request error
        return Promise.reject(error)
    });

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async(error) => {
        const status = error.response.status;
        //console.log('status error in the interceptor', status)
        //for 401 or 403 logout the user and move them to the login page
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;


//-----------------------------------------------------------------------------------
// You call axiosSecure.get('/users')
// Axios → sees the interceptor
// Interceptor runs → adds Authorization header 
// (config.headers.authorization = 'Bearer eyJ...';) from local storage.
// Interceptor returns config
// Axios → proceeds to send the HTTP request with the updated config ( updated because the header above included). config is the request object used by Axios before the request is sent. req is the request object received by Express on the server side.

// On the backend, Express receives that HTTP request.
// It creates a req object (request object).
// All headers from the client request (like Authorization) are now available inside:
// 'req.headers.authorization'
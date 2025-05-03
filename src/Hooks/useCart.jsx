import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    // tan stack query load (no need to handle useeffect or state)
    const { refetch, data: cart = [] } = useQuery({ //after updates or deletes on data refetch will go to db again to fetch the updated data
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`) //'carts' not 'cart'. be sure to match with the route in backend. also, email for finding carts based on user email. check backend
            return res.data; 
        }
    }) 
    return [cart, refetch] // return cart data fetched from backend
};

export default useCart;
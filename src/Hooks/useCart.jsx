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

/* Tanstack is applicable for datas that are---
1. Queryable
It means you can ask for the data anytime.
Example: "Get me all the menu items."

2. Cacheable
Once you get the data, TanStack Query remembers it.
If you come back to the page, it doesn’t call the server again immediately — it shows you the old (cached) data first.

3. Refetchable
You can ask TanStack Query to get fresh data from the server.
Example: if a new menu item is added, you can tell it to refetch.
*/
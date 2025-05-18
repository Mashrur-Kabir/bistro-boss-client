import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

//LOADING ADMIN DATA HERE
const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

     const {data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin;
        }
     })
     return [isAdmin, isAdminLoading];
};

export default useAdmin;

/**
enabled: !loading?

You're getting user and loading from your useAuth() hook.
If loading is true, that means the authentication state is still being determined — so user might be undefined or not ready yet.
You don’t want to make an API call with an undefined email, like /users/admin/undefined.
'So enabled: !loading' ensures that the query waits until the authentication state is ready (i.e., loading === false).
Then it safely makes the API call with a valid user.email.
 */
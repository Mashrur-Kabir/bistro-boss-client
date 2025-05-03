import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="custom-spinner"></div>
        </div>
        );
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace />;
};

export default AdminRoute;

/*
PrivateRoute: hides pages from users who aren’t logged in
AdminRoute: hides pages or UI elements from users who aren’t admins
 */
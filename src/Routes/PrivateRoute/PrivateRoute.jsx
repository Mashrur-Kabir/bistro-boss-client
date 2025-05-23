import { Navigate, useLocation } from "react-router-dom";
import "./Spinner.css"; // custom CSS for spinner
import useAuth from "../../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="custom-spinner"></div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{from: location}} replace />;
};

export default PrivateRoute;

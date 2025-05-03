import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home/Home";
import ShowAllMenu from "../Pages/ShowAllMenu/ShowAllMenu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import CartItems from "../Pages/CartItems/CartItems";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AddItem from "../Pages/AddItem/AddItem";
import AdminRoute from "./AdminRoute/AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'showallmenu',
                element: <PrivateRoute><ShowAllMenu></ShowAllMenu></PrivateRoute>
            },
            {
                path: 'order/:categories',
                element: <Order></Order>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            //admin routes
            {
                path: 'dashboardhome',
                element: <AdminRoute><DashboardHome></DashboardHome></AdminRoute>
            },
            {
                path: 'cartitems',
                element: <CartItems></CartItems>
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'additems',
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            }
        ]
    }
]);

/** page level security
 * do not show unauthorized person routes or ui or any other sensitive information that only admin can access
 * even if they type the link on browser to get access, use AdminRoute to protect that route
 * do not allow user to access the api. check admin in the server too. verifyAdmin. because even if you cant enter but get the link, you can build a custom website to call that api, which is dangerous.
 * 
 */
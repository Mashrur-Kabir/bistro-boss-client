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
import AllUsers from "../Pages/AllUsers/AllUsers";
import AddItem from "../Pages/AddItem/AddItem";
import AdminRoute from "./AdminRoute/AdminRoute";
import ManageCart from "../Pages/ManageCart/ManageCart";
import UpdateCart from "../Pages/ManageCart/UpdateCart";
import Payment from "../Pages/Payment/Payment";
import CartItems from "../Pages/CartItems/CartItems";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import AdminDashboard from "../Pages/DashboardHome/AdminDashboard";

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
                element: <ShowAllMenu></ShowAllMenu>
            },
            {
                path: 'order/:categories',
                element: <PrivateRoute><Order></Order></PrivateRoute>
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
                path: 'admindashboard',
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
            },
            {
                path: 'managecart',
                element: <AdminRoute><ManageCart></ManageCart></AdminRoute>
            },
            {
                path: 'updatecart/:id',
                element: <AdminRoute><UpdateCart></UpdateCart></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`, {
                    method: 'GET',
                    headers: {
                      authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                }) //This will send the token correctly so verifyToken and verifyAdmin can authorize the request in the backend
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'additems',
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },

            //user routes
            {
                path: 'payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: 'cartitems',
                element: <PrivateRoute><CartItems></CartItems></PrivateRoute>
            },
            {
                path: 'paymenthistory',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
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
import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import ContactUs from "../Pages/Home/ContactUs";
import Products from "../Pages/Home/Products";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
      children : [
        {
            path: "/",
            element : <Home></Home>
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/contact",
          element: <ContactUs />
        }
      ]
    },
    // Add more routes here...
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
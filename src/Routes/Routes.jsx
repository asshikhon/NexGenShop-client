import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUp/SignUp";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
      children : [
        {
            path: "/",
            element : <Home></Home>
        }
      ]
    },
    // Add more routes here...
    {
      path: "/signup",
      element: <SignUp />
    }
  ]);
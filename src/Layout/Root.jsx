import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";


const Root = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-273px)]">
        <Outlet></Outlet>
      </div>
            <Footer />
        </div>
    );
};

export default Root;
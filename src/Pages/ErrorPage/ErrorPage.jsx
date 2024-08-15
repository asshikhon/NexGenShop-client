import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";
import errorLogo from "../../assets/images/error.png"
import errorImg from "../../assets/images/404.jpg"

const ErrorPage = () => {
const error = useRouteError();

    return (
        <div>

<Helmet>
<link rel="icon" type="image/svg+xml" href={errorLogo} />
<title>Error</title>
</Helmet>
            
            <p>{error.statusText || error.message}</p>

            {
error.status === 404 && <div className="flex flex-col items-center mt-12 md:mt-16 lg:mt-24 justify-center space-y-6">
<div className="w-[40%] ">
<img className="rounded-xl" src={errorImg} alt="" />
</div>
  
   <Link to="/"> <button className="btn text-xl font-bold border border-red-600 rounded-lg text-red-600 py-2 px-4 ">Back Home</button></Link>
</div>

            }
        </div>
    );
};

export default ErrorPage;
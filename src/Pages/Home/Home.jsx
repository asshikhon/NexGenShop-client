import { Helmet } from "react-helmet-async";
// import logoHome from "../../assets/images/home.png";
import logoHome from "../../assets/images/home.png";
import TopRatingProducts from "../Home/TopRatingProducts"

const Home = () => {
    return (
        <div>
            <Helmet>
        <link rel="icon" type="image/svg+xml" href={logoHome} />
        <title>NextGenShop || Home</title>
      </Helmet>
           <TopRatingProducts />
        </div>
    );
};

export default Home;
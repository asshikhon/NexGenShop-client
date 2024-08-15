import { Helmet } from "react-helmet-async";
// import logoHome from "../../assets/images/home.png";
import logoHome from "../../assets/images/home.png";

const Home = () => {
    return (
        <div>
            <Helmet>
        <link rel="icon" type="image/svg+xml" href={logoHome} />
        <title>NextGenShop || Home</title>
      </Helmet>
            <h2 className="text3xl">This is Home</h2>
        </div>
    );
};

export default Home;
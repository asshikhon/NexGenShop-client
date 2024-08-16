/* eslint-disable no-unused-vars */
 
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const FeaturedSurvey = () => {
  const { loading: authLoading } = useAuth();
  const axiosCommon = useAxiosCommon();

  const [sort] = useState("top_DESC"); // Default sorting

  const fetchTopProducts = async ({ queryKey }) => {
    const [sort] = queryKey;
    const { data } = await axiosCommon.get(
      `${import.meta.env.VITE_API_URL}/products?sort=${sort}`
    );
    return data;
  };

  const {
    data: topProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["topProducts", sort],
    queryFn: fetchTopProducts,
    keepPreviousData: true,
  });

console.log(topProducts);

  if (isLoading ) {
    return <LoadingSpinner className="text-center h-screen mx-auto block" />;
  }

//   if (isError) {
//     return <div>Error fetching Products: {error.message}</div>;
//   }

  return (
    <div className="container mx-auto my-12 md:mt-16 lg:mt-24">
      <div className="text-center mb-12 ">
        <h2 className="text-5xl font-bold mb-4 text-[#3C6D71]">Top Rating Products</h2>
        <p className="text-lg font-semibold w-[70%]  text-center block mx-auto">
        Uncover top-rated products chosen by real customers and experts, ensuring you get the best value for your money.
        </p>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {topProducts.map((product, index) => (
            <div
            key={index}
            className="w-full mt-12 px-8 py-4 rounded-lg bg-gray-800"
          >
            <div className="flex justify-center -mt-20  md:justify-end">
              <img
                className="object-cover w-44 h-44 border-2 border-[#3C6D71] rounded-full "
                alt="Testimonial avatar"
                src={product?.image}
              />
            </div>
            <h2 className="mt-2 text-xl mb-2 font-semibold text-gray-800 dark:text-white md:mt-0">
              Name : {product?.product_name}
            </h2>
            <h2 className="mt-  font-semibold text-gray-800 dark:text-white md:mt-0">
              Brand : {product?.brand_name}
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-200">
              Category : {product?.category}
            </p>
        
            <p className="mt-4 text-green-500 text-lg font-bold ">
              Price : {product?.price}$
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-200 flex items-center gap-1">
                  Ratings : {product?.ratings}  <span className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FBBF24" className="w-4 h-5">
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.399 8.158L12 18.897l-7.333 3.848 1.399-8.158L.133 9.21l8.2-1.192z"/>
    </svg>

 
</span>

                </p>
                <p className="mt-2 text-[#79cad1] ">
    Creation Date: {new Date(product?.creation_date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",  // use local time if needed
    })}
</p>

                <p className="mt-2 text-gray-600 dark:text-gray-200">
                  Description : {product?.description} 
                </p>

            {/* <Link
              to={`/single/${product._id}`}
              className="flex justify-end mt-4"
            >
              <button
                className=" btn text-lg font-medium text-white bg-orange-500 border-0 "
                tabIndex="0"
                role="link"
              >
                Details
              </button>
            </Link> */}
          </div>

          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link
          to="/products"
          className="btn h-auto w-[20%] bg-[#3C6D71] border-0 text-center text-white text-lg flex justify-center items-center"
        >
          See All products
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSurvey;

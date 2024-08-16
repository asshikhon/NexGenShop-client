import { Helmet } from "react-helmet-async";
import logo from "../../assets/images/all.png";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../Shared/LoadingSpinner";

const Products = () => {
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [filter1, setFilter1] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const axiosCommon = useAxiosCommon();

  // Fetch surveys data
  const {
    data: surveys = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["surveys", currentPage, itemsPerPage, filter,filter1, sort, search],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/all-surveys", {
        params: { page: currentPage, size: itemsPerPage, filter,filter1, sort, search },
      });
      return data.surveys;
    },
  });

  // Fetch count data
  const { data: countData } = useQuery({
    queryKey: ["count", filter,filter1, search],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/products-count", {
        params: { filter,filter1, search },
      });
      return data.count;
    },
  });

  useEffect(() => {
    if (countData !== undefined) {
      setCount(countData);
    }
  }, [countData]);

  // Calculate the number of pages
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
    setFilter1("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <Helmet>
          <link rel="icon" type="image/svg+xml" href={logo} />
          <title>NextGenShop || All Products</title>
        </Helmet>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          {/* Filter dropdown */}
          {/* 1 filter */}
          <div>
            <select
              onChange={(e) => {
                setFilter1(e.target.value);
                setCurrentPage(1);
              }}
              value={filter1}
              name="brand_name"
              id="brand_name"
              className="border p-4 rounded-lg"
            >
              <option value="">Filter By Brand </option>
           
              <option value="Adidas">Adidas</option>
              <option value="Apple">Apple</option>
              <option value="Manduka">Manduka</option>
              <option value="Nike">Nike</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
           
            </select>
          </div>
          {/* 2 filter */}
          <div>
            <select
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              value={filter}
              name="category"
              id="category"
              className="border p-4 rounded-lg"
            >
              <option value="">Filter By Category</option>
           
              <option value="Computers">Computers</option>
              <option value="Electronics">Electronics</option>
              <option value="Fitness">Fitness</option>
              <option value="Shoes">
              Shoes
              </option>
            </select>
          </div>


          {/* Search input */}
          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-orange-400 focus-within:ring-orange-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                name="search"
                placeholder="Enter Products Title"
                aria-label="Enter Products Title"
              />
              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>

          {/* Sort dropdown */}
          <div>
          <select
    onChange={(e) => {
        setSort(e.target.value);
        setCurrentPage(1);
    }}
    value={sort}
    name="sort"
    id="sort"
    className="border p-4 rounded-md"
>
    <option value="">Sort By</option>
    <option value="dsc">High to Low</option>
    <option value="asc">Low to High</option>
    <option value="newest">Newest first</option> 
    
</select>

          </div>
          <button
            onClick={handleReset}
            className="btn  bg-orange-500 text-white"
          >
            Reset
          </button>
          <button
            onClick={() => refetch()}
            className="btn  bg-orange-500 text-white"
          >
            Refresh
          </button>
        </div>

        {/* Display surveys */}
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <LoadingSpinner className="text-center h-screen mx-auto block" />
          ) : (
            surveys.map((product, index) => (
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
                  Ratings : {product?.ratings}{" "}
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FBBF24"
                      className="w-4 h-5"
                    >
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.399 8.158L12 18.897l-7.333 3.848 1.399-8.158L.133 9.21l8.2-1.192z" />
                    </svg>
                  </span>
                </p>
                <p className="mt-2 text-[#79cad1] ">
                  Creation Date:{" "}
                  {new Date(product?.creation_date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "UTC", // use local time if needed
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
            ))
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-12">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-orange-500 hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="mx-1">previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-orange-500 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-orange-500 hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-orange-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Products;

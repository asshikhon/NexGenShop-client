import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        logOut();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

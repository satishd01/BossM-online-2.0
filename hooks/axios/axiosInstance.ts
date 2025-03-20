import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("auth") ? localStorage?.getItem("auth") : null;
  }
};

export const getAuthorizationHeader = () => `${getToken()}`;
// Create an Axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthorizationHeader(),
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.success && response.data?.toast) {
      toast.success(response?.data?.message);
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage?.clear();
      window.location.href = "/authentication/login";
      toast.error("Unauthorized, Please login again");
    }
    if (error.response?.data?.toast) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    return error;
  }
);
export default axiosInstance;

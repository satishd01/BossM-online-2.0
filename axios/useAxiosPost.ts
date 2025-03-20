import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

interface UsePostResult<T> {
  data: any;
  isLoading: boolean;
  isError: string | null;
  post: (payload: any) => Promise<any>;
}

const useAxiosPost = <T>(url: string): UsePostResult<T> => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const post = async (payload: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(url, payload);
      return response?.data as any;
    } catch (error: any) {
      setIsError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, post };
};

export default useAxiosPost;

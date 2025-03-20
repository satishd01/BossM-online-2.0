import { useState } from "react";
import axiosInstance from "./axiosInstance";

interface UseDeleteResult<T> {
  data: any;
  isLoading: boolean;
  isError: string | null;
  Delete: (payload: any) => Promise<any>;
}

const useAxiosDelete = <T>(url: string): UseDeleteResult<T> => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const Delete = async (payload: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(url);

      return response?.data as any;
    } catch (error: any) {
      if (error.response.data?.toast) {
        setIsError(
          error?.data?.error ||
            error?.response?.data.error ||
            "Something went wrong"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, Delete };
};

export default useAxiosDelete;

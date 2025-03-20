import { useState } from "react";
import axiosInstance from "./axiosInstance";

interface UsePutResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: Error | null;
  // eslint-disable-next-line no-unused-vars
  put: (payload: any) => Promise<any>;
}
const useAxiosPut = <T>(url: string): UsePutResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);

  const put = async (payload: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(url, payload);

      return response?.data as any;
    } catch (error: any) {
      if (error.response.data?.toast) {
        setIsError(
          error?.data?.error ||
            error?.response?.data.error ||
            "Something went wrong"
        );
      }

      setIsError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, put };
};

export default useAxiosPut;

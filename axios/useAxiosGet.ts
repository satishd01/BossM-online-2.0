import { useState, useEffect, useRef } from "react";
import axiosInstance from "./axiosInstance";

interface UseGetResult<T> {
  data: any;
  isLoading: boolean;
  isError: Error | null;
  fetchData: () => Promise<any>;
}

const useAxiosGet = <T>(
  url: string,
  onSuccess?: (data: T) => void,
  onError?: (error: any) => void
): UseGetResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);
  const [retryLimitReached, setRetryLimitReached] = useState(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const retryCooldown = 5 * 60 * 1000; // 5 minutes cooldown

  const fetchData = async () => {
    if (retryLimitReached) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get<any>(url);
      setData(response.data);

      // Call the onSuccess callback if provided
      if (onSuccess && response?.data) {
        onSuccess(response.data);
      }

      return response?.data as any;
    } catch (error: any) {
      if (error?.response?.data?.toast) {
        setIsError(
          error?.data?.error ||
            error?.response?.data.error ||
            "Something went wrong"
        );
      }

      // Call the onError callback if provided
      if (onError) {
        onError(error);
      }

      // Set retry limit and start cooldown
      setRetryLimitReached(true);
      retryTimeoutRef.current = setTimeout(() => {
        setRetryLimitReached(false);
      }, retryCooldown);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return { fetchData, data, isLoading, isError };
};

export default useAxiosGet;

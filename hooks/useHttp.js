import { useState, useCallback, useEffect } from "react";
import axios from "axios";
export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success === true) {
      const timer = setTimeout(() => {
        setSuccess(false);
      });
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);
  const request = axios.CancelToken.source();
  const sendRequest = useCallback(
    async (
      method = "get",
      url,
      data = {},
      headers = { "Content-Type": "application/json" }
    ) => {
      setIsLoading(true);
      try {
        const res = await axios({
          method,
          url,
          data,
          headers,
          CancelToken: request.token,
          withCredentials: true,
        });
        setIsLoading(false);
        setSuccess(true);
        const resData = res.data;
        return resData;
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      request.cancel();
    };
  }, []);

  return {
    sendRequest,
    clearError,
    isLoading,
    error,
    success,
  };
};

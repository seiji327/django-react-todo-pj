import { useState, useEffect } from "react";

import { AxiosError } from "axios";

import { AxiosInstance } from "../api/Axios";
import { Todos } from "../types/todoTypes";

const useAxiosFetch = () => {
  const [data, setData] = useState<Todos>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await AxiosInstance.get("/todos/");
        const todos: Todos = res.data;
        setData(todos);
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Unexpected Error Occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, errorMessage };
};

export default useAxiosFetch;

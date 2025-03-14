import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetchData = <T>(fetchFunction: () => Promise<T>) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: "Error al cargar los datos" });
        console.error("Error en useFetchData:", error);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return state;
};

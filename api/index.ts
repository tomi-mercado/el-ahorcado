import { useEffect, useState } from "react";
import { getWord } from "./services";

interface UseQueryPayload<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
  refresh: () => void;
}

export function useQuery<T>(query: () => Promise<T>): UseQueryPayload<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await query();
        setData(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshIndex, query]);

  const refresh = () => {
    setRefreshIndex((prev) => prev + 1);
  };

  return { data, refresh, loading, error };
}

export const useGetWord = () => {
  const { data, loading, error, refresh } = useQuery(getWord);

  return { word: data, loading, error, refresh };
};

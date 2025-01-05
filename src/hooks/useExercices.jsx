import { useCallback, useState } from "react";

const useExercices = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getExercices = useCallback(async (orgId, language) => {
    const response = await fetch(`/api/exercices/${orgId}/${language}`);
    const { data } = await response.json();
    setIsLoading(false);
    return data;
  }, []);

  return { getExercices, isLoading };
};

export default useExercices;

import { useCallback, useState } from "react";

const useCodeVerification = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const verifyCode = useCallback(
    async (orgId, language, exerciseId, functionName) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/exercices/${orgId}/${language}/${exerciseId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, functionName }),
          },
        );
        const data = await response.json();

        if (data?.error) {
          setResult({ success: data.success });
          throw new Error(data.error);
        }
        setResult(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [code],
  );

  return {
    code,
    setCode,
    isLoading,
    error,
    setError,
    result,
    verifyCode,
    setResult,
  };
};

export default useCodeVerification;

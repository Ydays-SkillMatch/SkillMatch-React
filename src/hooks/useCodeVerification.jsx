import { useCallback, useState } from "react";

/**
 * Hook pour gérer la vérification du code des exercices
 * @returns {Object} - Fonctions et états pour la vérification de code
 */
const useCodeVerification = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Vérifie le code via l'API
   * @param {number} orgId - ID de l'organisation
   * @param {string} language - Langage de programmation
   * @param {number} exerciseId - ID de l'exercice
   * @param {string} functionName - Nom de la fonction à tester
   */
  const verifyCode = useCallback(
    async (orgId, language, exerciseId, functionName) => {
      setIsLoading(true);
      setError(null);
      setIsSubmitted(true);
      
      try {
        // Définir un timeout pour la requête (30 secondes)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        const response = await fetch(
          `/api/exercices/${orgId}/${language}/${exerciseId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, functionName }),
            signal: controller.signal
          },
        );
        
        clearTimeout(timeoutId);
        const data = await response.json();

        if (data?.error) {
          setResult({ success: data.success });
          throw new Error(data.error);
        }
        setResult(data);
        return data;
      } catch (error) {
        if (error.name === "AbortError") {
          setError("La requête a pris trop de temps et a été annulée");
        } else {
          setError(error.message);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [code],
  );

  /**
   * Réinitialise l'état de vérification
   */
  const resetVerification = useCallback(() => {
    setError(null);
    setResult(null);
    setIsSubmitted(false);
  }, []);

  return {
    code,
    setCode,
    isLoading,
    error,
    setError,
    result,
    verifyCode,
    setResult,
    isSubmitted,
    resetVerification
  };
};

export default useCodeVerification;
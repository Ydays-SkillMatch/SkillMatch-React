"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import useExercices from "@/hooks/useExercices";
import useCodeVerification from "@/hooks/useCodeVerification";
import Markdown from "react-markdown";

// Charger Monaco Editor uniquement côté client
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function ExercisePage({ params }) {
  const router = useRouter();
  const exerciseId = parseInt(params.id);

  const [exercise, setExercise] = useState(null);
  const [showTestModal, setShowTestModal] = useState(false);

  // Organisation et langage par défaut
  const orgId = 0;
  const language = "js";

  const { getExercices, isLoading: isLoadingExercises } = useExercices();
  const {
    isLoading: isTesting,
    verifyCode,
    setCode,
    code,
    setError,
    result,
    error,
  } = useCodeVerification();

  // Vérification du token d'authentification
  useEffect(() => {
    const token = getCookie("SkillMatchToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  // Chargement de l'exercice spécifique
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const data = await getExercices(orgId, language);
        if (data && data.exercices) {
          const selectedExercise = data.exercices.find(
            (ex) => ex.id === exerciseId,
          );
          if (selectedExercise) {
            setExercise(selectedExercise);
            setCode(selectedExercise.defaultCode || "");
          } else {
            // Exercice non trouvé, rediriger vers la liste
            router.push("/exercices");
          }
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'exercice:", err);
      }
    };

    fetchExercise();
  }, [exerciseId, getExercices, router, setCode]);

  // Mise à jour des résultats des tests
  useEffect(() => {
    if (!exercise) return;

    try {
      if (result?.success && exercise) {
        setExercise((prev) => ({
          ...prev,
          test: result?.testPassed || prev.test,
        }));
      }
      if (result?.success === false && exercise) {
        // Si la structure d'erreur contient les informations sur le test échoué
        // (adaptation à la structure réelle de votre API)
        if (result.failedTest !== undefined) {
          const updatedTest = exercise.test.map((test, i) => {
            if (i < result.failedTest) return { ...test, passed: true };
            if (i === result.failedTest) return { ...test, passed: false };
            return test;
          });
          setExercise((prev) => ({ ...prev, test: updatedTest }));
        }
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des tests:", err);
    }
  }, [result, exercise]);

  const handleCodeSubmit = () => {
    setError(null);
    setShowTestModal(true);

    // Obtenir le nom de la fonction à partir du code
    const functionNameMatch = code.match(/function\s+(\w+)/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "FizzBuzz"; // Nom par défaut

    verifyCode(orgId, language, exerciseId, functionName)
      .then(() => {
        console.log("Code vérifié");
      })
      .catch((err) => {
        console.error("Erreur lors de la vérification du code:", err);
        // Les erreurs sont déjà gérées par le hook
      });
  };

  const closeTestModal = () => {
    setShowTestModal(false);
  };

  if (isLoadingExercises || !exercise) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-xl">Chargement de l&apos;exercice...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => router.push("/exercices")}
          >
            &larr; Retour aux exercices
          </button>
          <h1 className="text-2xl font-bold">{exercise.title}</h1>
          <div className="text-sm text-gray-400">SkillMatch Academy</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Section de gauche : Description de l'exercice */}
        <div className="w-1/3 p-6 overflow-y-auto bg-gray-800 border-r border-gray-700">
          <div className="prose prose-invert max-w-none">
            <Markdown>{exercise.markdown}</Markdown>
          </div>
        </div>

        {/* Section de droite : Monaco Editor */}
        <div className="w-2/3 flex flex-col">
          <MonacoEditor
            height="90%"
            width={"100%"}
            defaultLanguage="javascript"
            value={code}
            onChange={setCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              automaticLayout: true,
            }}
          />
          <div className="bg-gray-800 p-4 flex justify-end">
            <button
              onClick={handleCodeSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              disabled={isTesting}
            >
              {isTesting ? "Test en cours..." : "Tester votre code"}
            </button>
          </div>
        </div>
      </div>

      {/* Liste des tests */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Tests</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exercise.test.map((test) => (
              <div
                key={`${exercise.id}-${test.id}`}
                className={`p-3 rounded-md ${
                  test?.passed === true
                    ? "bg-green-900 bg-opacity-30 text-green-400"
                    : test.passed === false
                      ? "bg-red-900 bg-opacity-30 text-red-400"
                      : "bg-gray-900 text-gray-300"
                }`}
              >
                <div className="flex items-center">
                  {test?.passed === true ? (
                    <span className="mr-2 text-green-500">✓</span>
                  ) : test.passed === false ? (
                    <span className="mr-2 text-red-500">✗</span>
                  ) : (
                    <span className="mr-2 text-gray-500">○</span>
                  )}
                  <span>{test.title}</span>
                </div>
                <div className="mt-1 text-sm opacity-80">
                  <div>Entrée: {JSON.stringify(test.input)}</div>
                  <div>Attendu: {JSON.stringify(test.expected)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de test avec effet blur */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full text-center shadow-xl">
            <h3 className="text-xl font-bold mb-4">Test de votre code</h3>

            {isTesting && !error && !result && (
              <div className="flex flex-col items-center py-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-300">Exécution des tests...</p>
              </div>
            )}

            {(result || error) && (
              <div className="mt-4">
                {error ? (
                  <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg">
                    <div className="text-5xl mb-4 text-red-500">✗</div>
                    <p className="text-red-400 mb-2">Un test a échoué!</p>
                    <div className="text-left bg-gray-900 p-3 rounded text-sm overflow-auto max-h-48">
                      <p>Erreur: {error}</p>
                    </div>
                  </div>
                ) : result?.success ? (
                  <div className="bg-green-900 bg-opacity-30 p-4 rounded-lg">
                    <div className="text-5xl mb-4 text-green-500">✓</div>
                    <p className="text-green-400">
                      Tous les tests ont réussi !
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
              onClick={closeTestModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

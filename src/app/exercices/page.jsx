"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCodeVerification, useExercices } from "@/hooks";
import Markdown from "react-markdown";

// Charger Monaco Editor uniquement côté client
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Page() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const { getExercices, isLoading } = useExercices();
  const {
    isLoading: isTesting,
    verifyCode,
    setCode,
    code,
    setError,
    result,
    setResult,
    error,
  } = useCodeVerification();

  useEffect(() => {
    getExercices(0, "js").then((data) => {
      setExercises(data.exercices);
      setSelectedExercise(data.exercices[0]);
    });
  }, [getExercices]);

  useEffect(() => {
    setCode(selectedExercise?.defaultCode);
  }, [selectedExercise?.defaultCode, setCode]);

  useEffect(() => {
    try {
      if (result?.success) {
        setSelectedExercise((prev) => ({
          ...prev,
          test: result?.testPassed,
        }));
      }
      if (result?.success === false) {
        const updatedTest = selectedExercise.test.map((test, i) => {
          const err = JSON.parse(error);
          if (i < err?.testIndex) return { ...test, passed: true };
          if (i === err?.testIndex) return { ...test, passed: false };
          return test;
        });
        setSelectedExercise((prev) => ({ ...prev, test: updatedTest }));
      }
    } catch (error) {}
  }, [error, result, setError, selectedExercise]);

  const handleCodeSubmit = () => {
    setError(null);
    verifyCode(0, "js", selectedExercise.id, selectedExercise.title).then(
      () => {
        console.log("Code vérifié");
      },
    );
  };
  return (
    <div className={"flex p-4 min-h-full w-full flex-col"}>
      <div className={`flex h-[80%] max-h-[80%] w-full`}>
        {/* Section de gauche : Détails de l'exercices */}
        <div className={`flex flex-col w-[20%] p-4`}>
          <h2>{selectedExercise?.title}</h2>
          <Markdown>{selectedExercise?.markdown}</Markdown>
        </div>

        {/* Section de droite : Monaco Editor */}
        <MonacoEditor
          height="90%"
          width={"80%"}
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
      </div>
      {/* bouton de validation */}
      <div className={"flex justify-end p-2"}>
        <div className={"flex w-fit rounded-xl bg-gray-900 p-2"}>
          <button onClick={handleCodeSubmit} className={"flex"}>
            Soumettre mon code
          </button>
        </div>
      </div>

      {/* Liste des exercices */}
      <div className={`flex h-[20%] w-full`}>
        <div className={`flex flex-col w-[50%] p-4`}>
          <h3>Liste des exercices</h3>
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {!isLoading &&
              exercises?.map((exercise) => (
                <li
                  key={exercise.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                  onClick={() => {
                    setSelectedExercise(exercise);
                    setCode(exercise.defaultCode);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                    e.currentTarget.style.color = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "inherit";
                  }}
                >
                  {exercise.title}
                </li>
              ))}
          </ul>
        </div>
        {!isLoading && (
          <div className={`flex h-fit flex-col w-[50%] p-4`}>
            {!error && isTesting && (
              <p className={"text-green-500"}>Test en cours...</p>
            )}
            {error && (
              <div className={"flex flex-col"}>
                <p className={"text-red-500"}>
                  entree: {JSON.parse(error)?.input}
                </p>
                <p className={"text-red-500"}>
                  attendu: {JSON.parse(error)?.expected}
                </p>
                <p className={"text-red-500"}>
                  recu: {JSON.parse(error)?.result}
                </p>
              </div>
            )}

            <h3>Liste des tests</h3>
            <ul
              style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {selectedExercise?.test?.map((test) => (
                <li
                  key={`${selectedExercise.id}-${test.id}`}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                  }}
                  className={
                    test?.passed
                      ? "text-green-500"
                      : test.passed !== undefined
                        ? "text-red-500"
                        : "text-white"
                  }
                >
                  {test.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

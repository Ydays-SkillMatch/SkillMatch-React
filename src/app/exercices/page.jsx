"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useExercices } from "@/hooks";
import Markdown from "react-markdown";

// Charger Monaco Editor uniquement côté client
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Page() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [code, setCode] = useState("// Code lié à l'exercices sélectionné");
  const { getExercices, isLoading } = useExercices();

  useEffect(() => {
    getExercices(0, "js").then((data) => {
      setExercises(data.exercices);
      setSelectedExercise(data.exercices[0]);
    });
  }, [getExercices]);

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
                    transition: "background-color 0.2s",
                  }}
                  onClick={() => {
                    setSelectedExercise(exercise);
                    setCode(`// Code pour ${exercise.title}`);
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {exercise.title}
                </li>
              ))}
          </ul>
        </div>
        {!isLoading && (
          <div className={`flex h-fit flex-col w-[50%] p-4`}>
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
                  key={test.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                  }}
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

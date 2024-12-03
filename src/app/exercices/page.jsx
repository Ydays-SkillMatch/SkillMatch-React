"use client"
import dynamic from "next/dynamic";
import { useState } from "react";

// Charger Monaco Editor uniquement côté client
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function ExercisePage() {
  const [exercises, setExercises] = useState([
    { id: 1, title: "Alban aime la merde", description: "Description de l'exercice 1" },
    { id: 2, title: "Alban aime la bite", description: "Description de l'exercice 2" },
    { id: 3, title: "Alban aime les femmes", description: "Description de l'exercice 3" },
  ]);

  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [code, setCode] = useState("// Code lié à l'exercice sélectionné");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 2,
          borderBottom: "1px solid #ccc",
        }}
      >
        {/* Section de gauche : Détails de l'exercice */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            borderRight: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        >
          <h2>{selectedExercise.title}</h2>
          <p>{selectedExercise.description}</p>
        </div>

        {/* Section de droite : Monaco Editor */}
        <div
          style={{
            flex: 2,
            padding: "20px",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      {/* Liste des exercices */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <h3>Liste des exercices</h3>
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {exercises.map((exercise) => (
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
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {exercise.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

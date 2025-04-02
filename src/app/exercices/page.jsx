"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import useExercices from "@/hooks/useExercices";

export default function ExercicesList() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { getExercices, isLoading } = useExercices();
  
  const defaultOrgId = 0; 
  const defaultLanguage = "js";

  useEffect(() => {
    // Vérification de l'authentification
    const token = getCookie('SkillMatchToken');
    if (!token) {
      router.push('/');
      return;
    }

    // Chargement des exercices
    const fetchExercises = async () => {
      try {
        const data = await getExercices(defaultOrgId, defaultLanguage);
        if (data && data.exercices) {
          // Ajouter dates d'échéance fictives pour la démonstration
          const now = new Date();
          const exercisesWithDates = data.exercices.map((ex, index) => ({
            ...ex,
            dueDate: new Date(now.getTime() + (index + 1) * 3 * 24 * 60 * 60 * 1000).toISOString(),
            organization: "SkillMatch Academy"
          }));
          
          const sortedExercises = exercisesWithDates.sort((a, b) => 
            new Date(a.dueDate) - new Date(b.dueDate)
          );
          
          setExercises(sortedExercises);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des exercices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [getExercices, router]);

  const handleLogout = () => {
    document.cookie = "SkillMatchToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/');
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getDaysLeft = (dateString) => {
    const dueDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = dueDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
  };
  
  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 1: return "Facile";
      case 2: return "Moyen";
      case 3: return "Difficile";
      default: return "Moyen";
    }
  };
  
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Chargement des exercices...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-[#ededed] flex flex-col">
      {/* En-tête fixe */}
      <header className="sticky top-0 z-10 bg-gray-800 shadow-lg py-4 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Exercices à compléter</h1>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      
      {/* Conteneur principal centré */}
      <main className="flex-1 flex justify-center items-start py-8">
        <div className="max-w-6xl mx-auto px-6 w-full">
          {exercises.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xl">
              Aucun exercice disponible pour le moment
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {exercises.map(exercise => {
                const daysLeft = exercise.dueDate ? getDaysLeft(exercise.dueDate) : null;
                let dueDateClass = "text-blue-400 font-medium";
                if (daysLeft !== null) {
                  if (daysLeft < 0) {
                    dueDateClass = "text-gray-500 font-medium";
                  } else if (daysLeft <= 2) {
                    dueDateClass = "text-red-400 font-bold";
                  }
                }
                
                const difficultyLabel = getDifficultyLabel(exercise.difficulty);
                
                return (
                  <div 
                    key={exercise.id} 
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-xl border border-gray-700 w-full"
                    onClick={() => router.push(`/exercices/${exercise.id}`)}
                  >
                    <div className="p-5">
                      <div className="text-sm text-gray-400 mb-2">{exercise.organization || "SkillMatch"}</div>
                      <h3 className="text-xl font-bold mb-3">{exercise.title}</h3>
                      <div className="flex justify-between items-end">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                          ${difficultyLabel === 'Facile' ? 'bg-green-900 text-green-300' : 
                            difficultyLabel === 'Moyen' ? 'bg-yellow-900 text-yellow-300' : 
                            'bg-red-900 text-red-300'}`}
                        >
                          {difficultyLabel}
                        </span>
                        {exercise.dueDate && (
                          <div className="text-right">
                            <div className="text-sm text-gray-400">
                              Échéance: {formatDate(exercise.dueDate)}
                            </div>
                            <div className={dueDateClass}>
                              {daysLeft < 0 
                                ? "Expiré" 
                                : `${daysLeft} jour${daysLeft !== 1 ? 's' : ''} restant${daysLeft !== 1 ? 's' : ''}`
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
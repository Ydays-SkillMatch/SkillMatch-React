"use client";
import React, { useState, useEffect } from "react";

export default function ListExercices() {
  // États pour gérer les données et les filtres
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données fictives
  useEffect(() => {
    const mockExercises = [
      { id: 1, title: "Introduction à React", description: "Exercice pour apprendre les bases de React", organization: "Formation Web", creator: "John Doe", difficulty: "Débutant" },
      { id: 2, title: "API REST avec Node.js", description: "Créer une API REST complète", organization: "Formation Web", creator: "Jane Smith", difficulty: "Intermédiaire" },
      { id: 3, title: "Algorithmes de tri", description: "Implémentation de différents algorithmes de tri", organization: "Sciences Informatiques", creator: "John Doe", difficulty: "Avancé" },
      { id: 4, title: "Machine Learning Basics", description: "Introduction aux concepts de ML", organization: "Data Science", creator: "Alice Johnson", difficulty: "Intermédiaire" },
      { id: 5, title: "CSS Flexbox", description: "Maîtriser le positionnement avec Flexbox", organization: "Formation Web", creator: "Bob Martin", difficulty: "Débutant" },
      { id: 6, title: "SQL Avancé", description: "Requêtes complexes et optimisation", organization: "Data Science", creator: "Chris Evans", difficulty: "Avancé" },
      { id: 7, title: "Design Patterns", description: "Étude des principaux patterns de conception", organization: "Sciences Informatiques", creator: "Diana Prince", difficulty: "Avancé" },
      { id: 8, title: "Tests unitaires en JavaScript", description: "Apprendre à écrire des tests avec Jest", organization: "Formation Web", creator: "John Doe", difficulty: "Intermédiaire" }
    ];
    
    setExercises(mockExercises);
    setFilteredExercises(mockExercises);
    
    // Extraire les organisations uniques
    const uniqueOrgs = [...new Set(mockExercises.map(ex => ex.organization))];
    setOrganizations(uniqueOrgs);
  }, []);
  
  // Fonction pour filtrer les exercices par organisation et terme de recherche
  useEffect(() => {
    let result = exercises;
    
    // Filtrer par organisation sélectionnée
    if (selectedOrg !== 'all') {
      result = result.filter(ex => ex.organization === selectedOrg);
    }
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(ex => 
        ex.title.toLowerCase().includes(searchLower) || 
        ex.description.toLowerCase().includes(searchLower) ||
        ex.creator.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredExercises(result);
  }, [selectedOrg, searchTerm, exercises]);
  
  // Fonction pour supprimer un exercice
  const handleDelete = (id) => {
    // Simulation de suppression (à remplacer par l'API)
    const updatedExercises = exercises.filter(ex => ex.id !== id);
    setExercises(updatedExercises);
    alert(`Exercice ${id} supprimé`);
  };
  
  // Fonction pour éditer un exercice (à implémenter)
  const handleEdit = (id) => {
    alert(`Édition de l'exercice ${id} (fonctionnalité à implémenter)`);
  };
  
  // Fonction pour ajouter un nouvel exercice (à implémenter)
  const handleAdd = () => {
    alert("Ajout d'un nouvel exercice (fonctionnalité à implémenter)");
  };
  
  // Obtenir la couleur pour le badge de difficulté
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant':
        return 'bg-green-900 text-green-300';
      case 'Intermédiaire':
        return 'bg-yellow-900 text-yellow-300';
      case 'Avancé':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };
  
  // Grouper les exercices par organisation
  const exercisesByOrg = {};
  filteredExercises.forEach(ex => {
    if (!exercisesByOrg[ex.organization]) {
      exercisesByOrg[ex.organization] = [];
    }
    exercisesByOrg[ex.organization].push(ex);
  });
  
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-[#ededed] flex flex-col">
      {/* En-tête fixe */}
      <header className="sticky top-0 z-10 bg-gray-800 shadow-lg py-4 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Liste des Exercices</h1>
            <button 
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              + Ajouter un exercice
            </button>
          </div>
        </div>
      </header>
      
      {/* Conteneur principal centré */}
      <main className="flex-1 flex justify-center items-start py-8">
        <div className="max-w-6xl mx-auto px-6 w-full">
          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <label className="font-medium text-gray-300">Organisation:</label>
              <select 
                className="border border-gray-700 rounded-md px-3 py-2 bg-gray-800 text-gray-200"
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="all">Toutes les organisations</option>
                {organizations.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Rechercher un exercice..."
                className="w-full border border-gray-700 rounded-md px-3 py-2 pr-10 bg-gray-800 text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
          
          {/* Affichage des exercices par organisation */}
          {Object.keys(exercisesByOrg).length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xl">
              Aucun exercice trouvé
            </div>
          ) : (
            Object.keys(exercisesByOrg).map(org => (
              <div key={org} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 bg-gray-800 p-3 rounded-md border border-gray-700">
                  {org}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exercisesByOrg[org].map(ex => (
                    <div 
                      key={ex.id}
                      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-xl border border-gray-700 w-full"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-gray-400">
                            {ex.organization}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{ex.title}</h3>
                        <p className="text-gray-300 mb-4">{ex.description}</p>
                        <div className="flex justify-between items-end">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(ex.difficulty)}`}>
                            {ex.difficulty}
                          </span>
                          <div className="text-sm text-gray-400">
                            Créateur: {ex.creator}
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2 justify-end">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(ex.id);
                            }}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded transition"
                          >
                            Modifier
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(ex.id);
                            }}
                            className="bg-red-900 hover:bg-red-800 text-red-200 px-3 py-1 rounded transition"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
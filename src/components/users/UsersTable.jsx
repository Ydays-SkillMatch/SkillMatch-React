"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { getCookie } from "cookies-next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const UsersTable = () => {
  // État pour stocker les données des utilisateurs et des groupes
  const [userData, setUserData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer l'utilisateur connecté et ses groupes
  useEffect(() => {
    const fetchUserAndGroups = async () => {
      setIsLoading(true);
      setError(null);
      
      const token = getCookie("SkillMatchToken");
      if (!token || !apiUrl) {
        setError("Aucun token d'authentification ou URL API trouvé");
        setIsLoading(false);
        return;
      }

      try {
        // Récupérer les infos de l'utilisateur connecté
        const userResponse = await fetch(`${apiUrl}/api/user/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!userResponse.ok) {
          const errorData = await userResponse.text();
          console.error("Erreur API user:", errorData);
          throw new Error("Impossible de récupérer les données utilisateur");
        }
        
        const users = await userResponse.json();
        console.log("Données utilisateur reçues:", users); // Log pour debug
        
        // Extraire l'utilisateur courant et son ID
        let currentUser;
        if (Array.isArray(users)) {
          currentUser = users.find(u => u.is_active) || users[0];
        } else {
          currentUser = users;
        }
        
        if (!currentUser || typeof currentUser.id === 'undefined') {
          console.error("Données utilisateur invalides:", currentUser);
          throw new Error("ID utilisateur non trouvé");
        }

        console.log("Utilisateur courant:", currentUser); // Log pour debug
        
        // Récupérer les groupes de l'utilisateur
        const groupsResponse = await fetch(`${apiUrl}/api/group_user/${currentUser.id}/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (!groupsResponse.ok) {
          const errorData = await groupsResponse.text();
          console.error("Erreur API group_user:", errorData);
          throw new Error("Impossible de récupérer les groupes");
        }
        
        const userGroups = await groupsResponse.json();
        console.log("Groupes reçus:", userGroups); // Log pour debug
        
        const groupsArray = Array.isArray(userGroups) ? userGroups : [userGroups].filter(Boolean);
        setGroups(groupsArray);
        
        // Si des groupes sont disponibles, définir le premier comme groupe actuel
        if (groupsArray.length > 0) {
          await fetchGroupMembers(groupsArray[0].uuid, token);
        } else {
          setUserData([]);
          setFilteredUsers([]);
        }

      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError(err.message || "Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndGroups();
  }, []);

  // Récupérer les membres d'un groupe spécifique
  const fetchGroupMembers = async (groupUuid, token = getCookie("SkillMatchToken")) => {
    setIsLoading(true);
    setError(null);

    try {
      const groupResponse = await fetch(`${apiUrl}/api/group/${groupUuid}/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!groupResponse.ok) {
        const errorData = await groupResponse.text();
        console.error("Erreur API group:", errorData);
        throw new Error("Impossible de récupérer les membres du groupe");
      }
      
      const groupData = await groupResponse.json();
      console.log("Données du groupe reçues:", groupData); // Log pour debug
      
      setCurrentGroup(groupData);

      // Formater les utilisateurs du groupe pour correspondre à notre structure
      if (groupData.users && Array.isArray(groupData.users)) {
        const formattedUsers = groupData.users.map((user, index) => ({
          id: index + 1, // ID temporaire pour la gestion frontend
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Sans nom',
          email: user.email,
          role: user.email === (groupData.owner?.email || '') ? "Propriétaire" : "Membre", // Ajout du rôle propriétaire
          status: "Active" // Statut par défaut
        }));
        
        setUserData(formattedUsers);
        setFilteredUsers(formattedUsers);
      } else {
        setUserData([]);
        setFilteredUsers([]);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des membres du groupe:", err);
      setError(err.message || "Une erreur est survenue");
      setUserData([]);
      setFilteredUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer les changements de groupe
  const handleGroupChange = (e) => {
    const groupUuid = e.target.value;
    if (groupUuid) {
      fetchGroupMembers(groupUuid);
    }
  };

  // Gérer la recherche de membres
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredUsers(userData);
      return;
    }
    
    const filtered = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center">
          <Users className="mr-2" size={20} />
          {currentGroup ? currentGroup.name : 'Membres du groupe'}
        </h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Sélecteur de groupe */}
          <select
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleGroupChange}
            disabled={isLoading || groups.length === 0}
          >
            {groups.length === 0 ? (
              <option>Aucun groupe disponible</option>
            ) : (
              groups.map((group) => (
                <option key={group.uuid} value={group.uuid}>
                  {group.name}
                </option>
              ))
            )}
          </select>
          
          {/* Recherche */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={handleSearch}
              disabled={isLoading}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      {/* Affichage des erreurs */}
      {error && (
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* État de chargement */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Rôle
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-100">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "Propriétaire" 
                          ? "bg-purple-800 text-purple-100" 
                          : "bg-blue-800 text-blue-100"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-gray-400">
              {groups.length === 0
                ? "Vous n'appartenez à aucun groupe"
                : "Aucun membre trouvé dans ce groupe"}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default UsersTable;
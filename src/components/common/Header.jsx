"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Header = ({ title }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Tenter de récupérer les données utilisateur depuis le cookie d'abord
    const userDataFromCookie = getCookie("SkillMatchUser");
    
    if (userDataFromCookie) {
      try {
        // Analyser les données JSON stockées dans le cookie
        const userData = JSON.parse(userDataFromCookie);
        setUser(userData);
        return; // Si nous avons les données du cookie, ne pas faire d'appel API
      } catch (error) {
        console.error("Error parsing user data from cookie:", error);
      }
    }
    
    // Si pas de données dans le cookie, faire l'appel API comme avant
    const fetchUser = async () => {
      const token = getCookie("SkillMatchToken");
      if (!token || !apiUrl) return;

      try {
        const res = await fetch(`${apiUrl}/api/user/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          const users = await res.json();
          // Si plusieurs users dans la réponse, on prend le premier actif
          // ou juste le premier si l'API retourne toujours 1 seul user
          const currentUser =
            Array.isArray(users) && users.length > 0
              ? users.find((u) => u.is_active) || users[0]
              : users;
          setUser(currentUser);
        }
      } catch (error) {
        // Optionnel : gère les erreurs
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
        <div className="flex items-center">
          <Image
            src="/default-avatar.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full object-cover mr-2"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-100">
              {user
                ? `${user.first_name || ''} ${user.last_name || ''}`
                : "Chargement..."}
            </h3>
            <p className="text-xs text-gray-400">
              {user ? user.email : ""}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
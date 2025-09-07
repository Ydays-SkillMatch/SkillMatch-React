"use client";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Profile = () => {
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

    fetchUser();
  }, []);

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <Image
          // src="/default-avatar.jpg"
          alt="Profile"
          className="rounded-full object-cover mr-4"
          width={80}
          height={80}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            {user
              ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
              : "Chargement..."}
          </h3>
          <p className="text-gray-400">{user ? user.email : ""}</p>
        </div>
      </div>
    </SettingSection>
  );
};

export default Profile;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    
    // Vérifier que l'URL de l'API est définie
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("API URL:", apiUrl);
    
    if (!apiUrl) {
      setErrorMessage("Configuration error: API URL is not defined");
      return;
    }
    
    try {
      // Première requête: authentification
      const loginResponse = await fetch(apiUrl + "/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Auth Status:", loginResponse.status);
      
      if (loginResponse.status === 200) {
        const loginData = await loginResponse.json();
        console.log("Login successful, setting token");
        
        // Enregistrer le token
        setCookie("SkillMatchToken", loginData.access);
        
        // Stocker les données utilisateur depuis loginData
        const userData = {
          id: loginData.id,
          email: loginData.email,
          first_name: loginData.first_name,
          last_name: loginData.last_name
        };
        
        // Enregistrer les données utilisateur dans un cookie
        setCookie("SkillMatchUser", JSON.stringify(userData));
        
        // Deuxième requête: récupération des informations utilisateur
        try {
          const userResponse = await fetch(apiUrl + "/api/user/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${loginData.access}`,
            },
          });
          
          console.log("User info Status:", userResponse.status);
          
          if (userResponse.status === 200) {
            const users = await userResponse.json();
            console.log("User data retrieved:", users);
            
            // Trouver l'utilisateur avec l'email correspondant
            const currentUser = users.find(user => user.email === email);
            
            if (currentUser) {
              console.log("User found:", currentUser);
              console.log("Is staff:", currentUser.is_staff);
              
              // Redirection basée sur le statut staff
              if (currentUser.is_staff) {
                console.log("Redirecting to overview (staff user)");
                router.push("/overview");
              } else {
                console.log("Redirecting to exercices (regular user)");
                router.push("/exercices");
              }
            } else {
              console.log("User not found in the response");
              // Si l'utilisateur n'est pas trouvé, rediriger par défaut vers exercices
              router.push("/exercices");
            }
          } else {
            console.log("Failed to retrieve user info");
            // En cas d'échec de récupération des informations utilisateur, rediriger par défaut vers exercices
            router.push("/exercices");
          }
        } catch (userError) {
          console.error("Error fetching user data:", userError);
          // En cas d'erreur, rediriger par défaut vers exercices
          router.push("/exercices");
        }
      } else {
        console.log("Login failed");
        const errorData = await loginResponse.json();
        setErrorMessage(errorData.detail || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen ">
      <main className="flex flex-col items-center justify-center w-full px-6 text-center">
        <div className="bg-gray-900 rounded-2xl shadow-2xl flex flex-col items-center justify-center w-full max-w-md">
          <div className="w-full p-8">
            <div className="text-center font-bold ">
              <span className="text-[#012B7D] border-gray-800">Skill</span>{" "}
              Match
            </div>
            <h2 className="text-3xl font-bold border-gray-800 mb-4">
              Connexion
            </h2>
            <div className="border-2 w-10 border-gray-800 inline-block mb-4"></div>
            {errorMessage && (
              <p className="text-red-500 mb-6">{errorMessage}</p>
            )}
            
            <form onSubmit={handleLogin} className="w-full">
              <p className="text-white mb-6">Email</p>
              <div className="mb-4 bg-gray-800">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="bg-gray-800 w-full p-2 rounded-md outline-none text-sm"
                />
              </div>
              <p className="text-white mb-6">Mot de passe</p>
              <div className="mb-4 bg-gray-800">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className=" w-full p-2 bg-gray-800 rounded-md outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 w-full"
              >
                Connexion
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
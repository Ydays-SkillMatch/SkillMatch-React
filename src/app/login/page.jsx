"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
            <p className="text-white mb-6">Email</p>
            <div className="mb-4 bg-gray-800">
              <input
                type="email"
                name="email"
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className=" w-full p-2 bg-gray-800 rounded-md outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              // onClick={(e) => {
              //   e.preventDefault();
              //   fetch(process.env.API_URL + "/api/login", {
              //     method: "POST",
              //     headers: {
              //       "Content-Type": "application/json",
              //     },
              //     body: JSON.stringify({ email, password }),
              //   })
              //     .then((response) => {
              //       return response.json();
              //     })
              //     .then((data) => {
              //       console.log(data);
              //       if (data.status.code === 200) {
              //         setCookie("ParkSmartToken", data.token);
              //         router.push("/maps");
              //       }
              //     });
              // }
              // }
              onClick={() => router.push("/exercices")}
              className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 w-full"
            >
              Connexion{" "}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

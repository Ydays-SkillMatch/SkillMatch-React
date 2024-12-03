"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full px-6 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center w-full max-w-md">
          <div className="w-full p-8">
            <div className="text-center font-bold ">
              <span className="text-green-500">Skill</span> Match
            </div>
            <h2 className="text-3xl font-bold text-green-500 mb-4">
              Sign In
            </h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-4"></div>
            <p className="text-gray-400 mb-6">Email Account</p>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-gray-100 w-full p-2 rounded-md outline-none text-sm"
              />
            </div>
            <p className="text-gray-400 mb-6">Password</p>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-gray-100 w-full p-2 rounded-md outline-none text-sm"
              />
            </div>
            <button type="submit" 
                            onClick={(e) => {
                              e.preventDefault();
                              fetch(process.env.API_URL + "/api/login", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ email, password }),
                              })
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                  console.log(data);
                                  if (data.status.code === 200) {
                                    setCookie("ParkSmartToken", data.token);
                                    router.push("/maps");
                                  }
                                });
                            }
                            }
                            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 w-full">
              Sign In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

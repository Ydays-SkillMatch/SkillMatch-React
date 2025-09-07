"use client";
import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";

const REFRESH_INTERVAL = 3 * 60 * 1000; // 3 minutes

export default function TokenRefresher() {
  useEffect(() => {
    const refreshToken = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const refreshToken = getCookie("SkillMatchUser");
      if (!refreshToken || !apiUrl) return;

      try {
        const response = await fetch(`${apiUrl}/api/auth/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setCookie("SkillMatchToken", data.access);
          if (data.refresh) setCookie("SkillMatchUser", data.refresh);
        }
      } catch (e) {
        console.error("Token refresh error:", e);
      }
    };

    refreshToken();
    const interval = setInterval(refreshToken, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return null;
}
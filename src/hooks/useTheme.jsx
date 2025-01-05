import { useCallback, useState } from "react";
import { default as themeObject } from "@/theme/theme";

const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, [setTheme]);

  const returnedTheme = themeObject[theme];

  return { stringTheme: theme, toggleTheme, theme: returnedTheme };
};

export default useTheme;

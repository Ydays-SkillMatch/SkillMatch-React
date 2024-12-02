import { useState, useEffect } from "react";

export const useURL = () => {
  const [url, setURL] = useState("");
  useEffect(() => {
    setURL(window.location.href);
  }, []);
  return url;
};

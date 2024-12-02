import { useState, useEffect } from "react";

export const useURL = () => {
  const [url, setURL] = useState(null);

  useEffect(() => {
    setURL(window.location.href);
  }, []);

  return url;
};

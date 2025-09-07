import { useState, useEffect } from "react";

const useURL = () => {
  const [url, setURL] = useState(null);

  useEffect(() => {
    setURL(window.location.href);
  }, []);

  return url;
};

export default useURL;

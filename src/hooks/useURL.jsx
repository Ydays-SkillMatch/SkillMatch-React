import { useState, useEffect } from "react";

export const useURL = () => {
  const [url, setURL] = useState(window.location.href);

  return url;
};

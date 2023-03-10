import { useEffect, useState } from "react";

function useLocationHash() {
  const [locationHash, setLocationHash] = useState(window.location.hash.substring(1));
  useEffect(() => {
    const handleHashChange = () => setLocationHash(window.location.hash.substring(1));

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return locationHash;
}

export default useLocationHash;

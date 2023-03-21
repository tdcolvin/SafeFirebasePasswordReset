import { useEffect, useState } from "react";

function useLocationHash() {
  const getParsedLocationHash = function() {
    const hash = window.location.hash.substring(1);

    //Parse the location hash into key/val pairs
    const parsedLocationHash: {[key: string]: string} = {};
    const params = hash.split(/&|\?/);

    // the filter here prevents a separator at the beginning of the hash string, or two seps together,
    // causing {"": ""} in the return
    for (const param of params.filter(param => param.length > 0)) {
      const eq = param.indexOf("=");
      const pkey = (eq < 0) ? param : param.slice(0, eq);
      const pval = (eq < 0) ? "" : param.slice(eq + 1);
      parsedLocationHash[pkey] = pval;
    }

    return parsedLocationHash;
  }

  //set up the location hash params on load
  const [locationHash, setLocationHash] = useState(getParsedLocationHash());

  //...and update them every time they change
  useEffect(() => {
    const handleHashChange = () => setLocationHash(getParsedLocationHash());

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return locationHash;
}

export default useLocationHash;

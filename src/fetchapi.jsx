import { useEffect, useState } from "react";

export function useFetchApi(url) {
  let [data, setdata] = useState([]);
  let [loading, setload] = useState(false);
  let [error, seterr] = useState(null);
  useEffect(() => {
    if (!url) return;
    const abort = new AbortController();
    const getdata = async () => {
      
      try {
        const res = await fetch(url, {
          signal: abort.signal,
        });
        setload(true);
        if (!res.ok) throw new Error("network error");
        const data = await res.json();
        setdata(data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          console.error("fetch failed", error.message);
          setdata([]);
        }

        seterr(error);
      } finally {
        setload(false);
      }
    };
    getdata();
    return () => abort.abort();
  }, [url]);
  return { data, loading, error };
}

export default useFetchApi;

import { useEffect, useState } from "react";

export function useFetchApi(query = "") {
  let [data, setdata] = useState([]);
  let [loading, setload] = useState(false)
  useEffect(() => {
    const abort = new AbortController();
    const getdata = async () => {
      setload(true)
      try {
        let url = "";
        if(query.trim()){
           url = `https://api.jikan.moe/v4/anime?q=${ encodeURIComponent(query)}`
        }else{
           url =  `https://api.jikan.moe/v4/anime`
        }
        const res = await fetch(url, {
          signal: abort.signal,
        });
        if (!res.ok) throw new Error("network error");
        const data = await res.json();
        setdata(data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          console.error("fetch failed", error.message);
          setdata([])
        }
      }
       finally{
         setload(false)
       }
    };
    getdata();
    return () => abort.abort();
  }, [query]);
  return {data, loading};
}

export default useFetchApi;

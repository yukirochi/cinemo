import { useEffect, useState } from "react";
import "./css/popular.css";

function Popular() {
  let [resultt, setresultt] = useState([]);
  let [loadingg, setloadingg] = useState(true)
  let [pop, setpopp] = useState(null)
  useEffect(() => {
    const abortt = new AbortController();
    const getdataa = async () => {
      setloadingg(true)
      try {
        const res = await fetch(
         "https://api.jikan.moe/v4/top/anime?filter=favorite&limit=25",
          {
            signal: abortt.signal,
          }
        );
        if (!res.ok) throw new Error("network error");
        const data = await res.json();
        setresultt(data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          console.error("fetch failed ", error.message);
        }
      } finally{
        setloadingg(false)
      }
    };
    getdataa();
    return () => abortt.abort();
  }, []);
  
  
  return (
    <div className="popular-cont">
      <div className="popular-content">
        <div className="content-contt">
        <div className="contents-cont">
          {loadingg && <h1>Loading</h1>}
          {resultt.map((res) => (
            <div className="divss" key={res.mal_id} onClick={() =>setpopp(res)}>
              <div
                className="image-contt"
                 style={{ backgroundImage: `url(${res.images.jpg.image_url})` }}
              ></div>
              <div className="detailss">
                <p className="titlee" style={{ fontSize: "15px" }}>
                  {" "}
                  {res.title}
                </p>
                <p>{res.status}</p>
                <p>Favorites: {res.favorites}</p>
                <p>⭐{res.score}⭐</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      {pop && (
        <div className="pop-overlay" onClick={() => setpopp(null)}>
         <div className="selected-cont" onClick={(e) => e.stopPropagation()}>
            <div className="pop-img-cont">
                <div className="pop-img" style={{ backgroundImage: `url(${pop.images.jpg.image_url})` }}></div>
                <div className="pop-rating">⭐{pop.score}⭐</div>
            </div>
            <div className="pop-details">
                <div className="pop-header">{pop.title}</div>
                <div className="pop-body">{pop.synopsis}</div>
                <div className="pop-genre">{pop.status}</div>
            </div>
         </div>
      </div>
      )}

      
    </div>
  );
}

export default Popular;

import { useState } from "react";
import "./css/manga.css";
import { useFetchApi } from "./fetchapi";
function Manga() {
  let [usearch, setusearch] = useState("")
  
    const urll = usearch
    ? `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(usearch)}`
    : `https://api.jikan.moe/v4/top/manga`;

  const { data, loading } = useFetchApi(urll);
  let [popp, setpopp] = useState(null)
  return (
    <div className="manga-cont">
      <div className="manga-bg">
        <div className="manga-search">
          <input type="text" placeholder="Search Manga"
            value={usearch}
            onChange={(e) => setusearch(e.target.value)}
          />
        </div>
        <div className="manga-container">
          {loading && <h1>loading</h1>}
          {data.map((res) => (
            <div className="divs" key={res.mal_id} onClick={() => setpopp(res)}>
              <div
                className="image-cont"
                style={{ backgroundImage: `url(${res.images.jpg.image_url})` }}
              ></div>
              <div className="details">
                <p className="title" style={{ fontSize: "15px" }}>
                  {res.title}
                </p>
                <p>{res.status}</p>
                <p>Released data: {res.year}</p>
                <p>⭐{res.score ? res.score : "no data"} ⭐</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {popp && (
        <div className="pop-overlay" onClick={() => setpopp(null)}>
         <div className="selected-cont" onClick={(e) => e.stopPropagation()}>
            <div className="pop-img-cont">
                <div className="pop-img" style={{ backgroundImage: `url(${popp.images.jpg.image_url})` }}></div>
                <div className="pop-rating">⭐{popp.score}⭐</div>
            </div>
            <div className="pop-details">
                <div className="pop-header">{popp.title}</div>
                <div className="pop-body">{popp.synopsis}</div>
                <div className="pop-genre">{popp.status}</div>
            </div>
         </div>
      </div>
      )}
    </div>
  );
}

export default Manga;

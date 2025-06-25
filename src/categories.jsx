import { useState } from "react";
import "./css/categories.css";
import { useFetchApi } from "./fetchapi";
function Categories() {
  let [popit, setpop] = useState(null);
  let [catres, setcatres] = useState(
    "https://api.jikan.moe/v4/anime?genres=1&limit=24"
  );
  let [btnclick, setbtn] = useState(1);
  const { data, loading } = useFetchApi(catres);
  const genres = [
    { name: "Action", id: 1 },
    { name: "Adventure", id: 2 },
    { name: "Cars", id: 3 },
    { name: "Comedy", id: 4 },
    { name: "Dementia", id: 5 },
    { name: "Demons", id: 6 },
    { name: "Mystery", id: 7 },
    { name: "Drama", id: 8 },
    { name: "Ecchi", id: 9 },
    { name: "Fantasy", id: 10 },
    { name: "Game", id: 11 },
    { name: "Hentai", id: 12 }, // ⚠ NSFW - Usually applies only to Manga
    { name: "Historical", id: 13 },
    { name: "Horror", id: 14 },
    { name: "Kids", id: 15 },
    { name: "Magic", id: 16 },
    { name: "Martial Arts", id: 17 },
    { name: "Mecha", id: 18 },
    { name: "Music", id: 19 },
    { name: "Parody", id: 20 },
    { name: "Samurai", id: 21 },
    { name: "Romance", id: 22 },
    { name: "School", id: 23 },
    { name: "Science Fiction", id: 24 },
    { name: "Shoujo", id: 25 },
    { name: "Shoujo Ai", id: 26 },
    { name: "Shounen", id: 27 },
    { name: "Shounen Ai", id: 28 },
    { name: "Space", id: 29 },
    { name: "Sports", id: 30 },
    { name: "Super Power", id: 31 },
    { name: "Vampire", id: 32 },
    { name: "Yaoi", id: 33 }, // ⚠ NSFW - Manga only
    { name: "Yuri", id: 34 }, // ⚠ NSFW - Manga only
    { name: "Harem", id: 35 },
    { name: "Slice of Life", id: 36 },
    { name: "Supernatural", id: 37 },
    { name: "Military", id: 38 },
    { name: "Police", id: 39 },
    { name: "Psychological", id: 40 },
    { name: "Thriller", id: 41 },
    { name: "Seinen", id: 42 },
    { name: "Josei", id: 43 },
  ];

  return (
    <div className="cat-cont">
      <div className="cat-container">
        <div className="cat-but-cont">
          <div className="anime">Anime</div>
          {genres
            .filter((gen) => gen.id !== 33 && gen.id !== 34 && gen.id !== 16)
            .map((gen) => (
              <div
                className= {btnclick === gen.id ? "btn active" : "btn"}
                onClick={() => {
                  setcatres(
                    `https://api.jikan.moe/v4/anime?genres=${gen.id}&limit=24`
                  );
                  setbtn(gen.id);
                }}
              >
                {gen.name}
              </div>
            ))}

          <div className="anime">Manga</div>
          {genres
            .filter((gen) => gen.id !== 33 && gen.id !== 34 && gen.id !== 16)
            .map((gen) => (
              <div
                className= {btnclick === gen.id + 100 ? "btn active" : "btn"}
                onClick={() =>{
                  setcatres(
                    `https://api.jikan.moe/v4/manga?genres=${gen.id}&limit=24`
                  )
                   setbtn(gen.id + 100);
                }
                }
              >
                {gen.name}
              </div>
            ))}
        </div>
        <div className="cat-main-cont">
          <div className="categories-main">
            {loading && <h1>loading</h1>}
            {data &&
              data.map((res) => (
                <div
                  className="divs"
                  key={res.mal_id}
                  onClick={() => setpop(res)}
                >
                  <div
                    className="image-cont"
                    style={{
                      backgroundImage: `url(${res.images.jpg.image_url})`,
                    }}
                  ></div>
                  <div className="details">
                    <p className="title" style={{ fontSize: "15px" }}>
                      {" "}
                      {res.title}
                    </p>
                    <p>{res.status}</p>
                    <p>Released data: {res.year}</p>
                    <p>⭐{res.score}⭐</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {popit && (
        <div className="pop-overlay" onClick={() => setpop(null)}>
          <div className="selected-cont" onClick={(e) => e.stopPropagation()}>
            <div className="pop-img-cont">
              <div
                className="pop-img"
                style={{
                  backgroundImage: `url(${popit.images.jpg.image_url})`,
                }}
              ></div>
              <div className="pop-rating">⭐{popit.score}⭐</div>
            </div>
            <div className="pop-details">
              <div className="pop-header">{popit.title}</div>
              <div className="pop-body">{popit.synopsis}</div>
              <div className="pop-genre">{popit.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;

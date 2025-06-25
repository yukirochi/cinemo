import "./css/home.css";
import { createElement, useEffect, useState } from "react";
function Home() {
  let [search, setsearch] = useState("");
  let [result, setresult] = useState([]);
  let [debouncedSearch, setDebouncedSearch] = useState("");
  let [popit, setpop] = useState(null);
  let [loading, setloading] = useState(true);

  useEffect(() => {
    const abort = new AbortController();
    const getdata = async () => {
      setloading(true);
      try {
        const query = search;
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`, {
          signal: abort.signal,
        });
        if (!res.ok) throw new Error("network error");
        const data = await res.json();
        console.log(data.data);

        setresult(data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          console.error("fetch failed", error.message);
        }
      } finally {
        setloading(false);
      }
    };
    getdata();
    return () => abort.abort();
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="home-cont">
      <div className="search-cont">
        <input
          type="text"
          placeholder="search anime"
          onChange={(e) =>
            setTimeout(() => {
              setsearch(e.target.value);
            }, 300)
          }
        />
        
      </div>
      <div className="content-cont">
        <div className="contents-cont">
          {loading && <h1>loading</h1>}
          {result.map((res) => (
            <div className="divs" key={res.mal_id} onClick={() => setpop(res)}>
              <div
                className="image-cont"
                style={{ backgroundImage: `url(${res.images.jpg.image_url})` }}
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

export default Home;

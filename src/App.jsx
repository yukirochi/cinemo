import "./css/App.css";
import { useEffect, useState } from "react";
import Home from "./home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Categories from "./categories";
import Popular from "./popular";
import Manga from "./Manga";
import Popmanga from "./Popmanga";

function App() {
  let [click, setclick] = useState(1)
  return (
    <Router>
      <div className="container">
        <header>
          <Link to="/" className={click === 1 ? "clk active" : "clk"} onClick={()=> setclick(1)}>Anime</Link> 
          <Link to="/popular" className={click === 2 ? "clk active" : "clk"} onClick={()=> setclick(2)}>Popular Anime</Link>
          <Link to="/Manga" className={click === 3 ? "clk active" : "clk"} onClick={()=> setclick(3)}>manga</Link>
          <Link to="/Popmanga" className={click === 4 ? "clk active" : "clk"} onClick={()=> setclick(4)}>Popular Manga</Link>
          <Link to="/categories" className={click === 5 ? "clk active" : "clk"} onClick={()=> setclick(5)}>Categories</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/Manga" element={<Manga />} />
          <Route path="/Popmanga" element={<Popmanga />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

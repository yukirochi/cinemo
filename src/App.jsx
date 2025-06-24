import './css/App.css';
import { useEffect } from 'react';
import Home from './home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Categories from './categories';
import Popular from './popular';
import Manga from './Manga';
import Popmanga from './Popmanga';

function App() {

  return (
    <Router>
    <div className="container">
     <header><Link to="/">Anime</Link> <Link to="/popular">Popular Anime</Link><Link to="/Manga">manga</Link><Link to="/Popmanga">Popular Manga</Link><Link to="/categories">Categories</Link></header>
     <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route  path='/categories' element={<Categories/>}/>
      <Route  path='/popular' element={<Popular/>}/>
      <Route path='/Manga' element={<Manga/>}/>
      <Route path='/Popmanga' element={<Popmanga/>}/>
     </Routes>
    
    </div>
    </Router>
  );
}

export default App;

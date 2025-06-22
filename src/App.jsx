import './css/App.css';
import { useEffect } from 'react';
import Home from './home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Categories from './categories';
function App() {



 
  return (
    <Router>
    <div className="container">
     <header><Link to="/">Home</Link> <Link to="#">Popular</Link><Link to="/categories">Categories</Link><Link to="#">About</Link></header>
     <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route  path='/categories' element={<Categories/>}/>
     </Routes>
    
    </div>
    </Router>
  );
}

export default App;

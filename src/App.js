import React, { useEffect,useState } from 'react';
import './App.css';
import Movie from './Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=82e159f100b4dc92ee08805eb5bf0d0b";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=82e159f100b4dc92ee08805eb5bf0d0b&query=";

function App() {
  const [movies,setMovies] = useState([]);
  const[searchItem,setSearchItem] = useState('');

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results);
          console.log(data);
        });
  }
  const handleChange = (e) => {
    setSearchItem(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(searchItem) {
      getMovies(SEARCH_API+searchItem);
      setSearchItem('');
    }

  };

   return(
    <>
      <header>
        <h2>Movie Clone App</h2>
        <form onSubmit={handleSubmit}>
            <input className="search" 
            type="text" 
            placeholder="search" 
            value={searchItem} onChange={handleChange}/>
        </form>
      </header>
      <div className="movie-container">
          { movies.length>0 && movies.map((movie) => (<Movie key={movie.id} {...movie}/>))}
      </div>
    </>
  );
  
}

export default App;

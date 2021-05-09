import React, { useEffect,useState } from 'react';
import './App.css';
import Movie from './Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=82e159f100b4dc92ee08805eb5bf0d0b";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=82e159f100b4dc92ee08805eb5bf0d0b&query=";

function App() {
  const [movies,setMovies] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results);
          console.log(data);
        });
  }, []);

  return(
    <div className="movie-container">
        {
          movies.map((movie) => (<Movie key={movie.id} {...movie}/>))
        }
    </div>
  );
  
}

export default App;

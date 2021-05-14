import React, { useState } from 'react';
import './App.css';
import Movie from './Movie';
import ListMovie from './ListMovie';
import SideBar from './SideBar';


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=82e159f100b4dc92ee08805eb5bf0d0b";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=82e159f100b4dc92ee08805eb5bf0d0b&query=";

function App() {
  const [movies,setMovies] = useState(null);
  const [listmovies,setListMovies] = useState(null);
  const[searchItem,setSearchItem] = useState('');
  const [val,setVal] = useState(false);
  const [cenId,setCenId] = useState('');
  //const storeNameRef = firestore.collection('notes');
  const [on,setOn] = useState(false);
  
  const getMovies = (API) => {
      fetch(API)
          .then(res => res.json())
          .then(data => {
            setMovies(data.results);
            console.log(data.results);
          });
    }

  const handleChange = (e) => {
      setSearchItem(e.target.value);
    }

  const handleSubmit = (e) => {
      e.preventDefault();
      getMovies(SEARCH_API+searchItem);
      setSearchItem('');
    };

  return(
      <>
        <header>
          <h2>Movie Clone App</h2>
          <button onClick={() => setOn(!on)}>PlayList</button>
          <form onSubmit={handleSubmit}>
              <input className="search" 
              type="text" 
              placeholder="search" 
              value={searchItem} onChange={handleChange}/>
          </form>
        </header>
        <div className="main-section">   
          {on ? <SideBar val={val} setVal={setVal} cenId={cenId} setCenId={setCenId} 
          setListMovies={setListMovies}></SideBar> : ''}    
          <div className="movie-container"> 
          {
            listmovies ? listmovies.map((movie) => ( <ListMovie key={movie.id} {...movie} 
              val={val} cenId={cenId} setListMovies={setListMovies}/>)):
            movies && movies.map((movie) => ( <Movie key={movie.id} {...movie} val={val} setVal={setVal} cenId={cenId}/>))
          }
          </div>
        </div>
      </>
    );
  
}

export default App;

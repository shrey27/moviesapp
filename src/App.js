import React, { useEffect,useState } from 'react';
import './App.css';
import Movie from './Movie';
import SideBar from './SideBar';
import {firestore} from './config.js';


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=82e159f100b4dc92ee08805eb5bf0d0b";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=82e159f100b4dc92ee08805eb5bf0d0b&query=";

function App() {
  const [movies,setMovies] = useState([]);
  const [listmovies,setListMovies] = useState([]);
  const[searchItem,setSearchItem] = useState('');
  const [notes,setNotes] = useState(null);
  const [until, setUntil] = useState(true);
  const [val,setVal] = useState(false);
  const [cenId,setCenId] = useState('');

  useEffect(() => {
    getPlayList();
    getMovies(FEATURED_API);
  });

  const getPlayList = async () => {
    await firestore.collection('notes')
        .onSnapshot(
          (serverUpdate) => {
            const notesArray = serverUpdate.docs.map(_doc => {
              const data = _doc.data();
              data['id'] = _doc.id;
              return data;
            });
        console.log(notesArray);
        setNotes(notesArray);
        setUntil(false);
        }
    );   
  }
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
      <div className="main-section">
        <SideBar notes={notes} until={until} val={val} setVal={setVal} cenId={cenId} setCenId={setCenId} 
        setListMovies={setListMovies}></SideBar>
        <div className="movie-container"> 
        {
          listmovies ? listmovies.map((movie) => ( <Movie key={movie.id} {...movie} val={val} cenId={cenId}/>)):
          movies.map((movie) => ( <Movie key={movie.id} {...movie} val={val} cenId={cenId}/>))
          
        }
        </div>
      </div>
      
    </>
  );
  
}

export default App;

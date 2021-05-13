import React, { useState } from 'react';
import {firestore,timestamp} from './config.js';

const IMAGE_API = "https://image.tmdb.org/t/p/w500";
const setVoteClass = (vote) => {
        if(vote>=8){
            return "green";
        }
        else if(vote >= 6){
            return "orange";
        }
        else{
            return "red";
        }
    };



function Movie({title, poster_path,overview,vote_average,val,cenId}){
        
    const updatePlaylist = async() => {
        await firestore.collection('notes').doc(cenId).collection('movies').add({
            title:title,
            overview:overview,
            vote_average:vote_average,
            poster_path:IMAGE_API+poster_path,
            added:true
        });
    }
    return(
        <div className="movie">
            <img src={
                poster_path ? IMAGE_API+poster_path :
                "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1569&q=80"
            } alt={title}/>
            <div className="movie-info">
                    <h3>{title}</h3>
                    <span className={
                        `tag ${setVoteClass(vote_average)}`
                    }>{vote_average}</span>
            </div>
            <div className="movie-overview">
                <section className="section_1">
                    <h2>Overview</h2>
                    <p>{overview}</p>
                </section>
                <section className="section_2">
                    <button onClick={updatePlaylist} disabled={!val}>➕</button>
                    {<button>🗑</button>}
                </section>
            </div>
        </div> );
    };

export default Movie;
import React, { useState } from 'react';
import {firestore} from './config';

function SideBarItem (props){
    
    const { note,id,val,setVal,setCenId,play,setPlay,setListMovies } = props;
    const [dis,setDis] = useState(false);
    const [open,setOpen] = useState(false);
    const deleteListItem = async(e) => {
        await firestore.collection('notes').doc(e.target.value).delete(); 
    }

    const getMovieList = async (e) => {
        const moviesRef = await firestore.collection('notes').doc(e.target.value).collection('movies');
        const list = moviesRef.docs.map(doc => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
        setListMovies(list);
      }
    
    const addMovie = (e) => {
        if(play)
            setPlay(false);
        else
            setPlay(true);

        setVal(!val);
        setDis(!dis);
        setCenId(e.target.value);
    }

    const openList = (e) => {
        if(play){
            setPlay(false);
            setCenId(null);
        }
        else{
            setPlay(true);
            setCenId(e.target.value);
            getMovieList(e);
        }

        setVal(!val);
        setOpen(!open);
    }
    
    return(
        <div className="list">
            <div key={id}>
               <h1>{note.name}</h1>
               <button value={id} onClick={deleteListItem}>Del</button>
               <button value={id} onClick={addMovie} disabled={play && !dis}>{dis ? 'Done' : '+ Add'}</button>
               <button value={id} onClick={openList} disabled={play && !open}>{open ? '<- Back':'Open'}</button>
            </div>
        </div>
    );
}
export default SideBarItem;
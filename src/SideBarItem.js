import React, { useState } from 'react';
import {firestore} from './config';
import {useCollectionData} from 'react-firebase-hooks/firestore';

function SideBarItem (props){
    
    const { note,id,val,setVal,cenId,setCenId,play,setPlay,setListMovies } = props;
    const [dis,setDis] = useState(false);
    const [open,setOpen] = useState(false);
    const [query,setQuery] = useState(null);
    const [movienote] = useCollectionData(query, {idField: 'id'});
    const storageref = firestore.collection('notes');

    const deleteListItem = async(e) => {
        await firestore.collection('notes').doc(e.target.value).delete(); 
    }

    const getListMovies = async(id) => {
        console.log(id);
        const query = await storageref.doc(id).collection('movies');
        if(query) 
        {
            setQuery(query);
            if(movienote) setListMovies(movienote);
            else setListMovies([]);
        }
    };
    
    const addMovie = (e) => {
        if(play)
            setPlay(false);
        else
            setPlay(true);

        setVal(!val);
        setDis(!dis);
        setCenId(e.target.value);
    }

    const openList = () => {
       
        if(play){
            setPlay(false);
            setListMovies(null);
        }
        else{
            setPlay(true);
            getListMovies(id);
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
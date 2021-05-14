import React, { useState } from 'react';
import {firestore} from './config';


function SideBarItem (props){
    
    const { note,id,val,setVal,setCenId,play,setPlay,setListMovies } = props;

    const [dis,setDis] = useState(false);
    const [open,setOpen] = useState(false);
    const [edit,setEdit] = useState(false);
    const storageref = firestore.collection('notes');
    const [newname,setNewName] = useState('');

    const deleteListItem = async(e) => { 
        await firestore.collection('notes').doc(e.target.value).delete(); 
        setListMovies(null);
    }

    const getListMovies = async(value) => {
        var notesArray = [];
        await storageref.doc(value).get().then((_doc) => {
            const data = _doc.data();
            notesArray = (data['movies']);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        console.log(notesArray);
        setListMovies(notesArray);
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

    const openList = (e) => {
        if(play){
            setPlay(false);
            setListMovies(null);
        }
        else{
            setPlay(true);
            getListMovies(e.target.value);
        }

        setVal(!val);
        setOpen(!open);
        setCenId(e.target.value);
    }
    
    const handleChange = (e) => {
        setNewName(e.target.value);
      }

    const editListName = async(e) => {
        e.preventDefault();
        await storageref.doc(id).update({
            name:newname
        });
        setNewName('');
        setEdit(false);
    }

    return(
        <div className="list">
            <div key={id}>
               {
                   edit ?  
                   <form onSubmit={editListName}>
                        <input className="edit" 
                        type="text" 
                        placeholder="name" 
                        value={newname} onChange={handleChange} required/>
                        <button type='submit'>Go</button>
                   </form> : <h1>{note.name}</h1>
               }
               <button value={id} onClick={()=>setEdit(!edit)}>{edit  ? 'Cancel' : 'Edit'}</button>
               <button value={id} onClick={deleteListItem}>Del</button>
               <button value={id} onClick={addMovie} disabled={play && !dis}>{dis ? 'Done' : '+ Add'}</button>
               <button value={id} onClick={openList} disabled={play && !open}>{open ? '<- Back':'Open'}</button>
            </div>
        </div>
    );
}
export default SideBarItem;
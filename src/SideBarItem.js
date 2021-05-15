import React, { useState } from 'react';
import {firestore} from './config';

function SideBarItem (props){
    
    const { note,id,val,setVal,setCenId,play,setPlay,setListMovies } = props;

    const [dis,setDis] = useState(false);
    const [open,setOpen] = useState(false);
    const storageref = firestore.collection('notes');
    const [edit,setEdit] = useState(false);
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
        var array = [];
        await storageref.where("name", "==", newname).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data()['name']);
                array.push(doc);
            });
        });
        if(array.length===0){
            await storageref.doc(id).update({
                name:newname
            });
        }       
        else{
            window.alert('Playlist with given name already present in the DB');
        }
        setNewName('');
        setEdit(false);
        if(play)
            setPlay(false);
        else
            setPlay(true);

    }

    const editButton = () => {
        setEdit(!edit);
        setNewName('');
        if(play)
            setPlay(false);
        else
            setPlay(true);
    }
    return(
        <div className="list">
            <div key={id}>
               {
                   edit ? 
                   <div className='form'> 
                        <form onSubmit={editListName}>
                                <input className="edit" 
                                type="text" 
                                placeholder="Playlist Name" 
                                value={newname} onChange={handleChange} required/>
                                <button type='submit'>✔️</button>
                        </form>
                    </div> : 
                   <div className="listheader">
                       <h1>{note.name}</h1>
                    </div>
               }
               <div className="buttons">
                    <button value={id} title={edit ? 'Cancel' : "Edit"} onClick={editButton}>{edit  ? '🚫' : '✏️'}</button>
                    <button value={id} title="Delete Playlist" onClick={deleteListItem} >🗑️</button>
                    <button value={id} title={dis ? 'Done' : "Add Movie to Playlist"} onClick={addMovie} disabled={play && !dis}>{dis ? '✔️' : '➕'}</button>
                    <button value={id} title={open ? 'Go Back' : "Open Playlist"} onClick={openList} disabled={play && !open}>{open ? '✔️':'📂'}</button>
               </div>
            </div>
        </div>
    );
}
export default SideBarItem;
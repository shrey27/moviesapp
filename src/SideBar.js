import React, { useState } from 'react';
import {firestore,timestamp} from './config.js';
import SideBarItem from './SideBarItem.js';
import loading from './loading.gif';

function SideBar(props){
    //make another collection and store all the note names in it
    const {notes,until,val,setVal,cenId,setCenId,setListMovies} = props;
    const storeNameRef = firestore.collection('notes');
    const [click,setClick] = useState(false);
    const [playListName,setplayListName] = useState('');
    const [play,setPlay] = useState(false);
    
    const updateList = async() =>{
        setClick(false);
        await storeNameRef.add({
            name:playListName,
            movies:[],
            createdAt:timestamp()            
        });
        setplayListName('');
    };

    const handleChange = (e) =>{
        setplayListName(e.target.value);
    }
    return(
        <div className="list-container">
            <button onClick={()=>setClick(!click)}>{click ? 'Cancel' : 'Add a Playlist'}</button>
            {
                click ? 
                    <>
                        <input type="text" placeholder="PlayList Name" onChange={handleChange}/> 
                        <button onClick={updateList}>Go</button>
                    </> : ''
            }
            {   until ? 
                    <>
                        <img src={loading} alt='Loading' width='70px' height='70px'/>
                    </> : 
                notes && notes.map((note)  => {
                return (
                    <div key={note.id}>
                        <SideBarItem
                        note={note} 
                        id={note.id} 
                        val={val}
                        setVal={setVal}
                        cenId={cenId}
                        setCenId={setCenId}
                        play={play}
                        setPlay={setPlay}
                        setListMovies={setListMovies}>
                        </SideBarItem>
                    </div>
                )})
            }
        </div>
    );
}

export default SideBar;
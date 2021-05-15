import React, { useState,useEffect } from 'react';
import {firestore,timestamp} from './config.js';
import SideBarItem from './SideBarItem.js';
import loading from './loading.gif';


function SideBar(props){
    //make another collection and store all the note names in it
    const {val,setVal,cenId,setCenId,setListMovies} = props;
    const storeNameRef = firestore.collection('notes');
    const [click,setClick] = useState(false);
    const [playListName,setplayListName] = useState('');
    const [play,setPlay] = useState(false);    
    const [notes,setNotes] = useState(null);
    const [until, setUntil] = useState(true);
    const [hit,setHit] = useState(true);

    const getPlayLists = () => {
      storeNameRef.orderBy('createdAt','desc').onSnapshot( 
          snap => {
              const notesArray = [];
              snap.forEach(_doc => {
                      const data = _doc.data();
                      data['id'] = _doc.id;
                      notesArray.push(data);
              });
          setNotes(notesArray);
          setUntil(false);
          setHit(false);
          });   
    }

    const updateList = async() =>{
        setClick(false);
        var array = [];
        await storeNameRef.where("name", "==", playListName).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data()['name']);
                array.push(doc);
            });
        });
        if(array.length===0){
            await storeNameRef.doc(playListName).set({
                name:playListName,
                movies:[],
                createdAt:timestamp()            
            });
        }
        else{
            window.alert('Playlist with given name already present in the DB');
        }
        setplayListName('');
        //setNotes([...notes]);
    };

    const handleChange = (e) =>{
        setplayListName(e.target.value);
    }
    return(
        <div className="list-container">
            {hit ? getPlayLists() : ''}
            {until ? <img src={loading} alt='Loading' width='70px' height='70px'/> :
            <>
                <div className='addPlaylist'>
                    <button onClick={()=>setClick(!click)}>{click ? '-' : '+'}</button>
                    {
                            click ? 
                                <div>
                                    <form onSubmit={updateList}>
                                        <input type="text" onChange={handleChange} required/> 
                                        <button type='submit'>Go</button>
                                    </form>   
                                </div> : ''
                    }  
                </div>
                <div className='listNote'>
                {
                    notes.length>0 && notes.map((note)  => {
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
            </>
            }
        </div>
    );
}

export default SideBar;
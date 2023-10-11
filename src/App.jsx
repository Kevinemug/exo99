import { useEffect, useState } from 'react'
import Editor from "./components/Editor"
import Sidebar from './components/Sidebar'
import Split from 'react-split';
import {nanoid} from "nanoid"
//react mde  style
import "react-mde/lib/styles/css/react-mde-all.css";


export default function App() {
  //lazy state initialization (retrieve notes from local storage)
  const [notes, setNotes] = useState( () => JSON.parse(localStorage.getItem("notes")) || []);

  // check if notes[0] exists Before getting notes[0].id
  const [curNoteId, setCurNoteId] = useState((notes[0]  && notes[0].id) || "");



//Store note in window local storage

  useEffect(()=>{
    localStorage.setItem("notes",  JSON.stringify(notes))

  },[notes])


// Move  updated/modified note to the top 
const updateNote =(text)=>{
  setNotes(oldNotes =>{
  let updatedArr = [];
  for(let i = 0; i < oldNotes.length; i++){
    let oldNote  = oldNotes[i] ;
    if(oldNote.id === curNoteId){
      updatedArr.unshift({...oldNote, body: text});
    }else{
      updatedArr.push(oldNote)
    }
  }
  return updatedArr
  })
}


//Delete note
function deleteNote(event, noteId){
  // prevents the propagation of an event to its parent elements 
  event.stopPropagation();
  setNotes(notes => notes.filter((note)=>(note.id !== noteId)) )

}


  // Create a new note 
  const createNewNote = ()=>{
    const newNote ={
      id: nanoid(),
      body:"# Type your markdown note title here"
    }
    setNotes(prevNotes => [newNote , ...prevNotes]);
    setCurNoteId(newNote.id)
  }


  //find curremt note
  function findCurrentNote (){
    return notes.find(note=>{
      return note.id === curNoteId }) || notes[0] ;
  }
 

  return (
    <main >

      {notes.length > 0 ?

<Split
sizes={[25, 75]}
direction="horizontal" 
className="split">

<Sidebar 
newNote={createNewNote} 
currentNote={findCurrentNote()} 
setCurNoteId={setCurNoteId} 
notes={notes} 
deleteNote={deleteNote}
/>

{curNoteId &&  notes.length > 0 && 
  <Editor 
  currentNote={findCurrentNote()} 
  updateNote={updateNote} />
}
</Split>
:
      
<div className="no-notes">
<h1>You have no notes</h1>
<button className="first-note" onClick={createNewNote}>
    Create one now
</button>
</div>
      
      }
      
     
    </main>
  )
}
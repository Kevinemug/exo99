import { useEffect, useState } from 'react'
import Editor from "./components/Editor"
import Sidebar from './components/Sidebar'
import Split from 'react-split';
import {nanoid} from "nanoid"
import "react-mde/lib/styles/css/react-mde-all.css";


export default function App() {
  const [notes, setNotes] = useState( () => JSON.parse(localStorage.getItem("notes")) || []);
  const [curNoteId, setCurNoteId] = useState((notes[0]  && notes[0].id) || "");
  useEffect(()=>{
    localStorage.setItem("notes",  JSON.stringify(notes))

  },[notes])

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

function deleteNote(event, noteId){
  event.stopPropagation();
  setNotes(notes => notes.filter((note)=>(note.id !== noteId)) )

}

  const createNewNote = ()=>{
    const newNote ={
      id: nanoid(),
      body:"# New note title",
    }
    setNotes(prevNotes => [newNote , ...prevNotes]);
    setCurNoteId(newNote.id)
  }

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
<h1>Opps!! your mark down is empty</h1>
<button className="first-note" onClick={createNewNote}>
    Add notes
</button>
</div>
      
      }
      
     
    </main>
  )
}
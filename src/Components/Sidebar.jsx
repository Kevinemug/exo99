/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import img from "../assets/images/icons8-note.svg"
import { useMemo } from "react";

export default function({newNote, notes, currentNote, setCurNoteId, deleteNote}){
    const numberOfItemShown = 7
    const noteElements = useMemo(()=>(
        notes.slice(0, numberOfItemShown).map((note)=>(
            <div key={note.id}>
               <div className={`title ${note.id === currentNote.id ? "selected-note" : ""}`}
    
                onClick={()=> setCurNoteId(note.id)}>
                   <img src={img}/>
               <h4 className="text-snippet">{note.body.split("\n")[0]} </h4>
               
               <button  className="delete-btn" onClick={(event) => deleteNote(event, note.id)} >
                        <i className="gg-trash trash-icon"></i>
                    </button>
               </div>
            </div>
        ))
    )) 

    return(
       
        <aside className="sidebar pane">
            <div>
            <div className="sidebar__header">
                <button className="sidebar__new-note" onClick={newNote}>+   New Note</button>
            </div>
            {noteElements.length ? noteElements : "loading..."}
           </div>
           
        </aside>
    );
}
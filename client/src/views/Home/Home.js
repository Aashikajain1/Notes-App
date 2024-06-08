import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NoteCard from "./../../components/NoteCard/NoteCard"
import { Link } from 'react-router-dom';
import AddIcon from './add.png';

function Home() {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);

    setNotes(response.data.data);
  }

  useEffect(() => {
    loadNotes();
  }, [])

  return (
    <div>
      <h1 className='text-center text-light'>All Notes</h1>

      {
        notes.map((note) => {
          const {_id, title, content, category} = note;

          return (<NoteCard key={_id} _id={_id} title={title} content={content} category={category} loadNotes={loadNotes}/> )
        })
      }
       <button
          type='button'
          className='bg-black text-white fs-3 px-4 py-3 border border-0 rounded-pill d-block ' style={{cursor:"pointer",margin:"20px auto"}}>
          <Link to='/new-note' className='d-flex text-white text-decoration-none fs-5'>
          <img src={AddIcon}
          alt='add-icon'
          style={{height:"35px"}}
          className='me-2'/>
          Add Notes
          </Link>
        </button>
    </div>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NoteCard from "./../../components/NoteCard/NoteCard"

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
    </div>
  )
}

export default Home

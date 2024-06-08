import React from 'react'
import './NoteCard.css'
import DeleteIcon from "./trash.png"
import UpdateIcon from "./pen-circle.png"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function NoteCard({ _id, title, content, category, loadNotes }) {

  const deleteNote = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${_id}`)
    toast.success(response.data.message)
    loadNotes()
  }

  return (
    <div className='card px-1 py-3 w-50 mb-4' style={{marginLeft:"25%",boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.1)",cursor:"pointer"}}>
      <h3>{title}</h3>
      <p>{content}</p>
      <span className='note-card-category'>{category}</span>
      <img src={DeleteIcon}
        alt='delete-icon'
        className='delete-icon'
        onClick={deleteNote} />

      <Link to={`/update/${_id}`}>
        <img src={UpdateIcon}
          alt='update-icon'
          className='update-icon' />
      </Link>
    </div>
  )
}

export default NoteCard

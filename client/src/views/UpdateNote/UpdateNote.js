import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

function NewNote() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const loadNote = async (id) => {
    if(!id) return

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`)

    setTitle(response.data.data.title)
    setCategory(response.data.data.category)
    setContent(response.data.data.content)
  }

  const updateNote = async () => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
      title: title,
      category: category,
      content: content
    })

    toast.success(response.data.message)

    window.location.href = '/'
  }

  const {id} = useParams()

  useEffect(()=>{
    loadNote(id)
  }, [id])

  return (
    <div>
      <h1 className='text-center text-light fs-1'>Update Note</h1>

      <form className='bg-light w-50 p-4 rounded'style={{margin:"50px auto"}}>
        <input type='text'
          value={id}
          disabled
          className='w-100 py-2 fs-5 mb-4'
          />

        <input type='text'
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          className='w-100 py-2 fs-4 mb-4'
        />

        <select value={category}
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          className='w-100 py-2 fs-5 mb-4'>
          <option value="">Select a category</option>
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="learning">Learning</option>
          <option value="other">Other</option>
        </select>

        <input type='text'
          placeholder="Content"
          value={content}
          className='w-100 py-2 fs-4 mb-4'
          onChange={(e) => {
            setContent(e.target.value)
          }} />

        <button
          type='button'
          onClick={updateNote}
          className='bg-black text-white fs-3 px-4 py-3 border border-0 rounded-pill d-block ' style={{cursor:"pointer",margin:"20px auto"}}>
          Update
        </button>
      </form>
    </div>
  )
}

export default NewNote

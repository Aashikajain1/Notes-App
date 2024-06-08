import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import Exit from './sign-out-alt.png'
import { Link } from 'react-router-dom';

function NewNote() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const addNote = async() => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes`,
    {
      title: title,
      category: category,
      content: content
    })

    toast.success(response.data.message)
    setTitle('')
    setCategory('')
    setContent('')
  }

  return (
    <div>
      <h1 className='text-center mb-3 text-light'>NewNote</h1>
      <form className='bg-light w-50 h-25 px-2 py-3 border-rounded' style={{marginLeft:"25%",boxShadow:"0 0 10px rgb(255,255,255)"}}>
      <Link to="/"><img src={Exit}
          alt='exit-icon'
          style={{height:"30px"}}
          className='mb-3 mt-0'/></Link><br/>
        <input type='text'
          placeholder="Title"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
          className='w-75 fs-4 py-2 mb-4'style={{marginLeft:"12%"}}
          /><br/>

        <select value={category}
          onChange={(e)=>{
            setCategory(e.target.value)
          }}
          className='w-75 fs-4 py-2 mb-4'style={{marginLeft:"12%"}}>
          <option value="">Select a category</option>
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="learning">Learning</option>
          <option value="other">Other</option>
        </select><br/>

        <input type='text'
          placeholder="Content"
          value={content}
          className='w-75 fs-4 py-2 mb-4'style={{marginLeft:"12%"}}
          onChange={(e)=>{
            setContent(e.target.value)
          }} /><br/>

        <button
          type='button'
          onClick={addNote}
          style={{margin: "20px auto"}}
          className='bg-black text-white fs-3 px-4 py-3 border-0 rounded-pill d-block'>
          Save
        </button>
      </form>
    </div>
  )
}

export default NewNote

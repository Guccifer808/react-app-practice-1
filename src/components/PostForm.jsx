import React from 'react'
import MyInput from './UI/input/MyInput';
import Button from './UI/button/Button';
import { useEffect, useState } from "react";

const PostForm = ({create}) => {

const [post, setPost] = useState({title: '', body: ''})

const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
        ...post, id: Date.now()
    }
    create(newPost)
    //Очищаем input после
    setPost({title: '', body: ''})
  
  }


  return (
    
    <form>
    {/*Управляемый компонент. Двухсторонее связывание */}
    <MyInput 
    value={post.title}
    onChange={e => setPost({...post, title: e.target.value})}
    type="text" 
    placeholder='Post Name' 
    />
            <MyInput 
    value={post.body}
    onChange={e => setPost({...post, body: e.target.value})}
    type="text" 
    placeholder='Post Name' 
    />

    {/*//НЕУправляемый компонент 
            <MyInput 
    ref={bodyInputRef}
    type="text" 
    placeholder='Description Name' 
    />
    */}

    <Button onClick={addNewPost}>Create Post</Button>
  </form>
  )
}

export default PostForm
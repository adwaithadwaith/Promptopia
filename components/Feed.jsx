'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { searchPost } from "@lib/search"

const Feed = () => {

  const [searchText,setSearchText] = useState('')
  const [ posts, setPosts] = useState([])
  const  [filteredPost, setFilteredPost] = useState([])

  useEffect(()=>{
    const fetchPost = async ()=>{
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
      setFilteredPost(data)
    }
    console.log(posts)
    fetchPost()
    
  },[])

  const handleSearchChange = (e)=>{
    console.log(e.target.value)
    const searchValue = e.target.value.toLowerCase()
    setSearchText(searchValue)
    console.log(searchValue+" :searchText")


    const newFilterdPosts = searchPost(posts,searchValue)
    setFilteredPost(newFilterdPosts)
    console.log(filteredPost ? "filteredpost are there" : "no filtered post")
  }


  const PromptCardList = ({data, handleTagClick})=>{
    
    return(
      <div className="mt-16 prompt_layout">
        {data.map((post)=> (
          <PromptCard
          key={post.id}
          post ={post}
          handleTagClick = {handleTagClick}
          />
        )
        )}
      </div>
    )

  }

  return (
    
    <section className="feed">
      <form className="relative w-full flex-center" action="">
        <input type="text" placeholder="Search for tags or username" value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>
      <PromptCardList
      data = {filteredPost}
      // handleTagClick = {()=> }
      />

    </section>
  )
}

export default Feed
'use client'

import { useState,useEffect, Suspense} from 'react'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Profile } from '@components/Profile'


const MyProfile = () => {
  const router = useRouter()

    const {data: session} =  useSession()

    const [posts,setPosts] = useState([])
    useEffect(()=>{

        const fetchPost = async ()=>{
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)

        }
        
        session?.user.id && fetchPost()
      },[])

    const handleEdit = async(post)=>{
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post)=>{
      const hasConfirmed = confirm("Are you sure you want to delete the prompt ?")
      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: 'DELETE'
          })

          const filteredPosts = posts.filter((p)=> p._id !== post._id )
          setPosts(filteredPosts)
        } catch (error) {
          console.log(error)
        }
      }
    }
    

  return (
    <Profile
        name ="My"
        desc ="welcome to your personlized profile page"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
    
  )
}

export default MyProfile

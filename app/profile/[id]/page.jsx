'use client'
import { Profile } from '@components/Profile'
import React,{useState,useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
const OtherProfile = () => {


    const search = useSearchParams()
    const postCreator_id = search.get('id')

    const [posts,setPosts] = useState([])
    const [creator,setCreator] = useState(null)
    useEffect(()=>{
        const fetchPost = async ()=>{
          const response = await fetch(`/api/users/${postCreator_id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
        const fetchUser = async ()=>{
          try{
            const response = await fetch(`/api/users/${postCreator_id}`)
          const [data] = await response.json()
          setCreator(data)
          } catch(error){
            console.log("fetching post failed"+error)
          }
          
        }
        postCreator_id && fetchPost() && fetchUser()
      },[])

    

  return (
    <>
    {creator? <Profile
        name = {`${creator.username}`}
        desc ={`welcome to ${creator.username}'s profile page`}
        data = {posts}
        handleEdit = {()=>{}}
        handleDelete = {()=>{}}
    /> : 
       <div className=' text-lg '>
        Fetching User....
       </div>
    }
    </>
   
  
    
  )
}

export default OtherProfile

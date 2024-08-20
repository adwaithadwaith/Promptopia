'use client';

import {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';

import { Form } from '@components/Form';

const EditPrompt = () => {
    const router = useRouter()
    
    const [submitting, setSubmitting] = useState(false)
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(()=>{
        const getPromptDetails = async ()=>{
            const response = await fetch(`/api/prompt/${promptId}`)

            const data = await response.json()
            console.log(data)
            setPost({
                prompt : data.prompt,
                tag: data.tag
            })
        }

        promptId && getPromptDetails()
    },[promptId])

    const updatePrompt = async (e) =>{
        e.preventDefault();
        setSubmitting(true)
        if(!promptId) return alert('Prompt ID not found')
        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
                method : 'PATCH',
                body : JSON.stringify({
                    prompt : post.prompt,
                    tag : post.tag
                })
    
            })

            if(response.ok){
                router.push('/')
            }
        }
        catch(err){
            console.log(err)
            submitting(false)
        }

    }

  return (
    <Form
          type = 'Edit' 
          post = {post}
          setPost = {setPost}
          submitting = {submitting}
          handleSubmit = {updatePrompt}

    />
  )
}

export default EditPrompt

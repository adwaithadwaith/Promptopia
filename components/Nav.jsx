'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'
import { useRouter } from 'next/navigation';

 const Navbar = () => {
  const router = useRouter()

  const {data: session} = useSession()
  const [providers,setProviders] = useState(null) 
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(()=>{
    const setProvider = async () => { //changed to setProvider. Initally it was setProviders
      const response = await getProviders();
      setProviders(response)
    }

    setProvider();
    // console.log(providers)//changed to setProvider. Initally it was setProviders
  },[])

  const handleSignOut = async ()=>{
    await signOut()
    router.push('/')
  }
  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image src="/assets/images/logo.svg" alt='Proptopia Logo' width={30} height={30} className='object-contain'></Image>
          <p className='logo_text'>Promptopia</p>
        </Link>
        
      

        {/* desktop navigation */}
        <div className='sm:flex hidden'>
          {session?.user? (
            <div className='flex gap-3 md:gap-5'>
                  <Link href= '/create-prompt' className='black_btn'>
                    Create Post
                  </Link>
                  <button type='button' onClick={handleSignOut} className='outline_btn'>
                    Sign Out
                  </button>
                  

                  <Link href='/profile'>
                    <Image src={session?.user.image} alt= "Profile" width={37} height={37} className='rounded-full'></Image>
                  </Link>
            </div>
          ):(
          <>
          
          {providers && Object.values(providers).map((provider)=> (
            
            <button className='black_btn' type='button' key={provider.name} onClick={()=>{
              signIn(provider.id)
            }} > Sign In</button>
          ))}

          </>
        )}
        </div>

        

        {/* mobile nav */}
        <div className='sm:hidden flex relative'>
          {session?.user? (
            <div className='flex '>
                <Image src={session?.user.image} alt= "Profile" width={37} height={37} className='rounded-full' onClick={()=>{ setToggleDropdown((prev)=>!prev)
              }}/>
                {toggleDropdown && ( 
                <div className='dropdown'>
                <Link href='/profile' className='dropdown_link' onClick={()=>setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button type='button' onClick={()=>{setToggleDropdown(false);
                signOut();
                }} className='mt-5 w-full black_btn'>
                  Sign Out
                </button>
              </div> )}
              
              
            </div>
          ): ( <>
            {console.log(providers)}
            {providers && Object.values(providers).map((provider)=> (
              <button type='button' key={provider.name} onClick={()=>{
                signIn(provider.id)
              }} className='black_btn'> Sign In</button>
            ))}
  
            </>) }
        </div>

    </nav>
  )
}
export default Navbar



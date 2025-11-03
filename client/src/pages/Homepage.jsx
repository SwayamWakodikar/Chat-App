import React from 'react'
import { useState } from 'react'
import Chatcontainer from '../components/Chatcontainer';

const Homepage = () => {
    const[selectedUser,setSelectedUser]=useState(false);
  return (
    <div className='bg-amber-300 border w-full h-screen '>
        <Chatcontainer/>
    </div>
  )
}
export default Homepage

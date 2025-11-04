// import React from 'react'
import { useState } from 'react'
import Chatcontainer from '../components/Chatcontainer';
import Sidebar from '../components/Sidebar';
const Homepage = () => {
    const[selectedUser,setSelectedUser]=useState(false);
  return (
    <div className='grid grid-cols-4 h-screen'>
      <div className=' '><Sidebar/></div>
      <div className='bg-amber-950 col-span-2'><Chatcontainer/></div>
      <div className='bg-amber-300'></div>
    </div>
  )
}
export default Homepage

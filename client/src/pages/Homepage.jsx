import React from 'react'
import Sidebar from '../components/Sidebar'
import Chatcontainer from '../components/Chatcontainer'
import RightSidebar from '../components/RightSidebar'
import { useState } from 'react'

const Homepage = () => {
    const[selectedUser,setSelcetedUser]=useState(false);
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
        <div className='backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-3 relative'>
            <Sidebar selectedUser={selectedUser} setSelectedUser={setSelcetedUser}/>
            <Chatcontainer selectedUser={selectedUser} setSelectedUser={setSelcetedUser}/>
            <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelcetedUser}/>
        </div>
    </div>
  )
}

export default Homepage

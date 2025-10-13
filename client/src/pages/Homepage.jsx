import React from 'react'
import Sidebar from '../components/Sidebar'
import Chatcontainer from '../components/Chatcontainer'
import RightSidebar from '../components/RightSidebar'

const Homepage = () => {
    const[selectedUser,setSelctedUser]=useState(false);
  return (
    <div className='border w-full h-screen sm:px[15%] sm:py[5%]'>
        <div className='backdrop-vlur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative'>
            <Sidebar/>
            <Chatcontainer/>
            <RightSidebar/>
        </div>
    </div>
  )
}

export default Homepage
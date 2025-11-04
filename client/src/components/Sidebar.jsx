
import { useNavigate } from 'react-router-dom'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
        <div className='flex justify-center text-5xl text-bold'>
        ChatApp
    </div>
    <div className="flex justify-center mt-4">
      <div className="relative w-4/5">
        <input
          type="text"
          placeholder="Search or start a chat…"
          className="w-full py-3 pl-12 pr-4 rounded-3xl bg-gradient-to-r from-amber-100 to-amber-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500 transition-all duration-200"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 text-lg pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z" />
          </svg>
        </span>
      </div>
    </div>
    </div>
    
    
  )
}

export default Sidebar
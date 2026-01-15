import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chatcontainer from '../components/Chatcontainer';
import Sidebar from '../components/Sidebar';
import { io } from "socket.io-client";
import { host, quickLoginRoute } from "../utils/APIRoutes";

const Homepage = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    async function checkUser() {
      if (!localStorage.getItem("chat-app-user")) {
        // Do not redirect, waiting for input
        setIsLoaded(true);
      } else {
        setCurrentUser(
          JSON.parse(localStorage.getItem("chat-app-user"))
        );
        setIsLoaded(true);
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host); // Connects to the same host/port as API (localhost:5000)
      socket.current.emit("join", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleQuickLogin = async (e) => {
    e.preventDefault();
    if (usernameInput.length < 3) {
      alert("Username must be at least 3 characters.");
      return;
    }

    try {
      const response = await fetch(quickLoginRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput }),
      });
      const data = await response.json();
      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!currentUser) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#131324] gap-4">
        <h1 className="text-white text-3xl font-bold">Welcome to ChatApp</h1>
        <form onSubmit={handleQuickLogin} className="flex flex-col gap-4 items-center bg-[#00000076] p-10 rounded-2xl">
          <h2 className="text-white text-xl">Who are you?</h2>
          <input
            type="text"
            placeholder="Enter Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="p-2 rounded-md border-none focus:outline-none"
          />
          <button type="submit" className="bg-[#4e0eff] text-white py-2 px-8 rounded-md font-bold hover:bg-[#997af0] transition duration-300">
            Join Chat
          </button>
          <p className="text-gray-400 text-sm">Enter any name to create or join as that user.</p>
        </form>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-4 h-screen bg-[#131324]'>
      <div className='col-span-1 border-r border-gray-700'>
        <Sidebar currentUser={currentUser} changeChat={handleChatChange} />
      </div>
      <div className='col-span-3'>
        {isLoaded && currentChat === undefined ? (
          <div className="flex justify-center items-center h-full flex-col text-white">
            <h1 className="text-3xl">Welcome, {currentUser?.name}!</h1>
            <h3 className="text-lg">Please select a chat to Start Messaging.</h3>
          </div>
        ) : (
          currentChat && <Chatcontainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </div>
  )
}
export default Homepage

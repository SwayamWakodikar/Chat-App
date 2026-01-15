import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { sendMessageRoute, receiveMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

const Chatcontainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      if (currentChat) {
        const response = await fetch(receiveMessageRoute, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: currentUser._id,
            to: currentChat._id,
          }),
        });
        const data = await response.json();
        setMessages(data);
      }
    }
    fetchMessages();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await fetch(sendMessageRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      }),
    });

    socket.current.emit("send_message", {
      sender: currentUser._id,
      receiver: currentChat._id,
      content: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    const handleNewMessage = (data) => {
      // Verify if the message is from the user we are currently chatting with
      if (data.sender === currentChat._id) {
        setArrivalMessage({ fromSelf: false, message: data.content });
      }
    };

    if (socket.current) {
      socket.current.on("newMessage", handleNewMessage);
    }

    return () => {
      if (socket.current) {
        socket.current.off("newMessage", handleNewMessage);
      }
    };
  }, [currentChat]); // Re-bind if currentChat changes

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="pt-4 grid grid-rows-[10%_80%_10%] gap-[0.1rem] overflow-hidden h-full">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12">
            <div className="h-full w-full rounded-full bg-purple-500 flex items-center justify-center text-lg font-bold">
              {currentChat.avatarImage ? (
                <img src={currentChat.avatarImage} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                currentChat.name[0].toUpperCase()
              )}
            </div>
          </div>
          <div className="username">
            <h3 className="text-white text-lg">{currentChat.name}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages flex flex-col gap-4 overflow-auto px-8 py-4 custom-scrollbar">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message flex ${message.fromSelf ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`content max-w-[40%] break-words p-4 text-base rounded-[1rem] text-[#d1d1d1] ${message.fromSelf
                    ? "bg-[#4f04ff21]"
                    : "bg-[#9900ff20]"
                    }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};
export default Chatcontainer;

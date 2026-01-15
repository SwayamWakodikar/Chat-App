import React, { useState } from "react";

const ChatInput = ({ handleSendMsg }) => {
    const [msg, setMsg] = useState("");

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    return (
        <div className="grid grid-cols-[5%_95%] items-center bg-[#080420] px-8 pb-1">
            <div className="button-container flex items-center text-white gap-4">
                {/* Emoji Icon could go here */}
            </div>
            <form className="input-container w-full rounded-[2rem] flex items-center gap-8 bg-[#ffffff34] px-4" onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                    className="w-[90%] h-[60%] bg-transparent text-white border-none pl-4 text-lg focus:outline-none"
                />
                <button type="submit" className="px-8 py-2 rounded-[2rem] flex justify-center items-center bg-[#9a86f3] border-none">
                    {/* Send Icon */}
                    <span className="text-white text-xl">➤</span>
                </button>
            </form>
        </div>
    );
}

export default ChatInput;

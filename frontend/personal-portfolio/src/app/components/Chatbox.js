"use client";  // Add this line
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image";
import axios from 'axios'
export default function Chatbox({closeChat}){

    const [messages, setMessages] = useState([
        {id:1, type:"bot", content:"hello"}
    ]);
    const [message, setMessage] = useState("");

    const sendMessage=async (event)=>{
        event.preventDefault(); 
        if (message.trim() === "") return;

        try {
            
            const response = await axios.post("http://127.0.0.1:8000/chat", { text: message });
            console.log(response.data);
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: prevMessages.length + 1, type: "user", content: message },
                { id: prevMessages.length + 2, type: "bot", content:response.data.response },
                
            ]);
        
            setMessage("");
        } catch (error) {
            console.log(error);
        }

        

    };
   
    return (
        <> 
       <div className="bg-amber-50 rounded-xl border border-amber-600 shadow-lg flex flex-col items-center justify-between max-w-sm mx-auto h-[400px]">
        {/* Header */}
        <div className="flex justify-between items-start w-full px-4 py-2">
            <div className="flex items-center space-x-2">
                <Image
                    className="w-8 h-8 rounded-full object-cover border-2 border-amber-600 shadow-md"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={32}
                    height={32}
                    priority
                />
                <span className="font-semibold text-lg text-amber-600">Chatbox Assistant</span>
            </div>
            <div className="w-4 h-4 flex items-center justify-center cursor-pointer bg-amber-500 rounded-full hover:bg-amber-600">
                <button onClick={closeChat} className="text-white">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto flex flex-col min-h-0 w-full">
            {messages.map((msg) => (
            <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[75%] ${
                msg.type === "bot"
                    ? "bg-gray-200 self-start"
                    : "bg-amber-500 text-white self-end"
                }`}
            >
                {msg.content}
            </div>
            ))}
        </div>

        {/* Input Box */}
        <div className="px-4 py-2 flex items-center justify-between w-full border-t border-amber-200">
            <form onSubmit={sendMessage} className="flex w-full items-center">
            <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="border border-amber-300 rounded-full w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Type a message"
            />
            <button
                type="submit"
                className="ml-2 bg-amber-600 text-white rounded-full px-4 py-2 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
                Send
            </button>
            </form>
        </div>
        </div>

        </>
    )

}
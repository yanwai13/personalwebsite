"use client";  // Add this line

import React, { useState } from "react";
import Head from 'next/head'
import Image from "next/image";
import Chatbox from './Chatbox.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faBrain, faBullhorn } from "@fortawesome/free-solid-svg-icons";

export default function MainPage (){
    const [formData, setFormData] = useState({ email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [isOpenChat, setIsOpenChat] = useState(true);
    const [isChatbox, setIsChatbox] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
      };
      const toggleModal= () => {       
        console.log("click the model");
        setIsOpenChat(false);
        setIsChatbox(true);
       
      };
      const closeChatbox = ()=>{
        setIsChatbox(false);
        setIsOpenChat(true);
      };
    return (
        <>       
        <div className="relative flex p-6 flex-col items-center justify-center bg-yellow-500 space-y-6">
            <div className="flex-1 flex items-center justify-center">
                <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
                />
            </div> 
            <div className="m-8 md:flex md:items-center md:justify-center ">
              <div className="flex-1 flex items-center justify-center">
                  <Image
                  className="m-auto w-64 h-64 object-cover rounded-full"
                  src="/profile/profile_photo.png"
                  alt="profile pic"
                  width={144}  
                  height={144} 
                  priority
                  />
              
              </div>
              <div className="mt-4 md:mt-0 flex-1 space-y-2">  
                  <p className="text-2xl font-bold leading-6 text-amber-900">About Me</p>
                  <p className="  md:w-[80%] text-normal leading-6 text-white ">
                  Hi, I am a passionate Web Developer with a background in Digital Marketing. My journey started in the world of marketing, where I analyzed trends, crafted strategies, and optimized campaigns. Over time, I realized the power of technology in solving marketing challenges, which led me to transition into full-stack development. Now, I specialize in building applications that help businesses and marketers make data-driven decisions with ease.
                  </p>
              </div>
          </div>
          <div className="m-2 flex flex-col items-center justify-center space-y-2">
              <div className="m-2 text-2xl font-bold leading-6 text-amber-900">
                What I Offer                
              </div>
              <div className="space-y-4 md:flex md:space-x-3 ">
                  <div className="flex-1 flex-col flex items-center justify-center">
                      <FontAwesomeIcon icon={faCode} className=" text-4xl text-amber-200 m-4"/>
                      <p className="text-white text-xl m-2 block"> 
                        Full-Stack Development – From front-end design to back-end architecture, I build scalable and efficient web applications.
                      </p>
                  </div>
                  <div className="flex-1 flex-col flex items-center justify-center">
                    <FontAwesomeIcon icon={faBrain} className=" text-4xl text-amber-200 m-4"/>
                    <p className="text-white text-xl m-2 block">  
                      NLP-Powered Solutions – I have a deep passion for Natural Language Processing, particularly in analyzing and improving social media content
                    </p>
                  </div>
                  <div className="flex-1 flex-col flex items-center justify-center">
                    <FontAwesomeIcon icon={faBullhorn} className=" text-4xl text-amber-200 m-4"/>
                    <p className="text-white text-xl m-2 block">  
                    Marketing-Focused Applications – I develop tools that help brands optimize engagement, analyze sentiment, and enhance their online presence.
                    </p>
                  </div>
              </div>
              <div className="m-2 text-normal md:m-2 md:text-2xl font-bold leading-6 text-amber-900">
                What I Offer
                If you are looking for a developer who understands both technology and marketing, lets collaborate!           
              </div>             
          </div>
          <div className="m-4 w-xl md:w-2xl p-6 bg-amber-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">Have a project in mind? Reach out!</p>
            {submitted ? (
              <p className="text-green-600 font-semibold">Thanks! I’ll be in touch.</p>
            ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label className="flex flex-col">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border rounded p-2"
                />
              </label>
              <label className="flex flex-col">
                Message:
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border rounded p-2 h-24"
                ></textarea>
              </label>
              <button type="submit" className="bg-amber-600 text-white p-2 rounded focus:bg-amber-900">
                Send
              </button>
            </form>
             )}
          </div>         
          <div className="absolute right-0 bottom-0 m-4 md:m-2">
            {isOpenChat ? ( 
              <button type="button" onClick={toggleModal}  className="rounded-full bg-amber-50">
              <FontAwesomeIcon icon={faCode} className=" text-sm text-amber-200 m-4"/>
              </button>
              ) 
              : null}
               {isChatbox && <Chatbox closeChat={closeChatbox}/>  }
            
          </div>
        </div>
       
        
      
        
       
    </>
    )
}
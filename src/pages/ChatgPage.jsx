import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from "react";


import bgImg from '../assets/personal/bgImg.png'



export default function ChatPage() {

  const { id } = useParams();
  const location = useLocation();
  const chat = location.state?.chat;

  const chatEndRef = useRef(null);



  const navigate = useNavigate();

  const goBack = () => {
    navigate("/whats-app");
  };


  const messages = [
    { id: 1, message: "k", time: "4:54 PM" },
    { id: 2, message: "?", time: "5:21 PM" },
    {
      id: 3,
      type: "text",
      message: "ill pay right now",
      time: "7:23 PM",
      location: "oponent",
    },
    {
      id: 3,
      type: "text",
      message: "K bro",
      time: "7:23 PM"
    },
    {
      id: 3,
      type: "text",
      message: "wait",
      time: "7:23 PM",
      location: "oponent"
    },

    {
      id: 4,
      message: `Hi!We’ve received your payment successfully ✅
Your order is now being packed 📦 and will be dispatched soon ✈️

Thank you for shopping with 
FASHION FRIDAY 🛒`,
      time: "7:54 PM",
    },
    { id: 5, message: "Bro size", time: "7:58 PM" },
  ];

  // Scroll to bottom on mount or new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({});
    }
  }, [messages.length]);


  return (
    <div
      className="h-screen text-white font-sans bg-cover bg-center relative select-none"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80">
        <div className="relative z-0">
          {/* Header */}
          <div className="flex justify-between items-center gap-3 sticky z-[100] top-0 bg-[#0c1013] p-3">
            <div className="flex gap-2 items-center w-full">
              <span className="material-symbols-outlined text-gray-300 rounded-fullcursor-pointer [tap-highlight-color:transparent]" onClick={goBack} >
                arrow_left_alt
              </span>
              <img
                src={chat.image}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-lg text-gray-300">{chat.name}</h2>
                <p className="text-xs text-gray-400">online</p>
              </div>
            </div>

            <div className="flex gap-4 text-gray-300">
              <span class="material-symbols-rounded">
                videocam
              </span>
              <span class="material-symbols-rounded">
                call
              </span>
              <span class="material-symbols-rounded">
                more_vert
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-1 overflow-y-auto px-2   h-[76%] flex flex-col pt-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`px-3 py-1 relative rounded-xl pb-2 max-w-xs whitespace-pre-wrap ${msg.location === "oponent"
                  ? "bg-[#353535] mr-auto text-left"
                  : "bg-[#134d37] ml-auto"
                  }`}
              >
                <p className="mr-[75px]">{msg.message}</p>

                <div className="flex items-center gap-2 text-xs absolute right-2 bottom-[0.01px] text-gray-500">
                  {msg.time}

                  {msg.location != "oponent" ? (
                    <span class="material-symbols-sharp text-lg text-blue-300">
                      done_all
                    </span>
                  ) : ""}
                </div>
              </div>
            ))}

            {/* 👇 Invisible div to scroll to */}
            <div ref={chatEndRef} />
          </div>


          {/* Input Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-2 bg-transparent flex items-center gap-3 w-full">
            <div className="flex items-center px-3 py-1.5 bg-[#1f272a] rounded-full text-gray-600">
              <span class="material-symbols-rounded">
                add_reaction
              </span>
              <input
                type="text"
                placeholder="Message"
                className="flex-1 px-4 py-2 bg-transparent w-[90%] text-white text-lg focus:outline-none placeholder-gray-600"
              />
              <div className="flex gap-4">
                <span class="material-symbols-rounded">
                  attach_file
                </span>

                <span class="material-symbols-rounded">
                  photo_camera
                </span>

              </div>
            </div>
            <button className="flex items-center justify-center bg-[#fafafa] hover:bg-[#128c7e] text-gray-900 w-[50px] h-[50px] px-4 py-2 rounded-full">
              <span class="material-symbols-outlined">
                mic
              </span>
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}

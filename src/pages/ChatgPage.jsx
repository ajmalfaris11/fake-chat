import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";

import bgImg from '../assets/personal/bgImg.png'



export default function ChatPage() {

  const { id } = useParams();
  const location = useLocation();
  const chat = location.state?.chat;
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    profile: "",
    status: "",
  })

  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(userData);

  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profile: reader.result }));
        setEditData({ ...editData, profile: reader.result })
      };
      reader.readAsDataURL(file);
    }
  };

  const chatData = {
    "chat": [{
      "from": "",
      "message": "",
      "time": "",
      "type": "",
    }],
    mode: "",
  }



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

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
    console.log('Message:', e.target.value);
  };

  return (
    <div
      className="h-screen text-white font-sans bg-cover bg-center relative select-none"
      style={{ backgroundImage: `url(${bgImg})` }}
    >

      {/* Popup Editor */}
      {showPopup && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50 h-[100vh] relative w-full">
          <div className="bg-gray-900/50 space-y-4 shadow-lg h-full w-full flex  flex-col items-center">
            <h3 className="text-lg font-bold mb-2 bg-gray-900/50 w-full text-center p-4 border-b-[0.5px] border-gray-800">EDIT PROFILE</h3>

            <div
              className="w-[100px] h-[100px] bg-white rounded-full relative flex justify-center items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${userData.profile || chat.image})` }}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="w-5 h-5 rounded-full bg-green-500 absolute z-10 right-3 bottom-1 flex justify-center items-center cursor-pointer">
                <span className="material-symbols-sharp text-sm text-white">edit</span>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="Name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-4 py-4 border border-gray-700 rounded-2xl bg-transparent text-white"
              />
              <input
                type="text"
                placeholder="Status"
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
                className="w-full px-4 py-4 border border-gray-700 rounded-2xl bg-transparent text-white"
              />
            </div>

            <div className="flex w-full justify-between fixed bottom-0">
              <button
                onClick={() => setShowPopup(false)}
                className="px-3 py-4 bg-white text-black w-[50%] rounded-tl-[24px] font-bold text-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setUserData(editData);
                  setShowPopup(false);
                }}
                className="px-3 py-4 bg-green-700 text-white w-[50%] rounded-tr-[24px] font-bold text-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black bg-opacity-80">
        <div className="relative z-0">
          {/* Header */}
          <div className="flex justify-between items-center gap-3 sticky z-[100] top-0 bg-[#0c1013] p-3">
            <div className="flex gap-2 items-center w-full" onClick={() => setShowPopup(true)}>
              <span className="material-symbols-outlined text-gray-300 rounded-fullcursor-pointer [tap-highlight-color:transparent]" onClick={goBack} >
                arrow_left_alt
              </span>
              <img
                src={userData.profile ? userData.profile : chat.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover object-center"
              />
              <div>
                <h2 className="text-lg text-gray-300">{userData.name != "" ? userData.name : chat.name}</h2>
                <p className="text-xs text-gray-400">{userData.status != "" ? userData.status : "online"}</p>
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-transparent w-[90%] text-white text-lg focus:outline-none placeholder-gray-600"
              />
              <div className="flex gap-4">
                <span class="material-symbols-rounded">
                  attach_file
                </span>

                {!message.length > 0 && (
                  <span className="material-symbols-rounded">
                    photo_camera
                  </span>
                )}

              </div>
            </div>
            {!message.length > 0 ? (
              <button className="flex items-center justify-center bg-[#fafafa] hover:bg-[#128c7e] text-gray-900 w-[50px] h-[50px] px-4 py-2 rounded-full">
                <span class="material-symbols-outlined">
                  mic
                </span>
              </button>
            ) : ""}

            {message.length > 0 && (
              <div className="flex gap-2">
                <span className="material-symbols-outlined rotate-180 bg-white w-12 h-12 rounded-full text-gray-900 text-[100] flex justify-center items-center text-center text-3xl leading-none">
                  send
                </span>
                <span className="material-symbols-outlined bg-white w-12 h-12 rounded-full text-gray-900 text-[100] flex justify-center items-center text-center text-3xl leading-none">
                  send
                </span>
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  );
}

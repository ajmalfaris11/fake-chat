import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import bgImg from "../assets/personal/bgImg.png";
import ToggleSwitch from "../components/ToggleSwitch";
import waDoneTick from "../assets/watsapp/waDoneTick.webp"
import chatLeftCorner from "../assets/watsapp/chatLeftCorner.webp"
import chatRightCorner from "../assets/watsapp/chatRightCorner.webp"

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
  });

  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [showMenu, setShowMenu] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastSeen, setLastSeen] = useState("");
  const [prevDirection, setPrevDirection] = useState("none");
  const [selectedMessageImage, setSelectedMessageImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleToggle = () => {
    setIsSwitchOn(prev => {
      const newState = !prev;
      console.log("Toggle is now:", newState);
      return newState;
    });
  };

  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profile: reader.result }));
        setEditData({ ...editData, profile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  const goBack = () => {
    navigate("/whats-app");
  };

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 to 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  // Handle message image upload
  const handleMessageImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;

        setSelectedMessageImage(imageDataUrl);

        // Create a new Image object to extract dimensions
        const img = new Image();
        img.src = imageDataUrl;

        img.onload = () => {
          // Store size in state
          setImageSize({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
      };
      reader.readAsDataURL(file);
    }
  };


  // Handle sending message
  const handleSendText = (type, direction) => {
    setLastSeen(formatTime(new Date()))
    if (!message.trim() && !selectedMessageImage) return;
    const newMessage = {
      id: Date.now(),
      type: type,
      content: message.trim(),
      image: selectedMessageImage,
      imageSize: imageSize,
      direction: direction,
      prevDirection: prevDirection,
      time: formatTime(new Date()),
    };
    setPrevDirection(direction);
    setMessages(prev => [...prev, newMessage]);
    setSelectedMessageImage(null);
    setMessage('');
  };



  // Scroll to bottom on mount or new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({});
    }
  }, [messages.length]);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "28px";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + "px";
    }
  }, [message]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    console.log("Message:", e.target.value);
  };

  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);


  return (
    <div
      className="h-[100vh] fixed text-white font-sans bg-cover bg-center relative select-none bg-gray-500 overflow-hidden relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Popup Editor */}
      {showPopup && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50 h-[100vh] relative w-full">
          <div className="bg-gray-900/50 space-y-4 shadow-lg h-full w-full flex  flex-col items-center">
            <h3 className="text-lg font-bold mb-2 bg-[#1f272b] w-full text-center p-4 border-b-[0.5px] border-gray-900">
              EDIT PROFILE
            </h3>

            <div
              className="w-[150px] h-[150px] bg-white rounded-full relative flex justify-center items-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${userData.profile || chat.image})`,
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="w-10 h-10 rounded-full bg-green-500 absolute z-10 right-2 bottom-1 flex justify-center items-center cursor-pointer">
                <span className="material-symbols-sharp text-sm text-white">
                  edit
                </span>
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
              <div className="pr-5 w-full px-4 py-4 border border-gray-700 rounded-2xl bg-transparent">
                <select
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                  className="w-full border-none border-gray900 bg-transparent text-white outline-none"
                >
                  <option className="bg-gray-900 text-white rounded-xl" value="online" >Online</option>
                  <option className="bg-gray-900 text-white" value="typing...">Typing</option>
                  <option className="bg-gray-900 text-white" value={lastSeen.length == 0 ? "online" : `last seen today at ${lastSeen}`}>Last Seen</option>   {/* "last seen today at 5:37 PM" */}
                </select>
              </div>
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

      {/* popup Menu Box */}
      <div ref={menuRef} className={`absolute z-50 relative ${showMenu ? "block" : "hidden"}`} >
        <div className="w-[100vw] h-[100vh]" onClick={() => setShowMenu(false)}>
        </div>
        <div className="flex flex-col w-52 h-auto bg-[#0c1013] rounded-xl absolute right-1 top-[70px] px-5 py-5 z-30 gap-6">
          <div className="flex justify-between items-center">
            <span>OG MOD</span><ToggleSwitch onToggle={handleToggle} /></div>
          <span>Label Chat</span>
          <span>View contact</span>
          <span>Report</span>
          <span>Block</span>
          <span>Search</span>
          <span>Mute notifications</span>
          <span>Disappearing message</span>
          <span>Wallpaper</span>
        </div>
      </div>

      {/* Image Preview */}
      {selectedMessageImage && (
        <div className="flex justify-center items-center mt-2 absolute z-10 w-full h-full bg-black">
          <div className="absolute flex justify-between top-0 right-0 p-4 z-20 w-full h-auto">
            <span className="material-symbols-rounded h-[60px] w-[60px] rounded-full bg-gray-900/25 flex justify-center items-center" onClick={() => setSelectedMessageImage(null)}>close</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-rounded h-[60px] w-[60px] rounded-full bg-gray-900/25 flex justify-center items-center">crop_rotate</span>
              <span className="material-symbols-rounded h-[60px] w-[60px] rounded-full bg-gray-900/25 flex justify-center items-center">add_reaction</span>
              <span className="material-symbols-rounded h-[60px] w-[60px] rounded-full bg-gray-900/25 flex justify-center items-center">title</span>
              <span className="material-symbols-rounded h-[60px] w-[60px] rounded-full bg-gray-900/25 flex justify-center items-center">edit</span>
            </div>
          </div>
          <div>
            <img src={selectedMessageImage} alt="Preview" className="w-full h-full object-cover" />
          </div>

          {/* Image Controls */}
          <div className="absolute flex justify-between bottom-10 mx-4 rounded-full left-0 right-0 bg-gray-900 p-3 flex items-center gap-2">
            <button className="flex items-center justify-center bg-[#fafafa] hover:bg-[#128c7e] text-gray-900 w-[46px] h-[46px] px-4 py-2 rounded-full"
              onClick={() => handleSendText('image', 'receive')}>
              <span className="material-symbols-outlined rotate-180">send</span>
            </button>
            <textarea
              ref={textareaRef}
              placeholder="Add a caption..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              rows={1}
              className="bg-transparent px-4 w-[90%] text-white text-lg rounded-md focus:outline-none resize-none placeholder-gray-400"
              style={{
                maxHeight: "100px",
                height: "28px",
                overflowY: "auto",
              }}
            />

            <button className="flex items-center justify-center bg-[#fafafa] hover:bg-[#128c7e] text-gray-900 w-[46px] h-[46px] px-4 py-2 rounded-full"
              onClick={() => handleSendText('image', 'send')}>
              <span className="material-symbols-outlined">send</span>
            </button>

          </div>
        </div>
      )}

      <div className="w-full h-full absolute inset-0 bg-black bg-opacity-80 overflow-hidden">

        {/* Header */}
        <div className="flex w-full justify-between items-center z-[100] top-0 bg-[#0b1014] p-3">
          <div
            className="flex items-center w-full"
          >
            <span
              className="material-symbols-outlined text-gray-300 rounded-fullcursor-pointer [tap-highlight-color:transparent]"
              onClick={goBack}
            >
              arrow_back
            </span>
            <img
              src={userData.profile ? userData.profile : chat.image}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover object-center"
              onClick={() => setShowPopup(true)}

            />
            <div onClick={() => setShowPopup(true)}
              className="ml-2"
            >
              <h2 className="text-lg text-gray-300">
                {userData.name != "" ? userData.name : chat.name}
              </h2>
              <p className="text-xs text-gray-300">
                {userData.status != "" ? userData.status : "online"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 text-gray-300">
            <span className="material-symbols-rounded">videocam</span>
            <span className="material-symbols-rounded">call</span>
            <span className="material-symbols-rounded" onClick={() => setShowMenu(true)}>more_vert</span>
          </div>
        </div>

        {/* Messages */}
        <div className="overflow-y-scroll px-4 h-[82%] flex flex-col pt-4 w-full">
          {messages.map((msg) => (
            msg.type === 'text' ? (
              <div
                className={`flex relative ${msg.direction !== msg.prevDirection ? "pt-2" : "pt-0.5"}`}>
                {msg.direction !== msg.prevDirection && msg.direction === "receive" ? <img src={chatLeftCorner} className="w-5 h-3 -left-2 absolute " /> : msg.prevDirection !== msg.direction && msg.direction === "send" ? <img src={chatRightCorner} className="w-5 h-3 -right-2 absolute " /> : null}
                <div
                  key={msg.id}
                  className={`px-3 py-1 relative rounded-xl pb-2 max-w-[80vw] whitespace-pre-wrap ${msg.direction === "receive"
                    ? "bg-[#1f272b] mr-auto text-left"
                    : "bg-[#194a38] ml-auto"
                    }`}
                >
                  <p className={`${msg.content.length <= 21 && msg.direction === "send" ? "mr-[80px]" : "mr-[0px]"} ${msg.direction === "receive" && msg.content.length <= 21 ? "mr-[60px]" : ""} w-auto break-words overflow-hidden whitespace-pre-wrap`}>{msg.content}</p>

                  <div className={`flex items-center gap-2 text-xs right-2 bottom-[4px] text-gray-500 ${msg.content.length % 22 <= 10 && msg.content.length > 10 ? "justify-end" : "absolute"}`}>
                    {msg.time}

                    {msg.direction == "send" ? (
                      <img src={waDoneTick} alt="done" className="w-4" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`flex justify-end items-center gap-2 ${msg.direction === "receive" ? "flex-row-reverse" : ""}`}>
                <div className="">
                  <span className="material-symbols-outlined p-1 rounded-full bg-gray-900/50 cursor-pointer">
                    forward
                  </span>
                </div>
                <div
                  className={`flex relative ${msg.direction !== msg.prevDirection ? "pt-2" : "pt-0.5"}`}>
                  {msg.direction !== msg.prevDirection && msg.direction === "receive" ? <img src={chatLeftCorner} className="w-5 h-3 -left-2 absolute overflow-hidden" /> : msg.prevDirection !== msg.direction && msg.direction === "send" ? <img src={chatRightCorner} className="w-5 h-3 -right-2 absolute " /> : null}
                  <div
                    key={msg.id}
                    className={`p-1 relative rounded-xl whitespace-pre-wrap ${msg.direction === "receive"
                      ? "bg-[#1f272b] mr-auto text-left"
                      : "bg-[#194a38] ml-auto"}

                      ${msg.imageSize.width < msg.imageSize.height ? "w-[65vw] h-full" : "w-[70vw] h-full"} `}
                  >
                    <div className="w-full h-full relative overflow-hidden rounded-xl">
                      <img
                        src={msg.image}
                        alt="image"
                        className={`w-full ${msg.imageSize.width < msg.imageSize.height ? "max-h-[45vh]" : "h-full"
                          } object-cover object-center`}
                      />

                      {!msg.content && (
                        <span
                          className="w-40 h-40 absolute -bottom-40 -right-8 rounded-full"
                          style={{ boxShadow: '0px 0px 100px rgba(0, 0, 0, 1)' }}
                        ></span>
                      )}
                    </div>

                    {msg.content && (
                      <p className="px-2 pt-1.5 pb-2 text-white">{msg.content}</p>
                    )}

                    <div className={`flex items-center gap-2 text-xs right-3 bottom-2  ${msg.content.length % 22 <= 10 && msg.content.length > 10 ? "justify-end" : "absolute"} ${msg.content.length > 0 ? "text-gray-500" : "text-gray-200"} `}>
                      {msg.time}

                      {msg.direction == "send" ? (
                        <img src={waDoneTick} alt="done" className="w-4" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )
          ))}

          {/* 👇 Invisible div to scroll to */}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-2 bg-transparent flex items-end gap-1.5 w-full bg-wthie">
          {message.length > 0 && !isSwitchOn && (
            <button className="flex items-center justify-center bg-[#fafafa] hover:bg-[#128c7e] text-gray-900 w-[46px] h-[46px] px-4 py-2 rounded-full"
              onClick={() => handleSendText('text', 'receive')}>
              <span className="material-symbols-outlined rotate-180">send</span>
            </button>
          )}
          <div className="flex items-end px-3 py-2.5 bg-[#1f272b] rounded-3xl text-gray-500 w-full">
            <span className="material-symbols-rounded mb-0.5">add_reaction</span>
            <textarea
              ref={textareaRef}
              placeholder="Message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              rows={1}
              className="bg-transparent px-4 w-[90%] text-white text-lg rounded-md focus:outline-none resize-none placeholder-gray-400"
              style={{
                maxHeight: "100px",
                height: "28px",
                overflowY: "auto",
              }}
            />

            <div className="flex items-center gap-4">
              <span className="material-symbols-rounded">attach_file</span>

              {!message.length > 0 && (
                <label className="flex items-center">
                  <span className="material-symbols-rounded cursor-pointer">photo_camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMessageImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>


          <button className="flex items-center justify-center bg-[#fafafa] hover:bg-[#128c7e] text-gray-900 w-[46px] h-[46px] px-4 py-2 rounded-full"
            onClick={() => handleSendText('text', 'send')}>
            {message.length === 0 ? (
              <span className="material-symbols-outlined">mic</span>
            ) : (
              <span className="material-symbols-outlined">send</span>
            )}
          </button>
        </div>
      </div>
    </div >

  );
}

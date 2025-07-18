import React from 'react'
import { useNavigate } from 'react-router-dom'



export default function ChatTab({ i, chat }) {

    const navigate = useNavigate();

    const handleClick = () => {

        navigate(`/whats-app/chat/${chat.id}`, { state: { chat } });
    };

    return (
        <div className="flex flex-col divide-y divide-gray-800">

            <div
                key={i}
                className="flex items-center px-4 py-3 hover:bg-gray-700/25 relative"
                onClick={handleClick}
            >
                {/* Avatar */}
                {chat.image ? (
                    <img
                        src={chat.image}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 bg-[#62b9e3]/25 text-[#62b9e3] rounded-full flex items-center justify-center text-xl font-[400]">
                        {chat.initials || (
                            <span className="material-symbols-outlined">
                                {chat.icon || "person"}
                            </span>
                        )}
                    </div>
                )}

                {/* Text */}
                <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium text-[#edf1f4]">{chat.name}</h2>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 ">
                        <span>{chat.message}</span>
                    </div>
                </div>

                {/* Right: Pinned / Count */}
                <div className="ml-2 flex flex-col gap-1 items-end justify-between h-full">
                    <span
                        className={`text-xs font-[500] ${chat.unreadCount > 0 ? 'text-[#29ba6b]' : 'text-gray-500'}`}
                    >
                        {chat.time}
                    </span>
                    <div className='flex gap-1 justify-center items-center'>
                        {chat.pinned && (
                            <span
                                className="material-symbols-outlined text-lg text-gray-500"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                keep
                            </span>
                        )}
                        {chat.unreadCount && (
                            <div className="w-5 h-5 bg-[#29ba6b] text-black text-xs rounded-full flex items-center justify-center">
                                {chat.unreadCount}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

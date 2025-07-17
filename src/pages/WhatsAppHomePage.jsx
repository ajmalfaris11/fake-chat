import React from "react";

import ChatCard from "../components/whatsApp/ChatTab"



const chats = [
    {
        name: "Cust Jo",
        message: "Packed ?",
        time: "9:40 AM",
        pinned: true,
        unreadCount: 1,
        image: "https://i.pravatar.cc/100?img=1"
    },
    {
        name: "Cust mary Shibu",
        message: "Ahh",
        time: "Yesterday",
        pinned: true,
        image: "https://i.pravatar.cc/100?img=2"
    },
    {
        name: "Cust Gowtham",
        message: "Ok bro",
        time: "7/14/25",
        pinned: true,
        initials: "CG"
    },
    {
        name: "Cust 9778",
        message: "Its not unisex",
        time: "6:02 PM",
        image: "https://i.pravatar.cc/100?img=3"
    },
    {
        name: "+91 81291 39361",
        message: "Anakku paniyo",
        time: "6:03 PM",
        initials: "S"
    },
    {
        name: "+91 91434 45361",
        message: "Anakku paniyo",
        time: "6:03 PM",
        initials: "MK"
    },
    {
        name: "+91 97394 35331",
        message: "Anakku paniyo",
        time: "6:03 PM",
        initials: "AJ"
    }
];

export default function WhatsAppHomePage() {
    return (
        <div className="w-full max-w-md mx-auto bg-black text-white min-h-screen font-sans ">
            {/* Header */}
            <div className="flex justify-between items-center p-4 text-xl font-semibold border-b border-gray-800">
                <span>WhatsApp</span>
                <div className="flex space-x-5 text-[#f1f4f7]">
                    <span className="material-symbols-rounded">photo_camera</span>
                    <span className="material-symbols-rounded">search</span>
                    <span className="material-symbols-rounded">more_vert</span>
                </div>
            </div>


            <div className="overflow-scroll h-[75vh] ">
                {/* Filters */}
                <div
                    className="flex gap-3 text-sm px-2 py-3 w-full overflow-x-auto"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    <style>
                        {`div::-webkit-scrollbar {display: none;}`}
                    </style>

                    {["All", "Unread", "Favorites", "Groups", "Orders"].map((tab, idx) => (
                        <button
                            key={idx}
                            className={`px-4 py-1 rounded-full text-[#8d9397] font-[500] border border-gray-800 hover:bg-white/10 ${tab === 'All' ? 'bg-gray-900 text-[#edefee]' : ''
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Archived */}
                <div className="flex items-center px-4 py-2 text-[14px] text-[#f8fafb]  border-gray-800">
                    <span className="material-symbols-rounded mr-6 ml-3">archive</span>
                    <span className="flex-1 font-semibold">Archived</span>
                    <span className="text-sm">86</span>
                </div>

                {/* Chats */}
                {chats.map((chat, i) => (
                    <ChatCard key={i} chat={chat} />
                ))}
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 w-full max-w-md bg-black border-t border-gray-800 flex justify-around py-2 text-gray-300 h-[14vh]">
                {[
                    { icon: "chat", label: "Chats", count: 77 },
                    { icon: "call", label: "Calls", count: 1 },
                    { icon: "update", label: "Updates", count: 1 },
                    { icon: "store", label: "Tools" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center relative">
                        <span className="material-symbols-outlined text-2xl">
                            {item.icon}
                        </span>
                        <span className="text-xs">{item.label}</span>
                        {item.count && (
                            <div className="absolute top-0 right-2 text-xs bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
                                {item.count}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

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
            <div className="flex justify-between items-center p-4 text-xl font-semibold border-b-[0.5px] border-gray-900 bg-[#0c1114]">
                <span>WhatsApp</span>
                <div className="flex space-x-5 text-[#f1f4f7]">
                    <span className="material-symbols-rounded">photo_camera</span>
                    <span className="material-symbols-rounded">search</span>
                    <span className="material-symbols-rounded">more_vert</span>
                </div>
            </div>


            <div className="overflow-scroll h-[80vh] bg-[#0c1013]">
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
                            className={`px-4 py-1 rounded-full  font-[500] border border-gray-900 hover:bg-white/5 ${tab === 'All' ? 'bg-gray-900 text-gray-300' : 'text-gray-600'
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
            <div className="fixed bottom-0 w-full max-w-md bg-black border-t-[0.5px] border-gray-900 flex justify-around py-4 text-gray-300 bg-[#0c1013]">
                {[
                    { icon: "chat", label: "Chats", count: 99 },
                    { icon: "call", label: "Calls", count: "" },
                    { icon: "update", label: "Updates",},
                    { icon: "store", label: "Tools" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center relative">
                        <span className={`${item.icon == "chat" ? "material-symbols-outlined bg-gray-800/50" : "material-symbols-sharp"} text-2xl rounded-full px-5`}>
                            {item.icon}
                        </span>
                        <span className="text-sm">{item.label}</span>
                        {item.count && (
                            <div className={`absolute top-0 text-xs bg-green-600 text-white ${item.icon == "chat" ? "w-6 h-1 py-2 right-1" : "w-3 h-3 right-3"} rounded-full flex items-center justify-center text-[#0c1013]`}>
                                {item.count}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

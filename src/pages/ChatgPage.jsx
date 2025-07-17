import React from "react";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';



export default function ChatPage() {

  const { id } = useParams();
  const location = useLocation();
  const chat = location.state?.chat;

  console.log(chat);

  const messages = [
    { id: 1, text: "k", time: "4:54 PM" },
    { id: 2, text: "?", time: "5:21 PM" },
    {
      id: 3,
      type: "payment",
      time: "7:23 PM",
      details: {
        name: "AJMAL FARIS K",
        email: "fashionfriday.co@oksbi",
        amount: "₹2,000",
        method: "PhonePe",
        transactionId: "T250713192355199438790",
        utr: "567746940070",
        debited: "XX1846",
      },
    },
    {
      id: 4,
      text: `Hi!
We’ve received your payment successfully ✅
Your order is now being packed 📦 and will be dispatched soon ✈️

Thank you for shopping with 
FASHION FRIDAY 🛒`,
      time: "7:54 PM",
    },
    { id: 5, text: "Bro size", time: "7:58 PM" },
  ];

  return (
    <div className="h-screen bg-[#111b21] text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 sticky top-0 bg-[#0b1014] p-3">
        <div className="flex gap-2 items-center w-full">
          <span class="material-symbols-outlined">
            arrow_left_alt
          </span>
          <img
            src={chat.image}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-lg">{chat.name}</h2>
            <p className="text-xs text-gray-400">online</p>
          </div>
        </div>

        <div className="flex gap-4">
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
      <div className="space-y-4 overflow-y-auto ">
        {messages.map((msg) =>
          msg.type === "payment" ? (
            <div key={msg.id} className="text-sm bg-[#1e2a30] p-4 rounded-xl w-fit max-w-sm">
              <div className="text-purple-400 font-semibold">Transaction Successful</div>
              <div className="text-xs text-gray-300 mt-1">{msg.time} on 13 Jul 2025</div>
              <div className="mt-2">
                <p className="text-white font-semibold">{msg.details.name}</p>
                <p className="text-gray-400 text-xs">{msg.details.email}</p>
                <p className="text-green-400 font-bold mt-1">{msg.details.amount}</p>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                <p>Transaction ID: {msg.details.transactionId}</p>
                <p>UTR: {msg.details.utr}</p>
                <p>Debited from: {msg.details.debited}</p>
              </div>
            </div>
          ) : (
            <div
              key={msg.id}
              className="bg-[#005c4b] text-white p-3 rounded-lg max-w-xs ml-auto whitespace-pre-wrap"
            >
              {msg.text}
              <div className="text-right text-xs mt-1 text-gray-300">{msg.time}</div>
            </div>
          )
        )}
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#1c262b] flex items-center gap-3">
        <input
          type="text"
          placeholder="Message"
          className="flex-1 px-4 py-2 rounded-full bg-[#2b3942] text-white text-sm focus:outline-none"
        />
        <button className="bg-[#0b5e52] hover:bg-[#128c7e] text-white px-4 py-2 rounded-full">
          Send
        </button>
      </div>
    </div>
  );
}

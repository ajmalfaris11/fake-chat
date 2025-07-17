import React from "react";

export default function PlatformCard({ platform, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-4 shadow-lg transition-transform duration-500 hover:scale-105 hover:bg-blue-100 dark:bg-white dark:shadow-md dark:shadow-blue-300/100"
    >
      <img
        src={platform.logo}
        alt={`${platform.name} logo`}
        className="mb-2 rounded-xl w-full h-32 object-contain"
      />
      <h2 className="text-lg font-semibold text-gray-900">{platform.name}</h2>
      <p className="text-sm text-gray-600">{platform.description}</p>
    </div>
  );
}

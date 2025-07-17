import React from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import PlatformCard from "../components/PlatformCard";
import { CarouselCustomNavigation } from "../components/Carousel";

import whatsappCardLogo from "../assets/official/watsappCard.webp";
import instagramCardLogo from "../assets/official/instagramCard.webp";

export default function HomePage() {
  const navigate = useNavigate();

  const platforms = [
    {
      name: "WhatsApp",
      description: "Create with WhatsApp",
      logo: whatsappCardLogo,
      platform: "whats-app",
    },
    {
      name: "Instagram",
      description: "Create with Instagram",
      logo: instagramCardLogo,
      platform: "instagram",
    },
  ];

  return (
    <div className="dark:bg-black p-2 min-h-screen">
      <NavBar />

      <div className="mt-2">
        <CarouselCustomNavigation />
      </div>

      <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {platforms.map((platform, idx) => (
          <PlatformCard
            key={idx}
            platform={platform}
            onClick={() =>
              navigate(`/${platform.platform.toLowerCase()}`)
            }
          />
        ))}
      </div>
    </div>
  );
}

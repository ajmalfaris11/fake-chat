import React from "react";
import { Carousel } from "@material-tailwind/react";

import buildTrust from "../assets/Carousel/buildTrust.webp";
import increaseSales from "../assets/Carousel/increaseSales.webp";

export function CarouselCustomNavigation() {
  return (
    <Carousel
      className="top-2 rounded-2xl"
      autoplay
      autoplayDelay={5000}
      loop
      prevArrow={() => null}
      nextArrow={() => null}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
          {Array.from({ length }).map((_, i) => (
            <span
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    >
      <img
        src={buildTrust}
        alt="Build Trust"
        className="w-full object-cover"
      />
      <img
        src={increaseSales}
        alt="Increase Sales"
        className="w-full object-cover"
      />
    </Carousel>
  );
}

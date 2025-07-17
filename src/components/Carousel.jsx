import { Carousel } from "@material-tailwind/react";

import buildTrust from "../assets/Carousel/buildTrust.webp";
import increaseSales from "../assets/Carousel/increaseSales.webp";

export function CarouselCustomNavigation() {
  return (
    <Carousel
      className="top-2 rounded-2xl"
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
      prevArrow={() => null}
      nextArrow={() => null}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src={buildTrust}
        alt="image 1"
        className="w-full object-cover"
      />

      <img
        src={increaseSales}
        alt="image 2"
        className="w-full object-cover"
      />
    </Carousel>
  );
}
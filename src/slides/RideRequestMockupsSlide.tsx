import { useState } from "react";

const phoneImages = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => new URL(`../assets/phonemockups/${n}.png`, import.meta.url).href,
);
const desktopImages = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => new URL(`../assets/desktopmockups/${n}.png`, import.meta.url).href,
);

interface CarouselProps {
  images: string[];
  isPhone?: boolean;
}

function Carousel({ images, isPhone = false }: CarouselProps) {
  const [index, setIndex] = useState(0);

  return (
    <div
      className={`flex flex-col items-center gap-3 ${
        isPhone ? "flex-2" : "flex-3"
      }`}
    >
      {/* frame */}
      <div
        className={`relative ${isPhone ? "w-60" : "w-full max-w-3xl"} rounded-2xl bg-black/5`}
      >
        <img
          src={images[index]}
          alt={`Screen ${index + 1}`}
          className="w-full h-auto block transition-opacity duration-300"
        />
      </div>

      {/* nav */}
      <div className="flex items-center gap-3">
        <button
          className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center text-black/50 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M6.5 2L3.5 5L6.5 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-5 bg-black"
                  : "w-1.5 bg-black/25 hover:bg-black/50"
              }`}
            />
          ))}
        </div>

        <button
          className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center text-black/50 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))}
          disabled={index === images.length - 1}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M3.5 2L6.5 5L3.5 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <p className="text-black/40 text-xs tabular-nums">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

export default function RideRequestMockupsSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 py-16">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: "clamp(56px, 6.5vw, 82px)" }}
      >
        Student Ride Request Hi-Fis
      </h2>

      <div className="animate-fade-up delay-200 flex gap-12 items-center justify-center flex-1 p h-3/5">
        <Carousel images={phoneImages} isPhone />
        <Carousel images={desktopImages} />
      </div>
    </div>
  );
}

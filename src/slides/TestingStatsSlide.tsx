import { useState } from "react";

const H = "clamp(56px, 6.5vw, 82px)";

const prImages = [1, 2, 3, 4, 6].map(
  (n) => new URL(`../assets/prreviews/${n}.png`, import.meta.url).href,
);
const securityImages = [1, 2].map(
  (n) => new URL(`../assets/securityissue/${n}.png`, import.meta.url).href,
);
const testingImages = [1, 2, 3].map(
  (n) => new URL(`../assets/testingdocuments/${n}.png`, import.meta.url).href,
);

function ImageCascade({ images }: { images: string[] }) {
  const [topIdx, setTopIdx] = useState(0);
  const rotations = [-2.5, 1.8, -1.2, 2.0, -0.8];

  const stackPos = (imgIdx: number) =>
    (imgIdx - topIdx + images.length) % images.length;

  return (
    <div
      className="relative overflow-visible cursor-pointer select-none h-full"
      onClick={() => setTopIdx((t) => (t + 1) % images.length)}
      title="Click to cycle images"
    >
      {images.map((src, imgIdx) => {
        const pos = stackPos(imgIdx);
        return (
          <div
            key={src}
            className="absolute inset-x-0 rounded-xl overflow-hidden shadow-md border border-black/8 bg-white max-w-96"
            style={{
              top: `${pos * 14}px`,
              zIndex: images.length - pos,
              transform: `rotate(${rotations[imgIdx % rotations.length]}deg)`,
              transition:
                "top 320ms cubic-bezier(0.22,1,0.36,1), transform 320ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <img src={src} alt="" className="w-full block" />
          </div>
        );
      })}
    </div>
  );
}

const cards = [
  {
    number: "10+",
    label: "PRs Reviewed",
    sub: "Frontend, backend, and shared packages",
    images: prImages,
  },
  {
    number: "1",
    label: "Security Flaw",
    sub: "Identified during testing while figuring out why people can't log in",
    images: securityImages,
  },
  {
    number: "∞",
    label: "Forms & Docs",
    sub: "Testing instructions, feedback aggregation",
    images: testingImages,
  },
];

export default function TestingStatsSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-8 pb-32">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black shrink-0"
        style={{ fontSize: H }}
      >
        Carriage Testing Overview
      </h2>

      <div className="grid grid-cols-3 gap-5 overflow-visible flex-1 h-full">
        {cards.map((card, i) => (
          <div
            key={i}
            className="animate-fade-up border border-black/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-black/25 hover:shadow-lg transition-all duration-300 overflow-visible"
            style={{ animationDelay: `${150 + i * 120}ms` }}
          >
            {/* text on top */}
            <div>
              <p
                className="font-['Inter_Tight',sans-serif] font-bold text-black leading-none mb-1.5"
                style={{ fontSize: "clamp(52px, 5.5vw, 72px)" }}
              >
                {card.number}
              </p>
              <p
                className="font-semibold text-black"
                style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
              >
                {card.label}
              </p>
              <p
                className="text-black/45 mt-1"
                style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}
              >
                {card.sub}
              </p>
            </div>

            {/* image cascade on bottom */}
            <div className="flex-1 flex flex-col overflow-visible h-full">
              <ImageCascade images={card.images} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

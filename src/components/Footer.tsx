import { useEffect, useRef } from "react";

interface FooterProps {
  current: number;
  total: number;
  onNavigate: (index: number) => void;
}

const CAR_W = 26;
const CAR_H = 20;

export default function Footer({ current, total, onNavigate }: FooterProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = () => {
      if (!trackRef.current || !carRef.current) return;
      const trackWidth = trackRef.current.clientWidth;
      const segWidth = trackWidth / total;
      const centerX = (current + 0.5) * segWidth;
      carRef.current.style.transform = `translateX(${centerX - CAR_W / 2}px) translateY(-120%)`;
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [current, total]);

  return (
    /* overflow-visible so the car can poke above the bar */
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-black flex items-center px-8 gap-5 overflow-visible">
      <span className="text-white font-['Inter',sans-serif] text-sm font-medium tracking-wide shrink-0">
        SP 26
      </span>
      <span className="text-white/40 font-['Inter',sans-serif] text-sm shrink-0">
        Cornell DTI
      </span>

      {/* progress track */}
      <div className="flex-1 relative">
        {/* car — rides on the top edge of the footer */}
        <div
          ref={carRef}
          className="absolute transition-transform duration-600 ease-in-out pointer-events-none"
          style={{
            bottom: "100%",
            marginBottom: "-2px",
            transform: "translateX(0px) translateY(-120%)",
          }}
        >
          <svg
            width={CAR_W}
            height={CAR_H}
            viewBox="0 0 107 83"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="24" width="107" height="42" fill="black" />
            <rect width="79" height="66" fill="black" />
            <rect x="11" y="54" width="29" height="29" rx="14.5" fill="black" />
            <rect x="64" y="54" width="29" height="29" rx="14.5" fill="black" />
          </svg>
        </div>

        {/* dot segments */}
        <div
          ref={trackRef}
          className="flex gap-1 w-full items-center"
          style={{ height: "8px" }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`flex-1 rounded-sm cursor-pointer hover:bg-white/70 ${
                i === current
                  ? "bg-white"
                  : i < current
                    ? "bg-white/55"
                    : "bg-white/25"
              }`}
              style={{
                height: i === current ? "10px" : "6px",
                border: "none",
                padding: 0,
                transition: "height 300ms, background-color 300ms",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <span className="text-white/50 font-['Inter',sans-serif] text-xs shrink-0 tabular-nums">
        {current + 1} / {total}
      </span>
    </div>
  );
}

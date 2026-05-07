import Button from "../carriage/Button";
import beforeShot from "../assets/beforeshot.png";

function MapPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-[#e8ede8] rounded-xs flex items-center justify-center ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" opacity="0.3">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="#444"
        />
        <circle cx="12" cy="9" r="2.5" fill="#fff" />
      </svg>
    </div>
  );
}

function NewRideCard() {
  return (
    <div className="w-full bg-white rounded border border-black/6 overflow-hidden font-['Inter',sans-serif] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* modified banner */}
      <div className="bg-[#fef3c7] px-4 py-1 text-center">
        <span className="text-[#92400e] text-xs">Modified</span>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {/* time — new layout: accepted time + strikethrough original */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="#333" strokeWidth="1.2" />
              <path
                d="M7.5 4.5v3l2 1.5"
                stroke="#333"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>

            <span className="text-black/50  bg-[#fef3c7] px-1.5 py-0.5 rounded font-medium">
              <span className="font-bold text-black">3:00</span>

              <span className="text-black/50 text-xs">PM</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="#999"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-black/50  px-1.5 py-0.5 rounded font-medium">
              <span className="font-medium text-black">3:30</span>

              <span className="text-black/50 text-xs">PM</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 pl-6">
            <span className="text-black/35 text-xs line-through">2:45 PM</span>
            <span className="text-black/25 text-xs">original pickup</span>
          </div>
        </div>

        {/* location — new layout: single row with arrow */}
        <div className="flex items-center gap-2">
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
            <path
              d="M6.5 0.5C4 0.5 2 2.5 2 5c0 3.5 4.5 9.5 4.5 9.5s4.5-6 4.5-9.5c0-2.5-2-4.5-4.5-4.5z"
              stroke="#333"
              strokeWidth="1.1"
            />
            <circle cx="6.5" cy="5" r="1.8" fill="#333" />
          </svg>
          <span className="font-medium text-black text-sm">
            Bailey Hall Rear
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="#999"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-black/60 text-sm">Malott Parking</span>
        </div>

        {/* single large map */}
        <MapPlaceholder className="w-full h-44" />

        {/* actions */}
        <div className="flex gap-3">
          <Button text="Cancel" accent="secondary" className="w-full" />
          <Button text="Edit" accent="primary" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-6">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: "clamp(56px, 6.5vw, 82px)" }}
      >
        Before / After
      </h2>

      <div className="flex gap-8 items-start animate-fade-up delay-200 scale-150 origin-top-left">
        <div className="flex-1 flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black/40">Before</span>
          </div>
          <img
            src={beforeShot}
            alt="Before — old ride request card"
            className="w-full rounded border border-black/6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black/40">After</span>
          </div>
          <NewRideCard />
        </div>
      </div>
    </div>
  );
}

const H = "clamp(56px, 6.5vw, 82px)";
const BODY = "clamp(24px, 2.3vw, 30px)";

export default function RideRequestContextSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-10">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: H }}
      >
        Student Ride Request
      </h2>

      <div className="animate-fade-up delay-200 max-w-3xl">
        <p
          className="text-black/65 font-['Inter',sans-serif] leading-relaxed"
          style={{ fontSize: BODY }}
        >
          Beyond bugfixes, we had unfinished{" "}
          <span className="text-black font-semibold">
            hi-fi design work from last semester
          </span>{" "}
          that needed to be completed and handed off.
        </p>
      </div>

      <div className="animate-fade-up delay-300 flex gap-4">
        <div className="flex-1 border border-black/12 rounded-2xl p-6">
          <p
            className="font-semibold text-black/35 mb-3"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            Last Semester
          </p>
          <p
            className="font-['Inter',sans-serif] text-black/65"
            style={{ fontSize: "clamp(17px, 1.7vw, 21px)" }}
          >
            Lo-fi wireframes, partial hi-fi, unresolved crit feedback
          </p>
        </div>
        <div className="flex-1 border border-black rounded-2xl p-6 bg-black text-white">
          <p
            className="font-semibold text-white/40 mb-3"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            This Semester
          </p>
          <p
            className="font-['Inter',sans-serif] text-white/80"
            style={{ fontSize: "clamp(17px, 1.7vw, 21px)" }}
          >
            Complete hi-fi for mobile + desktop, new crit feedback incorporated
          </p>
        </div>
      </div>
    </div>
  );
}

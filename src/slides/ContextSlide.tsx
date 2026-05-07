const H = "clamp(56px, 6.5vw, 82px)";
const BODY = "clamp(36px, 2.5vw, 40px)";

export default function ContextSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-10">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black leading-tight"
        style={{ fontSize: H }}
      >
        What is Carriage?
      </h2>

      <div className="animate-fade-up delay-200 max-w-3xl flex flex-col gap-6">
        <p
          className="text-black/75 font-['Inter',sans-serif] leading-relaxed"
          style={{ fontSize: BODY }}
        >
          Carriage is a paratransit ride-scheduling app for students with
          accessibility needs at Cornell.
        </p>

        <p
          className="text-black/50 font-['Inter',sans-serif] leading-relaxed"
          style={{ fontSize: BODY }}
        >
          This semester I served as{" "}
          <span className="text-black font-medium">PM and designer</span>,
          completing the student ride request redesign and preparing for handoff
          to SSIT.
        </p>
      </div>

      {/* decorative */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 animate-fade-in delay-500 pointer-events-none">
        <div className="w-56 h-56 rounded-full border border-black/6" />
        <div className="w-36 h-36 rounded-full border border-black/8 absolute top-10 left-10" />
        <div className="w-16 h-16 rounded-full border border-black/12 absolute top-20 left-20" />
      </div>
    </div>
  );
}

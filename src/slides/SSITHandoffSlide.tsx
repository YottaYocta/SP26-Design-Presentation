import meetingNotes from "../assets/carriagehandoffmeetingnotes.png";

const H = "clamp(56px, 6.5vw, 82px)";
const ITEM_H = "clamp(22px, 2.2vw, 28px)";
const DETAIL = "clamp(17px, 1.7vw, 21px)";

const points = [
  {
    tag: "Outcome",
    headline: "Carriage will not be deployed",
    detail:
      "After meeting with SSIT, we learned deployment in its current state is not happening.",
  },
  {
    tag: "Alternatives",
    headline: "All alternatives ruled out",
    detail:
      "Migration and rehosting options were explored but deemed infeasible given constraints.",
  },
  {
    tag: "Resolution",
    headline: "Asynchronous handoff",
    detail:
      "SSIT will rebuild Carriage in their own time, using our codebase, designs, and docs as reference.",
  },
];

export default function SSITHandoffSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-8">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: H }}
      >
        Meeting with SSIT
      </h2>

      <div className="flex gap-8 items-start">
        <div className="flex flex-col gap-4 flex-1">
          {points.map((point, i) => (
            <div
              key={i}
              className="animate-fade-up flex gap-5 items-start p-5 rounded-xl border border-black/8 hover:border-black/20 transition-all duration-300"
              style={{ animationDelay: `${150 + i * 120}ms` }}
            >
              <div>
                <p
                  className="font-['Inter_Tight',sans-serif] font-semibold text-black mb-1"
                  style={{ fontSize: ITEM_H }}
                >
                  {point.headline}
                </p>
                <p className="text-black/50" style={{ fontSize: DETAIL }}>
                  {point.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-fade-up delay-300 w-72 shrink-0 self-stretch min-h-0 flex-1">
          <img
            src={meetingNotes}
            alt="Carriage handoff meeting notes"
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

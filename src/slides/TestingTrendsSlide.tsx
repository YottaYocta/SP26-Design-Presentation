const H = "clamp(56px, 6.5vw, 82px)";
const ITEM_H = "clamp(22px, 2.2vw, 28px)";
const DETAIL = "clamp(17px, 1.7vw, 21px)";

const trends = [
  {
    tag: "Quality of Life",
    headline: "Many small QoL requests",
    detail: "Edit phone number, clearer status messages, better ride history visibility.",
  },
  {
    tag: "Core Flow",
    headline: "Ride request confusion",
    detail: "Hard to navigate, unclear feedback, incomplete states.",
  },
  {
    tag: "Accessibility",
    headline: "Small accessibility issues",
    detail: "Color contrast, tap target sizing, and missing ARIA labels across several views.",
  },
];

export default function TestingTrendsSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-8">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black shrink-0"
        style={{ fontSize: H }}
      >
        Overall Trends
      </h2>

      <div className="flex flex-col gap-4">
        {trends.map((trend, i) => (
          <div
            key={i}
            className="animate-fade-up p-6 rounded-xl border border-black/8 hover:border-black/20 transition-all duration-300"
            style={{ animationDelay: `${150 + i * 130}ms` }}
          >
            <p
              className="font-['Inter_Tight',sans-serif] font-semibold text-black"
              style={{ fontSize: ITEM_H }}
            >
              {trend.headline}
            </p>
            <p className="text-black/50 mt-1" style={{ fontSize: DETAIL }}>
              {trend.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

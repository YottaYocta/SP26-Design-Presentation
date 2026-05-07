const phases = [
  {
    period: 'Dec 25 – Jan 26',
    title: 'Testing & Feedback',
    description: 'Managed testing sessions, reviewed 10+ PRs, discovered a security flaw, and synthesized user feedback.',
  },
  {
    period: 'Feb – Mar',
    title: 'Student Ride Request Redesign',
    description: 'Completed hi-fi mockups for mobile and desktop, incorporating crit feedback and prior testing findings.',
  },
  {
    period: 'Mar – End of Semester',
    title: 'Handoff & Design System',
    description: 'Met with SSIT to plan handoff, audited the app, and built an in-code design system.',
  },
];

const H = 'clamp(56px, 6.5vw, 82px)';
const BODY = 'clamp(22px, 2.2vw, 28px)';

export default function TimelineSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-8">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: H }}
      >
        Timeline
      </h2>

      <div className="flex gap-5">
        {phases.map((phase, i) => (
          <div
            key={i}
            className="animate-fade-up flex-1 border border-black/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-black/25 hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${160 + i * 130}ms` }}
          >
            <span
              className="text-black/35 font-['Inter',sans-serif] font-medium"
              style={{ fontSize: 'clamp(13px, 1.2vw, 15px)' }}
            >
              {phase.period}
            </span>
            <h3
              className="font-['Inter_Tight',sans-serif] font-semibold text-black leading-tight"
              style={{ fontSize: BODY }}
            >
              {phase.title}
            </h3>
            <p
              className="text-black/50 font-['Inter',sans-serif] leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}
            >
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

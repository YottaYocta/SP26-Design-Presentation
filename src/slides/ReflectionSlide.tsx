const H = 'clamp(56px, 6.5vw, 82px)';
const BODY = 'clamp(24px, 2.3vw, 30px)';

export default function ReflectionSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-10">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: H }}
      >
        Looking Back
      </h2>

      <div className="animate-fade-up delay-200 max-w-3xl">
        <p
          className="text-black/65 font-['Inter',sans-serif] leading-relaxed"
          style={{ fontSize: BODY }}
        >
          Working as a PM and designer this semester helped me gain a broader
          view of{' '}
          <span className="text-black font-semibold">building a product</span>,{' '}
          <span className="text-black font-semibold">working within a team</span>
          , and{' '}
          <span className="text-black font-semibold">
            navigating external requirements
          </span>
          .
        </p>
      </div>

      <div className="animate-fade-up delay-600">
        <p
          className="font-['Inter_Tight',system-ui,sans-serif] font-bold text-black/30"
          style={{ fontSize: 'clamp(52px, 6vw, 84px)', lineHeight: 1 }}
        >
          Thank you for listening!
        </p>
      </div>
    </div>
  );
}

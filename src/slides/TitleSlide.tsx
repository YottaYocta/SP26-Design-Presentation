export default function TitleSlide() {
  return (
    <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-16 pt-12">
        <h1
          className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black leading-none tracking-tight"
          style={{ fontSize: 'clamp(80px, 10vw, 140px)', lineHeight: 0.9 }}
        >
          Launching
          <br />
          Carriage
        </h1>
        <div className="mt-10 animate-fade-up delay-200">
          <p
            className="text-black/40 font-['Inter_Tight',system-ui,sans-serif]"
            style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
          >
            Ryan Qiu
          </p>
        </div>
      </div>

      <div
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none animate-fade-in delay-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
        }}
      />
    </div>
  );
}

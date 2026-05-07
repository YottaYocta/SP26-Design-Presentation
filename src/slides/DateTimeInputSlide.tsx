const H = 'clamp(56px, 6.5vw, 82px)';
const BODY = 'clamp(24px, 2.3vw, 30px)';

const platforms = [
  { name: 'iOS / Safari', description: 'Scrolling drum roll picker with integrated AM/PM selector.', swatch: '#007AFF' },
  { name: 'Android / Chrome', description: 'Clock face UI with hour/minute selection.', swatch: '#4CAF50' },
  { name: 'macOS / Desktop', description: 'Text fields with arrow-key increment controls.', swatch: '#FF9500' },
];

export default function DateTimeInputSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-10">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: H }}
      >
        Date & Time Inputs
      </h2>

      <div className="animate-fade-up delay-200 max-w-3xl">
        <p className="text-black/65 font-['Inter',sans-serif] leading-relaxed" style={{ fontSize: BODY }}>
          Carriage relies heavily on scheduling. The question:{' '}
          <span className="text-black font-semibold">native or custom time input?</span>
        </p>
      </div>

      <div className="animate-fade-up delay-300 flex gap-4">
        {platforms.map((p, i) => (
          <div
            key={i}
            className="flex-1 border border-black/10 rounded-2xl p-6 hover:border-black/22 transition-all duration-300"
          >
            <div className="w-3 h-3 rounded-full mb-4" style={{ background: p.swatch }} />
            <p className="font-semibold text-black mb-2 font-['Inter_Tight',sans-serif]" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}>
              {p.name}
            </p>
            <p className="text-black/50" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

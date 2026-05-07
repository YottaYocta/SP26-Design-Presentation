import aiAuditing from '../assets/aiforauditing.png';

export default function AIAuditingSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-10 pb-4">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black shrink-0 mb-6"
        style={{ fontSize: 'clamp(56px, 6.5vw, 82px)' }}
      >
        AI for Auditing Designs
      </h2>

      <div className="animate-fade-up delay-200 flex-1 rounded-2xl overflow-hidden min-h-0">
        <img src={aiAuditing} alt="AI for auditing designs" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

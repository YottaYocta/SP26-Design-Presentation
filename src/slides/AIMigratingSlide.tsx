import img1 from '../assets/aiformigration/1.png';
import img2 from '../assets/aiformigration/2.png';

export default function AIMigratingSlide() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-16 gap-8">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black"
        style={{ fontSize: 'clamp(56px, 6.5vw, 82px)' }}
      >
        AI for Migrating Legacy Code
      </h2>

      <div className="animate-fade-up delay-200 flex gap-5 flex-1 max-h-72">
        <div className="flex-1 flex flex-col gap-2">
          <img src={img1} alt="Before migration" className="flex-1 w-full object-contain rounded-2xl bg-black/3 min-h-0" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <img src={img2} alt="After migration" className="flex-1 w-full object-contain rounded-2xl bg-black/3 min-h-0" />
        </div>
      </div>
    </div>
  );
}

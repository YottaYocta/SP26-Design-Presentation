import { useState, useEffect, useCallback, useRef } from 'react';
import Footer from './components/Footer';
import TitleSlide from './slides/TitleSlide';
import ContextSlide from './slides/ContextSlide';
import TimelineSlide from './slides/TimelineSlide';
import TestingStatsSlide from './slides/TestingStatsSlide';
import TestingTrendsSlide from './slides/TestingTrendsSlide';
import RideRequestMockupsSlide from './slides/RideRequestMockupsSlide';
import CritFeedbackSlide from './slides/CritFeedbackSlide';
import BeforeAfterSlide from './slides/BeforeAfterSlide';
import SSITHandoffSlide from './slides/SSITHandoffSlide';
import AIAuditingSlide from './slides/AIAuditingSlide';
import AIMigratingSlide from './slides/AIMigratingSlide';
import DesignSystemSlide from './slides/DesignSystemSlide';
import DateTimeInputSlide from './slides/DateTimeInputSlide';
import DateTimeCritSlide from './slides/DateTimeCritSlide';
import ReflectionSlide from './slides/ReflectionSlide';

const slides = [
  { component: TitleSlide, label: 'Title' },
  { component: ContextSlide, label: 'Context' },
  { component: TimelineSlide, label: 'Timeline' },
  { component: TestingStatsSlide, label: 'Testing — Stats' },
  { component: TestingTrendsSlide, label: 'Testing — Trends' },
  { component: RideRequestMockupsSlide, label: 'Ride Request — Mockups' },
  { component: CritFeedbackSlide, label: 'Crit Feedback' },
  { component: BeforeAfterSlide, label: 'Before / After' },
  { component: SSITHandoffSlide, label: 'SSIT Handoff' },
  { component: DesignSystemSlide, label: 'Design System' },
  { component: DateTimeInputSlide, label: 'Date & Time' },
  { component: DateTimeCritSlide, label: 'Date & Time — Crit' },
  { component: AIAuditingSlide, label: 'AI — Auditing' },
  { component: AIMigratingSlide, label: 'AI — Migration' },
  { component: ReflectionSlide, label: 'Reflection' },
];

type Phase = 'idle' | 'exit' | 'enter';

export default function App() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [dir, setDir] = useState<'fwd' | 'bwd'>('fwd');
  const pendingRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    if (phase !== 'idle') return;
    if (next === index) return;
    pendingRef.current = next;
    setDir(next > index ? 'fwd' : 'bwd');
    setPhase('exit');
    timerRef.current = setTimeout(() => {
      setIndex(pendingRef.current!);
      setPhase('enter');
      timerRef.current = setTimeout(() => setPhase('idle'), 380);
    }, 260);
  }, [phase, index]);

  const go = useCallback((delta: number) => {
    goTo(Math.max(0, Math.min(slides.length - 1, index + delta)));
  }, [goTo, index]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const SlideComponent = slides[index].component;

  const slideStyle: React.CSSProperties = phase === 'exit' ? {
    opacity: 0,
    transform: dir === 'fwd' ? 'translateX(-52px) scale(0.98)' : 'translateX(52px) scale(0.98)',
    transition: 'opacity 260ms cubic-bezier(0.4,0,0.2,1), transform 260ms cubic-bezier(0.4,0,0.2,1)',
  } : phase === 'enter' ? {
    opacity: 0,
    transform: dir === 'fwd' ? 'translateX(52px) scale(0.98)' : 'translateX(-52px) scale(0.98)',
    animation: 'slideIn 380ms cubic-bezier(0.22,1,0.36,1) forwards',
  } : { opacity: 1, transform: 'none' };

  return (
    <div className="w-screen h-screen bg-white flex flex-col overflow-hidden select-none">
      <style>{`
        @keyframes slideIn {
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .animate-fade-in { animation: fadeIn 0.45s ease both; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
      `}</style>

      {/* slide area */}
      <div className="flex-1 relative overflow-hidden" style={{ paddingBottom: '56px' }}>
        <div
          key={index}
          className="absolute inset-0"
          style={slideStyle}
        >
          <SlideComponent />
        </div>
      </div>

      <Footer current={index} total={slides.length} onNavigate={goTo} />

      {/* nav hint */}
      <div
        className="fixed bottom-20 right-6 flex gap-2 pointer-events-none"
        style={{ opacity: index === 0 && phase === 'idle' ? 0.7 : 0, transition: 'opacity 800ms' }}
      >
        <kbd className="text-xs text-black/50 border border-black/15 rounded px-2 py-1 font-mono bg-white shadow-sm">←</kbd>
        <kbd className="text-xs text-black/50 border border-black/15 rounded px-2 py-1 font-mono bg-white shadow-sm">→</kbd>
      </div>
    </div>
  );
}

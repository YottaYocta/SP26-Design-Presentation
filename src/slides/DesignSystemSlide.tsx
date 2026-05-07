import { useState } from 'react';
import {
  ForkLeftSharp,
  ForkRightSharp,
  SignLanguage,
} from '@mui/icons-material';
import Button from '../carriage/Button';
import {
  Input,
  Label,
  TextArea,
  TimeInput,
  DateInputNative,
  DateInputCustom,
  DateRangeNative,
  DateRangeCustom,
  WeekInputNative,
  WeekInputCustom,
  WeekInputReadOnly,
} from '../carriage/Inputs';
import type { DateRange } from '../carriage/Inputs';

type Accent = 'primary' | 'secondary' | 'destructive';

const ButtonGrid = ({ accent }: { accent: Accent }) => (
  <div className="flex flex-col gap-3">
    {(['large', 'normal'] as const).map((size) => (
      <div key={size} className="flex flex-col gap-2">
        {([false, true] as const).map((disabled) => {
          const iconSize = size === 'large' ? undefined : ('small' as const);
          return (
            <div key={String(disabled)} className="flex flex-wrap gap-2 items-center">
              <Button text="Label" accent={accent} size={size} disabled={disabled} />
              <Button
                text="Label" accent={accent} size={size} disabled={disabled}
                icon={{ position: 'left', icon: <ForkLeftSharp fontSize={iconSize} /> }}
              />
              <Button
                text="Label" accent={accent} size={size} disabled={disabled}
                icon={{ position: 'right', icon: <ForkRightSharp fontSize={iconSize} /> }}
              />
              <Button
                text="Icon" accent={accent} size={size} disabled={disabled}
                icon={{ position: 'only', icon: <SignLanguage fontSize={iconSize} /> }}
              />
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-sm font-semibold text-black pb-2 border-b border-black/8">{title}</h3>
    {children}
  </div>
);

const colors = [
  { name: 'Black', hex: '#000000', bg: 'bg-black' },
  { name: 'Gray 600', hex: '#555555', bg: 'bg-[#555]' },
  { name: 'Gray 200', hex: '#E0E0E0', bg: 'bg-[#E0E0E0]' },
  { name: 'Gray 50', hex: '#F5F5F5', bg: 'bg-[#F5F5F5] border border-black/10' },
  { name: 'Red 700', hex: '#B91C1C', bg: 'bg-red-700' },
  { name: 'White', hex: '#FFFFFF', bg: 'bg-white border border-black/10' },
];

const DateInputDemo = () => {
  const [dateA, setDateA] = useState<Date | undefined>();
  const [dateB, setDateB] = useState<Date | undefined>();
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-1">
        <Label>Native</Label>
        <DateInputNative value={dateA} onChange={setDateA} />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Custom</Label>
        <DateInputCustom value={dateB} onChange={setDateB} />
      </div>
    </div>
  );
};

const DateRangeDemo = () => {
  const [rangeA, setRangeA] = useState<DateRange | undefined>();
  const [rangeB, setRangeB] = useState<DateRange | undefined>();
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label className="block mb-1">Native</Label>
        <DateRangeNative value={rangeA} onChange={setRangeA} />
      </div>
      <div>
        <Label className="block mb-1">Custom</Label>
        <DateRangeCustom value={rangeB} onChange={setRangeB} />
      </div>
    </div>
  );
};

const WeekDemo = () => {
  const [weekA, setWeekA] = useState<DateRange | undefined>();
  const [weekB, setWeekB] = useState<DateRange | undefined>();
  const [weekC, setWeekC] = useState<DateRange | undefined>();
  return (
    <div className="flex flex-col gap-3">
      <WeekInputNative value={weekA} onChange={setWeekA} />
      <div className="flex flex-col gap-1">
        <Label>Custom text</Label>
        <WeekInputCustom value={weekB} onChange={setWeekB} />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Read-only</Label>
        <WeekInputReadOnly value={weekC} onChange={setWeekC} />
      </div>
    </div>
  );
};

export default function DesignSystemSlide() {
  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="px-16 pt-10 pb-24 flex flex-col gap-6">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black shrink-0"
        style={{ fontSize: 'clamp(48px, 5.5vw, 72px)' }}
      >
        Design System
      </h2>

      <div className="flex flex-col gap-8 animate-fade-up delay-150">

        {/* Colors */}
        <Section title="Colors">
          <div className="flex gap-3">
            {colors.map(c => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div className={`w-14 h-10 rounded-lg ${c.bg}`} />
                <p className="text-xs font-medium text-black">{c.name}</p>
                <p className="text-xs text-black/35 font-mono">{c.hex}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons — Primary">
          <ButtonGrid accent="primary" />
        </Section>

        <Section title="Buttons — Secondary">
          <ButtonGrid accent="secondary" />
        </Section>

        <Section title="Buttons — Destructive">
          <ButtonGrid accent="destructive" />
        </Section>

        {/* Text Input */}
        <Section title="Text Input">
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <Label>Placeholder</Label>
              <Input className="w-56" placeholder="Placeholder" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Filled</Label>
              <Input className="w-56" defaultValue="Filled value" />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-gray-400">Disabled</Label>
              <Input className="w-56" placeholder="Disabled" disabled />
            </div>
          </div>
        </Section>

        {/* Textarea */}
        <Section title="Textarea">
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <Label>Default</Label>
              <TextArea className="w-56" placeholder="Placeholder" />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-gray-400">Disabled</Label>
              <TextArea className="w-56" placeholder="Placeholder" disabled />
            </div>
          </div>
        </Section>

        {/* Select */}
        <Section title="Select">
          <div className="flex gap-4 flex-wrap items-start">
            <div className="flex flex-col gap-1">
              <Label>Default</Label>
              <select className="border border-[#ddd] rounded px-3 text-base focus:outline-none focus:border-[#303030] focus:ring-1 focus:ring-[#303030] transition-colors h-9 w-56">
                <option value="" disabled>Choose an option</option>
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-gray-400">Disabled</Label>
              <select className="border border-[#ddd] rounded px-3 text-base h-9 w-56 bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
                <option>Option A</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Checkbox & Radio */}
        <Section title="Checkbox &amp; Radio">
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              {(['Unchecked', 'Checked'] as const).map(s => (
                <label key={s} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input type="checkbox" defaultChecked={s === 'Checked'} className="w-4 h-4 accent-[#303030] cursor-pointer" />
                  {s}
                </label>
              ))}
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-not-allowed select-none">
                <input type="checkbox" disabled className="w-4 h-4 cursor-not-allowed" />
                Disabled
              </label>
            </div>
            <div className="flex flex-col gap-2">
              {(['Option A', 'Option B', 'Option C'] as const).map((opt, i) => (
                <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input type="radio" name="ds-radio" defaultChecked={i === 0} className="w-4 h-4 accent-[#303030] cursor-pointer" />
                  {opt}
                </label>
              ))}
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-not-allowed select-none">
                <input type="radio" disabled className="w-4 h-4 cursor-not-allowed" />
                Disabled
              </label>
            </div>
          </div>
        </Section>

        {/* Time */}
        <Section title="Time Input">
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <Label>Empty</Label>
              <TimeInput />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Filled</Label>
              <TimeInput initialValue={{ hour: 9, minute: 30, ampm: 'AM' }} />
            </div>
          </div>
        </Section>

        {/* Date */}
        <Section title="Date Input">
          <DateInputDemo />
        </Section>

        {/* Date Range */}
        <Section title="Date Range">
          <DateRangeDemo />
        </Section>

        {/* Week */}
        <Section title="Week Input">
          <WeekDemo />
        </Section>

      </div>
      </div>
    </div>
  );
}

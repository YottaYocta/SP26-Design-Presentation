import { useState } from "react";
import {
  Label,
  TimeInput,
  DateInputNative,
  DateInputCustom,
  WeekInputNative,
  WeekInputCustom,
  WeekInputReadOnly,
} from "../carriage/Inputs";
import type { DateRange } from "../carriage/Inputs";

const Tag = ({
  green,
  children,
}: {
  green?: boolean;
  children: React.ReactNode;
}) => (
  <span
    className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
      green
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-red-50 text-red-700 border-red-200"
    }`}
  >
    {children}
  </span>
);

export default function DateTimeCritSlide() {
  const [date, setDate] = useState<Date | undefined>();
  const [dateCustom, setDateCustom] = useState<Date | undefined>();
  const [weekNative, setWeekNative] = useState<DateRange | undefined>();
  const [weekCustom, setWeekCustom] = useState<DateRange | undefined>();
  const [weekReadOnly, setWeekReadOnly] = useState<DateRange | undefined>();

  return (
    <div className="w-full h-full bg-white flex flex-col px-16 pt-10 pb-4 gap-6">
      <h2
        className="animate-fade-up font-['Inter_Tight',system-ui,sans-serif] font-bold text-black shrink-0"
        style={{ fontSize: "clamp(48px, 5.5vw, 72px)" }}
      >
        Which Works Better?
      </h2>

      <div className="animate-fade-up delay-150 flex-1 flex flex-col gap-5 overflow-auto">
        {/* Time */}
        <div className="flex gap-5">
          <div className="flex-1 border border-black/8 rounded-xl p-5 flex flex-col gap-3">
            <p className="text-sm font-medium text-black/50">Time — Native</p>
            <div className="flex flex-col gap-1">
              <Label>Pickup time</Label>
              <input
                type="time"
                className="border border-[#ddd] rounded px-4 text-base focus:outline-none focus:border-[#303030] focus:ring-1 focus:ring-[#303030] transition-colors h-9 w-full max-w-64"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              <Tag green>Validation</Tag>
            </div>
          </div>

          <div className="flex-1 border-2 border-black rounded-xl p-5 flex flex-col gap-3">
            <p className="text-sm font-medium text-black/50">
              Time — Hybrid{" "}
              <span className="text-black font-semibold">✓ Chosen</span>
            </p>
            <div className="flex flex-col gap-1">
              <Label>Pickup time</Label>
              <TimeInput initialValue={{ hour: 9, minute: 0, ampm: "AM" }} />
            </div>
            <div className="flex gap-1 flex-wrap">
              <Tag green>Validation</Tag>
              <Tag green>Uniform behavior</Tag>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="flex gap-5">
          <div className="flex-1 border border-black/8 rounded-xl p-5 flex flex-col gap-3">
            <p className="text-sm font-medium text-black/50">Date — Native</p>
            <div className="flex flex-col gap-1">
              <Label>Ride date</Label>
              <DateInputNative value={date} onChange={setDate} />
            </div>
            <div className="flex gap-1 flex-wrap">
              <Tag>Varies across OS</Tag>
              <Tag>No custom range</Tag>
            </div>
          </div>

          <div className="flex-1 border-2 border-black rounded-xl p-5 flex flex-col gap-3">
            <p className="text-sm font-medium text-black/50">
              Date — Custom{" "}
              <span className="text-black font-semibold">✓ Chosen</span>
            </p>
            <div className="flex flex-col gap-1">
              <Label>Ride date</Label>
              <DateInputCustom value={dateCustom} onChange={setDateCustom} />
            </div>
            <div className="flex gap-1 flex-wrap">
              <Tag green>Supported across platforms</Tag>
              <Tag green>Consistent</Tag>
            </div>
          </div>
        </div>

        {/* Week */}
        <div className="flex gap-5">
          <div className="flex-1 border border-black/8 rounded-xl p-5 flex flex-col gap-3">
            <p className="text-sm font-medium text-black/50">Week — Native</p>
            <WeekInputNative value={weekNative} onChange={setWeekNative} />
            <div className="flex gap-1 flex-wrap">
              <Tag>Week select support iffy across different browsers</Tag>
              <Tag>Varies across OS</Tag>
            </div>
          </div>

          <div className="flex-1 border border-black/8 rounded-xl p-5 flex flex-col gap-3">
            <p className="text-sm font-medium text-black/50">
              Week — Custom text
            </p>
            <div className="flex flex-col gap-1">
              <WeekInputCustom value={weekCustom} onChange={setWeekCustom} />
            </div>
          </div>

          <div className="flex-1 border-2 border-black rounded-xl p-5 flex flex-col gap-3">
            <p className="text-sm font-medium text-black/50">
              Week — Read-only{" "}
              <span className="text-black font-semibold">✓ Chosen</span>
            </p>
            <div className="flex flex-col gap-1">
              <Label>Week of</Label>
              <WeekInputReadOnly
                value={weekReadOnly}
                onChange={setWeekReadOnly}
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              <Tag green>Supported across platforms</Tag>
              <Tag green>Consistent</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

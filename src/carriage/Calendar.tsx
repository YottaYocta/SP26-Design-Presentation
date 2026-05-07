import React from 'react';
import { DayPicker, type DateRange, rangeIncludesDate } from 'react-day-picker';
import type { WeekNumberProps } from 'react-day-picker';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import 'react-day-picker/style.css';

const calendarClass =
  'rounded border border-[#ddd] bg-white shadow-lg p-3 outline-none';

const blackTheme = {
  '--rdp-accent-color': '#000',
  '--rdp-accent-background-color': '#f0f0f0',
} as React.CSSProperties;

const blackStyles = {
  root: blackTheme,
  day_button: { outlineColor: 'black' },
};

export type DayCalendarProps = {
  selected?: Date;
  onSelect?: (day: Date | undefined) => void;
};

export const DayCalendar = ({ selected, onSelect }: DayCalendarProps) => (
  <div className={calendarClass}>
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={onSelect}
      styles={blackStyles}
    />
  </div>
);

export type DateRangeCalendarProps = {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
};

export const DateRangeCalendar = ({
  selected,
  onSelect,
}: DateRangeCalendarProps) => (
  <div className={calendarClass}>
    <DayPicker
      animate
      mode="range"
      selected={selected}
      onSelect={onSelect}
      numberOfMonths={2}
      styles={blackStyles}
    />
  </div>
);

export type WeekCalendarProps = {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
};

export const WeekCalendar = ({ selected, onSelect }: WeekCalendarProps) => {
  const handleDayClick = (day: Date, modifiers: Record<string, boolean>) => {
    if (modifiers.disabled || modifiers.hidden) return;
    if (modifiers.selected) {
      onSelect?.(undefined);
      return;
    }
    onSelect?.({ from: startOfWeek(day), to: endOfWeek(day) });
  };

  const WeekNumberCell = ({ week, ...props }: WeekNumberProps) => (
    <th
      {...props}
      onClick={() =>
        onSelect?.({
          from: startOfWeek(week.days[0].date),
          to: endOfWeek(week.days[week.days.length - 1].date),
        })
      }
      style={{ cursor: 'pointer', ...props.style }}
      title="Select week"
    >
      {week.weekNumber}
    </th>
  );

  return (
    <div className={calendarClass}>
      <DayPicker
        showWeekNumber
        showOutsideDays
        modifiers={{
          selected: selected,
          range_start: selected?.from,
          range_end: selected?.to,
          range_middle: (date: Date) =>
            selected ? rangeIncludesDate(selected, date, true) : false,
        }}
        onDayClick={handleDayClick}
        onDayKeyDown={(day, modifiers, e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleDayClick(day, modifiers as Record<string, boolean>);
          }
        }}
        components={{ WeekNumber: WeekNumberCell }}
        styles={blackStyles}
      />
    </div>
  );
};
// ─── Helpers ─────────────────────────────────────────────────────────────────

export const formatWeekLabel = (range: DateRange | undefined): string => {
  if (!range?.from) return '';
  if (!range.to) return format(range.from, 'MMM d, yyyy');
  return `${format(range.from, 'MMM d')} – ${format(range.to, 'MMM d, yyyy')}`;
};

export type { DateRange };

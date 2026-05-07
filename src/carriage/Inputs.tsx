import React, { useState, useEffect } from 'react';
import { Menu } from '@base-ui/react/menu';
import { Popover } from '@base-ui/react/popover';
import { AccessTime, CalendarToday } from '@mui/icons-material';
import { format, parse, isValid, startOfWeek, endOfWeek } from 'date-fns';
import {
  DayCalendar,
  DateRangeCalendar,
  WeekCalendar,
  formatWeekLabel,
  type DateRange,
} from './Calendar';
export type { DateRange };

export const inputBase =
  'border border-[#ddd] rounded px-4 text-base focus:outline-none focus:border-[#303030] focus:ring-1 focus:ring-[#303030] transition-colors';

export const Label = ({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`text-sm font-medium text-gray-700 ${className ?? ''}`}
    {...props}
  >
    {children}
  </label>
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, disabled, ...props }: InputProps) => (
  <input
    className={`${inputBase} h-9 ${
      disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
    } ${className ?? ''}`}
    disabled={disabled}
    {...props}
  />
);
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ className, disabled, ...props }: TextAreaProps) => (
  <textarea
    className={`${inputBase} py-2 resize-y min-h-20 ${
      disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
    } ${className ?? ''}`}
    disabled={disabled}
    {...props}
  />
);

export type TimeValue = { hour: number; minute: number; ampm: 'AM' | 'PM' };

export type TimeInputProps = {
  initialValue?: TimeValue;
  onHandleTextChanged?: (text: string) => void;
  onHandleValueChanged?: (value: TimeValue) => void;
};

const timeOptions: (TimeValue & { label: string })[] = Array.from(
  { length: 96 },
  (_, i) => {
    const totalMinutes = i * 15;
    const h24 = Math.floor(totalMinutes / 60);
    const min = totalMinutes % 60;
    const ampm: 'AM' | 'PM' = h24 < 12 ? 'AM' : 'PM';
    const hour = h24 % 12 || 12;
    return {
      hour,
      minute: min,
      ampm,
      label: `${hour}:${String(min).padStart(2, '0')} ${ampm}`,
    };
  }
);

const pad = (n: number) => String(n).padStart(2, '0');

export const TimeInput = ({
  initialValue,
  onHandleTextChanged,
  onHandleValueChanged,
}: TimeInputProps) => {
  const init: TimeValue = initialValue ?? { hour: 12, minute: 0, ampm: 'PM' };

  const toInputValue = (v: TimeValue) => {
    const h24 =
      v.ampm === 'AM'
        ? v.hour === 12
          ? 0
          : v.hour
        : v.hour === 12
        ? 12
        : v.hour + 12;
    return `${pad(h24)}:${pad(v.minute)}`;
  };

  const [inputValue, setInputValue] = useState(toInputValue(init));

  const applyTimeOption = (opt: TimeValue) => {
    const hText = String(opt.hour);
    const mText = pad(opt.minute);
    setInputValue(toInputValue(opt));
    onHandleValueChanged?.({
      hour: opt.hour,
      minute: opt.minute,
      ampm: opt.ampm,
    });
    onHandleTextChanged?.(`${hText}:${mText} ${opt.ampm}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (!val) return;
    const [h24str, minStr] = val.split(':');
    const h24 = parseInt(h24str);
    const min = parseInt(minStr);
    const ampm: 'AM' | 'PM' = h24 < 12 ? 'AM' : 'PM';
    const hour = h24 % 12 || 12;
    onHandleValueChanged?.({ hour, minute: min, ampm });
    onHandleTextChanged?.(`${hour}:${pad(min)} ${ampm}`);
  };

  return (
    <div className="flex w-full max-w-64 items-center h-9 border border-[#ddd] rounded overflow-hidden focus-within:border-[#303030] focus-within:ring-1 focus-within:ring-[#303030] transition-colors bg-white">
      {/* Native time input */}
      <input
        type="time"
        value={inputValue}
        onChange={handleChange}
        className="h-full px-4 text-base bg-transparent outline-none border-none flex-1 min-w-0"
      />

      <Menu.Root>
        <Menu.Trigger
          className="h-full px-2 flex items-center border-l border-[#ddd] bg-white hover:bg-[#fafafa] active:bg-[#eaeaea] cursor-pointer transition-colors"
          aria-label="Select time from list"
        >
          <AccessTime fontSize="small" className="text-gray-500" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={4} className="z-50">
            <Menu.Popup className="max-h-64 overflow-y-auto rounded border border-[#ddd] bg-white shadow-lg py-1 outline-none">
              {timeOptions.map((opt) => (
                <Menu.Item
                  key={opt.label}
                  onClick={() => applyTimeOption(opt)}
                  className="px-4 py-1.5 text-sm cursor-pointer data-highlighted:bg-gray-100 outline-none"
                >
                  {opt.label}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
};

const CalendarTrigger = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <Popover.Root>
    <Popover.Trigger
      className="h-full px-2 flex items-center border-l border-[#ddd] bg-white hover:bg-[#fafafa] active:bg-[#eaeaea] cursor-pointer transition-colors"
      aria-label={label}
    >
      {icon}
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Positioner sideOffset={4} className="z-50">
        <Popover.Popup>{children}</Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  </Popover.Root>
);

const DATE_DISPLAY_FORMAT = 'M/d/yyyy';
const DATE_PARSE_FORMATS = [
  'M/d/yyyy',
  'MM/dd/yyyy',
  'MMM d yyyy',
  'MMMM d yyyy',
  'MMM d, yyyy',
  'MMMM d, yyyy',
];

const tryParseDate = (text: string): Date | undefined => {
  for (const fmt of DATE_PARSE_FORMATS) {
    const d = parse(text, fmt, new Date());
    if (isValid(d)) return d;
  }
  return undefined;
};

const inputRow =
  'flex w-full items-center h-9 border border-[#ddd] rounded overflow-hidden focus-within:border-[#303030] focus-within:ring-1 focus-within:ring-[#303030] transition-colors bg-white';

type TextDateInputProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
};

const TextDateInput = ({
  value,
  onChange,
  placeholder = 'M/D/YYYY',
  readOnly = false,
  className,
}: TextDateInputProps) => {
  const formatted = value ? format(value, DATE_DISPLAY_FORMAT) : '';
  const [text, setText] = useState(formatted);

  useEffect(() => {
    setText(formatted);
  }, [formatted]);

  const commit = () => {
    if (!text.trim()) {
      onChange?.(undefined);
      setText('');
      return;
    }
    const parsed = tryParseDate(text.trim());
    if (parsed) {
      onChange?.(parsed);
    } else {
      setText(formatted);
    }
  };

  return (
    <input
      type="text"
      readOnly={readOnly}
      value={readOnly ? formatted : text}
      onChange={readOnly ? undefined : (e) => setText(e.target.value)}
      onBlur={readOnly ? undefined : commit}
      onKeyDown={
        readOnly
          ? undefined
          : (e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }
      }
      placeholder={readOnly ? 'Select a date' : placeholder}
      className={`h-full px-4 text-base bg-transparent outline-none border-none flex-1 min-w-0 ${
        readOnly ? 'cursor-default select-none' : ''
      } ${className ?? ''}`}
    />
  );
};

export type DateInputProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
};

export const DateInputNative = ({
  value,
  onChange,
  className,
}: DateInputProps) => (
  <input
    type="date"
    value={value ? format(value, 'yyyy-MM-dd') : ''}
    onChange={(e) => {
      const v = e.target.value;
      onChange?.(v ? new Date(v + 'T00:00:00') : undefined);
    }}
    className={`${inputBase} h-9 w-full max-w-64 ${className ?? ''}`}
  />
);

export const DateInputCustom = ({
  value,
  onChange,
  className,
}: DateInputProps) => (
  <div className={`${inputRow} max-w-64 ${className ?? ''}`}>
    <TextDateInput value={value} onChange={onChange} />
    <CalendarTrigger
      icon={<CalendarToday fontSize="small" className="text-gray-500" />}
      label="Open calendar"
    >
      <DayCalendar selected={value} onSelect={onChange} />
    </CalendarTrigger>
  </div>
);

export type DateRangeInputProps = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
};

export const DateRangeNative = ({
  value,
  onChange,
  className,
}: DateRangeInputProps) => (
  <div className={`flex gap-4 ${className ?? ''}`}>
    <div className="flex flex-col gap-1">
      <Label>Start date</Label>
      <DateInputNative
        value={value?.from}
        onChange={(from) => onChange?.({ from, to: value?.to })}
      />
    </div>
    <div className="flex flex-col gap-1">
      <Label>End date</Label>
      <DateInputNative
        value={value?.to}
        onChange={(to) => onChange?.({ from: value?.from, to })}
      />
    </div>
  </div>
);

export const DateRangeCustom = ({
  value,
  onChange,
  className,
}: DateRangeInputProps) => (
  <div className={`${inputRow} max-w-96 ${className ?? ''}`}>
    <TextDateInput
      value={value?.from}
      onChange={(from) => onChange?.({ from, to: value?.to })}
    />
    <span className="text-gray-400 text-sm shrink-0">–</span>
    <TextDateInput
      value={value?.to}
      onChange={(to) => onChange?.({ from: value?.from, to })}
    />
    <CalendarTrigger
      icon={<CalendarToday fontSize="small" className="text-gray-500" />}
      label="Open date range calendar"
    >
      <DateRangeCalendar selected={value} onSelect={onChange} />
    </CalendarTrigger>
  </div>
);

export type WeekInputProps = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
};

export const WeekInputNative = ({
  value,
  onChange,
  className,
}: WeekInputProps) => (
  <div className={`flex flex-col gap-1 ${className ?? ''}`}>
    <Label>Week of</Label>
    <DateInputNative
      value={value?.from}
      onChange={(date) => {
        if (!date) {
          onChange?.(undefined);
          return;
        }
        onChange?.({ from: startOfWeek(date), to: endOfWeek(date) });
      }}
    />
  </div>
);

export const WeekInputCustom = ({
  value,
  onChange,
  className,
}: WeekInputProps) => (
  <div className={`flex flex-col gap-1 ${className ?? ''}`}>
    <Label>Week of</Label>
    <div className={`${inputRow} max-w-64`}>
      <TextDateInput
        value={value?.from}
        onChange={(date) => {
          if (!date) {
            onChange?.(undefined);
            return;
          }
          onChange?.({ from: startOfWeek(date), to: endOfWeek(date) });
        }}
      />
      <CalendarTrigger
        icon={<CalendarToday fontSize="small" className="text-gray-500" />}
        label="Open week picker"
      >
        <WeekCalendar selected={value} onSelect={onChange} />
      </CalendarTrigger>
    </div>
  </div>
);

export const WeekInputReadOnly = ({
  value,
  onChange,
  className,
}: WeekInputProps) => (
  <div className={`${inputRow} max-w-64 h-9 min-h-9 ${className ?? ''}`}>
    <span className="min-h-9 h-9 px-4 text-base flex items-center flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
      {value ? (
        formatWeekLabel(value)
      ) : (
        <span className="text-gray-400">Select a week</span>
      )}
    </span>
    <CalendarTrigger
      icon={<CalendarToday fontSize="small" className="text-gray-500" />}
      label="Open week picker"
    >
      <WeekCalendar selected={value} onSelect={onChange} />
    </CalendarTrigger>
  </div>
);

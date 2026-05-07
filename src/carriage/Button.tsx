import { type ReactNode } from 'react';

type IconProp =
  | { position: 'left'; icon: ReactNode }
  | { position: 'right'; icon: ReactNode }
  | { position: 'only'; icon: ReactNode };

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick'
> & {
  ref?: React.Ref<HTMLButtonElement>;
  accent?: 'primary' | 'secondary' | 'destructive';
  size?: 'normal' | 'large';
  icon?: IconProp;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  accent = 'secondary',
  size = 'normal',
  icon,
  text,
  className,
  onClick,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    aria-label={text}
    disabled={disabled}
    onClick={disabled ? undefined : onClick}
    className={`flex items-center justify-center rounded text-nowrap
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${size === 'large' ? 'h-11 gap-1.5 text-lg' : 'h-9 gap-1 text-base'}
      ${
        icon?.position === 'only'
          ? `${size === 'large' ? 'w-11' : 'w-9'} p-0 shrink-0`
          : `w-min ${
              icon?.position === 'left'
                ? size === 'large'
                  ? 'pl-4 pr-6'
                  : 'pl-2 pr-4'
                : icon?.position === 'right'
                ? size === 'large'
                  ? 'pl-6 pr-4'
                  : 'pl-4 pr-2'
                : size === 'large'
                ? 'px-6'
                : 'px-4'
            }`
      }
      ${
        accent === 'primary'
          ? disabled
            ? 'border border-[#555] bg-[#555] text-gray-200'
            : 'border border-[#303030] bg-black text-white hover:bg-[#333] hover:text-white active:bg-[#555] active:text-white'
          : accent === 'destructive'
          ? disabled
            ? 'border border-red-200 bg-red-200 text-white'
            : 'border border-red-800 bg-red-700 text-white hover:bg-red-600 active:bg-red-900'
          : disabled
          ? 'border border-[#ddd] bg-gray-100 text-gray-400'
          : 'border border-[#ddd] bg-white hover:bg-[#fafafa] active:bg-[#eaeaea]'
      }
      ${className ?? ''}`}
    {...props}
  >
    {icon?.position === 'only' ? (
      icon.icon
    ) : (
      <>
        {icon?.position === 'left' && icon.icon}
        {text}
        {icon?.position === 'right' && icon.icon}
      </>
    )}
  </button>
);

export default Button;

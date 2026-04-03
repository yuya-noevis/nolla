"use client";

type TouchButtonProps = {
  readonly onClick: () => void;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly ariaLabel: string;
};

export function TouchButton({
  onClick,
  children,
  className = "",
  ariaLabel,
}: TouchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        min-w-16 min-h-16
        flex items-center justify-center
        rounded-2xl
        transition-transform duration-100 active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-nolla-primary
        ${className}
      `}
    >
      {children}
    </button>
  );
}

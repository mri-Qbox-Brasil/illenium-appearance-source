import React, { useCallback, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '../../../lib/utils';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  blacklisted?: number[];
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  title,
  min = 0,
  max = 255,
  blacklisted = [],
  defaultValue,
  clientValue,
  onChange,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isBlacklisted = (value: number) => blacklisted.includes(value);

  const normalize = (value: number) => {
    if (value < min) return max;
    if (value > max) return min;
    return value;
  };

  const checkBlacklisted = (value: number, factor: number) => {
    let nextValue = normalize(value);
    if (factor === 0) {
      if (!isBlacklisted(nextValue)) return nextValue;
      factor = nextValue > defaultValue ? 1 : -1;
    }

    do {
      nextValue = normalize(nextValue + factor);
    } while (isBlacklisted(nextValue));

    return nextValue;
  };

  const handleChange = (newValue: any, factor: number) => {
    let parsedValue = typeof newValue === 'string' ? parseInt(newValue) : newValue;
    if (isNaN(parsedValue)) return;

    const safeValue = checkBlacklisted(parsedValue, factor);
    onChange(safeValue);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      <div className="flex justify-between items-center px-0.5">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <span className="text-[10px] text-muted-foreground/60">{clientValue} / {max}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => handleChange(defaultValue, -1)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>

        <input
          type="number"
          ref={inputRef}
          value={defaultValue}
          onChange={(e) => handleChange(e.target.value, 0)}
          className="flex h-8 w-full rounded-md border border-input bg-background/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={() => handleChange(defaultValue, 1)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Input;

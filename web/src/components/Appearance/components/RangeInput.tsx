import React, { useRef } from 'react';
import { cn } from '../../../lib/utils';

interface RangeInputProps {
  title?: string;
  min?: number;
  max?: number;
  factor?: number;
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
  className?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({
  title,
  min = 0,
  max = 255,
  factor = 1,
  defaultValue,
  clientValue,
  onChange,
  className,
}) => {
  const displayValue = (val: number) => (val * factor).toFixed(2);

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center px-0.5">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <span className="text-[10px] text-muted-foreground/60">{displayValue(defaultValue)} / {displayValue(max)}</span>
      </div>

      <div className="relative flex items-center group">
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={defaultValue}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary group-hover:accent-primary-hover"
        />
      </div>
    </div>
  );
};

export default RangeInput;

import React from 'react';
import { cn } from '../../../lib/utils';

interface ColorInputProps {
  title: string;
  colors: number[][];
  defaultValue: number;
  clientValue?: number;
  onChange: (value: number) => void;
  className?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({
  title,
  colors,
  defaultValue,
  clientValue,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <span className="text-xs font-medium text-muted-foreground px-0.5">{title}</span>
      <div className="grid grid-cols-8 gap-1.5 p-2 rounded-md border bg-background/30 max-h-40 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-muted">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={cn(
              "aspect-square w-full rounded-full border border-white/10 transition-all hover:scale-110 focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background",
              defaultValue === index && "ring-2 ring-primary ring-offset-1 ring-offset-background scale-110 z-10"
            )}
            style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
            title={`Color ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorInput;

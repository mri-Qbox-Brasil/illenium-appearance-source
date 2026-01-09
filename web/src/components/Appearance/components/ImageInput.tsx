import React, { useCallback, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '../../../lib/utils';
import { IMAGE_CONFIG } from '../configs/images';

interface ImageInputProps {
  title: string;
  min?: number;
  max?: number;
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
  imageUrl?: string;
  className?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  title,
  min = 0,
  max = 255,
  defaultValue,
  clientValue,
  onChange,
  imageUrl,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgError, setImgError] = useState(false);

  const normalize = (value: number) => {
    if (value < min) return max;
    if (value > max) return min;
    return value;
  };

  const handleChange = (newValue: number, factor: number) => {
    const safeValue = normalize(newValue + factor);
    onChange(safeValue);
    setImgError(false);
  };

  return (
    <div className={cn("flex flex-col gap-2 p-3 rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-medium leading-none tracking-tight">{title}</span>
        <span className="text-xs text-muted-foreground">{clientValue} / {max}</span>
      </div>

      <div className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted">
        <img
          src={imgError || !imageUrl ? IMAGE_CONFIG.placeholder : imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-all hover:scale-105"
          onError={() => setImgError(true)}
        />
      </div>

      <div className="flex items-center gap-1 mt-auto">
        <button
          onClick={() => handleChange(defaultValue, -1)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>

        <input
          type="number"
          ref={inputRef}
          value={defaultValue}
          onChange={(e) => onChange(normalize(parseInt(e.target.value) || 0))}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={() => handleChange(defaultValue, 1)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ImageInput;

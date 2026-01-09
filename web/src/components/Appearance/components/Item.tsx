import React from 'react';
import { cn } from '../../../lib/utils';

interface ItemProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Item: React.FC<ItemProps> = ({ title, children, className }) => {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {title && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground mb-1">
          {title}
        </label>
      )}
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};

export default Item;

import React from 'react';
import { cn } from '../../../lib/utils';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  deps?: any[];
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <div className={cn("mb-6 flex flex-col gap-4", className)}>
      <h3 className="text-lg font-semibold tracking-tight border-b pb-2 mb-2 text-primary uppercase text-xs opacity-70">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export default Section;

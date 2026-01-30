import React, { ReactNode } from 'react';
import { MriButton } from '@mriqbox/ui-kit';

interface ButtonProps {
  children: string | ReactNode;
  margin?: string;
  width?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, margin, width, disabled }: ButtonProps) => {
  return (
    <div style={{ width: width || 'auto', margin: margin || '0px' }}>
      <MriButton
        onClick={onClick}
        disabled={disabled}
        className="w-full"
      >
        {children}
      </MriButton>
    </div>
  );
};

export default Button;

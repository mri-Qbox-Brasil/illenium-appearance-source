import React, { useRef } from 'react';
import Select from 'react-select';
import { cn } from '../../../lib/utils';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const customStyles: any = {
  control: (styles: any) => ({
    ...styles,
    background: 'hsl(var(--secondary) / 0.3)',
    borderColor: 'hsl(var(--border))',
    minHeight: '32px',
    height: '32px',
    borderRadius: 'calc(var(--radius) - 2px)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'hsl(var(--border))',
      background: 'hsl(var(--secondary) / 0.5)',
    }
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: '0 8px',
    height: '32px',
  }),
  input: (styles: any) => ({
    ...styles,
    margin: '0',
    padding: '0',
    color: 'hsl(var(--foreground))',
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    padding: '4px',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: 'hsl(var(--muted-foreground))',
    '&:hover': {
      color: 'hsl(var(--foreground))',
    }
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: 'hsl(var(--foreground))',
    fontSize: '0.875rem',
  }),
  menu: (styles: any) => ({
    ...styles,
    background: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 'var(--radius)',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    zIndex: 9999,
  }),
  menuList: (styles: any) => ({
    ...styles,
    padding: '4px',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'hsl(var(--muted))',
      borderRadius: '10px',
    },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    borderRadius: 'calc(var(--radius) - 2px)',
    fontSize: '0.875rem',
    padding: '6px 8px',
    cursor: 'pointer',
    background: isSelected
      ? 'hsl(var(--primary))'
      : isFocused
        ? 'hsl(var(--accent))'
        : 'transparent',
    color: isSelected
      ? 'hsl(var(--primary-foreground))'
      : 'hsl(var(--foreground))',
    '&:active': {
      background: 'hsl(var(--accent))',
    }
  }),
};

const SelectInput = ({ title, items, defaultValue, clientValue, onChange, className }: SelectInputProps) => {
  const selectRef = useRef<any>(null);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      onChange(event.value);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      <div className="flex justify-between items-center px-0.5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        <span className="text-[10px] text-muted-foreground/60">{clientValue}</span>
      </div>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item }))}
        value={{ value: defaultValue, label: defaultValue }}
        onChange={handleChange}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default SelectInput;

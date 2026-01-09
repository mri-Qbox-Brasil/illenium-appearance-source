import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { useNuiState } from '../../../hooks/nuiState';
import Button from './Button';
import { Tattoo } from '../interfaces';
import RangeInput from './RangeInput';
import { TattoosSettings } from '../interfaces';
import { cn } from '../../../lib/utils';

interface SelectTattooProps {
  items: Tattoo[];
  tattoosApplied: Tattoo[] | null;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  settings: TattoosSettings;
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

const SelectTattoo = ({
  items,
  tattoosApplied,
  handleApplyTattoo,
  handlePreviewTattoo,
  handleDeleteTattoo,
  settings,
  className
}: SelectTattooProps) => {
  const defaultOpacity = 0.1;
  const selectRef = useRef<any>(null);
  const [currentTattoo, setCurrentTattoo] = useState<Tattoo>(items[0]);
  const [opacity, setOpacity] = useState<number>(defaultOpacity);
  const { label } = currentTattoo;
  const { locales } = useNuiState();

  const clientOpacity = useCallback(() => {
    if (!tattoosApplied) return defaultOpacity;
    const { name } = currentTattoo;
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) {
        return tattoosApplied[i].opacity ?? defaultOpacity;
      }
    }
    return defaultOpacity;
  }, [currentTattoo, tattoosApplied])();

  useEffect(() => {
    setOpacity(clientOpacity);
  }, [clientOpacity]);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      handlePreviewTattoo(event.value, opacity);
      setCurrentTattoo(event.value);
    }
  };

  const handleChangeOpacity = useCallback((value : number) => {
    setOpacity(value);
    handlePreviewTattoo(currentTattoo, value);
  }, [currentTattoo]);

  const isTattooApplied = useCallback(() => {
    if (!tattoosApplied) return false;
    const { name } = currentTattoo;
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) return true;
    }
    return false;
  }, [tattoosApplied, currentTattoo])();

  if (!locales) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-4 w-full p-1", className)}>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item.label }))}
        value={{ value: currentTattoo, label }}
        onChange={handleChange}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        menuShouldScrollIntoView={true}
      />
      <RangeInput
        title={locales.tattoos.opacity}
        min={settings.opacity.min}
        max={settings.opacity.max}
        factor={settings.opacity.factor}
        defaultValue={opacity}
        clientValue={clientOpacity}
        onChange={value => handleChangeOpacity(value)}
      />
      <div className="flex justify-end">
        {isTattooApplied ? (
          <Button variant="destructive" size="sm" onClick={() => handleDeleteTattoo(currentTattoo)}>
            {locales.tattoos.delete}
          </Button>
        ) : (
          <Button variant="default" size="sm" onClick={() => handleApplyTattoo(currentTattoo, opacity)}>
            {locales.tattoos.apply}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelectTattoo;

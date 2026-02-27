import { useCallback, useRef } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
  className?: string;
}

const Container = styled.div`
  color: ${({ theme }) => `rgb(${theme.fontColor || '255, 255, 255'})`};

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 15px;
    background: ${({ theme }) => theme.id === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
    outline: none;
    opacity: 1;
    border-radius: 2px;
    margin: 0 10px;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 17px;
    height: 17px;
    background: ${({ theme }) => `rgb(${theme.fontColorSelected || '255, 255, 255'})`};
    border: 2px solid ${({ theme }) => `rgb(${theme.accent})`};
    cursor: pointer;
    border-radius: 50%;
  }
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue = 1,
  clientValue,
  onChange,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      const parsedValue = parseFloat(e.target.value);
      onChange(parsedValue);
    },
    [onChange],
  );

  return (
    <Container className={`range-input-container w-full ${className || ''}`} onClick={handleContainerClick}>
      <span className="range-input-labels flex justify-between">
        <small>
          {title}: {defaultValue}
        </small>
        <small>{clientValue}</small>
      </span>
      <div className="range-input-slider-wrapper flex items-center relative mt-[10px]">
        <small className="font-extralight text-[8px]">{min}</small>
        <input
          type="range"
          ref={inputRef}
          value={defaultValue}
          min={min}
          max={max}
          step={factor}
          onChange={handleChange}
        />
        <small className="font-extralight text-[8px]">{max}</small>
      </div>
    </Container>
  );
};

export default RangeInput;

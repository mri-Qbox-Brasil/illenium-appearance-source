import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  blacklisted?: number[];
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  margin-top: ${({ title }) => (title ? '5px' : '0')};

  > span {
    width: 100%;

    display: flex;
    justify-content: space-between;
    font-weight: 200;
  }

  > div {
    min-width: 0;
    height: 30px;

    display: flex;
    align-items: center;

    margin-top: 10px;

    button {
      height: 100%;
      min-width: 30px;

      display: flex;
      align-items: center;
      justify-content: center;

      color: rgba(${props => props.theme.fontColor || '255, 255, 255'}, 1);

      outline: 0;
      border: none;
      border-radius: 2px;

      background: rgba(23, 23, 23, 0.5);

      &:hover {
        color: rgba(${props => props.theme.fontColorHover || '255, 255, 255'}, 1);
        background: rgba(${props => props.theme.primaryBackground || '0, 0, 0'}, 0.9);
        ${props => props.theme.smoothBackgroundTransition ? 'transition: background 0.2s;' : ''}
        ${props => props.theme.scaleOnHover ? 'transform: scale(1.1);' : ''}
      }
    }

    input {
      min-width: 0;
      height: 100%;

      flex-grow: 1;
      flex-shrink: 1;

      text-align: center;
      font-size: 14px;
      color: rgba(${props => props.theme.fontColor || '255, 255, 255'}, 1);

      border: none;
      border-radius: 2px;
      margin: 0 2px;

      background: rgba(${props => props.theme.secondaryBackground || '0, 0, 0'}, 0.8);

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

const shapeOptions = [
  { name: "Benjamin", id: 0 }, { name: "Daniel", id: 1 }, { name: "Joshua", id: 2 },
  { name: "Noah", id: 3 }, { name: "Andrew", id: 4 }, { name: "Juan", id: 5 },
  { name: "Alex", id: 6 }, { name: "Isaac", id: 7 }, { name: "Evan", id: 8 },
  { name: "Ethan", id: 9 }, { name: "Vincent", id: 10 }, { name: "Angel", id: 11 },
  { name: "Diego", id: 12 }, { name: "Adrian", id: 13 }, { name: "Gabriel", id: 14 },
  { name: "Michael", id: 15 }, { name: "Santiago", id: 16 }, { name: "Kevin", id: 17 },
  { name: "Louis", id: 18 }, { name: "Samuel", id: 19 }, { name: "Anthony", id: 20 },
  { name: "Hannah", id: 21 }, { name: "Aubrey", id: 22 }, { name: "Jasmine", id: 23 },
  { name: "Gisele", id: 24 }, { name: "Amelia", id: 25 }, { name: "Isabella", id: 26 },
  { name: "Zoe", id: 27 }, { name: "Ava", id: 28 }, { name: "Camila", id: 29 },
  { name: "Violet", id: 30 }, { name: "Sophia", id: 31 }, { name: "Evelyn", id: 32 },
  { name: "Nicole", id: 33 }, { name: "Ashley", id: 34 }, { name: "Gracie", id: 35 },
  { name: "Brianna", id: 36 }, { name: "Natalie", id: 37 }, { name: "Olivia", id: 38 },
  { name: "Elizabeth", id: 39 }, { name: "Charlotte", id: 40 }, { name: "Emma", id: 41 },
  { name: "Claude", id: 42 }, { name: "Niko", id: 43 }, { name: "John", id: 44 },
  { name: "Misty", id: 45 }
];

const StringInput: React.FC<InputProps> = ({
  title,
  min = 0,
  max = 255,
  blacklisted = [],
  defaultValue,
  clientValue,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState<number>(defaultValue);

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const isBlacklisted = (value: number) => blacklisted.includes(value);

  const normalize = (value: number) => {
    if (value < min) return max;
    if (value > max) return min;
    return value;
  };

  const checkBlacklisted = (value: number, factor: number) => {
    if (factor === 0 && !isBlacklisted(value)) return normalize(value);

    if (factor === 0) factor = value > internalValue ? 1 : -1;

    do {
      value = normalize(value + factor);
    } while (isBlacklisted(value));

    return value;
  };

  const handleChange = useCallback((newValue: number, factor: number) => {
    const safeValue = checkBlacklisted(newValue, factor);
    setInternalValue(safeValue);
    onChange(safeValue);
  }, [onChange, internalValue]);

  const getLabel = (id: number) => {
    const match = shapeOptions.find(opt => opt.id === id);
    return match ? match.name : `ID ${id}`;
  };

  return (
    <Container onClick={handleContainerClick}>
      <span>
        <small>{title}</small>
        <small>{clientValue} / {max}</small>
      </span>
      <div>
        <button type="button" onClick={() => handleChange(internalValue, -1)}>
          <FiChevronLeft strokeWidth={5} />
        </button>
        <input
          type="text"
          ref={inputRef}
          value={getLabel(internalValue)}
          readOnly // impede digitação
        />
        <button type="button" onClick={() => handleChange(internalValue, 1)}>
          <FiChevronRight strokeWidth={5} />
        </button>
      </div>
    </Container>
  );
};

export default StringInput;

import React, { useState, useRef, useEffect, ReactElement, useCallback, ReactNode } from 'react';
import {
  FaVideo,
  FaStreetView,
  FaUndo,
  FaRedo,
  FaSmile,
  FaMale,
  FaShoePrints,
  FaSave,
  FaTimes,
  FaTshirt,
  FaHatCowboy,
  FaSocks,
} from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';
import { cn } from '../../lib/utils';

import { CameraState, ClothesState, RotateState } from './interfaces';

interface ToggleOptionProps {
  active: boolean;
  onClick: () => void;
  children?: ReactNode;
}

interface ExtendendOptionProps {
  icon: ReactElement;
  children?: ReactNode;
}

interface OptionsProps {
  camera: CameraState;
  rotate: RotateState;
  clothes: ClothesState;
  handleSetClothes: (key: keyof ClothesState) => void;
  handleSetCamera: (key: keyof CameraState) => void;
  handleTurnAround: () => void;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  handleSave: () => void;
  handleExit: () => void;
  enableExit: boolean;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ children, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 w-10 flex items-center justify-center rounded-md transition-all duration-200 shadow-sm",
        "bg-secondary/70 text-foreground/90 hover:bg-secondary hover:text-foreground",
        active && "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
    >
      {children}
    </button>
  );
};

const ExtendedOption: React.FC<ExtendendOptionProps> = ({ children, icon }) => {
  const [extended, setExtended] = useState(false);
  const [width, setWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.scrollWidth);
    }
  }, [children]);

  return (
    <div
      className="flex items-center group relative overflow-visible h-10"
      onMouseEnter={() => setExtended(true)}
      onMouseLeave={() => setExtended(false)}
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-md bg-secondary/70 text-foreground/90 shadow-sm z-10">
        {icon}
      </div>
      <div
        className={cn(
          "flex items-center gap-2 pl-2 transition-all duration-300 ease-in-out overflow-hidden h-10",
          extended ? "opacity-100" : "opacity-0 w-0 pointer-events-none"
        )}
        style={{ width: extended ? `${width + 8}px` : '0px' }}
      >
        <div ref={contentRef} className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const Options: React.FC<OptionsProps> = ({
  camera,
  rotate,
  clothes,
  handleSetClothes,
  handleSetCamera,
  handleTurnAround,
  handleRotateLeft,
  handleRotateRight,
  handleExit,
  handleSave,
  enableExit
}) => {
  return (
    <div className="h-full flex flex-col items-start gap-4 py-10 px-4 bg-transparent">
      <ExtendedOption icon={<FaVideo size={20} />}>
        <ToggleOption active={camera.head} onClick={() => handleSetCamera('head')}>
          <FaSmile size={18} />
        </ToggleOption>
        <ToggleOption active={camera.body} onClick={() => handleSetCamera('body')}>
          <FaMale size={18} />
        </ToggleOption>
        <ToggleOption active={camera.bottom} onClick={() => handleSetCamera('bottom')}>
          <FaShoePrints size={18} />
        </ToggleOption>
      </ExtendedOption>

      <ExtendedOption icon={<GiClothes size={20} />}>
        <ToggleOption active={clothes.head} onClick={() => handleSetClothes('head')}>
          <FaHatCowboy size={18} />
        </ToggleOption>
        <ToggleOption active={clothes.body} onClick={() => handleSetClothes('body')}>
          <FaTshirt size={18} />
        </ToggleOption>
        <ToggleOption active={clothes.bottom} onClick={() => handleSetClothes('bottom')}>
          <FaSocks size={18} />
        </ToggleOption>
      </ExtendedOption>

      <button
        type="button"
        onClick={handleTurnAround}
        className="h-10 w-10 flex items-center justify-center rounded-md bg-secondary/70 text-foreground/90 hover:bg-secondary hover:text-foreground transition-all shadow-sm"
      >
        <FaStreetView size={20} />
      </button>

      <ToggleOption active={rotate.left} onClick={handleRotateLeft}>
        <FaRedo size={18} />
      </ToggleOption>

      <ToggleOption active={rotate.right} onClick={handleRotateRight}>
        <FaUndo size={18} />
      </ToggleOption>

      <button
        type="button"
        onClick={handleSave}
        className="h-10 w-10 flex items-center justify-center rounded-md bg-green-600/70 text-white hover:bg-green-600 transition-all shadow-sm mt-auto"
      >
        <FaSave size={20} />
      </button>

      {enableExit && (
        <button
          type="button"
          onClick={handleExit}
          className="h-10 w-10 flex items-center justify-center rounded-md bg-destructive/70 text-destructive-foreground hover:bg-destructive transition-all shadow-sm"
        >
          <FaTimes size={20} />
        </button>
      )}
    </div>
  );
};

export default Options;

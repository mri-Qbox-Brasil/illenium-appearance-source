import { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import {
  FaUndo,
  FaRedo,
  FaTimes, // Exit
  FaSyncAlt, // Turn Around
  FaSearch, // Zoom
  FaLightbulb, // Light
  FaMouse, // Rotate icon (visual)
  FaCamera,
  FaTshirt,
  FaHatCowboy,
  FaSocks,
  FaMale,
  FaSmile,
  FaShoePrints
} from 'react-icons/fa';

import { CameraState, ClothesState, RotateState } from './interfaces';

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
  layout: 'accordion' | 'tabs';
}

const OverlayContainer = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

// --- General Button Styles ---
const RoundButton = styled.button<{ active?: boolean; variant?: 'primary' | 'danger' | 'default' }>`
  pointer-events: auto;
  height: 40px;
  width: 40px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 50%;

  color: rgba(255, 255, 255, 0.9);
  
  /* Variant Backgrounds */
  ${({ variant, active }) => {
    if (variant === 'danger') return 'background: rgba(239, 68, 68, 0.9);'; // Red
    if (variant === 'primary' || active) return 'background: rgb(16, 185, 129);'; // Emerald
    return 'background: rgba(40, 40, 45, 0.8);'; // Default Dark
  }}

  /* Hover Effects */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.1);
    ${({ variant, active }) => {
    if (variant === 'danger') return 'background: rgba(220, 38, 38, 1);';
    if (variant === 'primary' || active) return 'background: rgb(5, 150, 105);';
    return 'background: rgba(60, 60, 65, 0.9);';
  }}
  }

  svg {
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
  }
`;

// --- Top Left Strip ---
const TopLeftStrip = styled.div<{ layout: 'accordion' | 'tabs' }>`
  position: absolute;
  top: 30px;
  left: min(75vw + 40px, 1060px);
  
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  transition: left 0.3s ease;
`;

// --- Bottom Left Strip ---
const BottomLeftStrip = styled.div<{ layout: 'accordion' | 'tabs' }>`
  position: absolute;
  bottom: 30px;
  left: min(75vw + 40px, 1060px);

  display: flex;
  flex-direction: column;
  gap: 8px;
  
  transition: left 0.3s ease;
`;

// --- Sub Menu (Flyout) ---
const Flyout = styled.div<{ show: boolean }>`
  position: absolute;
  left: 100%; /* Append to the right side */
  top: 0;
  margin-left: 10px; /* Gap between main button and flyout */
  
  display: flex;
  gap: 8px;
  
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: translateX(${({ show }) => (show ? '0' : '-10px')});
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  
  transition: all 0.2s ease;
`;

const Options: React.FC<OptionsProps> = ({
  camera,
  rotate,
  clothes,
  handleSetClothes,
  handleSetCamera,
  handleTurnAround,
  handleRotateLeft,
  handleRotateRight,
  handleSave,
  handleExit,
  enableExit,
  layout
}) => {
  const [showClothes, setShowClothes] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  return (
    <OverlayContainer>
      {/* --- Top Left: Mode Toggles --- */}
      <TopLeftStrip layout={layout}>
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowCamera(true)}
          onMouseLeave={() => setShowCamera(false)}
        >
          <RoundButton active={showCamera} variant="primary">
            <FaCamera size={18} />
          </RoundButton>
          <Flyout show={showCamera}>
            <RoundButton onClick={() => handleSetCamera('head')} active={camera.head} title="Head">
              <FaSmile size={16} />
            </RoundButton>
            <RoundButton onClick={() => handleSetCamera('body')} active={camera.body} title="Body">
              <FaMale size={16} />
            </RoundButton>
            <RoundButton onClick={() => handleSetCamera('bottom')} active={camera.bottom} title="Feet">
              <FaShoePrints size={16} />
            </RoundButton>
          </Flyout>
        </div>

        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowClothes(true)}
          onMouseLeave={() => setShowClothes(false)}
        >
          <RoundButton active={showClothes} variant="default">
            <FaTshirt size={18} />
          </RoundButton>
          <Flyout show={showClothes}>
            <RoundButton onClick={() => handleSetClothes('head')} active={clothes.head} title="Hat">
              <FaHatCowboy size={16} />
            </RoundButton>
            <RoundButton onClick={() => handleSetClothes('body')} active={clothes.body} title="Shirt">
              <FaTshirt size={16} />
            </RoundButton>
            <RoundButton onClick={() => handleSetClothes('bottom')} active={clothes.bottom} title="Pants">
              <FaSocks size={16} />
            </RoundButton>
          </Flyout>
        </div>
      </TopLeftStrip>

      {/* --- Bottom Left: Actions --- */}
      <BottomLeftStrip layout={layout}>
        <RoundButton onClick={handleRotateLeft}>
          <FaUndo size={14} />
        </RoundButton>
        <RoundButton onClick={handleRotateRight}>
          <FaRedo size={14} />
        </RoundButton>
        <RoundButton onClick={handleTurnAround} variant="danger" style={{ background: '#ff5f5f' }}>
          <FaSyncAlt size={14} />
        </RoundButton>
        {enableExit && (
          <RoundButton onClick={handleExit} style={{ background: '#4b5563' }}>
            <FaTimes size={16} />
          </RoundButton>
        )}
      </BottomLeftStrip>

      {/* --- Bottom Right: Tools Removed --- */}
    </OverlayContainer>
  );
};

export default Options;



import React, { useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { FaPlus, FaImage, FaTshirt, FaSearch } from 'react-icons/fa';

interface ImageSelectorProps {
  label?: string;
  items: { id: string; icon?: React.ReactNode; image?: string }[];
  selectedValue?: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  className?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.span`
  color: ${({ theme }) => `rgba(${theme.fontColor}, 0.6)`};
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
`;

const ItemBox = styled.div<{ active?: boolean; isAdd?: boolean }>`
  aspect-ratio: 1 / 1;
  background: ${({ active, theme }) =>
    active
      ? `rgba(${theme.accent || '10, 213, 140'}, 0.15)`
      : theme.id === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'
  };
  border: 1px solid ${({ active, theme }) =>
    active
      ? `rgb(${theme.accent || '10, 213, 140'})`
      : theme.id === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.08)'
  };
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ active, theme }) =>
    active ? `rgb(${theme.accent || '10, 213, 140'})` : `rgba(${theme.fontColor}, 0.3)`
  };

  &:hover {
    background: ${({ active, theme }) =>
    active
      ? `rgba(${theme.accent || '10, 213, 140'}, 0.2)`
      : 'rgba(255, 255, 255, 0.06)'
  };
    transform: translateY(-2px);
    border-color: ${({ active, theme }) =>
    active ? `rgb(${theme.accent || '10, 213, 140'})` : 'rgba(255, 255, 255, 0.1)'
  };
  }

  svg {
    font-size: 24px;
  }

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
    display: block;
  }
`;

const SelectionDot = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => `rgb(${theme.accent || '10, 213, 140'})`};
  box-shadow: 0 0 8px ${({ theme }) => `rgba(${theme.accent || '10, 213, 140'}, 0.5)`};
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 320px;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

const Dialog = styled.div`
  background: ${({ theme }) => `rgb(${theme.secondaryBackground || '19, 19, 21'})`};
  border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.04)'};
  border-radius: 24px;
  padding: 24px;
  width: 90vw;
  max-width: 600px;
  max-height: 85vh;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
`;

const DialogTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  background: ${({ theme }) => theme.id === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => `rgb(${theme.accent})`};
    background: ${({ theme }) => theme.id === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.08)'};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  overflow-y: auto;
  padding: 6px;
  max-height: 55vh;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`;

const GalleryItem = styled.div`
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.id === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)'};
  border: 1px solid ${({ theme }) => theme.id === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  overflow: hidden;
  color: ${({ theme }) => `rgba(${theme.fontColor || '255, 255, 255'}, 0.4)`};

  &:hover {
    background: ${({ theme }) => theme.id === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ theme }) => `rgb(${theme.fontColor || '255, 255, 255'})`};
    transform: translateY(-2px);
  }

  svg {
    font-size: 24px;
    z-index: 1;
  }

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
    display: block;
    z-index: 1;
  }
`;

const ReferenceLabel = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.9);
  font-size: 10px;
  font-weight: 700;
  padding: 4px 0;
  text-align: center;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  pointer-events: none;
  backdrop-filter: blur(4px);
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.05)'};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'ghost' }>`
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${({ variant, theme }) =>
    variant === 'primary'
      ? `
        background: rgb(${theme.accent || '10, 213, 140'});
        color: white;
        &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(${theme.accent || '10, 213, 140'}, 0.3); }
      `
      : `
        background: ${theme.id === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        color: rgba(${theme.fontColor || '255, 255, 255'}, 0.7);
        border-color: ${theme.id === 'dark' ? 'transparent' : 'rgba(0, 0, 0, 0.1)'};
        &:hover { background: ${theme.id === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}; color: rgb(${theme.fontColor || '255, 255, 255'}); }
      `
  }
`;

const ImageWithFallback = ({ src, alt, fallback }: { src?: string; alt: string; fallback: React.ReactNode }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
};

const ImageSelector: React.FC<ImageSelectorProps> = ({ label, items, selectedValue, onSelect, onAdd, className }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme() as any;

  const handleBoxClick = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSearchTerm('');
  };

  const handleItemSelect = (id: string) => {
    onSelect(id);
    handleClose();
  };

  const filteredItems = items.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedItem = items.find(item => item.id === selectedValue);

  return (
    <Container className={`image-selector-container ${className || ''}`}>
      {label && <Label className="image-selector-label">{label}</Label>}
      <ItemBox
        active
        onClick={handleBoxClick}
        style={{ width: '100px', height: '100px' }}
      >
        {selectedItem?.image ? (
          <ImageWithFallback src={selectedItem.image} alt={selectedItem.id} fallback={selectedItem?.icon || <FaImage />} />
        ) : (
          selectedItem?.icon || <FaImage />
        )}
        <SelectionDot />
      </ItemBox>

      {isDialogOpen && (
        <DialogOverlay onClick={handleClose}>
          <Dialog className="w-[90vw] sm:w-[500px] md:w-[600px] max-w-full" onClick={(e) => e.stopPropagation()}>
            <DialogTitle>
              Selecionar Modelo
              <small style={{ fontSize: '12px', fontWeight: 400, opacity: 0.5 }}>{filteredItems.length} opções disponíveis</small>
            </DialogTitle>
            <SearchContainer>
              <SearchIcon />
              <SearchInput
                autoFocus
                placeholder="Pesquisar por nome ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            <GalleryGrid className="flex flex-wrap gap-3 justify-center">
              {filteredItems.map((item) => (
                <GalleryItem
                  key={item.id}
                  onClick={() => handleItemSelect(item.id)}
                  style={{
                    border: selectedValue === item.id ? `2px solid rgb(${theme.accent})` : '1px solid rgba(255, 255, 255, 0.05)',
                    background: selectedValue === item.id ? `rgba(${theme.accent}, 0.1)` : undefined
                  }}
                >
                  {item.image ? (
                    <ImageWithFallback
                      src={item.image}
                      alt={item.id}
                      fallback={item.icon || <span style={{ fontSize: '18px', fontWeight: 700, opacity: 0.8 }}>{item.id}</span>}
                    />
                  ) : (
                    item.icon || <span style={{ fontSize: '18px', fontWeight: 700, opacity: 0.8 }}>{item.id}</span>
                  )}
                  <ReferenceLabel>{item.id}</ReferenceLabel>
                </GalleryItem>
              ))}
            </GalleryGrid>
            <DialogActions>
              <ActionButton onClick={handleClose}>Fechar</ActionButton>
            </DialogActions>
          </Dialog>
        </DialogOverlay>
      )}
    </Container>
  );
};

export default ImageSelector;

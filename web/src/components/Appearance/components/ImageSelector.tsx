import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlus, FaImage, FaTshirt } from 'react-icons/fa';

interface ImageSelectorProps {
  label?: string;
  items: { id: string; icon?: React.ReactNode; image?: string }[];
  selectedValue?: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
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
  color: rgba(255, 255, 255, 0.6);
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
      : 'rgba(255, 255, 255, 0.03)'
  };
  border: 1px solid ${({ active, theme }) =>
    active
      ? `rgb(${theme.accent || '10, 213, 140'})`
      : 'rgba(255, 255, 255, 0.03)'
  };
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ active, theme }) =>
    active ? `rgb(${theme.accent || '10, 213, 140'})` : 'rgba(255, 255, 255, 0.3)'
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
    width: 80%;
    height: 80%;
    object-fit: contain;
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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

const Dialog = styled.div`
  background: ${({ theme }) => `rgb(${theme.secondaryBackground || '20, 20, 20'})`};
  border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.05)'};
  border-radius: 24px;
  padding: 24px;
  width: 400px;
  max-height: 80vh;
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  overflow-y: auto;
  padding-right: 4px;
  max-height: 400px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`;

const GalleryItem = styled.div`
  aspect-ratio: 1 / 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.4);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  svg {
    font-size: 20px;
  }
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'ghost' }>`
  padding: 10px 20px;
  border-radius: 10px;
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
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.7);
        &:hover { background: rgba(255, 255, 255, 0.1); color: white; }
      `
  }
`;

const ImageSelector: React.FC<ImageSelectorProps> = ({ label, items, selectedValue, onSelect, onAdd }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddClick = () => {
    setIsDialogOpen(true);
  };

  const handleItemSelect = (id: string) => {
    onSelect(id);
    setIsDialogOpen(false);
  };

  // Dummy gallery items for demonstration
  const galleryItems = Array.from({ length: 9 }).map((_, i) => ({
    id: `gallery-${i}`,
    icon: <FaImage />
  }));

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Grid>
        {items.map((item) => (
          <ItemBox
            key={item.id}
            active={selectedValue === item.id}
            onClick={() => onSelect(item.id)}
          >
            {item.image ? (
              <img src={item.image} alt={item.id} />
            ) : (
              item.icon || <FaImage />
            )}
            {selectedValue === item.id && <SelectionDot />}
          </ItemBox>
        ))}
        <ItemBox isAdd onClick={handleAddClick}>
          <FaPlus />
        </ItemBox>
      </Grid>

      {isDialogOpen && (
        <DialogOverlay onClick={() => setIsDialogOpen(false)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <DialogTitle>
              Galeria de Itens
              <small style={{ fontSize: '12px', fontWeight: 400, opacity: 0.5 }}>Selecione um item</small>
            </DialogTitle>
            <GalleryGrid>
              {galleryItems.map((item) => (
                <GalleryItem
                  key={item.id}
                  onClick={() => handleItemSelect(item.id)}
                >
                  {item.icon}
                </GalleryItem>
              ))}
            </GalleryGrid>
            <DialogActions>
              <ActionButton onClick={() => setIsDialogOpen(false)}>Fechar</ActionButton>
            </DialogActions>
          </Dialog>
        </DialogOverlay>
      )}
    </Container>
  );
};

export default ImageSelector;

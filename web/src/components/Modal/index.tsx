import { MriButton, MriModal } from '@mriqbox/ui-kit';
import styled from 'styled-components';

interface ModalProps {
  title: string;
  description: string;
  accept: string;
  decline: string;
  handleAccept: () => Promise<void> | void;
  handleDecline: () => Promise<void> | void;
}

const StyledModal = styled(MriModal)`
  display: flex !important;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  min-width: 400px;
  background-color: #1f2937;
  color: white;
  border-radius: 12px;
`;

const Modal = ({ title, description, accept, decline, handleAccept, handleDecline }: ModalProps) => {
  return (
    <StyledModal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{title}</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>{description}</p>
      </div>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '16px' }}>
        <MriButton variant="secondary" onClick={handleDecline}>
          {decline}
        </MriButton>
        <MriButton onClick={handleAccept}>
          {accept}
        </MriButton>
      </div>
    </StyledModal>
  );
};

export default Modal;

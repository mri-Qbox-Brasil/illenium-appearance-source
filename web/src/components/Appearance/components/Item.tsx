import styled from 'styled-components';
import { ReactNode } from 'react';

interface ItemProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);

  span {
    color: rgba(${props => props.theme.fontColor || '255, 255, 255'}, 0.7);
  }
`;

const Item: React.FC<ItemProps> = ({ children, title, className }) => {
  return (
    <Container className={`item-container mt-2 flex flex-col p-4 rounded-lg ${className || ''}`}>
      {title && <span className="item-title text-[13px] font-medium mb-2 uppercase tracking-[0.5px]">{title}</span>}
      <div className="item-inputs w-full flex flex-col gap-[10px] mt-[10px]">
        {children}
      </div>
    </Container>
  );
};

export default Item;

import styled from 'styled-components';
import { ReactNode } from 'react';

interface ItemProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

const Container = styled.div`
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;

  padding: 16px;
  border-radius: 8px;

  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);

  span {
    color: rgba(${props => props.theme.fontColor || '255, 255, 255'}, 0.7);
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const Inputs = styled.div`
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;

  margin-top: 10px;

  > div {
    & + div {
      margin-top: 10px;
    }
  }
`;

const Item: React.FC<ItemProps> = ({ children, title, className }) => {
  return (
    <Container className={`item-container ${className || ''}`}>
      {title && <span className="item-title">{title}</span>}
      <Inputs className="item-inputs">{children}</Inputs>
    </Container>
  );
};

export default Item;

import { useState, useEffect, useRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
  className?: string;
  icon?: React.ElementType;
}

interface HeaderProps {
  active: boolean;
}

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  color: rgba(${props => props.theme.fontColor || '255, 255, 255'}, 1);

  user-select: none;

  & + div {
    margin-top: 10px;
  }
`;

const Header = styled.div<HeaderProps>`
  width: 100%;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
  border-radius: ${props => props.theme.borderRadius || '16px'};
  margin-bottom: ${({ active }) => (active ? '12px' : '0')};

  z-index: 2;

  background: ${({ active, theme }) =>
    active
      ? `rgb(${theme.accent || '10, 213, 140'})`
      : `rgba(${theme.fontColor || '255, 255, 255'}, 0.05)`
  };

  backdrop-filter: blur(8px);

  color: ${({ active }) => active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  
  border: 1px solid ${({ active }) => active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  box-shadow: ${({ active, theme }) => active ? `0 8px 24px rgba(${theme.accent || '10, 213, 140'}, 0.3)` : '0 2px 8px rgba(0, 0, 0, 0.2)'};

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ active, theme }) =>
    active
      ? `rgb(${theme.accent || '10, 213, 140'})`
      : 'rgba(255, 255, 255, 0.08)'
  };
    transform: translateY(-2px);
    cursor: pointer;
  }

  span {
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 12px;
    letter-spacing: 0.5px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
`;

const Items = styled.div`
  padding: 0 2px 5px 2px;

  overflow: hidden;
`;

const Section: React.FC<SectionProps & { forcedOpen?: boolean }> = ({ children, title, deps = [], forcedOpen = false, className, icon: Icon }) => {
  const [active, setActive] = useState(false);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const props = useSpring({
    height: active ? height : 0,
    opacity: active ? 1 : 0,
  });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, setHeight]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, setHeight, deps]);

  if (forcedOpen) {
    return (
      <Container className={`section-container ${className || ''}`}>
        <Items className="section-items">{children}</Items>
      </Container>
    );
  }

  return (
    <Container className={`section-container ${className || ''}`}>
      <Header className="section-header" active={active} onClick={() => setActive(state => !state)}>
        <span className="section-title">
          {Icon && (
            <IconWrapper className="section-icon-wrapper">
              <Icon size={18} />
            </IconWrapper>
          )}
          {title}
        </span>
        {active ? <FiChevronUp className="section-chevron active" size={24} /> : <FiChevronDown className="section-chevron" size={24} />}
      </Header>

      <animated.div style={{ ...props, overflow: 'hidden' }} className="section-animated-wrapper">
        <Items ref={ref} className="section-items">{children}</Items>
      </animated.div>
    </Container>
  );
};

export default Section;

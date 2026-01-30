import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`;

export const Container = styled.div`
  height: 100%;
  width: 25%;
  min-width: 400px;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 20px;
  margin: 20px;
  border-radius: 20px;

  /* Use a slight transparency on the theme background for the glass effect */
  background: ${({ theme }) => `rgba(${theme.secondaryBackground || '20, 20, 25'}, 0.95)`};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `rgba(${theme.fontColor || '255, 255, 255'}, 0.1)`};

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;

  display: flex;

  > div {
    & + div {
      margin-left: 10px;
    }
  }
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: auto; /* Push to bottom if container flex-direction is column */
  margin-bottom: 20px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background: rgb(139, 92, 246);
  color: white;
  
  border: none;
  border-radius: 12px;
  
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
    background: rgb(124, 58, 237);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const TitleData = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.fontColorSelected};
    margin: 0;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.fontColor};
    opacity: 0.6;
    margin: 4px 0 0 0;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  padding: 4px;
  border-radius: 14px;
  gap: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
`;

export const SwitchButton = styled.button<{ active?: boolean }>`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  
  /* Active: Green, Inactive: Transparent */
  background: ${({ active }) => active ? '#10b981' : 'transparent'}; 
  color: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => active ? '#059669' : 'rgba(255, 255, 255, 0.1)'};
    color: white;
  }
`;

// Tab Layout Components

export const TabbedContainer = styled.div`
  height: 100%;
  width: 100%;
  min-width: 700px; /* Wider for split view */
  max-width: 900px;
  
  display: flex;
  gap: 20px;
  padding: 20px;
  margin: 20px;
  
  /* Glass effect similar to Container */
  background: ${({ theme }) => `rgba(${theme.secondaryBackground || '20, 20, 25'}, 0.95)`};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `rgba(${theme.fontColor || '255, 255, 255'}, 0.1)`};
  border-radius: 20px;
  
  overflow: hidden;
`;

export const SidebarNav = styled.div`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  overflow-y: auto;
  
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const ContentPanel = styled.div`
  flex: 1;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 15px;
  overflow-y: auto;
  
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const NavItem = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  /* Styling similar to Section Header but for sidebar */
  background: ${({ active, theme }) =>
    active
      ? `rgb(${theme.accent || '139, 92, 246'})`
      : 'rgba(255, 255, 255, 0.03)'
  };
  
  color: ${({ active, theme }) =>
    active ? 'white' : theme.fontColor
  };
  
  border: 1px solid ${({ active }) => active ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 10px;
  
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ active, theme }) =>
    active
      ? `rgb(${theme.accent || '139, 92, 246'})`
      : 'rgba(255, 255, 255, 0.08)'
  };
    transform: translateX(2px);
  }
  
  svg {
    font-size: 18px;
    opacity: ${({ active }) => active ? 1 : 0.7};
  }
`;

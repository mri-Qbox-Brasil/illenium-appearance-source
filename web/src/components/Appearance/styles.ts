import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: #eeeeee;
`;

export const Container = styled.div`
  height: calc(100vh - 40px);
  width: 420px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin: 20px 0 20px 20px;
  background: ${({ theme }) => `rgb(${theme.primaryBackground || '12, 12, 13'})`};
  border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.04)'};
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
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

  background: ${({ theme }) => `rgb(${theme.accent || '10, 213, 140'})`};
  color: white;
  
  border: none;
  border-radius: 12px;
  
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px ${({ theme }) => `rgba(${theme.accent || '10, 213, 140'}, 0.3)`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => `rgba(${theme.accent || '10, 213, 140'}, 0.5)`};
    filter: brightness(1.1);
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
  background: ${({ active, theme }) => active ? `rgb(${theme.accent || '10, 213, 140'})` : 'transparent'}; 
  color: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) => active ? `rgb(${theme.accent || '10, 213, 140'})` : 'rgba(255, 255, 255, 0.1)'};
    color: white;
    filter: ${({ active }) => active ? 'brightness(1.1)' : 'none'};
  }
`;

// Tab Layout Components

export const TabbedContainer = styled.div`
  height: 90vh;
  width: 75vw;
  max-width: 1000px;
  display: flex;
  gap: 24px;
  padding: 24px;
  margin: 20px 0 20px 20px;
  background: ${({ theme }) => `rgb(${theme.secondaryBackground || '19, 19, 21'})`};
  border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255, 255, 255, 0.04)'};
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: visible;
`;

export const SidebarNav = styled.div`
  width: 220px;
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
      ? `rgb(${theme.accent || '10, 213, 140'})`
      : 'rgba(255, 255, 255, 0.02)'
  };
  color: ${({ active, theme }) =>
    active ? 'white' : 'rgba(255, 255, 255, 0.45)'
  };
  border: 1px solid ${({ active }) => active ? 'transparent' : 'rgba(255, 255, 255, 0.03)'};
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${({ active, theme }) =>
    active
      ? `rgb(${theme.accent || '10, 213, 140'})`
      : 'rgba(255, 255, 255, 0.06)'
  };
    color: white;
    filter: ${({ active }) => active ? 'brightness(1.1)' : 'none'};
  }
  
  svg {
    font-size: 18px;
    opacity: ${({ active }) => active ? 1 : 0.7};
  }
`;

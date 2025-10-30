import styled from 'styled-components';

export const AccordionContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  background-color: var(--secondary);
`;

export const AccordionItem = styled.div`
  border-radius: 16px;
  margin: 10px 0;
  overflow: hidden;
  background-color: var(--secondary);
`;

export const AccordionHeader = styled.button`
  background: var(--main);
  color: var(--accent);
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 18px;
  padding: 15px 20px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: var(--accent);
    color: var(--main);
    box-shadow: 0 6px 40px rgba(0, 0, 0, 0.2);
  }
`;

export const AccordionContent = styled.div<{ isOpen: boolean }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: rgba(var(--main-rgba), 0.5);
  background-color: var(--secondary);
  padding: 0 20px;
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding-top: ${({ isOpen }) => (isOpen ? '15px' : '0')};
`;

export const IconWrapper = styled.div<{ isOpen: boolean }>`
  color: var(--accent);
  transition: transform 0.3s ease, color 0.3s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

  ${AccordionHeader}:hover & {
    color: var(--main);
  }
`;

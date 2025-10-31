import styled from 'styled-components';

export const DropdownContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${({ width }) => (width ? width : '100%')};
  max-width: 100%;
  margin: 20px 0;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 16px 48px 16px 16px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  border: 2px solid var(--accent);
  border-radius: 16px;
  background-color: var(--main);
  color: var(--accent);
  outline: none;
`;

export const OptionsList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? '150px' : '0')};
  overflow: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  padding: 0;
  margin: 0;
  border: 2px solid var(--accent);
  border-radius: 16px;
  background-color: var(--main);
  list-style: none;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen }) => (isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
  transition: max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease, padding 0.5s ease;
  z-index: 1000;
`;

export const Option = styled.li`
  padding: 10px 16px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  color: var(--accent);
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease;

  &:hover {
    background-color: var(--accent);
    color: var(--main);
  }
`;

export const Icon = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  font-size: 16px;
  color: var(--accent);
  cursor: pointer;
  transition: transform 0.5s ease;
`;

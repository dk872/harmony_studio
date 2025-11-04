import styled from 'styled-components';

interface ButtonProps {
  width?: string;
  height?: '50' | '40' | '30' | '25';
  borderRadius?: '25' | '16' | '6';
  variant: 'filled' | 'outlined';
  color: 'accent' | 'yellow' | 'red';
  fontSize?: '16' | '14' | '12';
  fontWeight?: '500' | '400';
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonBase = styled.button<ButtonProps>`
  font-family: 'Montserrat', sans-serif;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => `${height}px`};

  border-radius: ${({ borderRadius }) =>
    borderRadius === '25'
      ? '25px'
      : borderRadius === '16'
      ? '16px'
      : '6px'};

  font-size: ${({ fontSize }) =>
    fontSize === '16'
      ? '16px'
      : fontSize === '14'
      ? '14px'
      : '12px'};

  font-weight: ${({ fontWeight }) => fontWeight || '500'};

  ${({ variant, color }) =>
    variant === 'filled' &&
    `
      background-color: var(--${color});
      color: var(--main);
      border: none;

      &:hover {
        opacity: 0.9;
      }
  `}

  ${({ variant, color }) =>
    variant === 'outlined' &&
    `
      background-color: transparent;
      color: var(--${color});
      border: ${
        color === 'yellow' || color === 'red' ? '1.5px' : '2px'
      } solid var(--${color});

      &:hover {
        background-color: var(--${color});
        color: var(--main);
      }
  `}

  // Disabled state
  ${({ disabled }) =>
    disabled &&
    `
      cursor: not-allowed;
      background-color: rgba(var(--grey-rgba), 0.3);
      color: var(--grey);
      border: 2px solid var(--grey);
      opacity: 0.7;
  `}
`;

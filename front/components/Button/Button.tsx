// Button.tsx
import React from 'react';
import { ButtonBase } from './Button.styles';

interface ButtonProps {
  children: React.ReactNode;
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

const Button: React.FC<ButtonProps> = ({
  children,
  width,
  height = '40',
  borderRadius = '25',
  variant = 'filled',
  color = 'accent',
  fontSize = '16',
  fontWeight = '500',
  onClick,
}) => {
  return (
    <ButtonBase
      width={width}
      height={height}
      borderRadius={borderRadius}
      variant={variant}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;

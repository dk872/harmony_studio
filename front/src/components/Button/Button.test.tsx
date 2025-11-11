import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

jest.mock('./Button.styles', () => ({
  ButtonBase: (props: any) => {
    const {
      borderRadius,
      fontSize,
      fontWeight,
      height,
      width,
      variant,
      color,
      disabled,
      children,
      ...rest
    } = props;

    return (
      <button
        {...rest}
        data-testid="button-base"
        data-border-radius={borderRadius}
        data-font-size={fontSize}
        data-font-weight={fontWeight}
        data-height={height}
        data-width={width}
        data-variant={variant}
        data-color={color}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
}));

describe('Button', () => {
  test('renders children text correctly', () => {
    render(<Button variant="filled" color="accent">Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button variant="filled" color="accent" onClick={handleClick}>Test Click</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /Test Click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies default props correctly', () => {
    render(<Button variant="filled" color="accent">Default</Button>);
    const button = screen.getByTestId('button-base');
    
    expect(button).toHaveAttribute('data-height', '40');
    expect(button).toHaveAttribute('data-border-radius', '25');
    expect(button).toHaveAttribute('data-variant', 'filled');
    expect(button).toHaveAttribute('data-color', 'accent');
    expect(button).toHaveAttribute('data-font-size', '16');
  });

  test('applies custom props correctly', () => {
    render(
      <Button
        width="200px"
        height="50"
        borderRadius="6"
        variant="outlined"
        color="red"
        fontSize="14"
      >
        Custom
      </Button>
    );
    const button = screen.getByTestId('button-base');

    expect(button).toHaveAttribute('data-width', '200px');
    expect(button).toHaveAttribute('data-height', '50');
    expect(button).toHaveAttribute('data-border-radius', '6');
    expect(button).toHaveAttribute('data-variant', 'outlined');
    expect(button).toHaveAttribute('data-color', 'red');
    expect(button).toHaveAttribute('data-font-size', '14');
  });
});

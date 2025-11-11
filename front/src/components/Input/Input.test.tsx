import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

jest.mock('./Input.styles', () => ({
  InputContainer: ({ children }: any) => <div data-testid="input-container">{children}</div>,
  StyledInput: ({ ...props }: any) => <input data-testid="styled-input" {...props} />,
  Placeholder: ({ children, isFocused }: any) => <label data-testid="placeholder" data-focused={isFocused}>{children}</label>,
}));

describe('Input', () => {
  test('renders input with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByTestId('placeholder')).toHaveTextContent('Enter text');
  });

  test('renders input with value', () => {
    render(<Input value="Hello" />);
    expect(screen.getByTestId('styled-input')).toHaveValue('Hello');
  });

  test('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByTestId('styled-input'), { target: { value: 'Test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('placeholder is focused when input is focused', () => {
    render(<Input placeholder="Enter" />);
    const input = screen.getByTestId('styled-input');
    const placeholder = screen.getByTestId('placeholder');
    fireEvent.focus(input);
    expect(placeholder).toHaveAttribute('data-focused', 'true');
  });

  test('placeholder stays focused when input has value', () => {
    render(<Input placeholder="Enter" value="Hello" />);
    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toHaveAttribute('data-focused', 'true');
  });

  test('displays error message', () => {
    render(<Input error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});

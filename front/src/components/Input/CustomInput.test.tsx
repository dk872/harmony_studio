import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomInput from './CustomInput';

jest.mock('./CustomInput.styles', () => ({
  InputContainer: ({ children, width }: any) => <div data-testid="input-container" data-width={width}>{children}</div>,
  StyledInput: ({ ...props }: any) => <input data-testid="styled-input" {...props} />,
  Placeholder: ({ children, isFocused }: any) => <label data-testid="placeholder" data-focused={isFocused}>{children}</label>,
  ErrorText: ({ children }: any) => <div data-testid="error-text">{children}</div>,
}));

describe('CustomInput', () => {
  test('renders with placeholder', () => {
    render(<CustomInput placeholder="Enter name" type="text" name="name" value="" onChange={() => {}} />);
    expect(screen.getByTestId('placeholder')).toHaveTextContent('Enter name');
  });

  test('renders with value', () => {
    render(<CustomInput placeholder="Name" type="text" name="name" value="John" onChange={() => {}} />);
    expect(screen.getByTestId('styled-input')).toHaveValue('John');
    expect(screen.getByTestId('placeholder')).toHaveAttribute('data-focused', 'true');
  });

  test('calls onChange and sets focus state', () => {
    const handleChange = jest.fn();
    render(<CustomInput placeholder="Test" type="text" name="test" value="" onChange={handleChange} />);
    const input = screen.getByTestId('styled-input');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('placeholder')).toHaveAttribute('data-focused', 'true');
  });

  test('focus and blur toggle placeholder state', () => {
    render(<CustomInput placeholder="FocusTest" type="text" name="test" value="" onChange={() => {}} />);
    const input = screen.getByTestId('styled-input');
    const placeholder = screen.getByTestId('placeholder');
    fireEvent.focus(input);
    expect(placeholder).toHaveAttribute('data-focused', 'true');
    fireEvent.blur(input);
    expect(placeholder).toHaveAttribute('data-focused', 'false');
  });

  test('displays error message', () => {
    render(<CustomInput placeholder="ErrorTest" type="text" name="error" value="" onChange={() => {}} error="Required" />);
    expect(screen.getByTestId('error-text')).toHaveTextContent('Required');
  });
});

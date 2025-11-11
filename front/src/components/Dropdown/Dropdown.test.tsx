import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';

jest.mock('./Dropdown.styles', () => {
  const React = require('react');
  return {
    DropdownContainer: React.forwardRef(({ children, width }: any, ref: any) => (
      <div ref={ref} data-testid="dropdown-container" style={{ width }}>
        {children}
      </div>
    )),
    InputField: (props: any) => <input data-testid="input-field" {...props} />,
    OptionsList: ({ children, isOpen }: any) =>
      isOpen ? <ul data-testid="options-list">{children}</ul> : null,
    Option: ({ children, onClick }: any) => (
      <li data-testid="option" onClick={onClick}>
        {children}
      </li>
    ),
    Icon: ({ isOpen, onClick, children }: any) => (
      <div data-testid="icon" data-open={isOpen} onClick={onClick}>
        {children}
      </div>
    ),
  };
});

describe('Dropdown', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Another', value: '3' },
  ];

  test('renders input with selected value label', () => {
    render(<Dropdown options={options} value="2" onChange={jest.fn()} />);
    expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument();
  });

  test('opens dropdown when input focused', () => {
    render(<Dropdown options={options} value="" onChange={jest.fn()} />);
    fireEvent.focus(screen.getByTestId('input-field'));
    expect(screen.getByTestId('options-list')).toBeInTheDocument();
  });

  test('filters options by input text', () => {
    render(<Dropdown options={options} value="" onChange={jest.fn()} />);
    fireEvent.focus(screen.getByTestId('input-field'));
    fireEvent.change(screen.getByTestId('input-field'), { target: { value: 'Option' } });
    expect(screen.getAllByTestId('option').length).toBe(2);
  });

  test('calls onChange and closes when option clicked', () => {
    const handleChange = jest.fn();
    render(<Dropdown options={options} value="" onChange={handleChange} />);
    fireEvent.focus(screen.getByTestId('input-field'));
    fireEvent.click(screen.getAllByTestId('option')[0]);
    expect(handleChange).toHaveBeenCalledWith('1');
    expect(screen.queryByTestId('options-list')).not.toBeInTheDocument();
  });

  test('toggles dropdown when icon clicked', () => {
    render(<Dropdown options={options} value="" onChange={jest.fn()} />);
    const icon = screen.getByTestId('icon');
    fireEvent.click(icon);
    expect(screen.getByTestId('options-list')).toBeInTheDocument();
    fireEvent.click(icon);
    expect(screen.queryByTestId('options-list')).not.toBeInTheDocument();
  });

  test('closes when clicking outside', () => {
    render(<Dropdown options={options} value="" onChange={jest.fn()} />);
    fireEvent.focus(screen.getByTestId('input-field'));
    expect(screen.getByTestId('options-list')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('options-list')).not.toBeInTheDocument();
  });
});

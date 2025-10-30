import React, { useState, useEffect, useRef } from 'react';
import { DropdownContainer, InputField, OptionsList, Option, Icon } from './Dropdown.styles';
import { FaChevronDown } from 'react-icons/fa';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    options.find((option) => option.value === value)?.label || ''
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync value and displayed label
  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value);
    setInputValue(selectedOption ? selectedOption.label : '');
  }, [value, options]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setInputValue(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <DropdownContainer width={width} ref={dropdownRef}>
      <InputField
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Select an option"
      />
      <Icon isOpen={isOpen} onClick={toggleDropdown}>
        <FaChevronDown />
      </Icon>
      {isOpen && (
        <OptionsList isOpen={isOpen}>
          {filteredOptions.map((option) => (
            <Option key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </Option>
          ))}
        </OptionsList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

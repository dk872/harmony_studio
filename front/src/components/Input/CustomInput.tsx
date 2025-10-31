import React, { useState } from 'react';
import { StyledInput, InputContainer, ErrorText, Placeholder } from './CustomInput.styles';

interface CustomInputProps {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  type,
  name,
  value,
  onChange,
  width,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer width={width}>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          setIsFocused(!!e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(!!value)}
      />
      <Placeholder isFocused={isFocused || !!value}>{placeholder}</Placeholder>
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default CustomInput;

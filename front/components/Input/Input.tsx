import React, { useState } from 'react';
import { InputContainer, StyledInput, Placeholder } from './Input.styles';

interface InputProps {
  placeholder?: string;
  width?: string;
  type?: string;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  width,
  type = 'text',
  value,
  name,
  onChange,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer width={width}>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(!!value)}
      />
      <Placeholder isFocused={isFocused || !!value}>{placeholder}</Placeholder>
      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
          {error}
        </div>
      )}
    </InputContainer>
  );
};

export default Input;

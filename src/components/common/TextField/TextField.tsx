import React, {
  ChangeEvent,
  // FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextFieldProps } from "@/types/textfield";
import { StyledWrapper, StyledInput } from "./TextField.Styled";

const TextField: React.FC<TextFieldProps> = ({
  size = "M",
  state = "default",
  className = "",
  children,
  name,
  maxLength,
  value: initialValue = "",
  type = "text",
  autoFocus = false,
  placeholder = "",
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
}) => {
  const [value, setValue] = useState<string | number>(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(name, e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus(name, value.toString());
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur(name, value.toString());
  };

  return (
    <StyledWrapper className={className}>
      {children && <div className="textfield-label">{children}</div>}
      <StyledInput
        id={`input_${name}`}
        ref={inputRef}
        type={type}
        name={name}
        maxLength={maxLength}
        size={size}
        state={state}
        value={value}
        placeholder={isFocused || value ? "" : placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
    </StyledWrapper>
  );
};

export default TextField;

import React, { useState } from "react";
import { ButtonProps } from "@/types/button";
import { BaseButtonStyled } from "@/components/common/button/Button.Styled";

const Button: React.FC<ButtonProps> = ({
  size = "m",
  variant = "contained",
  isLoading = false,
  disabled = false,
  isToggle = false, // 새로운 isToggle 프롭 추가
  children,
  ...props
}) => {
  const [toggled, setToggled] = useState(false); // 토글 상태 관리

  // variant를 토글 상태에 맞게 동적으로 변경
  const currentVariant = isToggle ? (toggled ? "contained" : "line") : variant;

  const handleToggle = () => {
    if (!disabled && !isLoading) {
      setToggled(!toggled); // 클릭 시 토글 상태 변경
    }
  };

  return (
    <BaseButtonStyled
      size={size}
      variant={currentVariant} // 동적으로 variant 적용
      disabled={disabled || isLoading}
      onClick={isToggle ? handleToggle : undefined} // 토글일 경우 클릭 시 핸들러 추가
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </BaseButtonStyled>
  );
};

export default Button;

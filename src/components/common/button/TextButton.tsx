"use client";

import TextButtonStyled from "./TextButton.Styled";


// 컴포넌트 정의
interface TextButtonProps {
  children: React.ReactNode;
  color?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ children,  color, type , onClick }) => {
  return (
    <TextButtonStyled
      color={color}
      onClick={onClick}
      type={type}
    >
      <span>{children}</span>
    </TextButtonStyled>
  );
};

export default TextButton;

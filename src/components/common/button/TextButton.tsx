"use client";

import TextButtonStyled from "./TextButton.Styled";


// 컴포넌트 정의
interface TextButtonProps {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ children,  color, onClick }) => {
  return (
    <TextButtonStyled
      color={color}
      onClick={onClick}
    >
      <span>{children}</span>
    </TextButtonStyled>
  );
};

export default TextButton;

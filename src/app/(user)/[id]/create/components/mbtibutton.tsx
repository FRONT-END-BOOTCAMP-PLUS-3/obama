import React from "react";
import { MBTIButton } from "./mbtibutton.Styled";
import { MBTIButtonProps } from "@/types/mbtibutton";

const MBTISelectButton: React.FC<MBTIButtonProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <MBTIButton selected={selected} onClick={onClick}>
      {label}
    </MBTIButton>
  );
};

export default MBTISelectButton;

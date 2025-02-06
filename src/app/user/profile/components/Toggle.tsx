"use client";
import React from "react";
import { CheckBox, Wrapper, Text } from "./Toggle.styled";

interface ToggleProps {
  ischecked: boolean;
  onChange: () => void;
  leftLabel: string;
  rightLabel: string;
}

const Toggle: React.FC<ToggleProps> = ({ ischecked, onChange, leftLabel, rightLabel }) => {
  return (
    <Wrapper>
      {/* 왼쪽 텍스트 */}
      <Text position="left" ischecked={ischecked}>
        {leftLabel}
      </Text>

      {/* 체크박스 */}
      <CheckBox
        type="checkbox"
        ischecked={ischecked}
        onChange={onChange}
      />

      {/* 오른쪽 텍스트 */}
      <Text position="right" ischecked={!ischecked}>
        {rightLabel}
      </Text>
    </Wrapper>
  );
};

export default Toggle;

"use client";
import React from "react";
import { CheckBox, Wrapper, Text } from "./Toggle.Styled";

interface ToggleProps {
  ischecked: boolean;
  leftLabel: string;
  rightLabel: string;
}

const Toggle: React.FC<ToggleProps> = ({ ischecked, onChange, leftLabel, rightLabel }) => {
  return (
    <Wrapper>
      {/* 왼쪽 텍스트 */}
      <Text position="left" checked={ischecked}>
        {leftLabel}
      </Text>

      {/* 체크박스 */}
      <CheckBox
        type="checkbox"
        checked={ischecked}
        onChange={onChange}
      />

      {/* 오른쪽 텍스트 */}
      <Text position="right" checked={!ischecked}>
        {rightLabel}
      </Text>
    </Wrapper>
  );
};

export default Toggle;

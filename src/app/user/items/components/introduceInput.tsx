"use client";
import React, { useState } from "react";
import * as S from "@/app/user/items/components/introduceInput.Styled";

interface IntroduceInputProps {
  value: string;
  onChange: (value: string) => void;
}

const IntroduceInput = ({ value, onChange }: IntroduceInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <S.TextInputContainer>
      <S.TextareaWrapper>
        {value.length === 0 && !isFocused && (
          <S.StyledPlaceholder>
            <h6>나에 대한 그 어떤 정보도 좋습니다!</h6>
            Tip. 처음 만난 사람에게 잘 부탁한다는 한 마디를 남겨도 좋겠네요
            (500자)
          </S.StyledPlaceholder>
        )}
        <S.Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={500}
        />
      </S.TextareaWrapper>
    </S.TextInputContainer>
  );
};

export default IntroduceInput;

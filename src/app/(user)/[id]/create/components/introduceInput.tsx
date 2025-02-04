import React, { useState } from "react";
import * as S from "./introduceInput.Styled";

const IntroduceInput = () => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <S.Container>
      <S.TextareaWrapper>
        {text.length === 0 && !isFocused && (
          <S.StyledPlaceholder>
            <h6>나에 대한 그 어떤 정보도 좋습니다!</h6>
            Tip. 처음 만난 사람에게 잘 부탁한다는 한 마디를 남겨도 좋겠네요
            (500자)
          </S.StyledPlaceholder>
        )}
        <S.Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={500}
        />
      </S.TextareaWrapper>
    </S.Container>
  );
};

export default IntroduceInput;

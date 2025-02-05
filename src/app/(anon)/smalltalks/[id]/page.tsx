"use client";

import { useParams, useRouter } from "next/navigation";
import { BalanceGameQuestion, BalanceGameAnswer,AnswerTitle ,Answer, IconContainer, Title, Question, ButtonContainer, LogoSmalltalk, QuestionMark, LogoGreySmalltalk, ExclamationMark} from "@/components/smaltalk/Suggest.Styled";
import { Button } from "@/components/common/Button";
import React from "react";
import LayoutContainer from "@/components/common/LayoutContainer";

export default function SmalltalkPage() {
  const { id: selectedSubjectId } = useParams(); 
  const router = useRouter();

  return (
    <LayoutContainer>
      <IconContainer onClick={()=> router.back()}>
        <img src="/Icons/arrowLeft.svg" alt="뒤로가기 버튼" />
      </IconContainer>
      <Title>대화주제 추천받기</Title>
      {selectedSubjectId === "1" ? (
        <BalanceGameComponent />
      ) : (
        <HobbySuggestComponent />
      )}
      <ButtonContainer>
        <Button size="m" variant="contained">
          다른 주제<br/>추천받기
        </Button>
      </ButtonContainer>
    </LayoutContainer>
  );
}


function BalanceGameComponent() {
  return (
    <div>
      <BalanceGameQuestion>당신이 사귀고 싶은 연인 유형은?</BalanceGameQuestion>
      <BalanceGameAnswer>
        <AnswerTitle>A . 자동차를 너무 좋아하는 연인</AnswerTitle>
        <Answer>
            어디를 가도 무조건 차로 가야함. 
            집 앞 편의점을 가도 차 끌고 다님. 
            해외도 차로 횡단함. 다른 교통수단 안됨.
            집에 놀러온다고 했을 때 진짜 차로 문을 
            부수고 들어온 적이 있음
        </Answer>
      </BalanceGameAnswer>
      <BalanceGameAnswer>
        <AnswerTitle>B . 걷는것을 너무 좋아하는 연인</AnswerTitle>
        <Answer>
          어디를 가도 걸어가야함. 
          비행기 외 다른 교통수단 이용 못함
          부산까지 걸어서 30일 걸린 적이 있음
          집 갈때에도 걸어서 10일정도 걸음
          해외 정도는 비행기 탑승가능함
          단, 공항까진 걸어서 가야함
        </Answer>
      </BalanceGameAnswer>
    </div>
  );
}

function HobbySuggestComponent() {
  return (
    <div>
      <Question>당신의 취미는 무엇인가요?</Question>
      <QuestionMark src="/Icons/questionMark.svg" alt="question mark"/>
      <LogoGreySmalltalk src="/Images/logoGrey.svg" alt="logoGrey"/>
      <ExclamationMark src="/Icons/exclamationMark.svg" alt="exclamation mark"/>
      <LogoSmalltalk src="/Images/logo.svg" alt="logo"/>
    </div>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { IconContainer, Title,ButtonContainer} from "@/components/smaltalk/Suggest.Styled";
import { Button } from "@/components/common/Button";
import React from "react";
import LayoutContainer from "@/components/common/LayoutContainer";
import OpenQuestion from "@/components/smaltalk/OpenQuestion";
import BalanceGame from "@/components/smaltalk/BalanceGame";

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
        <BalanceGame />
      ) : (
        <OpenQuestion />
      )}
      <ButtonContainer>
        <Button size="m" variant="contained">
          다른 주제<br/>추천받기
        </Button>
      </ButtonContainer>
    </LayoutContainer>
  );
}



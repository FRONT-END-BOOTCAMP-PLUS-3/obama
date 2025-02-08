"use client";

import React, { useEffect, useState } from "react";
import { Question, QuestionMark, LogoGreySmalltalk, ExclamationMark, LogoSmalltalk } from "@/components/smaltalk/Suggest.Styled";
import apiClient from "@/utils/api/apiClient"; 

interface OpenQuestionProps {
  subjectId: number;
  refreshKey: number;  
}

export default function OpenQuestion({ subjectId, refreshKey }: OpenQuestionProps) {
  const [question, setQuestion] = useState<string>("질문을 준비중입니다. . . ");

  const fetchQuestion = async () => {
    try {
      const response = await apiClient.get(`/api/smalltalks/${subjectId}?route=openQuestion`);
      const data = response.data;

      if (data.questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.questions.length);
        setQuestion(data.questions[randomIndex].openQuestion);
      } else {
        setQuestion("등록된 질문이 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setQuestion("질문을 가져오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [subjectId, refreshKey]);  

  return (
    <div>
      <Question>{question}</Question>
      <QuestionMark src="/Icons/questionMark.svg" alt="question mark" />
      <LogoGreySmalltalk src="/Images/logoGrey.svg" alt="logoGrey" />
      <ExclamationMark src="/Icons/exclamationMark.svg" alt="exclamation mark" />
      <LogoSmalltalk src="/Images/logo.svg" alt="logo" />
    </div>
  );
}

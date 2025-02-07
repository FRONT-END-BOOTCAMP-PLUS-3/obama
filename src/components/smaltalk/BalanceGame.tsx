"use client";

import React, { useEffect, useState } from "react";
import { BalanceGameQuestion, BalanceGameAnswer, AnswerTitle, Answer } from "@/components/smaltalk/Suggest.Styled";
import apiClient from "@/utils/api/apiClient";

interface BalanceGameProps {
  subjectId: number;
  refreshKey: number; 
}

export default function BalanceGame({ subjectId, refreshKey }: BalanceGameProps) {
  const [question, setQuestion] = useState<string>("질문을 불러오는 중...");
  const [answers, setAnswers] = useState<{ balancegameanswerTitle: string; balancegameanswerText: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBalanceGame = async () => {
    setLoading(true);
    try {
      
      const response = await apiClient.get(`/api/smalltalk/balancegameQuestion?subjectId=${subjectId}`);
      const questionData = response.data;
  
      if (!questionData || !Array.isArray(questionData.question) || questionData.question.length === 0) {
        setQuestion("등록된 질문이 없습니다.");
        setAnswers([]);
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * questionData.question.length);
      const selectedQuestion = questionData.question[randomIndex];
  
      setQuestion(selectedQuestion.balancegamequestionText);
  
      const answerResponse = await apiClient.get(`/api/smalltalk/balancegameAnswer?questionId=${selectedQuestion.balancegamequestionId}`);
  
      setAnswers(answerResponse.data.answers);

    } catch (error) {
      setQuestion("질문을 가져오는 중 오류가 발생했습니다.");
      setAnswers([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBalanceGame();
  }, [subjectId, refreshKey]);

  

  return (
    <div>
      <BalanceGameQuestion>{question}</BalanceGameQuestion>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        answers.map((answer, index) => (
          <BalanceGameAnswer key={index}>
            <AnswerTitle>{index === 0 ? "A" : "B"} . {answer.balancegameanswerTitle}</AnswerTitle>
            <Answer>{answer.balancegameanswerText}</Answer>
          </BalanceGameAnswer>
        ))
      )}
    </div>
  );
}

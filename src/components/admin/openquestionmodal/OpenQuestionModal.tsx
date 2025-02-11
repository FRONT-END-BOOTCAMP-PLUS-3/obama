import React, { useState } from "react";
import {
  Overlay,
  ModalContainer,
  CloseButton,
  Header,
  InputLabel,
  InputFieldContainer,
  ButtonContainer,
} from "@/components/admin/balancegamemodal/BalancegameModal.Style";
import { TextField } from "@/components/common/textField";
import { Button } from "@/components/common/button";

interface ModalProps {
  $isOpen: boolean;
  onClose: () => void;
  onSubmit: (subjectId: number, question: string) => void;
}

const OpenQuestionModal: React.FC<ModalProps> = ({ $isOpen, onClose, onSubmit }) => {
  const [subjectId, setSubjectId] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 

    if (!subjectId || !question) {
      alert("⚠️ 모든 필드를 입력해주세요.");
      return;
    }

    onSubmit(Number(subjectId), question); 
    setSubjectId(""); 
    setQuestion("");
    onClose();
  };

  return (
    <Overlay $isOpen={$isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Header>대화 주제 추천 생성</Header>
        <form onSubmit={handleSubmit}>
          <InputFieldContainer>
            <InputLabel htmlFor="subjectId">스몰토크 주제 ID</InputLabel>
            <TextField
              name="subjectId"
              type="number"
              value={subjectId}
              onChange={(_, value) => setSubjectId(value)} 
              placeholder="주제 ID를 입력하세요"
              size="S"
            />            
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="question">질문</InputLabel>
            <TextField
              name="question"
              type="text"
              value={question}
              onChange={(_, value) => setQuestion(value)} 
              placeholder="스몰토크 질문을 입력해주세요"
              size="XXL"
            />
          </InputFieldContainer>

          <ButtonContainer>
            <Button type="submit" size="l">생성하기</Button>
          </ButtonContainer>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

export default OpenQuestionModal;

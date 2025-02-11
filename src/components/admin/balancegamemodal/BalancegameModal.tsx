"use client";
import React from "react";
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
import { fetchClient } from "@/utils/api/fetchClient";

interface ModalProps {
  $isOpen: boolean;
  onClose: () => void;
  onCreateSuccess?: () => void; 
}

const BalancegameModal: React.FC<ModalProps> = ({ $isOpen, onClose, onCreateSuccess }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const question = formData.get("question") as string;
    const answerATitle = formData.get("answerA-title") as string;
    const answerAText = formData.get("answerA-content") as string;
    const answerBTitle = formData.get("answerB-title") as string;
    const answerBText = formData.get("answerB-content") as string;

    const { status, data, error } = await fetchClient<
      Record<string, unknown>,
      {
        message?: string;
        data?: any;
        error?: string;
      }
    >("/api/admin/smalltalk/balancegame", {
      method: "POST",
      body: {
        subjectId: 1,
        questionText: question,
        answerA: {
          title: answerATitle,
          text: answerAText,
        },
        answerB: {
          title: answerBTitle,
          text: answerBText,
        },
      },
    });

    if (status === 201 && data) {
      alert("BalanceGame created Success!");
      onCreateSuccess?.();
      onClose();
    } else {
      console.error("밸런스게임 생성 실패:", error || data?.error);
    }
  };

  return (
    <Overlay $isOpen={$isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Header> 밸런스게임 생성 </Header>
        <form onSubmit={handleSubmit}>
          <InputFieldContainer>
            <InputLabel htmlFor="question">질문</InputLabel>
            <TextField
              name="question"
              type="text"
              placeholder="밸런스게임 질문을 입력해주세요"
              size="XXL"
              required
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerA-title">답변 A 제목</InputLabel>
            <TextField
              name="answerA-title"
              type="text"
              placeholder="답변 A 제목을 입력해주세요"
              size="XXL"
              required
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerA-content">답변 A 내용</InputLabel>
            <TextField
              name="answerA-content"
              type="text"
              placeholder="답변 A 내용을 입력해주세요"
              size="XXL"
              required
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerB-title">답변 B 제목</InputLabel>
            <TextField
              name="answerB-title"
              type="text"
              placeholder="답변 B 제목을 입력해주세요"
              size="XXL"
              required
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerB-content">답변 B 내용</InputLabel>
            <TextField
              name="answerB-content"
              type="text"
              placeholder="답변 B 내용을 입력해주세요"
              size="XXL"
              required
            />
          </InputFieldContainer>

          <ButtonContainer>
            <Button type="submit" size="l">
              생성하기
            </Button>
          </ButtonContainer>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

export default BalancegameModal;

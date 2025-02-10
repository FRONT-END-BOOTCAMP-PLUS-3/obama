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

interface ModalProps {
  $isOpen: boolean;
  onClose: () => void;
}

const BalancegameModal: React.FC<ModalProps> = ({ $isOpen, onClose }) => {
  return (
    <Overlay $isOpen={$isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Header> 밸런스게임 생성 </Header>
        <form>
          <InputFieldContainer>
            <InputLabel htmlFor="question">질문</InputLabel>
            <TextField
              name="question"
              type="text"
              placeholder="밸런스게임 질문을 입력해주세요"
              size="XXL"
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerA-title">답변 A 제목</InputLabel>
            <TextField
              name="answerA-title"
              type="text"
              placeholder="답변 A 제목을 입력해주세요"
              size="XXL"
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerA-content">답변 A 내용</InputLabel>
            <TextField
              name="answerA-content"
              type="text"
              placeholder="답변 A 내용을 입력해주세요"
              size="XXL"
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerB-title">답변 B 제목</InputLabel>
            <TextField
              name="answerB-title"
              type="text"
              placeholder="답변 B 제목을 입력해주세요"
              size="XXL"
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="answerB-content">답변 B 내용</InputLabel>
            <TextField
              name="answerB-content"
              type="text"
              placeholder="답변 B 내용을 입력해주세요"
              size="XXL"
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

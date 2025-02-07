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

const OpenQuestionModal: React.FC<ModalProps> = ({ $isOpen, onClose }) => {
  return (
    <Overlay $isOpen={$isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Header>대화 주제 추천 생성</Header>
        <form>
          <InputFieldContainer>
            <InputLabel htmlFor="subjectId">스몰토크 주제 ID</InputLabel>
            <TextField
              name="subjectId"
              type="text"
              placeholder=""
              size="S"
            />
          </InputFieldContainer>

          <InputFieldContainer>
            <InputLabel htmlFor="question">질문</InputLabel>
            <TextField
              name="question"
              type="text"
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

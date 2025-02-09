import React from "react";
import {
  Overlay,
  ModalContainer,
  CloseButton,
  Header,
  InputLabel,
  InputFieldContainer,
  ButtonContainer,
} from "@/components/admin/smalltalkmodal/SmalltalkModal.Style";
import { TextField } from "@/components/common/textField";
import { Button } from "@/components/common/button";

interface ModalProps {
  $isOpen: boolean;
  onClose: () => void;
}

const SmalltalkModal: React.FC<ModalProps> = ({ $isOpen, onClose }) => {
  return (
    <Overlay $isOpen={$isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Header>대화추첨: 밸런스게임 생성</Header>
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
            <InputLabel htmlFor="answer">답변</InputLabel>
            <TextField
              name="answer"
              type="text"
              placeholder="밸런스게임 답변을 입력해주세요"
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

export default SmalltalkModal;

import React from "react";
import { Overlay, ModalContainer, ModalTitle, ButtonContainer } from "./ConfirmDeleteModal.style";
import { Button } from "@/components/common/button";

interface ConfirmDeleteModalProps {
  $isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  $isOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <Overlay $isOpen={$isOpen}>
      <ModalContainer>
        <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
        <ButtonContainer>
          <Button  onClick={onConfirm}>
            예
          </Button>
          <Button variant="line"onClick={onCancel}>
            아니요
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default ConfirmDeleteModal;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ModalOverlay, ModalContainer, Divider, Message } from "@/components/withdraw/WithdrawModal.Styled";
import Button from "@/components/common/button/Button"; 

interface WithdrawalCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawalCompleteModal: React.FC<WithdrawalCompleteModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose(); 
    router.push("/"); 
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Divider /> 
        <Message>회원탈퇴가 완료되었습니다.</Message>
        <Button 
          size="m"
          variant="contained"
          onClick={handleConfirm}
        >
          확인했어요
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default WithdrawalCompleteModal;

import React from "react";
import { useRouter } from "next/navigation";
import { ActionsWrapper, ActionButton } from "./ProfileActions.Styled";

const ProfileActions: React.FC = () => {
  const router = useRouter();

  const handleQrCodeClick = () => {
    router.push("qrcode");
  };

  const handleEditClick = () => {
    router.push("profile/edit");
  };

  return (
    <ActionsWrapper>
      <ActionButton $variant="contained" onClick={handleQrCodeClick}>
        QR 코드 생성
      </ActionButton>
      <ActionButton $variant="line" onClick={handleEditClick}>프로필 수정하기</ActionButton>
    </ActionsWrapper>
  );
};

export default ProfileActions;
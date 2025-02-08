import React from "react";
import { ActionsWrapper, ActionButton } from "./ProfileActions.Styled";

const ProfileActions: React.FC = () => {
  return (
    <ActionsWrapper>
      <ActionButton $variant="contained">QR 코드 생성</ActionButton>
      <ActionButton $variant="line">프로필 수정하기</ActionButton>
    </ActionsWrapper>
  );
};

export default ProfileActions;

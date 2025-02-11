"use client";

import { ProfileHeaderDTO } from "@/application/usecases/profile/dtos/ProfileHeaderDTO";
import {
  HeaderWrapper,
  ImageWrapper,
  Name,
  InfoWrapper,
  Info,
  Label,
  Value,
} from "./ProfileHeader.Styled";
import ProfileImgFinder from "@/components/profile/ProfileImgFinder";

interface ProfileHeaderProps {
  user: ProfileHeaderDTO;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <HeaderWrapper>
      <ImageWrapper>
        <ProfileImgFinder imagePath={user.profileImagePath || ""} />
      </ImageWrapper>
      <InfoWrapper>
        <Name>{user.name}</Name>
        <ProfileInfo label="생년월일" value={user.birthDate} />
        <ProfileInfo label="전화번호" value={user.phone} />
        <ProfileInfo label="이메일" value={user.email} />
      </InfoWrapper>
    </HeaderWrapper>
  );
};

const ProfileInfo = ({ label, value }: { label: string; value?: string }) => (
  <Info>
    <Label>{label}</Label>
    <Value>{value || "정보 없음"}</Value>
  </Info>
);

export default ProfileHeader;

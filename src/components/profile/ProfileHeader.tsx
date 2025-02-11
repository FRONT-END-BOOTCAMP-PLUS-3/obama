"use client";

import { useEffect, useState } from "react";
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
import useAuthStore from "@/store/authStore";
import ProfileImgFinder from "@/components/profile/ProfileImgFinder";

const ProfileHeader = () => {
  const { userId } = useAuthStore();
  const [profileHeader, setProfileHeader] = useState<ProfileHeaderDTO | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfileHeader = async () => {
      try {
        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) throw new Error("API 요청 실패");

        const data = await res.json();
        setProfileHeader(data.user);
      } catch (error) {
        console.error("API 요청 오류:", error);
      }
    };

    fetchProfileHeader();
  }, [userId]);

  if (!profileHeader) return <p>Loading...</p>;

  return (
    <HeaderWrapper>
      <ImageWrapper>
        <ProfileImgFinder imagePath={profileHeader.profileImagePath || ""} /> 
      </ImageWrapper>
      <InfoWrapper>
        <Name>{profileHeader.name}</Name>
        <ProfileInfo label="생년월일" value={profileHeader.birthDate} />
        <ProfileInfo label="전화번호" value={profileHeader.phone} />
        <ProfileInfo label="이메일" value={profileHeader.email} />
      </InfoWrapper>
    </HeaderWrapper>
  );
};

// ✅ 프로필 정보 렌더링을 위한 재사용 가능한 컴포넌트
const ProfileInfo = ({ label, value }: { label: string; value?: string }) => (
  <Info>
    <Label>{label}</Label>
    <Value>{value || ""}</Value>
  </Info>
);

export default ProfileHeader;

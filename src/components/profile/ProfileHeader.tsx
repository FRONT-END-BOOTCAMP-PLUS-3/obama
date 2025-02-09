"use client";
import { useEffect, useState } from "react";
import { ProfileHeaderDTO } from "@/application/usecases/profile/dtos/ProfileHeaderDTO";

// 기존 스타일 파일 import
import {
  HeaderWrapper,
  ImageWrapper,
  Name,
  InfoWrapper,
  Info,
  Label,
  Value,
  SNSWrapper,
  SNSLink,
  SNSId,
} from "./ProfileHeader.Styled";

const ProfileHeader = ({ userId }: { userId: string }) => {
  const [profileHeader, setProfileHeader] = useState<ProfileHeaderDTO | null>(null);

  useEffect(() => {
    const fetchProfileHeader = async () => {
      try {
        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) throw new Error("API 요청 실패");

        const { profileHeader } = await res.json();
        setProfileHeader(profileHeader);
      } catch (error) {
        console.error("API 요청 오류:", error);
      }
    };

    fetchProfileHeader();
  }, [userId]);

  return <div>{profileHeader ? profileHeader.user.name : "Loading..."}</div>;
};


export default ProfileHeader;

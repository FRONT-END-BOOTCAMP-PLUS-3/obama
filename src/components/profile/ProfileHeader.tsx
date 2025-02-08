"use client";
import React from "react";
import { Profile } from "@/domain/entities/Profile";
import {
  HeaderWrapper,
  ImageWrapper,
  Name,
  InfoWrapper,
  Info,
  InfoButton,
  Label,
  Value,
  SNSWrapper,
  SNSLink,
  SNSButton,
  SNSId,
} from "./ProfileHeader.Styled";

interface ProfileHeaderProps {
  profile: Profile;
}

// ✅ SNS 타입별 URL 템플릿
const SNS_URL_TEMPLATE: Record<string, string> = {
  instagram: "https://instagram.com/",
  x: "https://x.com/",
  github: "https://github.com/",
};

// ✅ SNS 아이콘 경로 매핑
const SNS_ICON_PATH: Record<string, string> = {
  instagram: "/Icons/sns/instagram.svg",
  x: "/Icons/sns/X.svg",
  github: "/Icons/sns/github.svg",
};

// ✅ 기본 프로필 이미지 경로
const DEFAULT_PROFILE_IMAGE = "/Icons/profile.svg";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  
  return (
    <HeaderWrapper>
      <ImageWrapper>
        <img
          src={profile.avatar_url ? profile.avatar_url : DEFAULT_PROFILE_IMAGE}
          alt="Profile image"
          width={100}
          height={100}
        />
      </ImageWrapper>

      <Name>{profile.name}</Name>

      <InfoWrapper>
        <Info>
          <InfoButton>
            <Label>생년월일</Label>
            <Value>{profile.birth_date}</Value>
          </InfoButton>
        </Info>

        <Info>
          <InfoButton>
            <Label>전화번호</Label>
            <Value>{profile.phone}</Value>
          </InfoButton>
        </Info>
      </InfoWrapper>

      {profile.snsLinks && profile.snsLinks.length > 0 ? (
        <SNSWrapper>
          {profile.snsLinks
            .filter((sns) => sns.is_public === true)
            .map((sns, index) => {
              const snsKey = sns.platform.toLowerCase();
              const snsUrl = SNS_URL_TEMPLATE[snsKey] + sns.id;
              const snsIcon = SNS_ICON_PATH[snsKey] || "/Icons/sns/default.svg";

              return (
                <SNSLink key={index} href={snsUrl} target="_blank" rel="noopener noreferrer">
                  <SNSButton>
                    <img src={snsIcon} alt={sns.platform} width={20} height={20} />
                    <SNSId>@{sns.id}</SNSId>
                  </SNSButton>
                </SNSLink>
              );
            })}
        </SNSWrapper>
      ) : (
        <p>공개된 SNS 정보가 없습니다.</p>
      )}
    </HeaderWrapper>
  );
};

export default ProfileHeader;
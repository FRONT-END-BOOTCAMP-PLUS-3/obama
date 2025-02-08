"use client";
import React, { useEffect, useState } from "react";
import {
  DetailsWrapper,
  SectionTitle,
  DetailItem,
  Label,
  Value,
  ToggleButton,
} from "./ProfileDetails.Styled";
import { GetProfileDetailsUsecase } from "@/application/profile/usecases/GetProfileDetailsUsecase";
import { SbProfileRepository } from "@/infrastructure/repositories/profile/SbProfileRepository";
import { ProfileDetailsDTO } from "@/application/profile/dtos/ProfileDetailsDTO";

const ProfileDetails: React.FC<{ userId: string }> = ({ userId }) => {
  const [profileDetails, setProfileDetails] =
    useState<ProfileDetailsDTO | null>(null);
  const [toggles, setToggles] = useState({
    birth_date: true,
    phone: false,
    mbti: true,
    hobbies: true,
    interests: false,
  });

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const repository = new SbProfileRepository();
      const getProfileDetailsUsecase = new GetProfileDetailsUsecase(repository);
      const data = await getProfileDetailsUsecase.execute(userId);
      setProfileDetails(data);
    };

    fetchProfileDetails();
  }, [userId]);

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!profileDetails) return <div>로딩 중...</div>;

  return (
    <DetailsWrapper>
      <SectionTitle>About me</SectionTitle>
      <DetailItem>
        <Label>생년월일</Label>
        <Value>{profileDetails.birth_date}</Value>
        <ToggleButton
          $isPublic={toggles.birth_date}
          onClick={() => handleToggle("birth_date")}
        >
          {toggles.birth_date ? "공개" : "비공개"}
        </ToggleButton>
      </DetailItem>
      <DetailItem>
        <Label>연락처</Label>
        <Value>{profileDetails.phone}</Value>
        <ToggleButton
          $isPublic={toggles.phone}
          onClick={() => handleToggle("phone")}
        >
          {toggles.phone ? "공개" : "비공개"}
        </ToggleButton>
      </DetailItem>
      <DetailItem>
        <Label>MBTI</Label>
        <Value>{profileDetails.mbti}</Value>
        <ToggleButton
          $isPublic={toggles.mbti}
          onClick={() => handleToggle("mbti")}
        >
          {toggles.mbti ? "공개" : "비공개"}
        </ToggleButton>
      </DetailItem>
      <DetailItem>
        <Label>취미</Label>
        <Value>{profileDetails.hobbies.join(", ")}</Value>
        <ToggleButton
          $isPublic={toggles.hobbies}
          onClick={() => handleToggle("hobbies")}
        >
          {toggles.hobbies ? "공개" : "비공개"}
        </ToggleButton>
      </DetailItem>
      <DetailItem>
        <Label>관심사</Label>
        <Value>{profileDetails.interests.join(", ")}</Value>
        <ToggleButton
          $isPublic={toggles.interests}
          onClick={() => handleToggle("interests")}
        >
          {toggles.interests ? "공개" : "비공개"}
        </ToggleButton>
      </DetailItem>
    </DetailsWrapper>
  );
};

export default ProfileDetails;
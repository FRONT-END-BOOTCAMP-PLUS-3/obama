import { useEffect, useState } from "react";
import { ProfileHeaderUsecase } from "@/application/usecases/profile/ProfileHeaderUsecase";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { SbSNSRepository } from "@/infrastructure/repositories/profile/SbSNSRepository";
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
  SNSButton,
  SNSId,
} from "./ProfileHeader.styled";

const ProfileHeader = ({ userId }: { userId: string }) => {
  const [profileHeader, setProfileHeader] = useState<ProfileHeaderDTO | null>(null);

  useEffect(() => {
    const fetchProfileHeader = async () => {
      const userRepository = new SbUserRepository();
      const snsRepository = new SbSNSRepository();

      const getProfileHeaderUseCase = new ProfileHeaderUsecase(
        userRepository,
        snsRepository
      );

      const data = await getProfileHeaderUseCase.execute(userId);
      setProfileHeader(data);
    };

    fetchProfileHeader();
  }, [userId]);

  return (
    <HeaderWrapper>
      {profileHeader ? (
        <>
          {/* 유저 이미지 */}
          <ImageWrapper>
            <img src={profileHeader.user} alt="User Profile" />
          </ImageWrapper>

          {/* 유저 정보 */}
          <InfoWrapper>
            <Name>{profileHeader.user.name}</Name>
            <Info>
              <Label>Birth Date:</Label>
              <Value>{profileHeader.user.birth_date}</Value>
            </Info>
            <Info>
              <Label>Phone:</Label>
              <Value>{profileHeader.user.phone}</Value>
            </Info>
          </InfoWrapper>

          {/* SNS 정보 */}
          <SNSWrapper>
            <Label>SNS Links</Label>
            {profileHeader.snsInformation.map((sns) => (
              <SNSLink key={sns.SNS_id}>
                <SNSButton href={`https://${sns.SNS_Type.toLowerCase()}.com/${sns.SNS_id}`} target="_blank">
                  {sns.SNS_Type}
                </SNSButton>
                <SNSId>{sns.SNS_id}</SNSId>
              </SNSLink>
            ))}
          </SNSWrapper>
        </>
      ) : (
        <p>로딩중입니다...</p>
      )}
    </HeaderWrapper>
  );
};

export default ProfileHeader;

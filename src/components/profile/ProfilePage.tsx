"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import AboutMe from "./components/AboutMe";
import PrivacyToggle from "./components/PrivacyToggle";
import { Profile } from "@/domain/entities/Profile";
import { PageContainer, Section } from "./page.styled";
import ProfileActions from "./components/ProfileActions";
import { GetProfileUseCase } from "@/application/usecases/profile/GetProfileUseCase";
import { SbProfileRepository } from "@/infrastructure/repositories/profile/SbProfileRepository";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [aboutMeData, setAboutMeData] = useState<Record<string, string[]>>({});
  const userId = "1d1867cd-526c-4de5-97e4-4a0c8f386f78"; // 테스트용 ID

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const repository = new SbProfileRepository();
        const getProfileUseCase = new GetProfileUseCase(repository);
        const data = await getProfileUseCase.execute(userId);

        setProfile(data);

        // "정보 없음"을 필터링하여 aboutMeData 설정
        const initialAboutMeData = Object.entries(data.categories).reduce(
          (acc, [key, value]) => {
            acc[key] = value.value.length > 0 && value.value[0] !== "정보 없음" ? value.value : [];
            return acc;
          },
          {} as Record<string, string[]>
        );

        setAboutMeData(initialAboutMeData);
      } catch (error) {
        console.error("❌ 프로필 데이터를 불러오는데 실패했습니다:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <PageContainer>
      <Section>
        <ProfileHeader profile={profile} />
        <AboutMe aboutMeData={aboutMeData} />
      </Section>
      <Section>
        <PrivacyToggle profile={profile} aboutMeData={aboutMeData} onToggleUpdate={setAboutMeData} />
        <ProfileActions />
      </Section>
    </PageContainer>
  );
};

export default ProfilePage;

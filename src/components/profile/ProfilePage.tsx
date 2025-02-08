"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import { PageContainer, Section } from "./ProfilePage.Styled";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [aboutMeData, setAboutMeData] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      const repository = new SbProfileRepository();
      const data = await repository.getProfile("1d1867cd-526c-4de5-97e4-4a0c8f386f78"); //테스트 사용자 ID 
      setProfile(data);

      // 🔹 모든 데이터를 가져오고, "정보 없음"이 아닌 값만 필터링하여 `isPublic` 상태 설정
      const initialAboutMeData = Object.entries(data.categories).reduce(
        (acc, [key, value]) => {
          acc[key] = value.value.length > 0 && value.value[0] !== "정보 없음" ? value.value : [];
          return acc;
        },
        {} as Record<string, string[]>
      );

      setAboutMeData(initialAboutMeData);
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

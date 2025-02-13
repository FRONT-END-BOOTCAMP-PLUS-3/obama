"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutMe from "@/components/profile/AboutMe";
import { PageContainer, ContentWrapper } from "@/components/profile/ProfilePage.Styled";

const ReadQrPage: React.FC = () => {
  const params = useParams();
  const userId = params?.id; // ✅ URL에서 userId 가져오기

  const [profileData, setProfileData] = useState<{ user: any; aboutMe: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("아이디", userId);
    if (!userId) return;

    const fetchProfileData = async () => {
      try {
        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) throw new Error("API 요청 실패");

        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        console.error("API 요청 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer>
      {profileData ? (
        <ContentWrapper>
          <ProfileHeader user={profileData.user} />
          <AboutMe userId={userId as string} aboutMeData={profileData.aboutMe} />
        </ContentWrapper>
      ) : (
        <p>프로필 페이지</p>
      )}
    </PageContainer>
  );
};

export default ReadQrPage;

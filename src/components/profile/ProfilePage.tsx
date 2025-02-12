"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "./ProfileHeader";
import AboutMe from "./AboutMe";
import useAuthStore from "@/store/authStore";
import { LoginContainer, LoginMessage, PageContainer, ContentWrapper } from "./ProfilePage.Styled";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/common/button";
import ProfileActions from "./ProfileActions";

const ProfilePage: React.FC = () => {
  const { userId, setAuth } = useAuthStore();
  const [profileData, setProfileData] = useState<{ user: any; aboutMe: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role") as UserRole;

    if (storedUserId && storedRole) {
      setAuth(storedUserId, storedRole);
    } else {
      console.error("로그인 정보가 없습니다.");
    }

    setIsLoading(false);
  }, [setAuth]);

  useEffect(() => {
    if (!userId) return;

    const fetchProfileData = async () => {
      try {
        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) throw new Error("API 요청 실패");

        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        console.error("API 요청 오류:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!userId) {
    return (
      <LoginContainer>
        <LoginMessage>로그인이 필요합니다.</LoginMessage>
        <Button size="l" onClick={() => router.push("/login")}>
          로그인 페이지로 이동
        </Button>
      </LoginContainer>
    );
  }

  return (
    <PageContainer>
      {profileData ? (
        <ContentWrapper>
          <ProfileHeader user={profileData.user} />
          <AboutMe userId={userId} aboutMeData={profileData.aboutMe} />
          <ProfileActions />
        </ContentWrapper>
      ) : (
        <p>프로필 정보를 불러오는 중입니다...</p>
      )}
    </PageContainer>
  );
};

export default ProfilePage;

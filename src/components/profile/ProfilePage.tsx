"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "./ProfileHeader";
import AboutMe from "./AboutMe";
import useAuthStore from "@/store/authStore";
import { PageContainer, ContentWrapper, SectionContainer } from "./ProfilePage.Styled";
import { UserRole } from "@/types/auth";
import ProfileActions from "./ProfileActions";
import IspublicToggle from "./IspublicToggle";

const ProfilePage: React.FC = () => {
  const { userId, setAuth } = useAuthStore();
  const [profileData, setProfileData] = useState<{ user: any; aboutMe: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenCategories, setHiddenCategories] = useState<number[]>([]);
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

  const handleToggleChange = useCallback((categoryId: number, isChecked: boolean) => {
    setHiddenCategories((prev) =>
      isChecked ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  }, []);

  return (
    <PageContainer>
      {profileData ? (
        <ContentWrapper>
          <SectionContainer>
            <ProfileHeader user={profileData.user} />
            <AboutMe userId={userId} hiddenCategories={hiddenCategories} />
          </SectionContainer>
          <SectionContainer>
            <IspublicToggle onToggleChange={handleToggleChange} />
            <ProfileActions />
          </SectionContainer>
        </ContentWrapper>
      ) : (
        <p>프로필 정보를 불러오는 중입니다...</p>
      )}
    </PageContainer>
  );
};

export default ProfilePage;
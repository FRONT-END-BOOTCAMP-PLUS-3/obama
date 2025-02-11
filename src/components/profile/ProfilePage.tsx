"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 추가
import ProfileHeader from "./ProfileHeader";
import useAuthStore from "@/store/authStore"; 
import { LoginContainer, LoginMessage, PageContainer } from "./ProfilePage.Styled";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/common/button";

const ProfilePage: React.FC = () => {
  const { userId, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // ✅ Next.js 라우터 추가

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
        <ProfileHeader />
    </PageContainer>
  );
};

export default ProfilePage;

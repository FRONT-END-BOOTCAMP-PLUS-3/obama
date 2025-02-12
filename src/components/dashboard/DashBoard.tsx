"use client";
// import { useEffect } from "react";

import {
  DashBoardContainer,
  InfoSection,
  Title,
  TitleWrapper,
} from "@/components/dashboard/DashBoard.Styled";

import InfoItem from "@/components/dashboard/InfoItem";
import AccountSection from "./AccountSection";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { fetchClient } from "@/utils/api/fetchClient";
import { UserResponseDto } from "@/application/usecases/auth/dtos/UserResponseDto";

// import useAuthStore from "@/store/authStore";

export interface UserData {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  password: string;
}

const DashBoard = () => {
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const { userId } = useAuthStore.getState();

    const fetchUser = async () => {
      const response = await fetchClient("/api/user/dashboard", {
        method: "POST",
        body: userId,
      });

      if (response.status !== 200) {
        console.log(response.error);
        alert(response.error);
      }

      const userData = response.data as UserResponseDto;
      
      setUser(() => ({
        name: userData.name,
        email: userData.email,
        birthDate: userData.birthDate,
        phone: userData.phone,
        password: "************",
      }));
    };
    fetchUser();
  }, []);
  // mockData에서 사용자 데이터 불러오기 예시

  return (
    <>
      <DashBoardContainer>
        <TitleWrapper>
          <Title>My page</Title>
        </TitleWrapper>
        {/* user의 키값과 value를 전달 반복 */}
        <InfoSection>
          {user &&
            (Object.keys(user) as (keyof typeof user)[]).map((field) => (
              <InfoItem key={field} field={field} text={user[field]} />
            ))}
        </InfoSection>

        <AccountSection />
      </DashBoardContainer>
    </>
  );
};
export default DashBoard;

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
import { defaultUser } from "@/mock/mockData";

// import useAuthStore from "@/store/authStore";

interface UserData {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  password: string;
}

const DashBoard = () => {
  // Data를 요청해서 UserData 바인딩 작업
  // useEffect(()=> {
  //     const { userId } = useAuthStore.getState();
  // }, []);

  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    password: "",
  });

  // mockData에서 사용자 데이터 불러오기 예시
  useEffect(() => {
    const { name, email, password, birthDate, phone } = defaultUser;
    const userData = { name, email, password, birthDate, phone };
    setUser(userData);
  }, []);

  return (
    <>
      <DashBoardContainer>
        <TitleWrapper>
          <Title>My page</Title>
        </TitleWrapper>

        <InfoSection>
          {(Object.keys(user) as (keyof typeof user)[]).map((field) => (
            <InfoItem
              key={field}
              field={field}
              text={user[field]}
            />
          ))}

        </InfoSection>

        <AccountSection />
      </DashBoardContainer>
    </>
  );
};
export default DashBoard;

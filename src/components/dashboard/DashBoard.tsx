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

const DashBoard = () => {
  // Data를 요청해서 UserData 바인딩 작업
  // useEffect(()=> {
  //     const { userId } = useAuthStore.getState();
  // }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    setUser(defaultUser);
  }, []);

  console.log(user);

  return (
    <>
      <DashBoardContainer>
        <TitleWrapper>
          <Title>DashBoard</Title>
        </TitleWrapper>

        <InfoSection>
          <InfoItem title={"email"} text={user.email} />
          <InfoItem title={"이름"} text={user.name} />
          <InfoItem title={"생년월일"} text={user.birthDate} />
          <InfoItem title={"전화번호"} text={user.phone} />
          <InfoItem title={"비밀번호"} text={user.password} />
        </InfoSection>

        <AccountSection />
      </DashBoardContainer>
    </>
  );
};
export default DashBoard;

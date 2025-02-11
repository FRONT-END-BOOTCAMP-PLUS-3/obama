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

  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    password: "",
  });


  // Data를 요청해서 UserData 바인딩 작업
  // useEffect(()=> {
  //     const { userId } = useAuthStore.getState();
  // }, []);

  // mockData에서 사용자 데이터 불러오기 예시
  useEffect(() => {
    
    // api 호출 사용될 mockData
    const { name, email, birthDate, phone } = defaultUser;  // response.data

    const userData = { name, email,  birthDate, phone };    // 필요한 데이터 추출
    
    // 비밀번호 영역 추가
    const updateUser = {
      ...userData,
      password: "",
    }
    
    setUser(updateUser);
  }, []);


  return (
    <>
      <DashBoardContainer>
        <TitleWrapper>
          <Title>My page</Title>
        </TitleWrapper>
        {/* user의 키값과 value를 전달 반복 */}
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

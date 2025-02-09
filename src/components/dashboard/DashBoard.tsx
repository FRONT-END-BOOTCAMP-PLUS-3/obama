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
// import useAuthStore from "@/store/authStore";

const DashBoard = () => {
  // Data를 요청해서 UserData 바인딩 작업
  // useEffect(()=> {
  //     const { userId } = useAuthStore.getState();
  // }, []);

  return (
    <>
      <DashBoardContainer>
        <TitleWrapper>
          <Title>DashBoard</Title>
        </TitleWrapper>

        <InfoSection>
          <InfoItem />
          <InfoItem />
          <InfoItem />
          <InfoItem />
          <InfoItem />
        </InfoSection>

        <AccountSection />
      </DashBoardContainer>
    </>
  );
};
export default DashBoard;

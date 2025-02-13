"use client";

import { useState } from "react";
import VerifyIdentity from "@/components/findpw/VerifyIdentity";
import ChangePw from "@/components/findpw/ChangePw";
import { Title } from "@/components/auth/SignUp.Styled";

const Page = () => {
  
  const [userId, setUserId] = useState("");

  const handleVerificationSuccess= (id: string) => {
    setUserId(id);
  }
  console.log(userId);

  return (
    <>
    <Title>비밀번호 변경</Title>
      {!userId ? (
        <VerifyIdentity onVerified={handleVerificationSuccess} />
      ) : (
        <ChangePw userId={userId}/>
      )}
    </>
  );
};

export default Page;

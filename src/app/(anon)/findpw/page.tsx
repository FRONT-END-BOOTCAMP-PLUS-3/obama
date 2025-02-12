"use client";

import { useState } from "react";
import VerifyIdentity from "@/components/findpw/VerifyIdentity";
import ChangePw from "@/components/findpw/ChangePw";
import { Title } from "@/components/auth/SignUp.Styled";

const Page = () => {
  const [step, setStep] = useState(1); 

  return (
    <>
    <Title>비밀번호 변경</Title>
      {step === 1 ? (
        <VerifyIdentity onVerified={() => setStep(2)} />
      ) : (
        <ChangePw />
      )}
    </>
  );
};

export default Page;

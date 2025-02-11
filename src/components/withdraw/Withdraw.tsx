"use client";

import { useState } from "react";
import TextField  from "@/components/common/textField/TextField";
import { Caption, PasswordLayer, Title, WithdrawButtonLayer, WithdrawWrapper } from "./Withdraw.Styled";
// import useAuthStore from "@/store/authStore";
// import { fetchClient } from "@/utils/api/fetchClient";
import { Button } from "../common/button";

const Withdraw = () => {
//   const { userId } = useAuthStore();

  const [password, setPassword] = useState<string>("");

  const handleChange = (_name: string, value: string) => {
    setPassword(value);
  };

  const handleClickWithdraw = async () => {
    // 비밀번호 확인
    // uuid 전송
    // const response = fetchClient()
    //
  };

  return (
    <>
      <WithdrawWrapper>
        <Title>회원탈퇴</Title>
        <Caption>
          회원탈퇴를 하시면 모든 개인 정보가 삭제되며, 복구할 수 없습니다.
        </Caption>
        <PasswordLayer>
          <TextField
            name="password"
            placeholder="비밀번호"
            type="password"
            size="L"
            required={true}
            value={password}
            onChange={handleChange}
          />
        </PasswordLayer>
        <WithdrawButtonLayer>
          <Button
            size="m"
            variant="contained"
            type="button"
            onClick={handleClickWithdraw}
          >
            확 인
          </Button>
        </WithdrawButtonLayer>
      </WithdrawWrapper>
    </>
  );
};
export default Withdraw;

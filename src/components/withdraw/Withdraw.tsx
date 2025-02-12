"use client";

import { useState } from "react";
import TextField  from "@/components/common/textField/TextField";
import { Caption, PasswordLayer, Title, WithdrawButtonLayer, WithdrawWrapper } from "./Withdraw.Styled";
import { Button } from "../common/button";
import useAuthStore from "@/store/authStore";
import { fetchClient } from "@/utils/api/fetchClient";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth/logout";

const Withdraw = () => {

  const router = useRouter();
  const [password, setPassword] = useState<string>("");

  const handleChange = (_name: string, value: string) => {
    setPassword(value);
  };

  const handleClickWithdraw = async () => {
    console.log("handleClickWithdraw");

    const { userId , role} = useAuthStore.getState();

    try{
      console.log(userId, password, role);
      const response = await fetchClient("/api/user/withdraw",{ method: "DELETE", 
        body: {userId, password}
      });
      if(response.status === 200 ){
        alert("회원삭제 되었습니다.");
        logout();
        router.push("/")
      }
    } catch (error) {
      console.error("회원 삭제 실패", error);
      alert("서버 에러로 인한 회웥라퇴가 불가능합니다.")
    }
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

import TextButton from "@/components/common/button/TextButton";
import { AccountButtonLayer, AccountWrapper, Title } from "@/components/dashboard/DashBoard.Styled";
import { logout } from "@/utils/auth/logout";

const AccountSection = () => {

  const handleClickLogout =() => {

    logout();
    // 추후 api 요청
  }

  const handleClickAccountDelete= () => {
    // api 요청

  }
    return (
        <AccountWrapper>
            <Title>Account</Title>
          
          <AccountButtonLayer>
            <TextButton type="button" onClick={handleClickLogout}>로그아웃</TextButton>
            <TextButton color="var(--error-color)" onClick={handleClickAccountDelete}>회원탈퇴</TextButton>
          </AccountButtonLayer>
        
        </AccountWrapper>
    );
}

export default AccountSection;
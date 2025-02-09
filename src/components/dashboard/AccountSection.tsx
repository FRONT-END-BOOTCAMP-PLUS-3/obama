import TextButton from "@/components/common/button/TextButton";
import { AccountButtonLayer, AccountWrapper, Title } from "@/components/dashboard/DashBoard.Styled";

const AccountSection = () => {
    return (
        <AccountWrapper>
            <Title>Account</Title>
          
          <AccountButtonLayer>
            <TextButton>로그아웃</TextButton>
            <TextButton color="var(--error-color)">회원탈퇴</TextButton>
          </AccountButtonLayer>
        
        </AccountWrapper>
    );
}

export default AccountSection;
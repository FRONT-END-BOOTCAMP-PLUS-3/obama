import Image from "next/image";
import { IconLayer, InfoItemWrapper, InfoLayer, InfoText, InfoTitle } from "@/components/dashboard/InfoItem.Styled";

const InfoItem = () => {


  return (
    <InfoItemWrapper>
      <InfoLayer>
        <InfoTitle>이메일</InfoTitle>
        <InfoText>userEmail@endpoint.com</InfoText>
      </InfoLayer>
      <IconLayer>
        <Image
          src="/icons/editPen.svg"
          alt="편집 아이콘"
          width={28}
          height={28}
          priority
        />
      </IconLayer>
    </InfoItemWrapper>
  );
};
export default InfoItem;

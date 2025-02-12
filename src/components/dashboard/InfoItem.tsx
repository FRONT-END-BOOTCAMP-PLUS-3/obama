import Image from "next/image";
import {
  IconLayer,
  InfoItemWrapper,
  InfoLayer,
  InfoText,
  InfoTitle,
  SubjectLayer,
} from "@/components/dashboard/InfoItem.Styled";
import { useEffect, useState } from "react";

interface InfoItemProps {
  field: string; // key 값을 문자열(string)로 변경
  text?: string;
  onEdit?: () => void; // onEdit 추가
}

const InfoItem: React.FC<InfoItemProps> = ({ field, text = "", onEdit }) => {
  const [displayValue, setDisplayValue] = useState<string>(text);

  // 초기 디스플레이 값 설정
  useEffect(() => {
    setDisplayValue(text);
  }, [text]);

  return (
    <InfoItemWrapper>
      <InfoLayer>
        <SubjectLayer>
          <InfoTitle>{field}</InfoTitle>{" "}
          {/* keyToTitleMap 제거하고 field 값 직접 사용 */}
          <InfoText>{displayValue}</InfoText>
        </SubjectLayer>

        {/* 편집 가능할 경우 아이콘 표시 */}

        <IconLayer>
          <Image
            src="/icons/editPen.svg"
            alt="편집 아이콘"
            width={28}
            height={28}
            priority
            onClick={onEdit}
          />
        </IconLayer>
      </InfoLayer>
    </InfoItemWrapper>
  );
};
export default InfoItem;

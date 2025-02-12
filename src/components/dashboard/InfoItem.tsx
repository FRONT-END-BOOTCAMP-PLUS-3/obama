import Image from "next/image";
import {
  IconLayer,
  InfoItemWrapper,
  InfoLayer,
  InfoText,
  InfoTitle,
  SelectedSectionLayer,
  SubjectLayer,
} from "@/components/dashboard/InfoItem.Styled";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { fetchClient } from "@/utils/api/fetchClient";

interface InfoItemProps {
  field: string; // key 값을 문자열(string)로 변경
  text?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ field, text = "" }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState<string>(text);

  // 초기 디스플레이 값 설정
  useEffect(() => {
    setDisplayValue(text);
  }, [text]);

  // 편집모드 진입
  const handleClickEdit = () => {
    setSelectedField(field);
  };

  // 취소 아이콘 클릭
  const handleClickClose = () => {
    setSelectedField(null);
  };

  // 저장 아이콘 클릭 (API 연동 필요)
  const handleClickSave = async () => {
    const { userId } = useAuthStore.getState();
    const updatedValue = displayValue; // 사용자가 입력한 새로운 값

    try {
      const response = await fetchClient("/api/user/dashboard", {
        method: "PATCH",
        body: {
          userId,
          category: field, // category_id 기반으로 변경할 경우 서버 API 수정 필요
          newValue: updatedValue,
        },
      });

      if (response.status !== 200) {
        alert("서버 오류로 인해 변경을 실패했습니다.");
      } else {
        alert("수정 성공");
        setDisplayValue(updatedValue);
      }
    } catch (error) {
      console.error("API 오류", error);
    }

    setSelectedField(null);
  };

  return (
    <InfoItemWrapper>
      <InfoLayer>
        <SubjectLayer>
          <InfoTitle>{field}</InfoTitle>{" "}
          {/* keyToTitleMap 제거하고 field 값 직접 사용 */}
          <InfoText>{displayValue}</InfoText>
        </SubjectLayer>

        {/* 편집 가능할 경우 아이콘 표시 */}
        {!selectedField && (
          <IconLayer>
            <Image
              src="/icons/editPen.svg"
              alt="편집 아이콘"
              width={28}
              height={28}
              priority
              onClick={handleClickEdit}
            />
          </IconLayer>
        )}

        {/* 편집 모드 시 조건부 렌더링 */}
        {selectedField && (
          <>
            <IconLayer>
              <Image
                src="/icons/editCheck.svg"
                alt="저장 아이콘"
                width={48}
                height={48}
                priority
                onClick={handleClickSave}
              />
              <Image
                src="/icons/editClose.svg"
                alt="취소 아이콘"
                width={28}
                height={28}
                priority
                onClick={handleClickClose}
              />
            </IconLayer>
            {/* 편집 입력 필드 */}
            <SelectedSectionLayer>
              <input
                type="text"
                value={displayValue}
                onChange={(e) => setDisplayValue(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              />
            </SelectedSectionLayer>
          </>
        )}
      </InfoLayer>
    </InfoItemWrapper>
  );
};
export default InfoItem;

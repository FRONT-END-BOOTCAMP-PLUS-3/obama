import Image from "next/image";
import {
  IconLayer,
  InfoItemWrapper,
  InfoLayer,
  InfoText,
  InfoTitle,
} from "@/components/dashboard/InfoItem.Styled";
import { useState } from "react";
import { TextField } from "../common/textField";

type inputType = "text" | "password" | "email" | "date"
interface InfoItemProps {
  title: string;
  text?: string;
  type?: inputType;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, text = "" }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);

  const isEditable = title !== "email";

  const handleClickIcon = () => {
   setIsEdit(true);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <InfoItemWrapper >
      <InfoLayer>
        <InfoTitle>{title}</InfoTitle>
        {isEdit ? (
          <TextField
            name={"text"}
            type="text"
            value={value}
            onChange={handleChange}
          />
        ) : (
          <InfoText>{text}</InfoText>
        )}
      </InfoLayer>
      {isEditable &&
        (isEdit ? (
          <IconLayer $isEdit= {isEdit}>
            <Image
              src="/icons/editCheck.svg"
              alt="체크 아이콘"
              width={44}
              height={44}
              priority
            />
            <Image
              src="/icons/editClose.svg"
              alt="취소"
              width={28}
              height={28}
              priority
            />
          </IconLayer>
        ) : (
          <IconLayer $isEdit={isEdit} onClick={handleClickIcon}>
            <Image
              src="/icons/editPen.svg"
              alt="편집 아이콘"
              width={28}
              height={28}
              priority
            />
          </IconLayer>
        ))}
    </InfoItemWrapper>
  );
};
export default InfoItem;

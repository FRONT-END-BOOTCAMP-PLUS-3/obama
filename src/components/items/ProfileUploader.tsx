"use client";
import { useRef } from "react";
import * as S from "@/components/items/ProfileUploader.Styled";

const ProfileUploader = ({
  image,
  setImage,
}: {
  image: File | null;
  setImage: (file: File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file); // ✅ 이미지 파일을 상태에 저장 (업로드 X)
    }
  };

  return (
    <S.Container onClick={handleImageClick}>
      <S.ImageWrapper>
        <S.ProfileImage
          src={image ? URL.createObjectURL(image) : "/icons/profilePicture.svg"}
          alt="Profile"
        />
      </S.ImageWrapper>
      <S.ProfilePlusIcon src="/icons/profilePlus.svg" alt="Add Profile" />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </S.Container>
  );
};

export default ProfileUploader;

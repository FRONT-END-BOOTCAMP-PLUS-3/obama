"use client";
import { useState, useRef } from "react";
import * as S from "./profileUploader.Styled";

const ProfileUploader = () => {
  const [image, setImage] = useState("/icons/profilePicture.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <S.Container onClick={handleImageClick}>
      <S.ImageWrapper>
        <S.ProfileImage src={image} alt="Profile" />
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

"use client";
import { useRef } from "react";
import * as S from "@/components/items/ProfileUploader.Styled";
import { createClient } from "@supabase/supabase-js";
import { clientConfig } from "@/config/clientEnv";

const supabase = createClient(
  clientConfig.NEXT_PUBLIC_SUPABASE_URL,
  clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const ProfileUploader = ({
  image,
  setImage,
}: {
  image: string;
  setImage: (url: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    const { data, error } = await supabase.storage
      .from("profile-images") // 📌 Supabase Storage의 버킷 이름
      .upload(filePath, file);

    if (error) {
      console.error("❌ 이미지 업로드 실패:", error.message);
      return;
    }

    const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${filePath}`;
    setImage(publicURL); // ✅ 공개 URL로 상태 업데이트
  };

  return (
    <S.Container onClick={handleImageClick}>
      <S.ImageWrapper>
        <S.ProfileImage
          src={image || "/icons/profilePicture.svg"}
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

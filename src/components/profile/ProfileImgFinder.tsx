"use client";
import { useEffect, useState } from "react";
import { clientConfig } from "@/config/clientEnv";

const ProfileImgFinder = ({ imagePath }: { imagePath: string }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (!imagePath) return;

    // ✅ Supabase Storage 공개 URL 직접 생성
    const publicURL = `${clientConfig.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${imagePath}`;

    setImageUrl(publicURL);
    console.log("🔗 Updated imageUrl:", publicURL); 
  }, [imagePath]);

  return (
    <img
      src={imageUrl || "/icons/profilePicture.svg"} // 기본 프로필 이미지 설정
      alt="Profile"
      width={100}
      height={100}
      style={{ borderRadius: "50%", objectFit: "cover" }}
    />
  );
};

export default ProfileImgFinder;

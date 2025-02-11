"use client";
import { useEffect, useState } from "react";
import { clientConfig } from "@/config/clientEnv";
import { createClient } from "@supabase/supabase-js";


interface ProfileImgFinderProps {
  imagePath: string;
}

const supabase = createClient(
  clientConfig.NEXT_PUBLIC_SUPABASE_URL,
  clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ProfileImgFinder = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const imagePath = `profiles/${userId}.png`; // 동적으로 이미지 경로 생성

      // Supabase Storage 공개 URL 가져오기
      const { data } = supabase.storage
        .from("profile-images")
        .getPublicUrl(imagePath);

      if (data?.publicUrl) {
        setImageUrl(data.publicUrl);
      }
    };

    fetchImageUrl();
  }, []);

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

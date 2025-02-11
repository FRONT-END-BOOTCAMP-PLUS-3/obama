"use client";

import React, { useState, useEffect } from "react";
import {
  QrcodeCreateContainer,
  QrTitle,
  QrTitleSection,
  QrcodeSection,
} from "@/components/qrcode/QrcodePage.Styeld";
import * as S from "@/components/items/ProfileUploader.Styled";
import { createClient } from "@supabase/supabase-js";
import { clientConfig } from "@/config/clientEnv";
import { useQRCode } from "next-qrcode";

const QrCreatePage: React.FC = () => {
  const { Canvas } = useQRCode();
  const [imageUrl, setImageUrl] = useState<string>("");
  const supabase = createClient(
    clientConfig.NEXT_PUBLIC_SUPABASE_URL,
    clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const getImageUrl = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return; // userId가 없으면 실행하지 않음

      const imagePath = `profiles/${userId}.png`; // 동적으로 경로 생성
      const { data } = supabase.storage
        .from("profile-images")
        .getPublicUrl(imagePath);

      if (data) {
        setImageUrl(data.publicUrl);
      }
    };

    getImageUrl();
  }, []);

  return (
    <QrcodeCreateContainer>
      <S.ImageWrapper>
        <S.ProfileImage
          src={imageUrl || "/icons/profilePicture.svg"}
          alt="Profile"
        />
      </S.ImageWrapper>
      <QrTitleSection>
        <QrTitle>QR코드를 스캔해주세요.</QrTitle>
      </QrTitleSection>
      <QrcodeSection>
        <Canvas
          text={"https://github.com/bunlong/next-qrcode"}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          }}
        />
      </QrcodeSection>
    </QrcodeCreateContainer>
  );
};

export default QrCreatePage;

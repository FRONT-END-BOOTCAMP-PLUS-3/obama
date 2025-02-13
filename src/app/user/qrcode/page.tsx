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
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const supabase = createClient(
    clientConfig.NEXT_PUBLIC_SUPABASE_URL,
    clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const localIP = "172.31.98.76"; // 🔹 본인 PC의 LAN IP로 변경
  const port = "3000"; // 🔹 Next.js 실행 포트

  useEffect(() => {
    const getUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      // QR 코드 URL 동적으로 설정
      setQrUrl(`http://${localIP}:${port}/users/${userId}`);

      // 프로필 이미지 가져오기
      const imagePath = `profiles/${userId}.png`;
      const { data } = supabase.storage
        .from("profile-images")
        .getPublicUrl(imagePath);

      if (data) {
        setImageUrl(data.publicUrl);
      }
    };

    getUserData();
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
        {qrUrl && (
          <Canvas
            text={qrUrl}
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
        )}
      </QrcodeSection>
    </QrcodeCreateContainer>
  );
};

export default QrCreatePage;

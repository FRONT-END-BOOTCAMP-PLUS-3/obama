"use client";

import React, { useState, useEffect } from "react";
import {
  QrcodeCreateContainer,
  QrTitle,
  QrTitleSection,
} from "@/components/qrcode/QrcodePage.Styeld";
import * as S from "@/components/items/ProfileUploader.Styled";
import { createClient } from "@supabase/supabase-js";
import { clientConfig } from "@/config/clientEnv";

const QrCreatePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const supabase = createClient(
    clientConfig.NEXT_PUBLIC_SUPABASE_URL,
    clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  useEffect(() => {
    const getImageUrl = async () => {
      const { data } = supabase.storage
        .from("profile-images")
        .getPublicUrl("profiles/1739164740550.jpeg");

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
        <QrTitle>QR코드를 생성해주세요.</QrTitle>
      </QrTitleSection>
    </QrcodeCreateContainer>
  );
};

export default QrCreatePage;

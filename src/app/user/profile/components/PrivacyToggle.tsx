"use client";
import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import {
  SettingsWrapper,
  SettingItem,
  Label,
  Value,
} from "./PrivacyToggle.styled";
import { Profile } from "@/domain/entities/Profile";

interface PrivacyToggleProps {
  profile: Profile;
  aboutMeData: Record<string, string[]>;
  onToggleUpdate: (updatedData: Record<string, string[]>) => void;
}

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({
  profile,
  aboutMeData,
  onToggleUpdate,
}) => {
  const [privacySettings, setPrivacySettings] = useState<
    { label: string; value: string; isPublic: boolean }[]
  >([]);

  useEffect(() => {
    // ✅ profile.categories가 존재하는지 확인
    console.log("✅ useEffect - profile.categories:", profile.categories);
    if (!profile?.categories) {
      console.error("❌ profile.categories 데이터가 없습니다.");
      return;
    }

    const categoryEntries = Object.entries(profile.categories || {});
    console.log("✅ 카테고리 데이터:", categoryEntries);

    // AboutMe 데이터가 존재하는 경우만 공개 상태로 설정
    const settings = categoryEntries.map(([key, data]) => ({
      label: key,
      value: Array.isArray(data) ? data.join(", ") : "",
      isPublic: aboutMeData[key] && aboutMeData[key].length > 0,
    }));
    

    setPrivacySettings(settings);
  }, [profile, aboutMeData]);

  const handleToggle = async (label: string) => {
    const updatedSettings = privacySettings.map((setting) =>
      setting.label === label
        ? { ...setting, isPublic: !setting.isPublic }
        : setting
    );
    setPrivacySettings(updatedSettings);

    // 🔹 AboutMe 데이터 업데이트
    const updatedData = updatedSettings.reduce((acc, setting) => {
      if (setting.isPublic) {
        acc[setting.label] = setting.value.split(", ");
      }
      return acc;
    }, {} as Record<string, string[]>);

    onToggleUpdate(updatedData); // 부모 컴포넌트 상태 업데이트
  };

  if (!privacySettings.length) return <div>Loading privacy settings...</div>;

  return (
    <SettingsWrapper>
      {privacySettings.map((item) => (
        <SettingItem key={item.label}>
          <Label>{item.label}</Label>
          <Value>{item.value}</Value>
          <Toggle
            ischecked={item.isPublic} // AboutMe 데이터 기반 초기값 설정
            onChange={() => handleToggle(item.label)}
            leftLabel={""}
            rightLabel={""}
          />
        </SettingItem>
      ))}
    </SettingsWrapper>
  );
};

export default PrivacyToggle;

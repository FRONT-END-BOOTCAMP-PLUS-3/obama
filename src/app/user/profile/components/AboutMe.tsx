"use client";
import React from "react";
import {
  AboutMeWrapper,
  SectionTitle,
  Item,
  Label,
  Value,
} from "./AboutMe.styled";

interface AboutMeProps {
  aboutMeData: Record<string, string[]>; // 공개된 데이터
}

const AboutMe: React.FC<AboutMeProps> = ({ aboutMeData }) => {
  return (
    <AboutMeWrapper>
      <SectionTitle>About me</SectionTitle>
      {Object.entries(aboutMeData)
        .filter(([_, values]) => values.length > 0 && values[0] !== "") // 값 필터링
        .length > 0 ? (
        Object.entries(aboutMeData)
          .filter(([_, values]) => values.length > 0 && values[0] !== "") // 값 필터링
          .map(([label, values]) => (
            <Item key={label}>
              <Label>{label}</Label>
              <Value>{values.map((v) => `#${v}`).join(" ")}</Value>
            </Item>
          ))
      ) : (
        <p>공개된 정보가 없습니다.</p>
      )}
    </AboutMeWrapper>
  );
};

export default AboutMe;

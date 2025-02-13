"use client";

import { useEffect, useState } from "react";
import {
  AboutMeWrapper,
  SectionTitle,
  Item,
  Answer,
  CategoryName,
} from "./AboutMe.Styled";

interface AboutMeProps {
  userId: string | null;
  hiddenCategories: number[]; // 숨겨야 할 카테고리 리스트 추가
}

interface AboutMeData {
  category_id: number;
  answer: string;
}

interface Category {
  id: number;
  korname: string;
  name: string;
}

const convertHashtagInput = (userInputs: AboutMeData[]): AboutMeData[] => {
  return userInputs.filter((input) => input.category_id <= 11) //카테고리 11번까지만 출력
    .map((input) => ({
      category_id: input.category_id,
      answer: input.answer.split(",").map((v) => `#${v}`).join(" "),
    }));
};

const AboutMe: React.FC<AboutMeProps> = ({ userId, hiddenCategories }) => {
  const [aboutMeData, setAboutMeData] = useState<AboutMeData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userInputData, setUserInputData] = useState<AboutMeData[]>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch(`/api/user/profile?userId=${localStorage.getItem("userId")}`);
        if (!res.ok) throw new Error("유저 프로필 데이터를 가져오는 데 실패했습니다.");

        const data = await res.json();

        setAboutMeData(data.aboutMeData);
      } catch (error) {
        console.error("유저 프로필 API 오류:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        if (!res.ok) throw new Error("카테고리 데이터를 가져오는 데 실패했습니다.");

        const data = await res.json();

        setCategories(data.categories);
      } catch (error) {
        console.error("카테고리 API 오류:", error);
      }
    };

    const fetchUserInputData = async () => {
      try {
        const res = await fetch(`/api/user/input?userId=${localStorage.getItem("userId")}`);
        if (!res.ok) throw new Error("userinput 데이터를 가져오는 데 실패했습니다.");

        const data = await res.json();
        setUserInputData(convertHashtagInput(data));
      } catch (error) {
        console.error("userinput API 오류:", error);
      }
    };

    fetchProfileData();
    fetchCategories();
    fetchUserInputData();
  }, [userId]);

  const handleDeleteItem = (categoryId: number) => {
    setUserInputData((prev) => prev.filter((item) => item.category_id !== categoryId));
  };

  return (
    <AboutMeWrapper>
      <SectionTitle>About Me</SectionTitle>
      {userInputData.length > 0 ? (
  userInputData
    .filter(({ category_id }) => !hiddenCategories.includes(category_id)) // ✅ 숨길 카테고리 제외
    .map(({ category_id, answer }) => {
      const category = categories.find((c) => c.id === category_id);
      if (!category) return null; // ✅ 카테고리가 없으면 렌더링하지 않음
      return (
        <Item key={category_id}>
          <CategoryName>{category.korname}</CategoryName>
          <Answer>{answer}</Answer>
        </Item>
      );
    })
) : (
  <p>공개된 정보가 없습니다.</p>
)}
    </AboutMeWrapper>
  );
};

export default AboutMe;
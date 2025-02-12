"use client";

import {
  DashBoardContainer,
  InfoSection,
  Title,
  TitleWrapper,
} from "@/components/dashboard/DashBoard.Styled";

import InfoItem from "@/components/dashboard/InfoItem";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  korname: string;
  name: string;
}

interface AboutMeData {
  category_id: number;
  answer: string;
}

const EditPage = () => {
  const router = useRouter();

  const handleEdit = (categoryName: string) => {
    router.push(`/user/items?cn=${categoryName}`);
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [userInputData, setUserInputData] = useState<AboutMeData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        if (!res.ok)
          throw new Error("카테고리 데이터를 가져오는 데 실패했습니다.");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("카테고리 API 오류:", error);
      }
    };

    const fetchUserinputdata = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID가 없습니다.");

        const res = await fetch(`/api/user/input?userId=${userId}`);
        if (!res.ok)
          throw new Error("userinput 데이터를 가져오는 데 실패했습니다.");

        const data = await res.json();
        setUserInputData(data);
      } catch (error) {
        console.error("userinput API 오류:", error);
      }
    };

    fetchCategories();
    fetchUserinputdata();
  }, []); // 빈 배열을 넣어서 최초 렌더링 시 한 번만 실행됨
  console.log(categories);
  console.log(userInputData);
  const sortedUserInputData = [...userInputData].sort(
    (a, b) => a.category_id - b.category_id
  );

  return (
    <DashBoardContainer>
      <TitleWrapper>
        <Title>프로필 수정</Title>
      </TitleWrapper>

      <InfoSection>
        {sortedUserInputData.map((item) => {
          const category = categories.find(
            (cat) => cat.id === item.category_id
          );

          return (
            <InfoItem
              key={item.category_id}
              field={category ? category.korname : "알 수 없음"}
              text={item.answer}
              onEdit={() => category && handleEdit(category.name)} // onEdit 추가
            />
          );
        })}
      </InfoSection>
    </DashBoardContainer>
  );
};

export default EditPage;

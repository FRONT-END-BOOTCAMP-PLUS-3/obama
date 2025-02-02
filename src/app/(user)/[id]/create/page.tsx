"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { GetItemListUseCase } from "@/application/usecases/item/GetItemListUseCase";
import { GetItemListDto } from "@/application/usecases/item/dto/GetItemListDto";
import { Button } from "@/components/common/Button";
import {
  Container,
  ButtonList,
  ProfileTitle,
  BottomButtonContainer,
  ProfileSection,
} from "./page.Styled";

export default function CreatePage() {
  const { id } = useParams(); // URL의 [id] 값을 가져옴
  const categoryId = Number(id); // 숫자로 변환
  const router = useRouter(); // Initialize the router

  const [items, setItems] = useState<GetItemListDto["items"]>([]);

  // 카테고리 ID에 따른 질문 매핑
  const categoryQuestions: Record<number, string> = {
    1: "Q1. 나의 취미는?",
    3: "Q3. 좋아하는 동물은?",
    7: "Q7. 어떤 여행을 선호하나요?",
    8: "Q8. 좋아하는 음식은?",
    9: "Q9. 관심있는 대화 주제는?",
  };

  const question = categoryQuestions[categoryId] || "No Question available"; // 기본값 설정

  useEffect(() => {
    if (isNaN(categoryId)) return; // 유효하지 않은 ID면 실행 안 함

    const fetchItems = async () => {
      try {
        const useCase = new GetItemListUseCase();
        const response = await useCase.execute({ offset: 0 });

        console.log("Fetched Items:", response.items);

        const filteredItems = response.items.filter(
          (item) => item.category_id === categoryId
        );

        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [categoryId]); // categoryId가 변경될 때마다 실행

  // Function to handle "다음" button click
  const handleNextClick = () => {
    const nextCategoryId = categoryId + 1; // Move to the next category
    router.push(`/${nextCategoryId}/create`); // Navigate to the new route
  };

  return (
    <Container>
      {/* 프로필 생성 섹션 */}
      <ProfileSection>
        <ProfileTitle>나를 소개하는 프로필 생성하기</ProfileTitle>
      </ProfileSection>
      <h5>{question}</h5>

      {items.length > 0 ? (
        <ButtonList>
          {items.map((item, index) => (
            <Button key={index} size="s" variant="contained" isToggle={true}>
              {item.item_name || "No name available"}
            </Button>
          ))}
        </ButtonList>
      ) : (
        <p>No items found</p>
      )}

      <BottomButtonContainer>
        <Button size="m" variant="line">
          건너뛰기
        </Button>
        <Button size="m" variant="contained" onClick={handleNextClick}>
          {" "}
          {/* Add onClick here */}
          다음
        </Button>
      </BottomButtonContainer>
    </Container>
  );
}

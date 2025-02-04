"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetItemListUseCase } from "@/application/usecases/item/GetItemListUseCase";
import { GetItemListDto } from "@/application/usecases/item/dto/GetItemListDto";
import { GetCategoryListUseCase } from "@/application/usecases/category/GetCategoryListUseCase";
import { Button } from "@/components/common/Button";
import {
  Container,
  ButtonList,
  ProfileTitle,
  BottomButtonContainer,
  ProfileSection,
  MBTIButtonList,
  TextFieldSection,
  QuestionSection,
  BottomSection,
} from "./page.Styled";
import MBTISelectButton from "./components/mbtibutton";
import { TextField } from "@/components/common/TextField";
import IntroduceInput from "./components/introduceInput";

export default function CreatePage() {
  const { id } = useParams();
  const categoryId = Number(id);
  const router = useRouter();

  const [items, setItems] = useState<GetItemListDto["items"]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [question, setQuestion] = useState<string>("");
  const [introText, setIntroText] = useState<string>("");

  const mbtiOptions = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const useCase = new GetCategoryListUseCase();
        const response = await useCase.execute({ offset: 0, limit: 12 });

        const category = response.categories.find(
          (category: { category_id: number }) =>
            category.category_id === categoryId
        );

        if (category) {
          setQuestion(category.category_question);
        } else {
          setQuestion("No Question available");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categoryId]);

  useEffect(() => {
    if (isNaN(categoryId) || categoryId === 4) return;

    const fetchItems = async () => {
      try {
        const useCase = new GetItemListUseCase();
        const response = await useCase.execute({ offset: 0 });
        const filteredItems = response.items.filter(
          (item) => item.category_id === categoryId
        );
        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [categoryId]);

  const handleNavigation = (direction: "next" | "previous") => {
    if (direction === "next") {
      if (categoryId === 4) {
        console.log("선택한 MBTI:", selectedType); // MBTI 출력
      } else if (categoryId === 11) {
        console.log("소개 입력 값:", introText); // IntroduceInput 값 출력
      } else {
        console.log("선택된 아이템:", Array.from(selectedItems)); // 아이템 리스트 출력
      }
    }

    const newCategoryId =
      direction === "next" ? categoryId + 1 : categoryId - 1;
    router.push(`/${newCategoryId}/create`);
  };

  const handleToggle = (itemName: string) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemName)) {
        newSelectedItems.delete(itemName);
      } else {
        newSelectedItems.add(itemName);
      }
      return newSelectedItems;
    });
  };

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const toggleSelection = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type)); // 선택된 MBTI만 토글
  };

  return (
    <Container>
      <ProfileSection>
        <ProfileTitle>나를 소개하는 프로필 생성하기</ProfileTitle>
      </ProfileSection>

      <QuestionSection>
        <h5>
          Q{categoryId}. {question}
        </h5>
      </QuestionSection>
      <BottomSection>
        {categoryId === 4 ? (
          <MBTIButtonList>
            {mbtiOptions.map((mbti, index) => (
              <MBTISelectButton
                key={index}
                label={mbti}
                selected={selectedType === mbti}
                onClick={() => toggleSelection(mbti)}
              />
            ))}
          </MBTIButtonList>
        ) : categoryId === 11 ? (
          <IntroduceInput value={introText} onChange={setIntroText} />
        ) : items.length > 0 ? (
          <ButtonList>
            {items.map((item, index) => (
              <Button
                key={index}
                size="s"
                variant={
                  selectedItems.has(item.item_name || "") ? "contained" : "line"
                }
                onClick={() => handleToggle(item.item_name || "")}
              >
                {item.item_name || "No name available"}
              </Button>
            ))}
          </ButtonList>
        ) : (
          <TextFieldSection>
            <TextField
              size="L"
              name="textfield"
              placeholder="질문에 대한 답변을 해주세요."
            />
          </TextFieldSection>
        )}

        <BottomButtonContainer>
          <Button
            size="m"
            variant="line"
            onClick={() => handleNavigation("previous")}
          >
            이전
          </Button>
          <Button
            size="m"
            variant="contained"
            onClick={() => handleNavigation("next")}
          >
            다음
          </Button>
        </BottomButtonContainer>
      </BottomSection>
    </Container>
  );
}

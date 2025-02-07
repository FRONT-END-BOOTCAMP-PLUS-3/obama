"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import {
  ProfileCreateContainer,
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
import ProfileImageUploader from "./components/profileUploader";

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // useSearchParams를 사용
  const categoryName = searchParams.get("cn"); // 'cn' 쿼리 파라미터에서 값을 가져옵니다.
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [items, setItems] = useState<any[]>([]); // update with your actual type
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [question, setQuestion] = useState<string>("");
  const [introText, setIntroText] = useState<string>("");

  const [textFieldValue, setTextFieldValue] = useState<string>("");

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
    const fetchCategory = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();

        const category = data.categories?.find(
          (category: { category_name_en: string }) =>
            category.category_name_en === categoryName
        );

        if (category) {
          setCategoryId(category.category_id);
          setQuestion(category.category_question);
        } else {
          setQuestion("No Question available");
        }
        console.log("category", category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categoryName) {
      fetchCategory();
    }
  }, [categoryName]);

  useEffect(() => {
    if (categoryId === null || isNaN(categoryId) || categoryId === 4) return;

    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/items?categoryId=${categoryId}`);
        const data = await response.json();
        const filteredItems = data.items?.filter(
          (item) => item.category_id === categoryId
        );
        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [categoryId]);

  const handleNavigation = async (direction: "next" | "previous") => {
    if (!categoryId) return;

    const newCategoryId =
      direction === "next" ? categoryId + 1 : categoryId - 1;

    try {
      const response = await fetch(`/api/category?startIndex=0&limit=12`);
      const data = await response.json();
      const newCategory = data.categories?.find(
        (category) => category.category_id === newCategoryId
      );

      if (newCategory) {
        router.push(`/user/items?cn=${newCategory.category_name_en}`);
      } else {
        console.error("Category not found");
      }
    } catch (error) {
      console.error("Error fetching new category:", error);
    }
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
    setSelectedType((prev) => (prev === type ? null : type));
  };

  return (
    <ProfileCreateContainer>
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
        ) : items && items.length > 0 ? (
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
        ) : categoryId === 12 ? (
          <ProfileImageUploader></ProfileImageUploader>
        ) : (
          <TextFieldSection>
            <TextField
              size="L"
              name="textfield"
              placeholder="질문에 대한 답변을 해주세요."
              value={textFieldValue}
              onChange={(name, value) => setTextFieldValue(value)}
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
    </ProfileCreateContainer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // useSearchParams로 변경
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
} from "@/components/items/ItemsPage.Styled";
import MBTISelectButton from "@/components/items/Mbtibutton";
import { TextField } from "@/components/common/TextField";
import IntroduceInput from "@/components/items/IntroduceInput";
import ProfileImageUploader from "@/components/items/ProfileUploader";
import { Item } from "@/domain/entities/item/Item";

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // useSearchParams를 사용
  const categoryName = searchParams.get("cn"); // 'cn' 쿼리 파라미터에서 값을 가져옵니다.
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [items, setItems] = useState<Item[]>([]); // update with your actual type
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
        console.log(`Fetching items for categoryId: ${categoryId}`); // ✅ 디버깅용 로그 추가

        const response = await fetch(`/api/item?categoryId=${categoryId}`); // ✅ categoryId 전달
        const data = await response.json();

        console.log("Fetched items:", data.items); // ✅ 응답 데이터 확인

        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [categoryId]);

  const handleNavigation = async (direction: "next" | "previous") => {
    if (!categoryId) return;

    // 선택한 답변 결정
    let answer = "";
    if (categoryId === 4) {
      answer = selectedType || "";
    } else if (categoryId === 11) {
      answer = introText;
    } else if (categoryId === 12) {
      answer = "Uploaded Image"; // 프로필 이미지 업로드 경우 (추후 수정 가능)
    } else if (items.length > 0) {
      answer = Array.from(selectedItems).join(", ");
    } else {
      answer = textFieldValue;
    }

    if (!answer) {
      alert("답변을 입력하거나 선택해주세요!");
      return;
    }

    // POST 요청으로 데이터 저장
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: categoryId,
          user_id: "1d1867cd-526c-4de5-97e4-4a0c8f386f78",
          answer,
        }),
      });

      const result = await response.json();
      console.log("📥 저장 결과:", result);

      if (!response.ok) {
        throw new Error(result.error || "데이터 저장 실패");
      }
    } catch (error) {
      console.error("❌ 저장 중 오류 발생:", error);
      return;
    }

    // ✅ 상태 초기화 (값 누적 방지)
    setSelectedItems(new Set());
    setSelectedType(null);
    setIntroText("");
    setTextFieldValue("");

    // 다음 or 이전 카테고리 이동
    const newCategoryId =
      direction === "next" ? categoryId + 1 : categoryId - 1;
    const query = new URLSearchParams({
      startIndex: "0",
      limit: "12",
    }).toString();

    try {
      const response = await fetch(`/api/category?${query}`);
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

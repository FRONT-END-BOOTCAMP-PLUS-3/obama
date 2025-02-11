"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // useSearchParams로 변경
import Button from "@/components/common/button/Button";
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
import TextField from "@/components/common/textField/TextField";
import IntroduceInput from "@/components/items/IntroduceInput";
import ProfileImageUploader from "@/components/items/ProfileUploader";
import { Item } from "@/domain/entities/item/Item";
import { CategoryListDto } from "@/application/usecases/category/dto/CategoryListDto";

export default function CreatePage() {
  const [profileImage, setProfileImage] = useState<string>("");
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
        const data: CategoryListDto = await response.json(); // DTO 적용

        const category = data.categories?.find(
          (category) => category.name === categoryName // DTO에 맞게 name 사용
        );

        if (category) {
          setCategoryId(category.id); // category_id -> id
          setQuestion(category.question || "No Question available"); // category_question -> question
        } else {
          setQuestion("No Question available");
        }
        console.log("Fetched category:", category);
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
        console.log(`Fetching items for categoryId: ${categoryId}`);

        const response = await fetch(`/api/item?categoryId=${categoryId}`);
        const data = await response.json();

        console.log("Fetched items:", data.items);

        const formattedItems: Item[] = (
          data.items as Array<{
            id: number;
            item_name: string;
            description?: string;
            category_id: number;
            created_at: string;
          }>
        ).map((item) => ({
          id: item.id,
          name: item.item_name,
          description: item.description,
          categoryId: item.category_id,
          createdAt: item.created_at,
        }));

        setItems(formattedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [categoryId]);

  const handleNavigation = async (direction: "next" | "previous") => {
    if (!categoryId) return;

    let answer = "";
    if (categoryId === 4) {
      answer = selectedType || "";
    } else if (categoryId === 11) {
      answer = introText;
    } else if (categoryId === 12) {
      answer = profileImage || "";
    } else if (items.length > 0) {
      answer = Array.from(selectedItems).join(", ");
    } else {
      answer = textFieldValue;
    }

    // ✅ "다음" 버튼 클릭 시에만 유효성 검사 실행
    if (direction === "next" && !answer) {
      alert("답변을 입력하거나 선택해주세요!");
      return;
    }

    if (direction === "next") {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category_id: categoryId,
            user_id: "1d1867cd-526c-4de5-97e4-4a0c8f386f78",
            answer,
          }),
        });

        const result = await response.json();
        console.log("📥 저장 결과:", result);

        if (!response.ok) throw new Error(result.error || "데이터 저장 실패");
      } catch (error) {
        console.error("❌ 저장 중 오류 발생:", error);
        return;
      }
    }

    // ✅ 상태 초기화
    setSelectedItems(new Set());
    setSelectedType(null);
    setIntroText("");
    setTextFieldValue("");
    setProfileImage(""); // ✅ 프로필 이미지 초기화

    // ✅ categoryId가 12이면 "/user"로 이동
    if (categoryId === 12) {
      router.push("/user");
      return;
    }

    // ✅ 다음 or 이전 카테고리 이동
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
        (cat) => cat.id === newCategoryId
      );
      if (newCategory) {
        router.push(`/user/items?cn=${newCategory.name}`);
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
                  selectedItems.has(item.name || "") ? "contained" : "line"
                }
                onClick={() => handleToggle(item.name || "")}
              >
                {item.name || "No name available"}
              </Button>
            ))}
          </ButtonList>
        ) : categoryId === 12 ? (
          <ProfileImageUploader
            image={profileImage}
            setImage={setProfileImage}
          />
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

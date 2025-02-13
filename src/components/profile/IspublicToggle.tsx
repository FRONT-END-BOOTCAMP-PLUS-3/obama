"use client";

import { useEffect, useState, useCallback } from "react";
import { Label, SettingItem, SettingsWrapper, Value } from "./IspublicToggle.Styled";
import Toggle from "./Toggle";

interface Category {
  id: number;
  korname: string;
}

interface UserInput {
  category_id: number;
  answer: string;
}

const IsPublicToggle: React.FC<{ onToggleChange: (categoryId: number, isChecked: boolean) => void }> = ({ onToggleChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [toggleState, setToggleState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        if (!res.ok) throw new Error("카테고리 데이터를 가져오는 데 실패했습니다.");
        const data = await res.json();
        setCategories(data.categories.filter((cat: Category) => cat.id <= 11));
      } catch (error) {
        console.error("카테고리 API 오류:", error);
      }
    };

    const fetchUserInputs = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        const res = await fetch(`/api/user/input?userId=${userId}`);
        if (!res.ok) throw new Error("userInput 데이터를 가져오는 데 실패했습니다.");
        const data = await res.json();
        setUserInputs(data);

        // 초기 토글 상태 설정 (기본값 true)
        const initialToggleState = data.reduce((acc: any, input: UserInput) => {
          acc[input.category_id] = true;
          return acc;
        }, {});
        setToggleState(initialToggleState);
      } catch (error) {
        console.error("userInput API 오류:", error);
      }
    };

    fetchCategories();
    fetchUserInputs();
  }, []);

  const handleToggleChange = useCallback(
    (categoryId: number) => {
      setToggleState((prev) => {
        const newState = { ...prev, [categoryId]: !prev[categoryId] };
        onToggleChange(categoryId, newState[categoryId]); // ✅ 상태 변경 즉시 ProfilePage로 반영
        return newState;
      });
    },
    [onToggleChange]
  );

  return (
    <SettingsWrapper>
      <h6>공개 설정</h6>
      {categories.length > 0 ? (
        categories.map(({ id, korname }) => {
          const answers = userInputs
            .filter((input) => input.category_id === id)
            .map((input) => `${input.answer}`)
            .join(" ");

          return (
            <SettingItem key={id}>
              <Label>{korname}</Label>
              <Value>{answers || "입력 없음"}</Value>
              <Toggle
                ischecked={toggleState[id] ?? true}
                onChange={() => handleToggleChange(id)}
                leftLabel="비공개"
                rightLabel="공개"
              />
            </SettingItem>
          );
        })
      ) : (
        <p>카테고리를 불러오는 중...</p>
      )}
    </SettingsWrapper>
  );
};

export default IsPublicToggle;

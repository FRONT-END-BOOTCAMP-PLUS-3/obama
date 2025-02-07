export interface UserInput {
  userInput_id: number; // 🔹 BIGINT 타입 (숫자)
  category_id: number; // 🔹 INT 타입
  answer: string;
  user_id: string; // 🔹 UUID 타입 (컬럼명 수정)
}

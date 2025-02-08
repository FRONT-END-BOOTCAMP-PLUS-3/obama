export interface UserInput {
  userInput_id?: number; // 자동 증가 PK이므로 선택적 속성
  category_id: number;
  answer: string;
  userId: number;
}

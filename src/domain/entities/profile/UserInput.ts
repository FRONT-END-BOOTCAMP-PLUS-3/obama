export interface UserInput {
  userInputId?: number; // 자동 증가 PK이므로 선택적 속성
  categoryId: number;
  answer: string;
  userId: number;
}

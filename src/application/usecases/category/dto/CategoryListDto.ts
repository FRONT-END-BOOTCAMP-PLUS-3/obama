export interface CategoryListDto {
  startIndex?: number;
  limit?: number;
  categories?: {
    id: number;
    name: string;
    question: string; // ✅ 추가
  }[];
}

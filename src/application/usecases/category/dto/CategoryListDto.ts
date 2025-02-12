export interface CategoryListDto {
  startIndex?: number;
  limit?: number;
  categories?: {
    id: number;
    korname: string;
    name: string;
    question: string;
  }[];
}

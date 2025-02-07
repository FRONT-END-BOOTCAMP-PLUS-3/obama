import { Category } from "@/domain/entities/category/Category";

export interface ICategoryRepository {
  getCategories(startIndex?: number, limit?: number): Promise<Category[]>;
}

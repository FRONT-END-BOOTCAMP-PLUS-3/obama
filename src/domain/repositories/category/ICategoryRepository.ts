import { Category } from "../../entities/category/Category";

export interface ICategoryRepository {
  getCategories(startIndex?: number, limit?: number): Promise<Category[]>;
}

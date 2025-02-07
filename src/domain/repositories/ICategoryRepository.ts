import { Category } from "../entities/Category";

export interface ICategoryRepository {
  getCategories(startIndex?: number, limit?: number): Promise<Category[]>;
}

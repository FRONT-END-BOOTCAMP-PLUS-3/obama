import { Category } from "@/domain/entities/category/Category";

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
}

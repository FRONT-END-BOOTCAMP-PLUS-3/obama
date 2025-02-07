import { Category } from "@/domain/entities/profile/Category";

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
}

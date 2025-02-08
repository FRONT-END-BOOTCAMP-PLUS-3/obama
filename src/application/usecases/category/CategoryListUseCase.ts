import { ICategoryRepository } from "@/domain/repositories/category/ICategoryRepository";
import { Category } from "@/domain/entities/category/Category";

export class CategoryListUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getCategories();
  }
}

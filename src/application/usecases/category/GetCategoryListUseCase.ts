import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";
import { Category } from "@/domain/entities/Category";

export class GetCategoryListUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(startIndex?: number, limit?: number): Promise<Category[]> {
    return await this.categoryRepository.getCategories(startIndex, limit);
  }
}

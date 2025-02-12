import { ICategoryRepository } from "@/domain/repositories/category/ICategoryRepository";
import { CategoryListDto } from "./dto/CategoryListDto"; // DTO 추가

export class CategoryListUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<CategoryListDto> {
    const categories = await this.categoryRepository.getCategories();

    return {
      startIndex: 0,
      limit: categories.length,
      categories: categories.map((category) => ({
        id: category.category_id,
        korname: category.category_name,
        name: category.category_name_en,
        question: category.category_question, // ✅ 추가
      })),
    };
  }
}

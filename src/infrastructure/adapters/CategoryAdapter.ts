import { GetCategoryListUseCase } from "@/application/usecases/category/GetCategoryListUseCase";

export const fetchCategoryQuestion = async (
  categoryId: number
): Promise<string> => {
  try {
    const useCase = new GetCategoryListUseCase();
    const response = await useCase.execute({ offset: 0, limit: 12 });

    const category = response.categories.find(
      (cat) => cat.category_id === categoryId
    );

    return category ? category.category_question : "No Question available";
  } catch (error) {
    console.error("Error fetching categories:", error);
    return "Error fetching question";
  }
};

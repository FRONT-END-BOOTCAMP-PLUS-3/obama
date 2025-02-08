import { NextResponse } from "next/server";
import { CategoryListUseCase } from "@/application/usecases/category/CategoryListUseCase";
import { SbCategoryRepository } from "@/infrastructure/repositories/category/SbCategoryRepository";

export async function GET() {
  try {
    const categoryRepository = new SbCategoryRepository();
    const categoryUseCase = new CategoryListUseCase(categoryRepository);
    const categories = await categoryUseCase.execute();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Error in category route:", error); // Log the error for better debugging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

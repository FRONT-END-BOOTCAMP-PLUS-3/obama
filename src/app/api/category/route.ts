import { NextResponse } from "next/server";
import { CategoryListUseCase } from "@/application/usecases/category/CategoryListUseCase";
import { SbCategoryRepository } from "@/infrastructure/repositories/category/SbCategoryRepository";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startIndex = searchParams.get("startIndex")
      ? parseInt(searchParams.get("startIndex") || "0", 10)
      : undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") || "0", 10)
      : undefined;

    const categoryRepository = new SbCategoryRepository();
    const categoryUseCase = new CategoryListUseCase(categoryRepository);
    const categories = await categoryUseCase.execute(startIndex, limit);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error in category route:", error); // Log the error for better debugging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

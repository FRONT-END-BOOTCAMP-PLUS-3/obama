import { SbItemRepository } from "@/infrastructure/repositories/item/SbItemRepository";
import { ItemListUseCase } from "@/application/usecases/item/ItemListUseCase";
import { ItemListDto } from "@/application/usecases/item/dto/ItemListDto"; // ✅ DTO 가져오기
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryIdParam = searchParams.get("categoryId");

    const dto: ItemListDto = {
      categoryId: categoryIdParam ? Number(categoryIdParam) : undefined,
    };

    console.log(`🔍 Fetching items with DTO:`, dto); // ✅ 디버깅 로그 추가

    const repository = new SbItemRepository();
    const useCase = new ItemListUseCase(repository);

    const items = await useCase.execute(dto);

    console.log("✅ Filtered items:", items); // ✅ 필터링된 아이템 로그 출력

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items", details: error.message },
      { status: 500 }
    );
  }
}

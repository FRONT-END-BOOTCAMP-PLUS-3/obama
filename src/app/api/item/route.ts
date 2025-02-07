import { SbItemRepository } from "@/infrastructure/repositories/item/SbItemRepository";
import { GetItemListUseCase } from "@/application/usecases/item/GetItemListUseCase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryIdParam = searchParams.get("categoryId");

    // 🔥 categoryId를 number로 변환 (숫자가 아닌 경우 undefined 처리)
    const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;

    console.log(`🔍 Fetching items for categoryId: ${categoryId}`); // ✅ 디버깅 로그 추가

    const repository = new SbItemRepository();
    const useCase = new GetItemListUseCase(repository);

    const items = await useCase.execute(categoryId);

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

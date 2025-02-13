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


    const itemRepository = new SbItemRepository();
    const itemListUseCase = new ItemListUseCase(itemRepository);

    const items = await itemListUseCase.execute(dto);


    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items", details: error },
      { status: 500 }
    );
  }
}

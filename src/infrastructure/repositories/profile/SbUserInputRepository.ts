import supabase from "@/infrastructure/databases/supabase/server";
import { IUserInputRepository } from "@/domain/repositories/profile/IUserInputRepository";
import { UserInput } from "@/domain/entities/profile/UserInput";
import { toSnakeCase } from "@/utils/convert/convertToCase";

export class SbUserInputRepository implements IUserInputRepository {
  async findAllByUserId(user_id: string): Promise<UserInput[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("userInput")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw new Error("User input data not found");
    return data;
  }

  async createOrUpdate(
    userInput: Omit<UserInput, "userInput_id">
  ): Promise<UserInput> {
    const client = await supabase();

    // 🔹 Convert the input to snake_case
    const snakeCaseInput = toSnakeCase(userInput);

    // 🔹 해당 user_id와 category_id의 데이터가 존재하는지 확인
    const { data: existingData, error: fetchError } = await client
      .from("userInput")
      .select("*")
      .eq("user_id", userInput.user_id)
      .eq("category_id", userInput.category_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116: No rows found (Supabase의 단일 조회 에러 코드)
      console.error("Supabase Fetch Error:", fetchError);
      throw new Error(`Failed to fetch user input: ${fetchError.message}`);
    }

    if (existingData) {
      // ✅ 기존 데이터가 존재하면 업데이트
      const { data: updatedData, error: updateError } = await client
        .from("userInput")
        .update(snakeCaseInput)
        .eq("user_id", userInput.user_id)
        .eq("category_id", userInput.category_id)
        .select()
        .single();

      if (updateError) {
        console.error("Supabase Update Error:", updateError);
        throw new Error(`Failed to update user input: ${updateError.message}`);
      }

      return updatedData;
    } else {
      // ✅ 데이터가 없으면 새로 삽입
      const { data: insertedData, error: insertError } = await client
        .from("userInput")
        .insert([snakeCaseInput])
        .select()
        .single();

      if (insertError) {
        console.error("Supabase Insert Error:", insertError);
        throw new Error(`Failed to insert user input: ${insertError.message}`);
      }

      return insertedData;
    }
  }
}

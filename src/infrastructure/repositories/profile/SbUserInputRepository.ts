import supabase from "@/infrastructure/databases/supabase/server";
import { IUserInputRepository } from "@/domain/repositories/profile/IUserinputRepository";
import { UserInput } from "@/domain/entities/profile/UserInput";

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

  async create(userInput: Omit<UserInput, "userInput_id">): Promise<UserInput> {
    const client = await supabase();
    const { data, error } = await client
      .from("userInput")
      .insert([
        {
          category_id: userInput.category_id, // 🔹 그대로 사용
          answer: userInput.answer,
          user_id: userInput.user_id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw new Error(`Failed to insert user input: ${error.message}`);
    }

    return data;
  }
}

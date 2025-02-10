import supabase from "@/infrastructure/databases/supabase/server";
import { IUserInputRepository } from "@/domain/repositories/profile/IUserinputRepository";
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

  async create(userInput: Omit<UserInput, "userInput_id">): Promise<UserInput> {
    const client = await supabase();

    // 🔹 Convert the input to snake_case
    const snakeCaseInput = toSnakeCase(userInput);

    const { data, error } = await client
      .from("userInput")
      .insert([snakeCaseInput])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw new Error(`Failed to insert user input: ${error.message}`);
    }

    return data;
  }
}

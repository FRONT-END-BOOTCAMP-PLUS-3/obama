import { IUserInputRepository } from "@/domain/repositories/profile/IUserinputRepository";
import supabase from "@/infrastructure/databases/supabase/server";
import { UserInput } from "@/domain/entities/profile/UserInput";

export class UserInputRepository implements IUserInputRepository {
    async findAllByUserId(userId: string): Promise<UserInput[]> {
    const client = await supabase();
      const { data, error } = await client
        .from("userInput")
        .select("*")
        .eq("user_id", userId);
  
      if (error) throw new Error("User input data not found");
      return data;
    }
  }
  
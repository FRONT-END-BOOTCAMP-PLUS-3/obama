import supabase from "@/infrastructure/databases/supabase/server";
import { IUserInputRepository } from "@/domain/repositories/profile/IUserinputRepository";
import { UserInput } from "@/domain/entities/profile/UserInput";

export class SbUserInputRepository implements IUserInputRepository {
  findAnswerByUserId(userId: string): Promise<UserInput[]> {
    throw new Error("Method not implemented.");
  }
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

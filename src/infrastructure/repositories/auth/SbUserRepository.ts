import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { toSnakeCase } from "@/utils/convertCase";
import { SupabaseClient } from "@supabase/supabase-js";

export class SbUserRepository implements IUserRepository {
  private readonly tableName = "user";

  constructor(private readonly supabase: SupabaseClient) {}

  async createUser(user: User): Promise<void> {
    const userData = toSnakeCase(user);

    const { error } = await this.supabase.from(this.tableName).insert(userData);

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from("user")
      .select("*") // 이메일뿐만 아니라 사용자 정보를 가져올 수도 있음
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // 데이터가 없을 때 발생하는 에러 (PostgREST의 'No rows found' 에러)
        return null;
      }
      console.error("Error finding email:", error.message);
      throw new Error("Database error while finding email");
    }

    return data ? data : null;
  }
}

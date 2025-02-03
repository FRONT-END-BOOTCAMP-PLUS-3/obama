import supabase from '@/infrastructure/databases/supabase/server';
import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";


export class SbUserRepository implements IUserRepository {
  private readonly tableName = "user";

  async createUser(user: User): Promise<void> {
    const client = await supabase();

    const { error } = await client.from(this.tableName).insert(user);

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const client = await supabase();
    
    const { data, error } = await client
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

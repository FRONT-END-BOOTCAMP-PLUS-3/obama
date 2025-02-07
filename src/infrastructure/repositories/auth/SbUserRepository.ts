import supabase from "@/infrastructure/databases/supabase/server";
import { User } from "@/domain/entities/user/User";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";

export class SbUserRepository implements IUserRepository {
  private readonly tableName = "user";

  // Create
  async createUser(user: User): Promise<void> {
    const client = await supabase();

    const { error } = await client.from(this.tableName).insert(user);

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
  // Read
  // 사용하지 않을 것 conflict때문에 냅두는 중
  async findByEmail(email: string): Promise<User | null> {
    const client = await supabase();

    const { data, error } = await client
      .from(this.tableName)
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
  // UUID 값으로 개인 정보 가져오기
  async findUserById(
    userId: string
  ): Promise<{ password: string; user: Omit<User, "password"> } | null> {
    const client = await supabase();

    const { data, error } = await client
      .from(this.tableName)
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // 데이터가 없을 때 발생하는 에러 (PostgREST의 'No rows found' 에러)
        return null;
      }
      console.error("Error finding password:", error.message);
      throw new Error("not complated with user");
    }
    const { password, ...user } = data;

    return { password, user };
  }
  // email을 통한 userId, password 가져오기
  async findAuthDataByEmail(email: string): Promise<{ userId: string; password: string } | null> {

    const client = await supabase();

    const { data, error } = await client
      .from(this.tableName)
      .select("user_id, password")
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // 데이터가 없을 때 발생하는 에러 (PostgREST의 'No rows found' 에러)
        return null;
      }
      console.error("Error finding password:", error.message);
      throw new Error("EMAIL_NOT_FOUND");
    }
    return { userId: data.user_id , password: data.password } ;
  }
}

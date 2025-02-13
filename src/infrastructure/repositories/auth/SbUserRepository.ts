import supabase from "@/infrastructure/databases/supabase/server";
import { User } from "@/domain/entities/user/User";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import {
  toCamelCase,
  toSnakeCase,
  toSnakeCaseString,
} from "@/utils/convert/convertToCase";
import { UserRole } from "@/types/auth";
import { UserIdRequestDto } from "@/application/usecases/auth/dtos/userIdRequestDto";

export class SbUserRepository implements IUserRepository {
  private readonly tableName = "user";

  // Create
  async createUser(user: User): Promise<void> {
    const convertUser = toSnakeCase(user);

    const client = await supabase();

    const { error } = await client.from(this.tableName).insert(convertUser);

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
  // Read
  // UserList조회
  async findAll(): Promise<Omit<User, "password">[] | null> {
    const client = await supabase();

    const { data, error } = await client.from(this.tableName).select("*");

    if (error) {
      if (error.code === "PGRST116") {
        // 데이터가 없을 때 발생하는 에러 (PostgREST의 'No rows found' 에러)
        return null;
      }
      console.error("Error finding password:", error.message);
      throw new Error("not complated with user");
    }

    // password field 제거
    const usersWithoutPassword: Omit<User, "password">[] = data;

    return toCamelCase(usersWithoutPassword);
  }

  // userId로 password 찾기
  async findPasswordById(userId: string): Promise<string | null> {
    const client = await supabase();
    const { data, error } = await client
      .from(this.tableName)
      .select("password")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;
    return toCamelCase(data.password);
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

    // password , user 정보 분리하기
    const { password, ...user } = data;

    return toCamelCase({ password, user });
  }

  // email을 통한 userId, password 가져오기
  async findAuthDataByEmail(
    email: string
  ): Promise<{ userId: string; password: string; role: UserRole } | null> {
    const client = await supabase();

    const { data, error } = await client
      .from(this.tableName)
      .select("user_id, password , role")
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
    return toCamelCase({
      userId: data.user_id,
      password: data.password,
      role: data.role,
    });
  }

  // 이메일 찾기를 통해 검색
  async findEmailByNameAndPhone(
    name: string,
    phone: string
  ): Promise<string | null> {
    const client = await supabase();
    const { data, error } = await client
      .from(this.tableName)
      .select("email")
      .eq("phone", phone)
      .eq("name", name)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // 데이터가 없을 때 발생하는 에러 (PostgREST의 'No rows found' 에러)
        return null;
      }
      console.error("Error finding email:", error.message);
      throw new Error("EMAIL_NOT_FOUND");
    }

    return toCamelCase(data.email) || null;
  }

  async findIdByNameAndPhoneAndEmailAndBirthDate(
    request: UserIdRequestDto
  ): Promise<string | null> {
    const snakedDto = toSnakeCase(request);

    if (!snakedDto) {
      // 변환 결과가 null인 경우에 대한 처리
      return null;
    }

    const client = await supabase();
    const { data, error } = await client
      .from(this.tableName)
      .select("user_id")
      .match(snakedDto)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // 데이터가 없을 때 발생하는 에러 (PostgREST의 'No rows found' 에러)
        return null;
      }
      console.error("Error finding userId:", error.message);
      throw new Error("USER_NOT_FOUND");
    }

    return toCamelCase(data.user_id);
  }

  // Delete
  async deleteById(userId: string): Promise<boolean> {

    const client = await supabase();

    const { error } = await client
      .from(this.tableName)
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("❌ 회원 삭제 실패:", error);
      return false;
    }

    return true;
  }

  //Update
  async updateUserField(
    userId: string,
    field: string,
    newValue: string
  ): Promise<boolean> {
    const snakeField = toSnakeCaseString(field);
    const client = await supabase();
    const { error } = await client
      .from(this.tableName)
      .update({ [snakeField]: newValue })
      .eq("user_id", userId);

    if (error) {
      console.error("❌ 업데이트 실패:", error);
      return false;
    }
    return true;
  }
}

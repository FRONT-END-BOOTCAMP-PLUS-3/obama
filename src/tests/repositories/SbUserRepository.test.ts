import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { createClient } from "@/utils/supabase/server";
import { v7 as uuidv7 } from "uuid";
import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "@/domain/entities/User";

describe.only("SbUserRepository (Integration Test)", () => {
  let supabase: SupabaseClient;
  let repository: SbUserRepository;
  let testUserId: string;

  beforeAll(async () => {
    // ✅ Supabase 클라이언트 생성
    supabase = await createClient();

    // ✅ Repository 인스턴스 생성
    repository = new SbUserRepository(supabase);

    // ✅ 테스트용 UUID v7 생성
    testUserId = uuidv7();

    // ✅ 혹시 남아 있을 기존 테스트 데이터를 정리
    await supabase.from("user").delete().eq("email", "test@example.com");
  });

  it("✅ createUser()가 UUID v7을 포함하여 DB에 데이터를 저장하는지 확인", async () => {
    const testUser: User = {
      userId: testUserId,
      email: "test@example.com",
      name: "Integration Test User",
      password: "hashedpassword",
      birthDate: "1990-01-01",
      phone: "1234567890",
    };

    console.log(
      "🔹 변환 전 데이터 (camelCase):",
      JSON.stringify(testUser, null, 2)
    );

    // ✅ Repository를 통해 유저 생성
    await repository.createUser(testUser);

    await new Promise((res) => setTimeout(res, 3000)); // 500ms 대기

    // ✅ Supabase에서 데이터 조회
    const { data , error } = await supabase
      .from("user") // 테이블 이름 확인
      .select("*")
      .eq("user_id", testUserId)
      .maybeSingle();

    console.log(
      "🔹 Supabase에서 조회된 데이터 (snake_case):",
      JSON.stringify(data, null, 2)
    );

    // ✅ 데이터가 정상적으로 저장되었는지 검증
    expect(data).not.toBeNull();
    expect(data!.user_id).toBe(testUserId);
    expect(data!.email).toBe(testUser.email);
    expect(data!.name).toBe(testUser.name);
    expect(data!.password).toBe(testUser.password);

    console.log("🔹 [테스트] Supabase에서 조회된 데이터 (snake_case):", JSON.stringify(data, null, 2));
    console.log("🔹 [테스트] Supabase 조회 에러:", error);
  });
  

  afterAll(async () => {
    // ✅ 테스트가 끝난 후, 생성한 테스트 데이터를 삭제
    await supabase.from("user").delete().eq("user_id", testUserId);
    console.log(`🗑 Deleted test user: ${testUserId}`);
  });
});

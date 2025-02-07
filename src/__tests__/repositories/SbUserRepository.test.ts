import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { createClient } from "@/utils/supabase/server";
import { v7 as uuidv7 } from "uuid";
import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "@/domain/entities/user/User";

describe("SbUserRepository (Integration Test)", () => {
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
    console.log("🔹 데이터 입력 완료: ", JSON.stringify(testUser, null, 2));

    const result = await repository.findByEmail(testUser.email);
    console.log("🔹 이메일 조회 결과: ", result ? "이메일 존재" : "이메일 없음");
    expect(result).toBe(true);

    const fromMock = jest.fn().mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error("Supabase error")),
    });
    
    (supabase.from as jest.Mock) = fromMock;

    // findByEmail 호출 시 오류가 발생해야 함
    await expect(repository.findByEmail("test@example.com")).rejects.toThrow("Error finding email");
  });


  afterAll(async () => {
    // ✅ 테스트가 끝난 후, 생성한 테스트 데이터를 삭제
    await supabase.from("user").delete().eq("user_id", testUserId);
    console.log(`🗑 Deleted test user: ${testUserId}`);
  });
});

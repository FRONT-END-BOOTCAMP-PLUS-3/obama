import redisClient from "@/infrastructure/databases/redis/server"; // Redis 클라이언트 경로를 맞춰주세요.

describe("Redis 연결 테스트", () => {
  const testKey = "test_key";
  const testValue = "Hello, Redis!";

  beforeAll(async () => {
    // Redis 클라이언트가 정상적으로 연결되었는지 확인
    await redisClient.set(testKey, testValue);
  });

  afterAll(async () => {
    // 테스트 종료 후 Redis 연결 해제
    await redisClient.del(testKey); // 테스트 데이터 삭제
    await redisClient.quit();
  });

  test("Redis에 값을 저장하고 가져올 수 있어야 한다", async () => {
    const value = await redisClient.get(testKey);
    expect(value).toBe(testValue);
  });

  test("Redis에서 존재하지 않는 키를 조회하면 null을 반환해야 한다", async () => {
    const value = await redisClient.get("non_existing_key");
    expect(value).toBeNull();
  });
});
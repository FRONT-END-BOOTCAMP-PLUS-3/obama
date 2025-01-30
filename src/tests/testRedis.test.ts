import redisClient, { connectRedis } from "@/utils/redis/redisClient";

describe("Redis Connection Test", () => {
  beforeAll(async () => {
    await connectRedis();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  test("Should connect to Redis Cloud", async () => {
    expect(redisClient.isOpen).toBe(true);
  });
});
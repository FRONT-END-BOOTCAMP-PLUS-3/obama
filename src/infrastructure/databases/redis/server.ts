import { serverConfig } from "@/config/serverEnv";

import Redis from "ioredis";

const redisClient = new Redis(serverConfig.REDIS_URL);

redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

export default redisClient;
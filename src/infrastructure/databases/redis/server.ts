import { config } from "@/config/env";

import Redis from "ioredis";

const redisClient = new Redis(config.REDIS_URL);

redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

export default redisClient;
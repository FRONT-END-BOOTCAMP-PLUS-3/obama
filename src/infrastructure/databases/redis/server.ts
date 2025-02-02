import { config } from "@/config/env";

import Redis from "ioredis";

const redis = new Redis(config.REDIS_URL);

export default redis;
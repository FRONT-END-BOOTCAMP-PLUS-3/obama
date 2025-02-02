import { config } from "@/config/env"
import { createClient } from "redis"

const redisClient = createClient({
    url: config.REDIS_URL,
});

redisClient.on("connect", () => console.log("connected to Redis Cloud"));
redisClient.on("error", (err)=> console.error("❌ Redis Connection Error:", err));

export const connectRedis = async() => {
    try {
        if(!redisClient.isOpen) {
            await redisClient.connect();
        }
    } catch (error) {
        console.error('❌ Redis Connection Failed:', error);
    }
};

export default redisClient;
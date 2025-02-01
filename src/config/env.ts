import dotenv from "dotenv"; // dotenv .env.local 로드
import { z } from "zod";


dotenv.config({ path: ".env.local" });


// 1) 스키마 정의
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().nonempty(),
  REDIS_URL: z.string().nonempty(),
  SMTP_HOST: z.string().nonempty(),
  SMTP_PORT: z.string().default("587").transform(Number),
  SMTP_USER_EMAIL: z.string().email(),
  SMTP_PASSWORD: z.string().nonempty(),
});

// 2) 검증
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("환경 변수 오류:", parsed.error.format());
  throw new Error("환경 변수 검증 실패!");
}

// 3) 검증된 결과 export
export const config = parsed.data;
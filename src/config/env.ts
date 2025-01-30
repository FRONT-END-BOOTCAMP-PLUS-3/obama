import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const config = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    REDIS_URL: process.env.REDIS_URL || "",
  };

  // 환경 변수 유효성 검사 (없으면 애플리케이션 실행 차단)
  const missingEnvVars: string[] = [];

  if (!config.SUPABASE_URL) {
    missingEnvVars.push("NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!config.SUPABASE_ANON_KEY) {
    missingEnvVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  if (!config.SUPABASE_SERVICE_ROLE_KEY) {
    missingEnvVars.push("SUPABASE_SERVICE_ROLE_KEY");
  }
  if (!config.REDIS_URL) {
    missingEnvVars.push("REDIS_URL");
  }
  
  // 필수 환경 변수가 없을 경우 서버 실행을 중단
  if (missingEnvVars.length > 0) {
    console.error(`❌ Missing environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1); // Node.js 프로세스를 강제 종료
  }
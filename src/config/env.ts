import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

interface Config {
  
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    REDIS_URL: string
    SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER_EMAIL: string;
  SMTP_PASSWORD: string;
}

export const config : Config= {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",

    REDIS_URL: process.env.REDIS_URL || "",

    SMTP_HOST: process.env.SMTP_HOST || '',
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
    SMTP_USER_EMAIL: process.env.SMTP_USER_EMAIL || '',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || ''


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

  if (!config.SMTP_HOST) {
    missingEnvVars.push('SMTP_HOST');
  }
  if (!config.SMTP_PORT) {
    missingEnvVars.push('SMTP_PORT');
  }
  if (!config.SMTP_USER_EMAIL) {
    missingEnvVars.push('SMTP_USER_EMAIL');
  }
  if (!config.SMTP_PASSWORD) {
    missingEnvVars.push('SMTP_PASSWORD');
  }
  
  // 필수 환경 변수가 없을 경우 서버 실행을 중단
  if (missingEnvVars.length > 0) {
    console.error(`❌ Missing environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1); // Node.js 프로세스를 강제 종료
  }
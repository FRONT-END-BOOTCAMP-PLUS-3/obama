import { clientConfig } from "@/config/clientEnv";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

let supabaseClientSingleton: ReturnType<typeof createSupabaseClient> | null =
  null;

export default async function supabase() {
  // 브라우저(클라이언트) 환경: window 객체가 존재합니다.
  if (typeof window !== "undefined") {
    if (!supabaseClientSingleton) {
      supabaseClientSingleton = createSupabaseClient(
        clientConfig.NEXT_PUBLIC_SUPABASE_URL,
        clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    }
    return supabaseClientSingleton;
  }

  // 일반 서버 사이드 환경: Next.js의 cookies() API를 사용해 쿠키 기반 서버 클라이언트를 생성합니다.
  const cookieStore = await cookies();
  return createServerClient(
    clientConfig.NEXT_PUBLIC_SUPABASE_URL,
    clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // 요청에 포함된 모든 쿠키를 가져옵니다.
        getAll: () => cookieStore.getAll(),
        // 쿠키를 설정합니다.
        setAll: async (cookiesToSet) => {
          await Promise.all(
            cookiesToSet.map(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          );
        },
      },
    }
  );
}

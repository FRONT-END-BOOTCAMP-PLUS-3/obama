import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";

let supabaseClientSingleton: ReturnType<typeof createSupabaseClient> | null =
  null;

export default async function supabase() {
  // 브라우저(클라이언트) 환경: window 객체가 존재합니다.
  if (typeof window !== "undefined") {
    if (!supabaseClientSingleton) {
      if (process.env.NODE_ENV === "test") {
        console.log(
          "⚠️ Running in test mode (client side): Using mock Supabase client."
        );
        supabaseClientSingleton = createSupabaseClient(
          clientConfig.NEXT_PUBLIC_SUPABASE_URL,
          serverConfig.SUPABASE_SERVICE_ROLE_KEY
        );
      } else {
        supabaseClientSingleton = createSupabaseClient(
          clientConfig.NEXT_PUBLIC_SUPABASE_URL,
          clientConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
      }
    }
    return supabaseClientSingleton;
  }

  // 서버 사이드 환경: window가 없으므로, 각 요청마다 새로운 인스턴스를 생성합니다.
  if (process.env.NODE_ENV === "test") {
    console.log(
      "⚠️ Running in test mode (server side): Using mock Supabase client."
    );
    return createSupabaseClient(
      clientConfig.NEXT_PUBLIC_SUPABASE_URL,
      serverConfig.SUPABASE_SERVICE_ROLE_KEY
    );
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

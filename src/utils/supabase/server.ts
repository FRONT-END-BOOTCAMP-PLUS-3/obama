import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createClient() {
  if (typeof window !== "undefined") {
    // 클라이언트 환경에서는 일반 Supabase 클라이언트 생성
    return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // 서버 환경에서만 next/headers 사용
  const { cookies } = require("next/headers"); // ✅ 서버 환경에서만 동적 import

  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: async (cookiesToSet) => {
        await Promise.all(
          cookiesToSet.map(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        );
      },
    },
  });
}

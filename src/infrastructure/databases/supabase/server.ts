import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function createClient() {
  if (typeof window !== "undefined") {
    // ✅ 클라이언트 환경 (CSR)에서는 Anon Key를 사용
    return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // ✅ 서버 환경 (SSR)에서는 Service Role Key 사용 (보안 필요)
  // const cookieStore = cookies();
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

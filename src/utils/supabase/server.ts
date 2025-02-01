import { config } from "@/config/env";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";



export async function createClient() {
  if (process.env.NODE_ENV === "test") {
    console.log("⚠️ Running in test mode: Using mock Supabase client.");
    return createSupabaseClient(config.NEXT_PUBLIC_SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);
  }

  const cookieStore = await cookies();
  return createServerClient(config.NEXT_PUBLIC_SUPABASE_URL, config.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
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

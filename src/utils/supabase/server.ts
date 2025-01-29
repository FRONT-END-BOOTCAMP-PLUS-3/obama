import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createClient() {
  if (process.env.NODE_ENV === "test") {
    console.log("⚠️ Running in test mode: Using mock Supabase client.");
    return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  const cookieStore = await cookies();
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

import { serverConfig } from "@/config/serverEnv";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: serverConfig.KAKAO_CLIENT_KEY,
      clientSecret: serverConfig.KAKAO_CLIENT_SECRET || "",
    }),
  ],

  secret: serverConfig.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ baseUrl }: { baseUrl:string}) {
      return baseUrl; // ✅ 로그인 후 홈으로 이동
    },
  },
};

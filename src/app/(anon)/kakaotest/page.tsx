"use client"
import {signIn} from "next-auth/react";
const kakaotest = () => {
    return(
        <div>
            <button onClick={() => signIn("kakao")}>카카오 로그인</button>
        </div>
    );
}
export default kakaotest;
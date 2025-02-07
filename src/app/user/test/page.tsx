"use client";

import { useState } from "react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setResponse(null);

    const data = {
      category_id: 1, // 🔹 INT (숫자)
      answer: "재연 테스트", // 🔹 TEXT (문자열)
      user_id: "1d1867cd-526c-4de5-97e4-4a0c8f386f78", // 🔹 UUID (문자열)
    };

    console.log("🚀 Sending Data:", data);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("📥 Response:", result);

      if (!res.ok) {
        throw new Error(result.error || "데이터 저장 실패");
      }

      setResponse(`저장 성공! ID: ${result.userInput_id}`);
    } catch (error) {
      setResponse(`에러 발생: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Input 저장 테스트</h1>
      <button
        onClick={handleSave}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        {loading ? "저장 중..." : "데이터 저장"}
      </button>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}

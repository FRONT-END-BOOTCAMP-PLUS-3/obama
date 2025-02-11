export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" |"PATCH";

interface FetchOptions<T> {
  method?: FetchMethod;
  body?: T;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  queryParams?: Record<string, string | number | boolean>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";


export const fetchClient = async <TRequest = undefined, TResponse= unknown>(
  endpoint: string,
  { method = "GET", body, headers = {}, requiresAuth = true, queryParams }: FetchOptions<TRequest> = {}
): Promise<{ status: number; data?: TResponse; error?: string }> => {
  let url = `${API_BASE_URL}${endpoint}`;
  
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // ✅ `requiresAuth`가 true일 경우 `userId`(UUID)를 자동으로 추가
  if (requiresAuth) {
    const userId = localStorage.getItem("userId");
    if (userId) {
      requestHeaders["Authorization"] = `UUID ${userId}`;
    }
  }

  // ✅ GET 요청에 Query Parameters 추가
  if (queryParams && method === "GET") {
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {})
    ).toString();
    url += `?${queryString}`;
  }

  const options: RequestInit = {
    method,
    headers: requestHeaders,
    body: body && method !== "GET" ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);

    // ✅ 204 No Content 처리 (응답이 없을 경우 `null` 반환)
    if (response.status === 204) {
      return { status: response.status, data: undefined };
    }

    const data: TResponse = await response.json(); // ✅ 응답 데이터의 타입을 `TResponse`로 강제 변환

    if (!response.ok) {
      return { status: response.status, error: (data as Record<string, string>)?.error || "API 요청 실패" };
    }

    return { status: response.status, data };
  } catch (error) {
    console.error(`❌ API 요청 실패 (${method} ${url}):`, error);
    return { status: 500, error: "서버 오류 발생" };
  }
};

import axios from "axios";

const apiClient = axios.create({
    baseURL:  "",
    headers: {
        "Content-Type": "application/json",
      },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("❌ API 오류 발생:", error.response?.data?.error || error.message);
      return Promise.reject(error);
    }
  );

export default apiClient;

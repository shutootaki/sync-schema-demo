import { UserCreateRequest, UserResponse } from "@/lib/api/schema/api_schemas";
import { z } from "zod";

const API_BASE_URL = "http://localhost:8000";

async function apiCall<T>(
  path: string,
  options: RequestInit,
  responseSchema: z.ZodType<T>
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return responseSchema.parse(data);
}

export const userApi = {
  async create(
    userData: z.infer<typeof UserCreateRequest>
  ): Promise<z.infer<typeof UserResponse>> {
    const validatedData = UserCreateRequest.parse(userData);
    return apiCall(
      "/api/v1/users",
      {
        method: "POST",
        body: JSON.stringify(validatedData),
      },
      UserResponse
    );
  },

  async getById(userId: number): Promise<z.infer<typeof UserResponse>> {
    return apiCall(`/api/v1/users/${userId}`, { method: "GET" }, UserResponse);
  },
} as const;

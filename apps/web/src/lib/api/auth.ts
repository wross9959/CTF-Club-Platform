import { apiFetch } from "@/lib/fetcher";

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export async function getMe(): Promise<User | null> {
  try {
    const res = await apiFetch<{ user: User }>("/api/auth/me", {
      credentials: "include",
    });
    return res.user;
  } catch {
    return null;
  }
}
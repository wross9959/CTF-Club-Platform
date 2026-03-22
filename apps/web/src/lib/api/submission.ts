import { apiFetch } from "@/lib/fetcher";
import type { SubmitFlagResponse } from "@/types/submission";

export async function submitFlag(
  slug: string,
  flag: string
): Promise<SubmitFlagResponse> {
  return apiFetch<SubmitFlagResponse>(`/api/challenges/${slug}/submit`, {
    method: "POST",
    body: JSON.stringify({ flag }),
  });
}
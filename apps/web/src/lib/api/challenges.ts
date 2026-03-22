import { apiFetch } from "@/lib/fetcher";
import type { Challenge } from "@/types/challenge";

export async function getChallenges(): Promise<Challenge[]> {
  try {
    return await apiFetch<Challenge[]>("/api/challenges");
  } catch (error) {
    console.error("Failed to fetch challenges:", error);
    return []
  }
}


export async function getChallengeBySlug(slug: string): Promise<Challenge | null> {
  try {
    return await apiFetch<Challenge>(`/api/challenges/${slug}`);
  } catch (error) {
    console.error("Failed to fetch challenge:", error);
    return null;
  }
}
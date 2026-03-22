import { apiFetch } from "@/lib/fetcher";
import type { HealthResponse, PublicPlatformConfig } from "@/types/platform";

export async function getHealth(): Promise<HealthResponse | null> {
    try {
        return await apiFetch<HealthResponse>("/api/health");
    }
    catch (error) {
        console.error("Failed to fetch health:", error);
        return null;
    }
}

export async function getPublicConfig(): Promise<PublicPlatformConfig | null> {
    try {
        return await apiFetch<PublicPlatformConfig>("/api/public/config");
    }
    catch (error) {
        console.error("Failed to fetch public config:", error);
        return null;
    }
}



export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
     });

     if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText}`);

     return res.json() as Promise<T>;
    
}
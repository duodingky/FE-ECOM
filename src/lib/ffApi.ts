export type FfCategory = Record<string, unknown> & {
  id?: string | number;
  slug?: string;
  name?: string;
};

function getFfApiBaseUrl(): string {
  const raw =
    process.env.FF_API_BASE_URL ??
    process.env.NEXT_PUBLIC_FF_API_BASE_URL ??
    "http://localhost:81";
  return raw.replace(/\/+$/, "");
}

async function fetchFfApi<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number } },
): Promise<T> {
  const base = getFfApiBaseUrl();
  const url = new URL(path, `${base}/`);

  const res = await fetch(url, {
    ...init,
    headers: {
      accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `FF API request failed: ${res.status} ${res.statusText} (${url.toString()})${body ? ` - ${body}` : ""}`,
    );
  }

  return (await res.json()) as T;
}

/**
 * Fetch "top categories" from the FF API.
 *
 * Endpoint: GET /categories/
 *
 * Usage (Server Component):
 *   const categories = await getTopCategories();
 */
export async function getTopCategories(options?: {
  revalidate?: number;
  signal?: AbortSignal;
}): Promise<FfCategory[]> {
  return fetchFfApi<FfCategory[]>("/categories/", {
    next: { revalidate: options?.revalidate ?? 60 },
    signal: options?.signal,
  });
}


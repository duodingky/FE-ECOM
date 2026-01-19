
type APiResponse =  Record<string, unknown> & {
  data: [];
  meta: object;
}
function getAapiBaseUrl(): string {
  const raw =
    process.env.API_BASE_URL ??
    "http://localhost:81";
  return raw.replace(/\/+$/, "");
}

export async function fetchApi<T>(
  path: string,
  baseUrl?: string,
  hasAuth: boolean = true
): Promise<APiResponse> {
  const base = baseUrl ?? getAapiBaseUrl();
  const url = new URL(path, `${base}/`);
  // Define headers type
  const headers: Record<string, string> = {
    accept: "application/json",
  };

  if (hasAuth) {
    headers["Authorization"] = `Bearer ${process.env.API_TOKEN}`;
  }

  const res = await fetch(url, {
    headers
  });

  console.log('API Request URL:', url.toString(),headers);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `API request failed: ${res.status} ${res.statusText} (${url.toString()})${body ? ` - ${body}` : ""}`,
    );
  }
  return await res.json() as  APiResponse;
}
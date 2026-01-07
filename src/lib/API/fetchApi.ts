
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
): Promise<APiResponse> {
  const base = getAapiBaseUrl();
  const url = new URL(path, `${base}/`);

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: 'Bearer ' + process.env.API_TOKEN,

    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `FF API request failed: ${res.status} ${res.statusText} (${url.toString()})${body ? ` - ${body}` : ""}`,
    );
  }
  return await res.json() as APiResponse;
}
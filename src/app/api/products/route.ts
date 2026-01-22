type ProductsByIdPayload = {
  ids?: Array<string | number>;
  id?: Array<string | number>;
  ID?: Array<string | number>;
};

function getApiBaseUrl(): string {
  const raw = process.env.API_BASE_URL ?? "http://localhost:81";
  return raw.replace(/\/+$/, "");
}

function normalizeIds(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const ids = value
    .map((entry) => {
      if (typeof entry === "string" || typeof entry === "number") {
        return String(entry);
      }
      return "";
    })
    .map((entry) => entry.trim())
    .filter(Boolean);

  return ids.length > 0 ? ids : null;
}

export async function POST(request: Request) {
  let payload: ProductsByIdPayload;

  try {
    payload = (await request.json()) as ProductsByIdPayload;
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body.", details: error },
      { status: 400 },
    );
  }

  const ids =
    normalizeIds(payload.ids) ??
    normalizeIds(payload.id) ??
    normalizeIds(payload.ID);

  if (!ids) {
    return Response.json(
      { error: "ids must be a non-empty array." },
      { status: 400 },
    );
  }

  const base = getApiBaseUrl();
  const url = new URL("/products", `${base}/`);
  const headers: Record<string, string> = {
    accept: "application/json",
    "content-type": "application/json",
  };

  if (process.env.API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.API_TOKEN}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return Response.json(
      {
        error: "Upstream request failed.",
        status: res.status,
        details: body || res.statusText,
      },
      { status: res.status },
    );
  }

  const result = await res.json();
  return Response.json(result.data ?? result, { status: res.status });
}

import { fetchApiPost } from "@/lib/API/fetchApi";


type ProductSearchPayload = {
  q?: string;
  category?: string[];
  brand?: string[];
  ids?: string[];
};

function getApiBaseUrl(): string {
  const raw = process.env.API_BASE_URL ?? "http://localhost:81";
  return raw.replace(/\/+$/, "");
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export async function POST(request: Request) {
  let payload: ProductSearchPayload;

  try {
    payload = (await request.json()) as ProductSearchPayload;
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body.", details: error },
      { status: 400 },
    );
  }

  const { q, category, brand, ids } = payload ?? {};

  const base = getApiBaseUrl();
  const url = new URL("/products/search", `${base}/`);
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
    body: JSON.stringify({ q, category, brand, ids }),
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
  return Response.json(result.data, { status: res.status });
}

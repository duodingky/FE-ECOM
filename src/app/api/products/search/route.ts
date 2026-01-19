type ProductSearchPayload = {
  q?: string;
  category?: string[];
  brand?: string[];
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

  const { q, category, brand } = payload ?? {};

  if (q !== undefined && typeof q !== "string") {
    return Response.json({ error: "q must be a string." }, { status: 400 });
  }

  if (category !== undefined && !isStringArray(category)) {
    return Response.json(
      { error: "category must be an array of strings." },
      { status: 400 },
    );
  }

  if (brand !== undefined && !isStringArray(brand)) {
    return Response.json(
      { error: "brand must be an array of strings." },
      { status: 400 },
    );
  }

  const hasQuery = typeof q === "string" && q.trim().length > 0;
  const hasCategory = Array.isArray(category) && category.length > 0;
  const hasBrand = Array.isArray(brand) && brand.length > 0;

  if (!hasQuery && !hasCategory && !hasBrand) {
    return Response.json(
      { error: "At least one of q, category, or brand is required." },
      { status: 400 },
    );
  }

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
    body: JSON.stringify({ q, category, brand }),
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

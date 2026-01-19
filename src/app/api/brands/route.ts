import { fetchApi } from "@/lib/API/fetchApi";

export async function GET() {
  try {
    const result = await fetchApi("/brands");
    return Response.json(result.data, { status: 200 });
  } catch (error) {
    return Response.json({  error  }, { status: 500 });
  }
}

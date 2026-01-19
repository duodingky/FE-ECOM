import { fetchApiGet } from "@/lib/API/fetchApi";

export async function GET() {
  try {
    const result = await fetchApiGet("/brands");
    return Response.json(result.data, { status: 200 });
  } catch (error) {
    return Response.json({  error  }, { status: 500 });
  }
}

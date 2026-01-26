 
 import { fetchApiGet } from "@/lib/API/fetchApi";
 import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await context.params;


   try {
      const result = await fetchApiGet("/order/" + orderId, 'http://localhost:8080');
      return NextResponse.json(result.data, { status: 200 });
   } catch (error) {
     return Response.json({  error:error  }, { status: 500 });
   }
 
}

import { NextResponse } from "next/server";
import { fetchApiPost } from "@/lib/API/fetchApi";

export async function POST(
  request: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await context.params;
  const body = await request.json();
   const orderBody={
      "orderItems": [body.items]
   }
      try {
         const result = await fetchApiPost("/order/addItem/" + orderId, orderBody, 'http://localhost:8080');
         return NextResponse.json(result.data, { status: 200 });
      } catch (error) {
        console.error('Error adding item to order:', error);
        return Response.json({  error:error  }, { status: 500 });
      }
}

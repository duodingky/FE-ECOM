import { NextResponse } from "next/server";
import { fetchApiPost } from "@/lib/API/fetchApi";

export async function POST(request: Request ) {
  const body = await request.json();
  const orderBody={
      "orderItems": [body.items]
   }
      try {
         const result = await fetchApiPost("/order/createOrder", orderBody, 'http://localhost:8080');
         console.log("payload:", orderBody);
         return NextResponse.json(result.data, { status: 200 });
      } catch (error) {
        console.error('Error adding item to order:', error);
        return Response.json({  error:error  }, { status: 500 });
      }
}


  

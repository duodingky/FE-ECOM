import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await context.params;

  const body = await request.json();

  return NextResponse.json({
    message: `Order ${orderId} received`,
    data: body,
  });
}

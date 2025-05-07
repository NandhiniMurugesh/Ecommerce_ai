
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const orderId = Number(context.params.id);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const body = await req.json();
    const status = body.status;

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('PUT /api/admin/orders/[id] failed:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

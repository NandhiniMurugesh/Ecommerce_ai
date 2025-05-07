import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Context = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest, context: Context) {
  const { id } = context.params;
  const orderId = parseInt(id, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
  }

  const { status } = await req.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Failed to update order status:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

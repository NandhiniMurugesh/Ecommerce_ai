// app/api/orders/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];  // Add your valid statuses

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json();

  // Validate status
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
  }

  try {
    const updated = await prisma.order.update({
      where: { id: parseInt(params.id) },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('Error updating order status:', err);  // Log the error for debugging
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

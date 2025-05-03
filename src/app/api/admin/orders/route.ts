// app/api/admin/orders/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      products: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(orders);
}

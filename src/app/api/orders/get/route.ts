import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { userId: clerkId } = getAuth(request);

    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        products: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

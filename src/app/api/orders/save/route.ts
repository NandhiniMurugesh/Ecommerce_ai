import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';


export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses || !user.emailAddresses[0]?.emailAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { totalPrice, productIds } = await req.json();
    const email = user.emailAddresses[0].emailAddress;

    // Check or create user
    let dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email,
          name: user.firstName || '',
          password: 'temp', // Add logic if needed
        },
      });
    }

    // Create Order
    const order = await prisma.order.create({
      data: {
        userId: dbUser.id,
        totalPrice,
        products: {
          connect: productIds.map((id: number) => ({ id })),
        },
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('❌ Error saving order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

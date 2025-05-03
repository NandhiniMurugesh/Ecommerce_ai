import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // make sure you have prisma client setup

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } =await params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

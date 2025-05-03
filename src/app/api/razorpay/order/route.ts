import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json(); // Getting amount from the request

    // Check if the amount is valid
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Initialize Razorpay with your credentials
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount, // Converting to paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: 'receipt_order_123',
    };

    // Create Razorpay order
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('❌ Razorpay Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// /api/sms/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { phone, message } = await req.json();

  const apiKey = process.env.FAST2SMS_API_KEY;
  const url = `https://www.fast2sms.com/dev/bulkV2`;

  const payload = {
    route: 'q', // 'q' for transactional, 'p' for promotional
    message: message,
    language: 'english',
    flash: 0,
    numbers: phone,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: apiKey!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log('✅ SMS API Response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ SMS sending failed:', error);
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}

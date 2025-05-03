// /app/api/email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      to='udayatamil3@gmail.com',
      subject,
      orderId,
      paymentId,
      amount,
      customerName,
      deliveryAddress,
      products,
    } = await req.json();

    // ✅ Validate required fields
    if (!to || !subject || !orderId || !paymentId || !amount || !customerName || !deliveryAddress || !products) {
      console.error('❌ Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('📧 Sending email to:', to);

    // ✅ Build HTML email
    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;">
        <h2 style="color:#4CAF50;">🧾 Order Confirmation</h2>
        <p>Hello <strong>${customerName}</strong>,</p>
        <p>Thank you for shopping with <strong>My Shop</strong>! Your order has been confirmed.</p>

        <h3>📦 Order Summary:</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:15px;">
          <tr><td><strong>🆔 Order ID:</strong></td><td>${orderId}</td></tr>
          <tr><td><strong>💳 Payment ID:</strong></td><td>${paymentId}</td></tr>
          <tr><td><strong>🛒 Products:</strong></td><td>${products}</td></tr>
          <tr><td><strong>💰 Amount Paid:</strong></td><td>₹${amount}</td></tr>
        </table>

        <h3>🚚 Delivery Details:</h3>
        <p><strong>Name:</strong> ${customerName}<br/><strong>Address:</strong><br/>${deliveryAddress}</p>

        <p>We’ll notify you once your order is shipped. If you have any questions, feel free to reply to this email.</p>
        <p style="margin-top:30px;">With ❤️,<br><strong>Team Ecom-AI</strong></p>
        <hr/>
        <small>This is an automated email. Please do not reply.</small>
      </div>
    `;

    // ✅ Send the email
    const data = await resend.emails.send({
      from: 'My Shop <onboarding@resend.dev>', // change to your verified email if needed
      to,
      subject,
      html,
    });

    console.log('✅ Email sent:', data);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('❌ Email Error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

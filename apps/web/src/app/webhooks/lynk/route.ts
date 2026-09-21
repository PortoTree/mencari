import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

export async function GET(request: NextRequest) {
  // Untuk meloloskan tombol "Test URL" Lynk.id jika mengirim GET
  return NextResponse.json({ message: 'Webhook endpoint is active (Next.js)' });
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-lynk-signature');
    
    // Ambil JSON body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      body = {};
    }

    const { refId, grandTotal, message_id } = body || {};

    // Gunakan environment variable jika ada, atau fallback
    const secretKey = process.env.LYNK_MERCHANT_KEY || 'HqBVUqeCu_DY5d6DTiZ0oP07PTm5B23D';

    console.log('--- Lynk.id Webhook Received (Next.js) ---');
    console.log('Payload:', body);
    console.log('X-Lynk-Signature:', signature);

    if (!signature) {
      console.warn('Warning: Missing signature. Test URL expected.');
      return NextResponse.json({ message: 'Test URL received (No Signature)' });
    }

    const amountStr = String(grandTotal || '');
    const refIdStr = String(refId || '');
    const messageIdStr = String(message_id || '');

    const signatureString = amountStr + refIdStr + messageIdStr + secretKey;
    const calculatedSignature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');

    if (calculatedSignature !== signature) {
      console.error('Invalid Lynk.id signature');
      return NextResponse.json({ message: 'Invalid Signature' }, { status: 401 });
    }

    console.log('Lynk.id webhook validated successfully!');
    
    // NOTE: Process the webhook logic here (update database)

    return NextResponse.json({ message: 'Webhook received and processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

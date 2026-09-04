import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/config/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      parentName,
      parentPhone,
      parentEmail,
      children,
      childName,
      childAge,
      program,
      preferredCampus,
      agreeUpdates,
      amount,
      discountAmount,
      rawSubtotal,
      promoCode,
      paymentMethod,
      paymentStatus,
      paymentReference,
    } = body;

    // Basic server-side validation
    if (!parentName || !parentPhone || !parentEmail) {
      return NextResponse.json(
        { error: 'Missing required registration fields' },
        { status: 400 }
      );
    }

    // Forward to Express backend
    const backendRes = await fetch(`${API_BASE_URL}/api/builder-academy-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!backendRes.ok) {
      const errText = await backendRes.text();
      console.error('[builder-academy-register] Backend error:', errText);
      return NextResponse.json(
        { error: 'Failed to save registration. Please try again.' },
        { status: 500 }
      );
    }

    const data = await backendRes.json();

    return NextResponse.json(
      {
        message: 'Builder Academy registration received successfully',
        data: data.data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('API /api/builder-academy-register error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing registration' },
      { status: 500 }
    );
  }
}

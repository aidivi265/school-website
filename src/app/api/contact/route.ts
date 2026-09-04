import { NextResponse } from 'next/server';
import { submitContactMessage } from '@/lib/supabase/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name, email, and message.' },
        { status: 400 }
      );
    }

    const result = await submitContactMessage({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Query',
      message,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact message.' },
      { status: 500 }
    );
  }
}

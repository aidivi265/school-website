import { NextResponse } from 'next/server';
import { createContactMessage } from '@/lib/supabase/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide all required fields (Name, Email, Message).',
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address.',
        },
        { status: 400 }
      );
    }

    const result = await createContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      subject: subject?.trim() || 'General Query',
      message: message.trim(),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit contact message. Please try again or call the school office.',
      },
      { status: 500 }
    );
  }
}

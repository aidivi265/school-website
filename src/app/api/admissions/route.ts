import { NextResponse } from 'next/server';
import { createAdmissionEnquiry } from '@/lib/supabase/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      parent_name,
      student_name,
      class_applying,
      phone,
      email,
      date_of_birth,
      address,
      message,
    } = body;

    // Required fields check
    if (!parent_name?.trim() || !student_name?.trim() || !class_applying?.trim() || !phone?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please fill in all mandatory fields (Parent Name, Student Name, Class, Phone).',
        },
        { status: 400 }
      );
    }

    // Phone validation (at least 10 digits)
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a valid 10-digit mobile number.',
        },
        { status: 400 }
      );
    }

    // Email validation (if provided)
    if (email && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          {
            success: false,
            message: 'Please provide a valid email address format.',
          },
          { status: 400 }
        );
      }
    }

    const result = await createAdmissionEnquiry({
      parent_name: parent_name.trim(),
      student_name: student_name.trim(),
      class_applying: class_applying.trim(),
      phone: cleanPhone,
      email: email?.trim() || undefined,
      date_of_birth: date_of_birth || undefined,
      address: address?.trim() || undefined,
      message: message?.trim() || undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Admission API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while processing your admission enquiry.',
      },
      { status: 500 }
    );
  }
}

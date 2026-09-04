import { NextResponse } from 'next/server';
import { submitAdmissionEnquiry } from '@/lib/supabase/service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { parent_name, student_name, class_applying, phone, email, date_of_birth, address, message } = body;

    if (!parent_name || !student_name || !class_applying || !phone) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields (Parent name, Student name, Class, Phone).' },
        { status: 400 }
      );
    }

    const result = await submitAdmissionEnquiry({
      parent_name,
      student_name,
      class_applying,
      phone,
      email: email || '',
      date_of_birth: date_of_birth || null,
      address: address || '',
      message: message || '',
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while saving enquiry.' },
      { status: 500 }
    );
  }
}

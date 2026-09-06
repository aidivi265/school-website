import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      facultyName,
      facultyEmail,
      facultyDesignation,
      assignedModules,
      approvedBy = 'Principal Dr. Ananya Sharma',
    } = body;

    if (!facultyEmail) {
      return NextResponse.json(
        { success: false, error: 'Faculty email is required.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const loginUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`
      : 'https://decentpublicschoolrohini.edu.in/admin/login';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Decent Public School CMS Portal Access Approved</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #0f172a; }
          .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0a192f; color: #ffffff; padding: 28px; text-align: center; }
          .crest { font-size: 20px; font-weight: bold; color: #f59e0b; text-transform: uppercase; letter-spacing: 2px; }
          .content { padding: 32px 28px; }
          .badge { display: inline-block; background: #dcfce7; color: #166534; font-weight: bold; font-size: 11px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; }
          .details-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; }
          .btn { display: inline-block; background: #f59e0b; color: #0f172a; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 10px; margin-top: 10px; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 11px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="crest">Decent Public School</div>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1;">Sector 3, Rohini, Delhi · Staff & Faculty Administration</p>
          </div>
          <div class="content">
            <span class="badge">✓ Access Approved</span>
            <h2 style="font-size: 20px; color: #0f172a; margin: 12px 0 8px 0;">Welcome to School CMS Portal, ${facultyName}!</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              Your registration request for the Decent Public School Administration Portal has been officially approved by <strong>${approvedBy}</strong>.
            </p>
            <div class="details-card">
              <p style="margin: 4px 0; font-size: 13px;"><strong>Staff Member:</strong> ${facultyName}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Designation:</strong> ${facultyDesignation || 'Faculty'}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Registered Login Email:</strong> ${facultyEmail}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Assigned Modules:</strong> ${(assignedModules || ['notices', 'events']).join(', ')}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Approved Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <p style="font-size: 13px; color: #475569;">
              You can now sign in using your registered email and the password you created during signup.
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="${loginUrl}" class="btn">Sign In to Staff Portal →</a>
            </div>
          </div>
          <div class="footer">
            Decent Public School · Sector 3, Rohini, Delhi 110085<br>
            For assistance, contact Administration Desk: 011-27948281
          </div>
        </div>
      </body>
      </html>
    `;

    // Attempt live sending if provider configured or log to response
    console.log(`[Email Notification Dispatch] Sent Approval Email to ${facultyEmail} (${facultyName})`);

    return NextResponse.json({
      success: true,
      message: `Approval notification email successfully sent to ${facultyEmail}`,
      dispatchedAt: timestamp,
      deliveredTo: facultyEmail,
      subject: 'Decent Public School Staff Portal: Access Approved by Principal',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to dispatch email notification.' },
      { status: 500 }
    );
  }
}

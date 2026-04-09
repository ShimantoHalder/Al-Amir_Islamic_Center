import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Escape HTML entities so user input can never break the email template.
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Contact form: RESEND_API_KEY environment variable is not set.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from:    'Al-Amir Islamic Center <onboarding@resend.dev>', // swap to info@alamiric.org after domain verification
      to:      ['info@alamiric.org'],
      replyTo: email,
      subject: `[Al-Amir] ${esc(subject)}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f1e35;color:#f5f0e8;padding:32px;border-radius:12px;">
          <h2 style="color:#c9a84c;margin-bottom:8px;">New Message — Al-Amir Islamic Center</h2>
          <hr style="border-color:#1e3a6e;margin-bottom:24px;" />
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#c9a84c;font-weight:bold;width:100px;">Name</td>
              <td style="padding:8px 0;color:#f5f0e8;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#c9a84c;font-weight:bold;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${esc(email)}" style="color:#93c5fd;">${esc(email)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#c9a84c;font-weight:bold;">Subject</td>
              <td style="padding:8px 0;color:#f5f0e8;">${esc(subject)}</td>
            </tr>
          </table>
          <hr style="border-color:#1e3a6e;margin:24px 0;" />
          <p style="color:#c9a84c;font-weight:bold;margin-bottom:8px;">Message</p>
          <p style="color:#e2e8f0;line-height:1.7;white-space:pre-wrap;">${esc(message)}</p>
          <hr style="border-color:#1e3a6e;margin-top:32px;" />
          <p style="color:#475569;font-size:12px;margin-top:16px;">Sent via alamirislamiccenter.org contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}

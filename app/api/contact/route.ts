import { NextRequest, NextResponse } from 'next/server';

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

    const accessKey = process.env.WEB3FORMS_KEY;
    if (!accessKey) {
      console.error('Contact form: WEB3FORMS_KEY environment variable is not set.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject:    `[Al-Amir] ${esc(subject)}`,
        from_name:  esc(name),
        email:      email,       // Web3Forms uses this as Reply-To
        message:    esc(message),
        botcheck:   '',          // honeypot — must be empty
      }),
    });

    const data = await res.json();

    if (!data.success) {
      console.error('Web3Forms error:', data);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}

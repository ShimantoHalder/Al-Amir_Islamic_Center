'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SectionContainer, SectionHeader } from '@/app/components/ui';
import { useScrollReveal } from '@/app/hooks';

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

type Status = 'idle' | 'loading' | 'success' | 'error';

const subjects = [
  'General Inquiry',
  'Prayer Times',
  "Jumu'ah / Friday Prayer",
  'Islamic Education',
  'Community Events',
  'Zakat / Donation',
  'New Muslim Support',
  'Other',
];

const contactDetails = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Al-Amir Islamic Center\n5045 Soutel Dr Unit 38\nJacksonville, FL 32208',
    sub: '',
    accent: false,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (305) 000-0000',
    href: 'tel:+13050000000',
    accent: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@alamirislamiccenter.org',
    href: 'mailto:info@alamirislamiccenter.org',
    accent: false,
  },
  {
    icon: Clock,
    label: "Jumu'ah Prayer",
    value: 'Every Friday',
    sub: 'Khutbah: 1:00 PM · Iqamah: 1:15 PM',
    accent: true,
  },
];

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const { ref, visible }    = useScrollReveal();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Al-Amir] ${form.subject}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <SectionContainer id="contact" py="large" bg="dark">

      {/* Centered section title — same pattern as every other section */}
      <SectionHeader
        icon="✉️"
        title={<>Get in <span className="text-accent">Touch</span></>}
        description="Have questions or want to connect with our community? We'd love to hear from you."
      />

      {/* Two-column layout: form (left 3/5) + contact info (right 2/5) */}
      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''} grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start`}
      >

        {/* ── LEFT: Contact Form ── */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-accent/15 bg-gradient-to-br from-blue-950/35 to-black/35 backdrop-blur-md p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >

            {/* Row 1 — Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <label className="text-accent text-xs font-bold uppercase tracking-widest">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="form-input"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-accent text-xs font-bold uppercase tracking-widest">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="form-input"
                />
              </div>
            </div>

            {/* Row 2 — Subject */}
            <div className="flex flex-col gap-2 mb-5">
              <label className="text-accent text-xs font-bold uppercase tracking-widest">
                Subject <span className="text-red-400">*</span>
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="form-input"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(201,168,76,0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  backgroundSize: '18px',
                  paddingRight: '44px',
                  appearance: 'none',
                }}
              >
                <option value="" disabled>Select a subject…</option>
                {subjects.map((s) => (
                  <option key={s} value={s} style={{ background: '#0f1e35', color: '#f5f0e8' }}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 3 — Message */}
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-accent text-xs font-bold uppercase tracking-widest">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Share your message, question, or salaam…"
                rows={5}
                className="form-input"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="form-submit-btn"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            {/* Status banners */}
            {status === 'success' && (
              <div className="flex items-start gap-3 mt-5 p-4 sm:p-5 bg-green-950/30 border border-green-700/30 rounded-xl toast-in">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-green-300 font-semibold text-sm">Message sent!</div>
                  <div className="text-green-500 text-xs mt-1">JazakAllahu Khayran. We&apos;ll reply soon.</div>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-3 mt-5 p-4 sm:p-5 bg-red-950/30 border border-red-700/30 rounded-xl toast-in">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-red-300 font-semibold text-sm">Failed to send</div>
                  <div className="text-red-500 text-xs mt-1">Please try again or contact us directly.</div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* ── RIGHT: Contact Info Panel ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Info cards */}
          {contactDetails.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`rounded-xl p-5 border flex items-start gap-4 transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5 ${
                  item.accent
                    ? 'bg-accent/8 border-accent/30'
                    : 'glass-card border-accent/15'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.accent ? 'bg-accent/20' : 'bg-blue-900/40'
                }`}>
                  <Icon size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-accent text-xs font-bold uppercase tracking-widest mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-200 text-sm leading-relaxed hover:text-accent transition-colors whitespace-pre-line block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                      {item.value}
                    </div>
                  )}
                  {item.sub && (
                    <div className="text-gray-500 text-xs mt-1">{item.sub}</div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Islamic greeting card */}
          <div className="rounded-xl p-5 border border-accent/15 glass-card text-center">
            <div className="font-arabic text-accent text-xl leading-loose mb-2">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ
            </div>
            <p className="text-gray-500 text-xs italic">
              &quot;Peace be upon you and the mercy of Allah.&quot;
            </p>
            <div className="mt-3 pt-3 border-t border-accent/10">
              <p className="text-gray-400 text-xs leading-relaxed">
                We respond to all messages within <span className="text-accent font-semibold">24–48 hours</span>,
                in shaa Allah.
              </p>
            </div>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
}

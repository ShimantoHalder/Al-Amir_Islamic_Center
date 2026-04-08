'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionContainer, SectionHeader } from '@/app/components/ui';

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          subject: `[Al-Amir] New message: ${form.subject}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <SectionContainer id="contact" py="large" bg="dark">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          icon="✉️"
          title={<>Get in <span className="text-accent">Touch</span></>}
          description="Questions, inquiries, or just want to connect? We'll get back to you promptly."
        />

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl md:rounded-3xl border border-blue-800/40 bg-blue-950/20 backdrop-blur p-5 sm:p-6 md:p-8 space-y-4 md:space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-1.5 md:mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="form-input rounded-lg md:rounded-xl py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm"
              />
            </div>
            <div>
              <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-1.5 md:mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="form-input rounded-lg md:rounded-xl py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-1.5 md:mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="What is this about?"
              className="form-input rounded-lg md:rounded-xl py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm"
            />
          </div>

          <div>
            <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-1.5 md:mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Your message here..."
              rows={5}
              className="form-input rounded-lg md:rounded-xl py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl bg-accent hover:bg-accent/90 disabled:bg-gray-600 text-black font-semibold text-xs md:text-sm transition-all flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="flex items-center gap-2 p-3 md:p-4 bg-green-950/30 border border-green-800/40 rounded-lg md:rounded-xl toast-in">
              <CheckCircle size={18} className="text-green-400" />
              <span className="text-green-300 text-xs md:text-sm">Message sent! We'll reply soon.</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 md:p-4 bg-red-950/30 border border-red-800/40 rounded-lg md:rounded-xl toast-in">
              <AlertCircle size={18} className="text-red-400" />
              <span className="text-red-300 text-xs md:text-sm">Error sending message. Try again.</span>
            </div>
          )}
        </form>
      </div>
    </SectionContainer>
  );
}

'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

// Web3Forms — free, no backend needed. Replace ACCESS_KEY with your key from web3forms.com
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <section id="contact" className="py-16 md:py-28 px-3 sm:px-4 bg-gradient-to-t from-blue-950/20 to-transparent w-full flex flex-col items-center">
      <div className="max-w-2xl mx-auto w-full px-2">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="text-3xl md:text-4xl">✉️</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
            Get in <span className="text-accent">Touch</span>
          </h2>
          <div className="section-divider mx-auto mt-4 mb-6" />
          <p className="text-gray-400 text-xs sm:text-sm px-3">
            Questions, inquiries, or just want to connect? We'll get back to you promptly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl md:rounded-3xl border border-blue-800/40 bg-blue-950/20 backdrop-blur p-6 md:p-8 space-y-5 md:space-y-6"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="form-input rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm w-full"
              />
            </div>
            <div>
              <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="form-input rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm w-full"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-2">
              Subject *
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="form-input rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm w-full"
            >
              <option value="">Select a topic...</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Prayer Times">Prayer Times</option>
              <option value="Events & Programs">Events & Programs</option>
              <option value="Islamic Classes">Islamic Classes</option>
              <option value="Donation Question">Donation Question</option>
              <option value="New Muslim Support">New Muslim Support</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="text-accent text-xs font-semibold uppercase tracking-wider block mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Write your message here..."
              className="form-input rounded-lg md:rounded-xl px-4 md:px-5 py-3 md:py-3.5 text-sm resize-none w-full"
            />
          </div>

          {/* Subscribe checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              className="w-4 h-4 accent-blue-600 mt-1"
            />
            <label htmlFor="subscribe" className="text-gray-400 text-xs sm:text-sm cursor-pointer leading-relaxed">
              Subscribe me to masjid announcements & event updates
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 md:py-3.5 px-6 rounded-lg md:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: status === 'loading' ? 'rgba(26,49,91,0.4)' : 'linear-gradient(135deg, #ac9861, #d4b896)',
              color: 'white',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>

          {/* Status messages */}
          {status === 'success' && (
            <div className="flex items-start gap-3 bg-blue-900/40 border border-blue-600/40 rounded-lg md:rounded-xl px-3 md:px-4 py-3 toast-in text-sm">
              <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
              <div>
                <div className="text-blue-300 font-semibold text-sm">Message Sent!</div>
                <div className="text-accent text-xs">JazakAllahu Khayran. We'll reply soon.</div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-3 bg-red-900/30 border border-red-600/30 rounded-xl px-4 py-3 toast-in">
              <AlertCircle className="text-red-400 flex-shrink-0" size={18} />
              <div>
                <div className="text-red-300 font-semibold text-sm">Failed to send</div>
                <div className="text-red-500 text-xs">Please try again or email us directly.</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

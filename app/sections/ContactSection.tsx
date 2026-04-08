'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
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
      <div className="max-w-2xl mx-auto w-full">
        <SectionHeader
          icon="✉️"
          title={<>Get in <span className="text-accent">Touch</span></>}
          description="Have questions or want to connect with our community? We'd love to hear from you."
        />

        <div
          ref={ref}
          className={`reveal ${visible ? 'visible' : ''}`}
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl md:rounded-3xl border border-blue-800/30 bg-gradient-to-br from-blue-950/30 to-black/30 backdrop-blur-md p-8 sm:p-10 md:p-12 lg:p-14 space-y-7 sm:space-y-8 md:space-y-9 shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
              <div className="space-y-2 sm:space-y-2.5">
                <label className="text-accent text-xs font-bold uppercase tracking-widest block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="form-input rounded-lg py-3 px-4 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2 sm:space-y-2.5">
                <label className="text-accent text-xs font-bold uppercase tracking-widest block">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="form-input rounded-lg py-3 px-4 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Subject dropdown */}
            <div className="space-y-2 sm:space-y-2.5">
              <label className="text-accent text-xs font-bold uppercase tracking-widest block">
                Subject <span className="text-red-400">*</span>
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="form-input rounded-lg py-3 px-4 text-sm sm:text-base appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(201,168,76,0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  backgroundSize: '18px',
                  paddingRight: '40px',
                }}
              >
                <option value="" disabled>Select a subject...</option>
                {subjects.map((s) => (
                  <option key={s} value={s} style={{ background: '#0f1e35', color: '#f5f0e8' }}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2 sm:space-y-2.5">
              <label className="text-accent text-xs font-bold uppercase tracking-widest block">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Share your message, question, or salaam..."
                rows={6}
                className="form-input rounded-lg py-3 px-4 text-sm sm:text-base resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 sm:py-5 md:py-6 px-6 rounded-lg bg-gradient-to-r from-accent to-gold-dark hover:from-gold-light hover:to-accent disabled:from-gray-600 disabled:to-gray-700 text-black font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(201,168,76,0.4)] disabled:cursor-not-allowed disabled:scale-100"
              style={{ color: '#0b1422' }}
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            {/* Status feedback */}
            {status === 'success' && (
              <div className="flex items-start gap-4 p-5 sm:p-6 bg-green-950/30 border border-green-700/30 rounded-lg toast-in">
                <CheckCircle size={22} className="text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-green-300 font-semibold text-sm sm:text-base">Message sent!</div>
                  <div className="text-green-500 text-xs sm:text-sm mt-1">JazakAllahu Khayran. We'll reply soon.</div>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-4 p-5 sm:p-6 bg-red-950/30 border border-red-700/30 rounded-lg toast-in">
                <AlertCircle size={22} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-red-300 font-semibold text-sm sm:text-base">Failed to send</div>
                  <div className="text-red-500 text-xs sm:text-sm mt-1">Please try again or contact us directly.</div>
                </div>
              </div>
            )}
          </form>

          {/* Quick contact info below form */}
          <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
            {[
              { icon: '📞', label: 'Call Us',   value: '+1 (305) 000-0000' },
              { icon: '📧', label: 'Email Us',  value: 'info@alamirislamiccenter.org' },
              { icon: '📍', label: 'Visit Us',  value: 'Florida, USA' },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card rounded-lg sm:rounded-xl p-5 sm:p-6 text-center border border-accent/10"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="text-accent text-xs font-bold uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-gray-400 text-sm leading-relaxed">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const P = {
  linen: '#F2EDE4',
  surface: '#FAF7F2',
  charcoal: '#1E1B16',
  charcoalSoft: 'rgba(30,27,22,0.65)',
  brass: '#B07D3A',
  brassLight: 'rgba(176,125,58,0.15)',
  sageBg: '#E8E2D9',
  border: 'rgba(30,27,22,0.09)',
  haze: '#9C968A',
};

// Replace FORMSPREE_ID with your actual form ID from formspree.io
const FORMSPREE_ID = 'REPLACE_WITH_YOUR_FORM_ID';

export default function ContactPage() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus('success');
        setFields({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: P.linen, color: P.charcoal, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }

        .ct-nav { position: sticky; top: 0; z-index: 100; background: rgba(242,237,228,0.94); backdrop-filter: blur(8px); border-bottom: 1px solid ${P.border}; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
        .ct-nav-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .ct-brand-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; }
        .ct-brand-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.charcoalSoft}; }
        .ct-nav-right { display: flex; align-items: center; gap: 20px; }
        .ct-nav-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.charcoal}; background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; }
        .ct-nav-link:hover { color: ${P.brass}; }
        .ct-nav-quiz { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.brass}; background: transparent; border: 1.5px solid ${P.brass}; border-radius: 20px; padding: 6px 13px; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 5px; }
        .ct-nav-quiz:hover { background: ${P.brass}; color: #fff; }

        .ct-hero { padding: 72px 24px 56px; text-align: center; border-bottom: 1px solid ${P.border}; }
        .ct-hero-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(30,27,22,0.35); margin-bottom: 16px; }
        .ct-hero-title { font-family: 'Space Grotesk', sans-serif; font-size: 48px; font-weight: 800; color: ${P.charcoal}; margin: 0 0 14px; letter-spacing: -0.02em; line-height: 1.08; }
        @media (max-width: 600px) { .ct-hero-title { font-size: 32px; } }
        .ct-hero-sub { font-size: 16px; color: ${P.haze}; margin: 0 auto; max-width: 440px; line-height: 1.65; }

        .ct-body { max-width: 680px; margin: 0 auto; padding: 64px 24px 96px; }

        .ct-card { background: ${P.surface}; border: 1px solid ${P.border}; border-radius: 20px; padding: 48px; }
        @media (max-width: 600px) { .ct-card { padding: 28px 20px; } }

        .ct-field { margin-bottom: 24px; }
        .ct-label { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.charcoalSoft}; margin-bottom: 8px; }
        .ct-input, .ct-textarea { width: 100%; background: ${P.linen}; border: 1px solid ${P.border}; border-radius: 10px; padding: 13px 16px; font-family: 'Inter', sans-serif; font-size: 15px; color: ${P.charcoal}; outline: none; transition: border-color 0.18s, box-shadow 0.18s; }
        .ct-input::placeholder, .ct-textarea::placeholder { color: ${P.haze}; }
        .ct-input:focus, .ct-textarea:focus { border-color: ${P.brass}; box-shadow: 0 0 0 3px rgba(176,125,58,0.12); }
        .ct-textarea { resize: vertical; min-height: 140px; line-height: 1.6; }

        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 520px) { .ct-row { grid-template-columns: 1fr; } }

        .ct-submit { width: 100%; padding: 16px; background: ${P.charcoal}; color: ${P.linen}; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; letter-spacing: 0.02em; transition: background 0.18s, transform 0.15s; margin-top: 8px; }
        .ct-submit:hover:not(:disabled) { background: #2d2920; }
        .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .ct-success { text-align: center; padding: 40px 0 16px; }
        .ct-success-icon { width: 56px; height: 56px; border-radius: 50%; background: ${P.brassLight}; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .ct-success-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: ${P.charcoal}; margin: 0 0 10px; }
        .ct-success-sub { font-size: 15px; color: ${P.haze}; margin: 0 0 28px; line-height: 1.6; }
        .ct-success-back { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.brass}; background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; }

        .ct-error-msg { margin-top: 12px; font-size: 13px; color: #b04040; text-align: center; }

        .ct-divider { border: none; border-top: 1px solid ${P.border}; margin: 32px 0; }

        .ct-alt { text-align: center; }
        .ct-alt-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(30,27,22,0.35); margin-bottom: 8px; }
        .ct-alt-text { font-size: 14px; color: ${P.charcoalSoft}; line-height: 1.6; }
      `}</style>

      <nav className="ct-nav">
        <Link to="/home" className="ct-nav-brand">
          <span className="ct-brand-dot" />
          <span className="ct-brand-text">Digital Detox Initiative</span>
        </Link>
        <div className="ct-nav-right">
          <Link to="/home" className="ct-nav-link">Home</Link>
          <Link to="/products" className="ct-nav-link">Products</Link>
          <Link to="/quiz" className="ct-nav-quiz">
            Find Your Fix
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="2" y1="6.5" x2="11" y2="6.5"/><polyline points="7,2.5 11,6.5 7,10.5"/>
            </svg>
          </Link>
        </div>
      </nav>

      <div className="ct-hero">
        <div className="ct-hero-label">Get In Touch</div>
        <h1 className="ct-hero-title">Contact Us</h1>
        <p className="ct-hero-sub">Questions about your order, a product, or anything else — we'll get back to you within 24 hours.</p>
      </div>

      <div className="ct-body">
        <div className="ct-card">
          {status === 'success' ? (
            <div className="ct-success">
              <div className="ct-success-icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={P.brass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,13 10,19 22,7" />
                </svg>
              </div>
              <div className="ct-success-title">Message received.</div>
              <p className="ct-success-sub">Thank you for reaching out. We'll be in touch within 24 hours.</p>
              <button className="ct-success-back" onClick={() => setStatus('idle')}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-name">Full Name</label>
                  <input id="ct-name" className="ct-input" type="text" name="name" placeholder="Your name" value={fields.name} onChange={handleChange} required />
                </div>
                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-email">Email Address</label>
                  <input id="ct-email" className="ct-input" type="email" name="email" placeholder="you@example.com" value={fields.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-subject">Subject</label>
                <input id="ct-subject" className="ct-input" type="text" name="subject" placeholder="What's this about?" value={fields.subject} onChange={handleChange} />
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-message">Message</label>
                <textarea id="ct-message" className="ct-textarea" name="message" placeholder="Tell us how we can help…" value={fields.message} onChange={handleChange} required />
              </div>
              <button className="ct-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="ct-error-msg">Something went wrong. Please try again or email us directly.</p>
              )}
            </form>
          )}

          <hr className="ct-divider" />
          <div className="ct-alt">
            <div className="ct-alt-label">Response Time</div>
            <p className="ct-alt-text">We typically respond within 24 hours, Monday through Friday.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

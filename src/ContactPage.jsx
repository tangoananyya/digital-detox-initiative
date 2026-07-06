import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Footer from './Footer.jsx';

// ── EmailJS credentials ────────────────────────────────────────────────────
// Sign up free at emailjs.com → Email Services → Add New Service (Gmail)
// Then Email Templates → Create Template → note the template ID
// Then Account → API Keys → copy Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
// ──────────────────────────────────────────────────────────────────────────

const P = {
  linen: '#F2EDE4',
  surface: '#FAF7F2',
  charcoal: '#1E1B16',
  charcoalSoft: 'rgba(30,27,22,0.65)',
  brass: '#B07D3A',
  brassLight: 'rgba(176,125,58,0.15)',
  border: 'rgba(30,27,22,0.09)',
  haze: '#9C968A',
  sageBg: '#E8E2D9',
};

export default function ContactPage() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: P.linen, color: P.charcoal, fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }

        .ct-nav { position: sticky; top: 0; z-index: 100; background: rgba(242,237,228,0.94); backdrop-filter: blur(8px); border-bottom: 1px solid ${P.border}; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
        .ct-nav-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .ct-brand-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; }
        .ct-brand-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.charcoalSoft}; }
        .ct-nav-right { display: flex; align-items: center; gap: 20px; }
        .ct-nav-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.charcoal}; background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; transition: color 0.18s; }
        .ct-nav-link:hover { color: ${P.brass}; }
        .ct-nav-quiz { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.brass}; background: transparent; border: 1.5px solid ${P.brass}; border-radius: 20px; padding: 6px 13px; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: background 0.18s, color 0.18s; white-space: nowrap; }
        .ct-nav-quiz:hover { background: ${P.brass}; color: #fff; }

        .ct-hero { padding: 72px 24px 56px; text-align: center; border-bottom: 1px solid ${P.border}; }
        .ct-hero-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(30,27,22,0.35); margin-bottom: 16px; }
        .ct-hero-title { font-family: 'Space Grotesk', sans-serif; font-size: 52px; font-weight: 800; color: ${P.charcoal}; margin: 0 0 14px; letter-spacing: -0.02em; line-height: 1.05; }
        @media (max-width: 600px) { .ct-hero-title { font-size: 34px; } }
        .ct-hero-sub { font-size: 16px; color: ${P.haze}; margin: 0 auto; max-width: 440px; line-height: 1.7; }

        .ct-body { flex: 1; max-width: 580px; width: 100%; margin: 0 auto; padding: 64px 24px 80px; }

        .ct-card { background: ${P.surface}; border: 1px solid ${P.border}; border-top: 3px solid ${P.brass}; border-radius: 18px; padding: 48px 44px; }
        @media (max-width: 600px) { .ct-card { padding: 28px 20px; } }

        .ct-field { margin-bottom: 22px; }
        .ct-label { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.charcoalSoft}; margin-bottom: 7px; }
        .ct-input, .ct-select, .ct-textarea {
          width: 100%; background: ${P.linen}; border: 1px solid rgba(30,27,22,0.13);
          border-radius: 10px; padding: 13px 16px;
          font-family: 'Inter', sans-serif; font-size: 15px; color: ${P.charcoal};
          outline: none; transition: border-color 0.18s, box-shadow 0.18s;
          appearance: none; -webkit-appearance: none;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: ${P.haze}; }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus { border-color: ${P.brass}; box-shadow: 0 0 0 3px rgba(176,125,58,0.12); }
        .ct-select-wrap { position: relative; }
        .ct-select-wrap::after { content: ''; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid ${P.haze}; pointer-events: none; }
        .ct-textarea { resize: vertical; min-height: 140px; line-height: 1.65; }

        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 480px) { .ct-row { grid-template-columns: 1fr; } }

        .ct-submit { width: 100%; padding: 16px; background: ${P.brass}; color: #fff; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; letter-spacing: 0.02em; transition: background 0.18s; margin-top: 8px; }
        .ct-submit:hover:not(:disabled) { background: #9A6B2F; }
        .ct-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        @keyframes ct-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        .ct-sending-dots span { animation: ct-pulse 1.2s ease-in-out infinite; }
        .ct-sending-dots span:nth-child(2) { animation-delay: 0.2s; }
        .ct-sending-dots span:nth-child(3) { animation-delay: 0.4s; }

        .ct-success { text-align: center; padding: 24px 0 8px; }
        .ct-success-icon { width: 60px; height: 60px; border-radius: 50%; background: ${P.brassLight}; border: 1.5px solid rgba(176,125,58,0.25); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .ct-success-title { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; color: ${P.charcoal}; margin: 0 0 10px; }
        .ct-success-sub { font-size: 15px; color: ${P.haze}; margin: 0 0 28px; line-height: 1.65; }
        .ct-success-back { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.brass}; background: none; border: none; cursor: pointer; padding: 0; }
        .ct-success-back:hover { text-decoration: underline; }

        .ct-error { margin-top: 12px; font-size: 13px; color: #b04040; text-align: center; line-height: 1.5; }
      `}</style>

      {/* Nav */}
      <nav className="ct-nav">
        <Link to="/home" className="ct-nav-brand">
          <span className="ct-brand-dot" />
          <span className="ct-brand-text">Digital Detox Initiative</span>
        </Link>
        <div className="ct-nav-right">
          <Link to="/home" className="ct-nav-link">Home</Link>
          <Link to="/products" className="ct-nav-link">All Products</Link>
          <Link to="/quiz" className="ct-nav-quiz">
            Find Your Fix
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="2" y1="6.5" x2="11" y2="6.5"/><polyline points="7,2.5 11,6.5 7,10.5"/>
            </svg>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="ct-hero">
        <div className="ct-hero-label">Get In Touch</div>
        <h1 className="ct-hero-title">We are here.</h1>
        <p className="ct-hero-sub">Questions about your order, your product, or just want to say hello. We read every message.</p>
      </div>

      {/* Form card */}
      <div className="ct-body">
        <div className="ct-card">
          {status === 'success' ? (
            <div className="ct-success">
              <div className="ct-success-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={P.brass} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="5,14 11,20 23,8" />
                </svg>
              </div>
              <div className="ct-success-title">Message received.</div>
              <p className="ct-success-sub">We will get back to you within 24 hours.</p>
              <button className="ct-success-back" onClick={() => setStatus('idle')}>Send another message</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-name">Full Name</label>
                  <input id="ct-name" className="ct-input" type="text" name="from_name" placeholder="Your name" required />
                </div>
                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-email">Email Address</label>
                  <input id="ct-email" className="ct-input" type="email" name="from_email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-subject">Subject</label>
                <div className="ct-select-wrap">
                  <select id="ct-subject" className="ct-select" name="subject" defaultValue="">
                    <option value="" disabled>Select a topic…</option>
                    <option>Order Question</option>
                    <option>Product Help</option>
                    <option>Returns and Refunds</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-message">Message</label>
                <textarea id="ct-message" className="ct-textarea" name="message" placeholder="Tell us how we can help…" required />
              </div>
              <button className="ct-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <span className="ct-sending-dots">Sending<span>.</span><span>.</span><span>.</span></span>
                ) : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="ct-error">Something went wrong. Please email us directly at tangoananyya@gmail.com</p>
              )}
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

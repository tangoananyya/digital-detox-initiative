import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  const ref = React.useMemo(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }, []);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#FBF9F4', fontFamily: "'Inter', system-ui, sans-serif", color: '#1E1B16',
      padding: '48px 20px', boxSizing: 'border-box',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        .sc-back-btn { transition: background 0.18s; }
        .sc-back-btn:hover { background: #9A6B2F !important; }
        @media (prefers-reduced-motion: reduce) { .sc-back-btn { transition: none; } }
      `}</style>

      <div style={{ textAlign: 'center', maxWidth: 480, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B07D3A', display: 'inline-block' }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,27,22,0.55)' }}>Digital Detox Initiative</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
            <circle cx="36" cy="36" r="34" stroke="#B07D3A" strokeWidth="2" fill="#FBF9F4" />
            <circle cx="36" cy="36" r="28" fill="#F5ECD8" />
            <path d="M22 36 L31 45 L50 27" stroke="#B07D3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 34, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
          Your Detox Kit is confirmed.
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.72, color: 'rgba(30,27,22,0.65)', margin: '0 0 10px' }}>
          Check your email for an order confirmation and tracking details. Your kit ships within 3 business days.
        </p>

        <div style={{ marginTop: 28, marginBottom: 36, padding: '14px 20px', background: '#fff', border: '1px solid rgba(30,27,22,0.08)', borderRadius: 12, display: 'inline-block' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,27,22,0.4)' }}>Order reference</span>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, letterSpacing: '0.14em', color: '#1E1B16', marginTop: 4 }}>DDI-{ref}</div>
        </div>

        <div>
          <Link
            to="/"
            className="sc-back-btn"
            style={{
              display: 'inline-block', padding: '15px 32px',
              background: '#B07D3A', color: '#fff',
              borderRadius: 14,
              fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Back to Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}

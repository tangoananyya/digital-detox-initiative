import React from 'react';

export default function Success() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#FBF9F4', fontFamily: "'Inter', system-ui, sans-serif", color: '#1E1B16',
      padding: '48px 20px', boxSizing: 'border-box',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@500&display=swap');`}</style>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B07D3A', display: 'inline-block' }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,27,22,0.6)' }}>Digital Detox Initiative</span>
        </div>
        <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, margin: '0 0 16px' }}>Order Confirmed</h1>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(30,27,22,0.65)', margin: '0 0 32px' }}>
          Thank you for your purchase. Your Cervical Decompression Neck Relaxer is on its way — check your email for tracking details.
        </p>
        <a href="/" style={{ display: 'inline-block', padding: '14px 28px', background: '#B07D3A', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
          Back to Home
        </a>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

const P = {
  linen: '#FBF9F4',
  charcoal: '#1E1B16',
  charcoalSoft: 'rgba(30,27,22,0.65)',
  brass: '#B07D3A',
  brassLight: '#F5ECD8',
  sageBg: '#EEF2EB',
  border: 'rgba(30,27,22,0.1)',
  haze: '#9C968A',
};

const BASE = import.meta.env.BASE_URL;

const PRODUCTS = [
  { name: 'Cervical Decompression Neck Relaxer', price: 29.99, desc: 'Restores your natural cervical curve in 10 minutes a day', href: '/', image: `${BASE}images/hero.png` },
  { name: 'Spine Release Back Stretcher',         price: 34.99, desc: 'Decompresses the lumbar spine and relieves chronic back pain', href: '/back-stretcher', image: `${BASE}images/back2.png` },
  { name: 'Acupressure Roller Ball Massager',     price: 24.99, desc: 'Releases deep muscle tension in shoulders, calves, and feet', href: '/roller', image: `${BASE}images/ballm2.png` },
  { name: 'Compression Therapy Gloves',           price: 29.99, desc: 'Reduces wrist and hand inflammation from repetitive screen use', href: '/gloves', image: `${BASE}images/compressionglove1.png` },
  { name: 'Mini Handheld Massager',               price: 29.99, desc: 'Portable vibration therapy for instant tension relief anywhere', href: '/massager', image: `${BASE}images/robomassage5.png` },
  { name: 'Posture Corrector',                    price: 24.99, desc: 'Retrains postural muscles and opens the chest throughout the workday', href: '/posture', image: `${BASE}images/posture2.png` },
];

export default function ProductsPage() {
  return (
    <div style={{ minHeight: '100vh', background: P.linen, color: P.charcoal, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }

        .pg-nav { position: sticky; top: 0; z-index: 100; background: rgba(251,249,244,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid ${P.border}; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; overflow: hidden; }
        .pg-nav::after { content: ''; position: absolute; bottom: 0; left: 0; height: 1px; width: 0; background: ${P.brass}; animation: pg-nav-border 0.8s ease 0.2s forwards; }
        .pg-nav-brand { display: flex; align-items: center; gap: 8px; }
        .pg-brand-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; }
        .pg-brand-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.charcoalSoft}; }
        .pg-nav-right { display: flex; align-items: center; gap: 20px; }
        .pg-nav-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.charcoal}; background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; transition: color 0.18s; display: flex; align-items: center; }
        .pg-nav-link:hover { color: ${P.brass}; }
        .pg-nav-quiz { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.brass}; background: transparent; border: 1.5px solid ${P.brass}; border-radius: 20px; padding: 6px 13px; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: background 0.18s, color 0.18s; white-space: nowrap; }
        .pg-nav-quiz:hover { background: ${P.brass}; color: #fff; }
        .pg-cart-icon { padding: 7px; color: ${P.charcoal}; display: flex; align-items: center; border-radius: 10px; transition: background 0.15s; text-decoration: none; }
        .pg-cart-icon:hover { background: ${P.sageBg}; }

        .pg-hero { background: ${P.charcoal}; padding: 80px 24px 72px; text-align: center; }
        .pg-hero-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(251,249,244,0.38); margin-bottom: 18px; }
        .pg-hero-title { font-family: 'Space Grotesk', sans-serif; font-size: 52px; font-weight: 800; color: #FBF9F4; margin: 0 0 16px; letter-spacing: -0.02em; line-height: 1.08; }
        @media (max-width: 600px) { .pg-hero-title { font-size: 34px; } }
        .pg-hero-sub { font-size: 17px; color: ${P.haze}; margin: 0; line-height: 1.65; max-width: 520px; margin: 0 auto; }

        .pg-grid-wrap { max-width: 1100px; margin: 0 auto; padding: 64px 24px; }
        .pg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        @media (max-width: 860px) { .pg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .pg-grid { grid-template-columns: 1fr; } }

        .pg-card { background: #fff; border: 1px solid ${P.border}; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s; }
        .pg-card:hover { box-shadow: 0 8px 32px rgba(30,27,22,0.09); }
        .pg-card-img { width: 100%; aspect-ratio: 1 / 1; background: ${P.sageBg}; border: 2px dashed #C8D4C2; display: flex; align-items: center; justify-content: center; box-sizing: border-box; flex-shrink: 0; overflow: hidden; border-radius: 12px 12px 0 0; }
        .pg-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pg-card-img-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(58,82,48,0.35); }
        .pg-card-body { padding: 22px 22px 24px; display: flex; flex-direction: column; flex: 1; }
        .pg-card-name { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: ${P.charcoal}; margin: 0 0 8px; line-height: 1.25; }
        .pg-card-desc { font-size: 13.5px; line-height: 1.65; color: ${P.charcoalSoft}; margin: 0 0 16px; flex: 1; }
        .pg-card-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; }
        .pg-card-price { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: ${P.brass}; }
        .pg-card-btn { padding: 10px 18px; background: ${P.brass}; color: #fff; border: none; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.18s; white-space: nowrap; }
        .pg-card-btn:hover { background: #9A6B2F; }

        .pg-cta-banner { background: ${P.brassLight}; border-top: 1px solid rgba(176,125,58,0.18); border-bottom: 1px solid rgba(176,125,58,0.18); padding: 56px 24px; text-align: center; }
        .pg-cta-title { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: ${P.charcoal}; margin: 0 0 24px; }
        .pg-cta-quiz-btn { padding: 14px 30px; background: transparent; color: ${P.brass}; border: 2px solid ${P.brass}; border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.18s, color 0.18s; }
        .pg-cta-quiz-btn:hover { background: ${P.brass}; color: #fff; }

        @keyframes pg-nav-border { to { width: 100%; } }
        @media (prefers-reduced-motion: reduce) { .pg-card, .pg-nav-link, .pg-nav-quiz, .pg-cart-icon, .pg-card-btn, .pg-cta-quiz-btn { transition: none; } }
      `}</style>

      <nav className="pg-nav">
        <div className="pg-nav-brand">
          <span className="pg-brand-dot" />
          <span className="pg-brand-text">Digital Detox Initiative</span>
        </div>
        <div className="pg-nav-right">
          <Link to="/products" className="pg-nav-link">All Products</Link>
          <Link to="/quiz" className="pg-nav-quiz">
            Find Your Fix
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="2" y1="6.5" x2="11" y2="6.5"/><polyline points="7,2.5 11,6.5 7,10.5"/>
            </svg>
          </Link>
          <Link to="/" className="pg-cart-icon" aria-label="Shop">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h16l-1.4 9a2 2 0 01-2 1.7H6.4a2 2 0 01-2-1.7L3 8z"/><path d="M8 8V6a3 3 0 116 0v2"/>
            </svg>
          </Link>
        </div>
      </nav>

      <section className="pg-hero">
        <div className="pg-hero-label">The Full Recovery Collection</div>
        <h1 className="pg-hero-title">The Full Recovery Collection</h1>
        <p className="pg-hero-sub">Every product designed around one idea. Your body was not built for screens.</p>
      </section>

      <div className="pg-grid-wrap">
        <div className="pg-grid">
          {PRODUCTS.map(p => (
            <div key={p.name} className="pg-card">
              <div className="pg-card-img">
                {p.image
                  ? <img src={p.image} alt={p.name} />
                  : <span className="pg-card-img-label">Product Image</span>}
              </div>
              <div className="pg-card-body">
                <div className="pg-card-name">{p.name}</div>
                <div className="pg-card-desc">{p.desc}</div>
                <div className="pg-card-footer">
                  <span className="pg-card-price">${p.price.toFixed(2)}</span>
                  <Link to={p.href} className="pg-card-btn">View Product</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="pg-cta-banner">
        <h2 className="pg-cta-title">Not sure where to start? Take our free 60-second assessment.</h2>
        <Link to="/quiz" className="pg-cta-quiz-btn">Find Your Fix</Link>
      </section>
    </div>
  );
}

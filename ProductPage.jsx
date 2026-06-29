import React, { useState, useEffect } from 'react';

const P = {
  linen: '#FBF9F4',
  charcoal: '#1E1B16',
  charcoalSoft: 'rgba(30,27,22,0.65)',
  brass: '#B07D3A',
  brassLight: '#F5ECD8',
  sage: '#3A5230',
  sageBg: '#EEF2EB',
  border: 'rgba(30,27,22,0.1)',
};

function StarRow({ rating, count }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < full ? P.brass : i === full && half ? 'url(#half)' : '#D8D0C4'}>
            <polygon points="8,1.5 10,6 15,6.5 11.5,10 12.5,15 8,12.5 3.5,15 4.5,10 1,6.5 6,6" />
          </svg>
        ))}
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: P.charcoalSoft }}>
        {rating} · {count.toLocaleString()} reviews
      </span>
    </div>
  );
}

function BenefitIcon({ type }) {
  if (type === 'neck') return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={P.brass} strokeWidth="1.5" />
      <path d="M16 8 C12 8 10 12 10 16 C10 20 12 24 16 24" stroke={P.charcoal} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M16 8 C20 8 22 12 22 16 C22 20 20 24 16 24" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
  if (type === 'spine') return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={P.brass} strokeWidth="1.5" />
      <line x1="16" y1="8" x2="16" y2="24" stroke={P.charcoal} strokeWidth="2" strokeLinecap="round" />
      {[10, 14, 18, 22].map(y => <line key={y} x1="13" y1={y} x2="19" y2={y} stroke={P.brass} strokeWidth="1.5" strokeLinecap="round" />)}
    </svg>
  );
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={P.brass} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="5" stroke={P.charcoal} strokeWidth="1.8" fill="none" />
      <line x1="16" y1="8" x2="16" y2="11" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="21" x2="16" y2="24" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="8" y1="16" x2="11" y2="16" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21" y1="16" x2="24" y2="16" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="36" height="22" viewBox="0 0 200 116" aria-hidden="true">
      <path d="M 18 100 A 82 82 0 0 1 182 100" stroke={P.brass} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M 18 100 A 82 82 0 0 1 100 18" stroke={P.charcoal} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />
      <line x1="100" y1="100" x2="100" y2="30" stroke={P.charcoal} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="100" r="5" fill={P.charcoal} />
    </svg>
  );
}

function Popup({ onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 380);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(30,27,22,0.45)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.35s ease',
    }}>
      <style>{`
        @media (min-width: 600px) {
          .pp-popup-card { bottom: auto !important; border-radius: 20px !important; transform: translateY(${visible ? '0' : '24px'}) !important; }
          .pp-popup-wrap { align-items: center !important; }
        }
      `}</style>
      <div className="pp-popup-wrap" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%' }}>
        <div className="pp-popup-card" style={{
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          padding: '32px 28px 28px',
          maxWidth: 440,
          width: '100%',
          boxShadow: '0 -8px 40px rgba(30,27,22,0.18)',
          border: `1px solid ${P.border}`,
          transform: `translateY(${visible ? '0' : '100%'})`,
          transition: 'transform 0.38s cubic-bezier(.32,.72,0,1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ padding: '10px 14px', background: P.brassLight, borderRadius: 12, display: 'inline-flex' }}>
              <GaugeIcon />
            </div>
          </div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22, fontWeight: 700, color: P.charcoal,
            textAlign: 'center', margin: '0 0 10px', lineHeight: 1.25,
          }}>
            Spending too much time on screens?
          </h3>
          <p style={{
            fontSize: 14.5, lineHeight: 1.65, color: P.charcoalSoft,
            textAlign: 'center', margin: '0 0 24px',
          }}>
            Take our 60-second assessment and find out exactly what screen time is doing to your body — and how to fix it.
          </p>
          <a
            href="/quiz"
            style={{
              display: 'block', width: '100%', padding: '15px 18px',
              background: P.brass, color: '#fff',
              border: 'none', borderRadius: 13,
              fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600,
              textAlign: 'center', textDecoration: 'none',
              cursor: 'pointer', marginBottom: 10,
              boxSizing: 'border-box',
            }}
          >
            Take the Free Assessment
          </a>
          <button
            onClick={handleDismiss}
            style={{
              display: 'block', width: '100%', padding: '12px 18px',
              background: 'transparent', border: 'none',
              fontFamily: "'Inter', sans-serif", fontSize: 14, color: P.charcoalSoft,
              cursor: 'pointer',
            }}
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}

async function goToCheckout() {
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: 'Cervical Decompression Neck Relaxer', productPrice: 29.99 }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch (err) {
    console.error('Checkout error', err);
  }
}

const REVIEWS = [
  {
    name: 'Margaret T.',
    rating: 5,
    text: 'After years of desk work and chronic neck pain, this changed everything. Ten minutes a day and I stopped reaching for ibuprofen. My posture is visibly different — my husband noticed before I did.',
  },
  {
    name: 'James R.',
    rating: 5,
    text: "I was skeptical, but the relief was immediate. That decompression stretch is something no massage has ever given me. I use it every morning before I open my laptop and my whole day feels different.",
  },
  {
    name: 'Sofia M.',
    rating: 4,
    text: "The quality is excellent and it genuinely works. I've referred it to three colleagues who also stare at screens all day. Shipping was fast and the packaging was minimal — exactly what I'd expect from a brand like this.",
  },
];

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('ddi_popup_dismissed')) return;
    const timer = setTimeout(() => setShowPopup(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowPopup(false);
    sessionStorage.setItem('ddi_popup_dismissed', '1');
  };

  return (
    <div style={{ minHeight: '100vh', background: P.linen, color: P.charcoal, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }

        .pp-nav { position: sticky; top: 0; z-index: 100; background: rgba(251,249,244,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid ${P.border}; padding: 16px 24px; display: flex; align-items: center; gap: 8px; }
        .pp-brand-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; }
        .pp-brand-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.charcoalSoft}; }

        .pp-hero { max-width: 1100px; margin: 0 auto; padding: 56px 24px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        @media (max-width: 720px) { .pp-hero { grid-template-columns: 1fr; gap: 32px; padding: 32px 20px; } }

        .pp-img-placeholder { width: 100%; height: 500px; border: 2px dashed #C8D4C2; border-radius: 20px; background: ${P.sageBg}; display: flex; align-items: center; justify-content: center; color: rgba(58,82,48,0.45); font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.1em; }
        @media (max-width: 720px) { .pp-img-placeholder { height: 300px; } }

        .pp-badge { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.brass}; background: ${P.brassLight}; border-radius: 6px; padding: 4px 10px; display: inline-block; margin-bottom: 14px; }
        .pp-headline { font-family: 'Space Grotesk', sans-serif; font-size: 34px; font-weight: 700; line-height: 1.15; letter-spacing: -0.01em; margin: 0 0 16px; }
        @media (max-width: 480px) { .pp-headline { font-size: 26px; } }

        .pp-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; }
        .pp-price { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: ${P.charcoal}; }
        .pp-price-strike { font-size: 18px; color: ${P.charcoalSoft}; text-decoration: line-through; }
        .pp-save { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: ${P.sage}; background: ${P.sageBg}; padding: 3px 8px; border-radius: 5px; letter-spacing: 0.08em; }

        .pp-bullets { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 10px; }
        .pp-bullet { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; line-height: 1.5; color: ${P.charcoalSoft}; }
        .pp-bullet-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; margin-top: 6px; }

        .pp-qty-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .pp-qty-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${P.charcoalSoft}; }
        .pp-qty-ctrl { display: flex; align-items: center; border: 1px solid ${P.border}; border-radius: 10px; overflow: hidden; }
        .pp-qty-btn { width: 38px; height: 38px; background: transparent; border: none; font-size: 18px; cursor: pointer; color: ${P.charcoal}; display: flex; align-items: center; justify-content: center; }
        .pp-qty-btn:hover { background: ${P.sageBg}; }
        .pp-qty-num { width: 40px; text-align: center; font-family: 'IBM Plex Mono', monospace; font-size: 14px; border-left: 1px solid ${P.border}; border-right: 1px solid ${P.border}; line-height: 38px; }

        .pp-atc { width: 100%; padding: 16px 18px; background: ${P.brass}; color: #fff; border: none; border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; margin-bottom: 16px; transition: background 0.18s; }
        .pp-atc:hover { background: #9A6B2F; }

        .pp-trust { display: flex; gap: 16px; flex-wrap: wrap; }
        .pp-trust-badge { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.1em; color: ${P.charcoalSoft}; display: flex; align-items: center; gap: 5px; }
        .pp-trust-dot { width: 4px; height: 4px; border-radius: 50%; background: ${P.brass}; }

        .pp-section { max-width: 1100px; margin: 0 auto; padding: 56px 24px; }
        .pp-section-label { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.charcoalSoft}; margin-bottom: 10px; text-align: center; }
        .pp-section-title { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 40px; }

        .pp-benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 600px) { .pp-benefits-grid { grid-template-columns: 1fr; } }
        .pp-benefit-card { background: #fff; border: 1px solid ${P.border}; border-radius: 18px; padding: 28px 24px; text-align: center; }
        .pp-benefit-icon { margin-bottom: 16px; display: flex; justify-content: center; }
        .pp-benefit-name { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; margin: 0 0 8px; }
        .pp-benefit-desc { font-size: 13.5px; color: ${P.charcoalSoft}; line-height: 1.6; margin: 0; }

        .pp-desc { max-width: 680px; margin: 0 auto; }
        .pp-desc p { font-size: 15.5px; line-height: 1.75; color: ${P.charcoalSoft}; margin: 0 0 18px; }

        .pp-ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 640px; margin: 0 auto; }
        @media (max-width: 500px) { .pp-ba-grid { grid-template-columns: 1fr; } }
        .pp-ba-box { height: 280px; border: 2px dashed #C8D4C2; border-radius: 16px; background: ${P.sageBg}; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 16px; }
        .pp-ba-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(58,82,48,0.5); }

        .pp-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 720px) { .pp-reviews-grid { grid-template-columns: 1fr; } }
        .pp-review-card { background: #fff; border: 1px solid ${P.border}; border-radius: 18px; padding: 26px 22px; }
        .pp-review-stars { display: flex; gap: 3px; margin-bottom: 12px; }
        .pp-review-text { font-size: 14px; line-height: 1.7; color: ${P.charcoalSoft}; margin: 0 0 16px; font-style: italic; }
        .pp-review-name { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${P.charcoal}; }

        .pp-cta-section { background: ${P.charcoal}; padding: 80px 24px; text-align: center; }
        .pp-cta-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(251,249,244,0.5); margin-bottom: 14px; }
        .pp-cta-title { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; color: ${P.linen}; margin: 0 0 14px; }
        @media (max-width: 480px) { .pp-cta-title { font-size: 26px; } }
        .pp-cta-sub { font-size: 16px; color: rgba(251,249,244,0.6); margin: 0 0 36px; line-height: 1.6; }
        .pp-cta-btn { display: inline-block; padding: 17px 36px; background: ${P.brass}; color: #fff; border: none; border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.18s; text-decoration: none; }
        .pp-cta-btn:hover { background: #9A6B2F; }

        .pp-divider { border: none; border-top: 1px solid ${P.border}; margin: 0; }

        @media (prefers-reduced-motion: reduce) { .pp-atc, .pp-qty-btn { transition: none; } }
      `}</style>

      {/* Nav */}
      <nav className="pp-nav">
        <span className="pp-brand-dot" />
        <span className="pp-brand-text">Digital Detox Initiative</span>
      </nav>

      {/* Hero */}
      <section className="pp-hero">
        <div className="pp-img-placeholder">
          PRODUCT IMAGE
        </div>

        <div>
          <div className="pp-badge">Bestseller</div>
          <h1 className="pp-headline">Cervical Decompression Neck Relaxer</h1>
          <StarRow rating={4.8} count={2847} />

          <div className="pp-price-row">
            <span className="pp-price">$29.99</span>
            <span className="pp-price-strike">$59.99</span>
            <span className="pp-save">SAVE 50%</span>
          </div>

          <ul className="pp-bullets">
            <li className="pp-bullet"><span className="pp-bullet-dot" />Instantly relieves tension from hours of screen time and forward head posture</li>
            <li className="pp-bullet"><span className="pp-bullet-dot" />Gently realigns the cervical spine without chiropractic visits</li>
            <li className="pp-bullet"><span className="pp-bullet-dot" />Just 10 minutes daily — use on the floor, couch, or office chair</li>
          </ul>

          <div className="pp-qty-row">
            <span className="pp-qty-label">Qty</span>
            <div className="pp-qty-ctrl">
              <button className="pp-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="pp-qty-num">{qty}</span>
              <button className="pp-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <button className="pp-atc" onClick={goToCheckout}>
            Add to Cart — ${(29.99 * qty).toFixed(2)}
          </button>

          <div className="pp-trust">
            <span className="pp-trust-badge"><span className="pp-trust-dot" />Free Shipping</span>
            <span className="pp-trust-badge"><span className="pp-trust-dot" />30-Day Guarantee</span>
            <span className="pp-trust-badge"><span className="pp-trust-dot" />Ships in 3 Days</span>
          </div>
        </div>
      </section>

      <hr className="pp-divider" />

      {/* Benefits */}
      <section className="pp-section">
        <div className="pp-section-label">Why it works</div>
        <h2 className="pp-section-title">Designed for the modern body</h2>
        <div className="pp-benefits-grid">
          {[
            { type: 'neck', name: 'Relieves Tech Neck', desc: 'Counteracts the downward pull of screen time with targeted cervical traction that releases compressed nerves and tight musculature.' },
            { type: 'spine', name: 'Realigns Cervical Spine', desc: 'Restores the natural C-curve of your neck, correcting the forward-head posture that builds silently over years of device use.' },
            { type: 'time', name: 'Use Just 10 Min Daily', desc: 'No appointments, no equipment, no warm-up required. Lie down, place it under your neck, and let gravity do the work.' },
          ].map(b => (
            <div key={b.type} className="pp-benefit-card">
              <div className="pp-benefit-icon"><BenefitIcon type={b.type} /></div>
              <div className="pp-benefit-name">{b.name}</div>
              <p className="pp-benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="pp-divider" />

      {/* Description */}
      <section className="pp-section">
        <div className="pp-section-label">About this product</div>
        <h2 className="pp-section-title">Product Description</h2>
        <div className="pp-desc">
          <p>
            [Product description placeholder — replace with final copy describing the material, construction, dimensions, and intended use of the Cervical Decompression Neck Relaxer.]
          </p>
          <p>
            [Secondary paragraph — include any clinical backing, certifications, or additional usage instructions here.]
          </p>
        </div>
      </section>

      <hr className="pp-divider" />

      {/* Before & After */}
      <section className="pp-section">
        <div className="pp-section-label">Results</div>
        <h2 className="pp-section-title">Before &amp; After</h2>
        <div className="pp-ba-grid">
          <div className="pp-ba-box"><span className="pp-ba-label">Before</span></div>
          <div className="pp-ba-box"><span className="pp-ba-label">After</span></div>
        </div>
      </section>

      <hr className="pp-divider" />

      {/* Reviews */}
      <section className="pp-section">
        <div className="pp-section-label">Customer reviews</div>
        <h2 className="pp-section-title">What people are saying</h2>
        <div className="pp-reviews-grid">
          {REVIEWS.map(r => (
            <div key={r.name} className="pp-review-card">
              <div className="pp-review-stars">
                {[...Array(r.rating)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill={P.brass}>
                    <polygon points="8,1.5 10,6 15,6.5 11.5,10 12.5,15 8,12.5 3.5,15 4.5,10 1,6.5 6,6" />
                  </svg>
                ))}
              </div>
              <p className="pp-review-text">"{r.text}"</p>
              <div className="pp-review-name">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="pp-cta-section">
        <div className="pp-cta-label">Ready to disconnect from pain</div>
        <h2 className="pp-cta-title">Your neck deserves a break.</h2>
        <p className="pp-cta-sub">Join 2,847 people who made the switch. Free shipping. 30-day guarantee.</p>
        <button className="pp-cta-btn" onClick={goToCheckout}>
          Get Yours Now — $29.99
        </button>
      </section>

      {/* Popup */}
      {showPopup && <Popup onDismiss={handleDismiss} />}
    </div>
  );
}

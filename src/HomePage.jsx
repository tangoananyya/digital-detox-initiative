import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const P = {
  linen: '#F2EDE4',
  charcoal: '#1E1B16',
  charcoalSoft: 'rgba(30,27,22,0.65)',
  brass: '#B07D3A',
  brassLight: 'rgba(176,125,58,0.15)',
  sage: '#3A5230',
  sageBg: '#E8E2D9',
  border: 'rgba(30,27,22,0.09)',
  haze: '#9C968A',
};

const BASE = import.meta.env.BASE_URL;

const HERO_IMAGES = [
  `${BASE}images/home1.png`,
  `${BASE}images/home2.png`,
  `${BASE}images/home3.png`,
  `${BASE}images/home4.png`,
  `${BASE}images/home5.png`,
];

const PRODUCT_GRID = [
  { src: `${BASE}images/hero.png`,              href: '/' },
  { src: `${BASE}images/back2.png`,             href: '/back-stretcher' },
  { src: `${BASE}images/ballm2.png`,            href: '/roller' },
  { src: `${BASE}images/robomassage5.png`,      href: '/massager' },
  { src: `${BASE}images/posture2.png`,          href: '/posture' },
  { src: `${BASE}images/compressionglove1.png`, href: '/gloves' },
];

const STATS = [
  {
    rawNum: 8, suffix: '+',
    headline: 'Hours the average person spends on screens daily',
    body: 'Forward head posture begins forming after just 20 minutes of looking down at a device. Most people do this for 8 hours straight.',
  },
  {
    rawNum: 12, suffix: 'kg',
    headline: 'Extra load on your cervical spine when your head tilts forward',
    body: 'For every inch your head moves forward from neutral, your spine experiences an additional 10 pounds of pressure.',
  },
  {
    rawNum: 73, suffix: '%',
    headline: 'Of desk workers report chronic neck or back pain',
    body: 'The majority of people sitting at screens right now are accumulating damage they will not feel for months or years.',
  },
];

const REVIEWS = [
  {
    name: 'Nadia F.', rating: 5,
    text: 'Bought this on a whim during a flare-up and cried the first time I used it. I have a bulging disc and this gave me more relief in 10 minutes than I got from a cortisone shot. Obviously not medical advice but wow.',
    product: 'Neck Relaxer',
  },
  {
    name: 'Carmen L.', rating: 5,
    text: 'I have scoliosis and have tried everything. This is the first thing that has actually given me consistent relief. I use it twice a day now and my physio is genuinely impressed.',
    product: 'Back Stretcher',
  },
  {
    name: 'Nina B.', rating: 5,
    text: 'OK I was so skeptical but three weeks in and I genuinely cannot believe the difference. I catch myself sitting up straight without even thinking about it now. Worth every penny.',
    product: 'Posture Corrector',
  },
];

function StatCounter({ rawNum, suffix, started }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const steps = 55;
    const increment = rawNum / steps;
    const interval = 1600 / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= rawNum) { setCount(rawNum); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, interval);
    return () => clearInterval(timer);
  }, [started, rawNum]);
  return <>{count}{suffix}</>;
}

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % HERO_IMAGES.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('hp-revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.hp-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: P.linen, color: P.charcoal, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }

        .hp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; transition: background 0.4s ease, border-bottom-color 0.4s ease, backdrop-filter 0.4s ease; border-bottom: 1px solid transparent; }
        .hp-nav--solid { background: rgba(242,237,228,0.96); backdrop-filter: blur(10px); border-bottom-color: ${P.border}; }
        .hp-nav-brand { display: flex; align-items: center; gap: 8px; }
        .hp-brand-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; }
        .hp-brand-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.75); transition: color 0.4s; }
        .hp-nav--solid .hp-brand-text { color: ${P.charcoalSoft}; }
        .hp-nav-right { display: flex; align-items: center; gap: 20px; }
        .hp-nav-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.85); background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; transition: color 0.18s; display: flex; align-items: center; }
        .hp-nav--solid .hp-nav-link { color: ${P.charcoal}; }
        .hp-nav-link:hover { color: ${P.brass}; }
        .hp-nav-quiz { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.brass}; background: transparent; border: 1.5px solid ${P.brass}; border-radius: 20px; padding: 6px 13px; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: background 0.18s, color 0.18s; white-space: nowrap; }
        .hp-nav-quiz:hover { background: ${P.brass}; color: #fff; }

        .hp-hero { position: relative; width: 100%; height: 100vh; min-height: 600px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .hp-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 1.8s ease; }
        .hp-hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.52); }
        .hp-hero-content { position: relative; z-index: 2; text-align: center; padding: 0 24px; max-width: 860px; }
        .hp-hero-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 24px; }
        .hp-hero-headline { font-family: 'Space Grotesk', sans-serif; font-size: 72px; font-weight: 800; color: #fff; line-height: 1.04; letter-spacing: -0.025em; margin: 0 0 24px; }
        .hp-hero-sub { font-size: 20px; line-height: 1.65; color: rgba(255,255,255,0.75); margin: 0 auto 40px; max-width: 600px; }
        .hp-hero-btns { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .hp-btn-brass { padding: 16px 32px; background: ${P.brass}; color: #fff; border: none; border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.18s; white-space: nowrap; }
        .hp-btn-brass:hover { background: #9A6B2F; }
        .hp-btn-outline-white { padding: 15px 32px; background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.65); border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: border-color 0.18s, background 0.18s; white-space: nowrap; }
        .hp-btn-outline-white:hover { border-color: #fff; background: rgba(255,255,255,0.08); }
        .hp-scroll-arrow { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); z-index: 3; animation: hp-bounce 2.2s ease-in-out infinite; }
        @keyframes hp-bounce { 0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.55; } 50% { transform: translateX(-50%) translateY(9px); opacity: 0.3; } }

        .hp-stats { background: ${P.charcoal}; padding: 100px 24px; }
        .hp-stats-inner { max-width: 1800px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 52px; }
        .hp-stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 84px; font-weight: 800; color: ${P.brass}; line-height: 1; margin-bottom: 18px; letter-spacing: -0.03em; }
        .hp-stat-headline { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 12px; line-height: 1.4; }
        .hp-stat-body { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.48); margin: 0; }



        .hp-quiz-cta { background: ${P.sage}; padding: 100px 24px; text-align: center; }
        .hp-quiz-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 20px; }
        .hp-quiz-headline { font-family: 'Space Grotesk', sans-serif; font-size: 52px; font-weight: 800; color: #fff; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 20px; }
        .hp-quiz-sub { font-size: 17px; line-height: 1.65; color: rgba(255,255,255,0.7); margin: 0 auto 40px; max-width: 520px; }
        .hp-btn-outline-sage { display: inline-block; padding: 17px 36px; background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.7); border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; text-decoration: none; transition: background 0.18s, border-color 0.18s; }
        .hp-btn-outline-sage:hover { background: rgba(255,255,255,0.1); border-color: #fff; }
        .hp-quiz-note { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.33); margin-top: 22px; }

        .hp-reviews { background: #FAF7F2; padding: 100px 24px; }
        .hp-reviews-inner { max-width: 1800px; margin: 0 auto; }
        .hp-reviews-label { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.charcoalSoft}; text-align: center; margin-bottom: 12px; }
        .hp-reviews-headline { font-family: 'Space Grotesk', sans-serif; font-size: 34px; font-weight: 700; color: ${P.charcoal}; text-align: center; margin: 0 0 52px; }
        .hp-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hp-review-card { background: ${P.linen}; border: 1px solid ${P.border}; border-radius: 20px; padding: 32px 28px; display: flex; flex-direction: column; }
        .hp-review-stars { display: flex; gap: 3px; margin-bottom: 16px; }
        .hp-review-text { font-size: 15px; line-height: 1.72; color: ${P.charcoalSoft}; margin: 0 0 24px; font-style: italic; flex: 1; }
        .hp-review-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
        .hp-review-name { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; color: ${P.charcoal}; }
        .hp-review-product { font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: ${P.brass}; background: ${P.brassLight}; padding: 3px 8px; border-radius: 5px; }



        .hp-final-cta { background: ${P.charcoal}; padding: 120px 24px; text-align: center; }
        .hp-final-headline { font-family: 'Space Grotesk', sans-serif; font-size: 44px; font-weight: 800; color: #fff; line-height: 1.15; letter-spacing: -0.02em; margin: 0 auto 40px; max-width: 700px; }
        .hp-final-note { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-top: 24px; }

        .hp-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.72s ease, transform 0.72s ease; }
        .hp-revealed { opacity: 1; transform: translateY(0); }
        .hp-reveal--d1 { transition-delay: 0.1s; }
        .hp-reveal--d2 { transition-delay: 0.2s; }
        .hp-reveal--d3 { transition-delay: 0.3s; }

        @media (max-width: 900px) {
          .hp-stats-inner { grid-template-columns: 1fr; gap: 48px; }
          .hp-stat-num { font-size: 64px; }
          .hp-reviews-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .hp-hero-headline { font-size: 44px; }
          .hp-hero-sub { font-size: 16px; }
          .hp-quiz-headline { font-size: 36px; }
          .hp-final-headline { font-size: 30px; }
        }
        @media (max-width: 560px) {
          .hp-nav { padding: 16px 20px; }
          .hp-nav-link { display: none; }
          .hp-nav-right { gap: 12px; }
          .hp-hero-headline { font-size: 32px; }
          .hp-hero-sub { font-size: 15px; }
        }
        @media (max-width: 400px) {
          .hp-brand-text { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hp-reveal, .hp-revealed { opacity: 1; transform: none; transition: none; }
          .hp-scroll-arrow { animation: none; }
          .hp-hero-img { transition: none; }
          .hp-product-img-link img { transition: none; }
        }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav className={`hp-nav${navSolid ? ' hp-nav--solid' : ''}`}>
        <Link to="/home" className="hp-nav-brand" style={{ textDecoration: 'none' }}>
          <span className="hp-brand-dot" />
          <span className="hp-brand-text">Digital Detox Initiative</span>
        </Link>
        <div className="hp-nav-right">
          <Link to="/products" className="hp-nav-link">All Products</Link>
          <Link to="/quiz" className="hp-nav-quiz">
            Find Your Fix
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="2" y1="6.5" x2="11" y2="6.5"/><polyline points="7,2.5 11,6.5 7,10.5"/>
            </svg>
          </Link>
        </div>
      </nav>

      {/* ── SECTION 1: HERO ──────────────────────────────────────── */}
      <section className="hp-hero">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="hp-hero-img"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
          />
        ))}
        <div className="hp-hero-overlay" />
        <div className="hp-hero-content">
          <div className="hp-hero-label">The Digital Detox Initiative</div>
          <h1 className="hp-hero-headline">Your body was not built for this.</h1>
          <p className="hp-hero-sub">
            Screens have reshaped your posture, compressed your spine, and rewired your nervous system. We made the tools to undo it.
          </p>
          <div className="hp-hero-btns">
            <Link to="/products" className="hp-btn-brass">Shop the Collection</Link>
            <Link to="/quiz" className="hp-btn-outline-white">Find Your Fix</Link>
          </div>
        </div>
        <div className="hp-scroll-arrow" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="4" x2="12" y2="20"/><polyline points="8,16 12,20 16,16"/>
          </svg>
        </div>
      </section>

      {/* ── SECTION 2: THE PROBLEM ───────────────────────────────── */}
      <section className="hp-stats" ref={statsRef}>
        <div className="hp-stats-inner">
          {STATS.map((s, i) => (
            <div key={i} className={`hp-reveal${i === 1 ? ' hp-reveal--d1' : i === 2 ? ' hp-reveal--d2' : ''}`}>
              <div className="hp-stat-num">
                <StatCounter rawNum={s.rawNum} suffix={s.suffix} started={statsStarted} />
              </div>
              <div className="hp-stat-headline">{s.headline}</div>
              <p className="hp-stat-body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: QUIZ CTA ──────────────────────────────────── */}
      <section className="hp-quiz-cta">
        <div className="hp-reveal">
          <div className="hp-quiz-label">60-second assessment</div>
          <h2 className="hp-quiz-headline">Not sure where to start?</h2>
          <p className="hp-quiz-sub">
            Answer 8 questions about your screen habits and we will tell you exactly which product your body needs and why.
          </p>
          <Link to="/quiz" className="hp-btn-outline-sage">Take the Free Assessment</Link>
          <p className="hp-quiz-note">No email required · No account needed · Just answers</p>
        </div>
      </section>

      {/* ── SECTION 5: SOCIAL PROOF ──────────────────────────────── */}
      <section className="hp-reviews">
        <div className="hp-reviews-inner">
          <div className="hp-reviews-label hp-reveal">Verified purchases</div>
          <h2 className="hp-reviews-headline hp-reveal">What happens when people actually disconnect.</h2>
          <div className="hp-reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`hp-review-card hp-reveal${i === 1 ? ' hp-reveal--d1' : i === 2 ? ' hp-reveal--d2' : ''}`}>
                <div className="hp-review-stars">
                  {[...Array(r.rating)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 16 16" fill={P.brass}>
                      <polygon points="8,1.5 10,6 15,6.5 11.5,10 12.5,15 8,12.5 3.5,15 4.5,10 1,6.5 6,6" />
                    </svg>
                  ))}
                </div>
                <p className="hp-review-text">"{r.text}"</p>
                <div className="hp-review-footer">
                  <span className="hp-review-name">{r.name}</span>
                  <span className="hp-review-product">{r.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FINAL CTA ─────────────────────────────────── */}
      <section className="hp-final-cta">
        <div className="hp-reveal">
          <h2 className="hp-final-headline">
            The screen is not going anywhere. But the damage does not have to stay either.
          </h2>
          <Link to="/products" className="hp-btn-brass" style={{ fontSize: 16, padding: '17px 36px' }}>
            Shop the Full Collection
          </Link>
          <p className="hp-final-note">Free shipping over $49 · 30-day guarantee · Ships in 3 days</p>
        </div>
      </section>
    </div>
  );
}

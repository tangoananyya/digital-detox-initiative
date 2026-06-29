import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const P = {
  linen: '#FBF9F4',
  charcoal: '#1E1B16',
  charcoalSoft: 'rgba(30,27,22,0.65)',
  brass: '#B07D3A',
  brassLight: '#F5ECD8',
  sage: '#3A5230',
  sageBg: '#EEF2EB',
  border: 'rgba(30,27,22,0.1)',
  haze: '#9C968A',
};

function StarRow({ rating, count }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < full ? P.brass : (i === full && half ? P.brass : '#D8D0C4')} opacity={i === full && half ? 0.55 : 1}>
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
  if (type === 'percuss') return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={P.brass} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="5" stroke={P.charcoal} strokeWidth="1.8" fill="none" />
      <line x1="16" y1="8" x2="16" y2="11" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="21" x2="16" y2="24" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="8" y1="16" x2="11" y2="16" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21" y1="16" x2="24" y2="16" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
  if (type === 'quiet') return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={P.brass} strokeWidth="1.5" />
      <path d="M16 8 C12 8 10 12 10 16 C10 20 12 24 16 24" stroke={P.charcoal} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M16 8 C20 8 22 12 22 16 C22 20 20 24 16 24" stroke={P.brass} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={P.brass} strokeWidth="1.5" />
      <line x1="16" y1="8" x2="16" y2="24" stroke={P.charcoal} strokeWidth="2" strokeLinecap="round" />
      {[10, 14, 18, 22].map(y => <line key={y} x1="13" y1={y} x2="19" y2={y} stroke={P.brass} strokeWidth="1.5" strokeLinecap="round" />)}
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
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);
  const handleDismiss = () => { setVisible(false); setTimeout(onDismiss, 380); };
  return (
    <div onClick={handleDismiss} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(30,27,22,0.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '32px 28px 28px', maxWidth: 440, width: '100%', boxShadow: '0 -8px 40px rgba(30,27,22,0.18)', border: `1px solid ${P.border}`, transform: `translateY(${visible ? '0' : '100%'})`, transition: 'transform 0.38s cubic-bezier(.32,.72,0,1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ padding: '10px 14px', background: P.brassLight, borderRadius: 12, display: 'inline-flex' }}><GaugeIcon /></div>
        </div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: P.charcoal, textAlign: 'center', margin: '0 0 10px', lineHeight: 1.25 }}>Spending too much time on screens?</h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: P.charcoalSoft, textAlign: 'center', margin: '0 0 24px' }}>Take our 60-second assessment to learn what screen time is doing to your body and how to reverse it.</p>
        <Link to="/quiz" style={{ display: 'block', width: '100%', padding: '15px 18px', background: P.brass, color: '#fff', borderRadius: 13, fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box', marginBottom: 10 }}>Take the Free Assessment</Link>
        <button onClick={handleDismiss} style={{ display: 'block', width: '100%', padding: '12px 18px', background: 'transparent', border: 'none', fontFamily: "'Inter', sans-serif", fontSize: 14, color: P.charcoalSoft, cursor: 'pointer' }}>No thanks</button>
      </div>
    </div>
  );
}

async function goToCheckout(productName, productPrice) {
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName, productPrice }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch (err) {
    console.error('Checkout error', err);
    alert('Unable to process checkout. Please try again.');
  }
}

const REVIEWS = [
  { name: 'Tanya M.',   rating: 5, text: 'i use this literally every single day. at my desk, on the couch, in bed. it has basically replaced my monthly massage appointments and saved me so much money' },
  { name: 'Ben C.',     rating: 4, text: 'Really impressive for the size. I was expecting it to feel cheap but it feels solid and the motor is genuinely powerful. Quiet enough to use at my standing desk between calls.' },
  { name: 'Keisha R.',  rating: 5, text: 'ok the sky blue colour is SO pretty and the product actually works?? was not expecting both. use it on my shoulders every night and wake up feeling way less stiff' },
  { name: 'Oliver T.',  rating: 5, text: 'I bought this as a backup for travel and now it is my main one. Fits in my laptop bag, charges fast, lasts for days. The percussion depth is way better than massagers twice the price.' },
  { name: 'Amara S.',   rating: 4, text: 'good product, does what it says. the lowest setting is perfect for days when i am really sore and just need something gentle. only wish it came with two head attachments' },
  { name: 'Chris W.',   rating: 5, text: 'been dealing with a trapped nerve in my shoulder for months. physio recommended percussion therapy and this is exactly what she described. genuinely life changing for the price' },
  { name: 'Jade L.',    rating: 5, text: 'bought the mint one and it is so cute i almost did not want to use it lol. but it works incredibly well. the noise level is actually silent, i use it while my baby is sleeping' },
  { name: 'Noah B.',    rating: 4, text: 'solid build quality and the battery lasts way longer than expected. use it on my calves and lower back after long days at the office. would definitely buy again' },
];

function ReviewCarousel({ reviews }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const update = () => { const v = mq.matches ? 1 : 3; setVisible(v); setCurrent(c => Math.min(c, reviews.length - v)); };
    update(); mq.addEventListener('change', update); return () => mq.removeEventListener('change', update);
  }, [reviews.length]);
  const maxIndex = reviews.length - visible;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent(c => c >= maxIndex ? 0 : c + 1), 5000);
    return () => clearInterval(t);
  }, [paused, maxIndex]);
  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));
  const trackW = `${(reviews.length / visible) * 100}%`;
  const cardW  = `${100 / reviews.length}%`;
  const tx     = `${(current / reviews.length) * 100}%`;
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div style={{ position: 'relative', padding: '0 52px' }}>
        <button className="pp-carousel-arrow pp-carousel-arrow-prev" onClick={prev} disabled={current === 0} aria-label="Previous reviews">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11,4 6,9 11,14"/></svg>
        </button>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', width: trackW, transform: `translateX(-${tx})`, transition: 'transform 0.48s cubic-bezier(.4,0,.2,1)' }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ width: cardW, padding: '0 10px', boxSizing: 'border-box' }}>
                <div className="pp-review-card">
                  <div className="pp-review-stars">{[...Array(r.rating)].map((_, j) => (<svg key={j} width="14" height="14" viewBox="0 0 16 16" fill={P.brass}><polygon points="8,1.5 10,6 15,6.5 11.5,10 12.5,15 8,12.5 3.5,15 4.5,10 1,6.5 6,6" /></svg>))}</div>
                  <p className="pp-review-text">"{r.text}"</p>
                  <div className="pp-review-name">{r.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="pp-carousel-arrow pp-carousel-arrow-next" onClick={next} disabled={current === maxIndex} aria-label="Next reviews">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="7,4 12,9 7,14"/></svg>
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 28 }}>
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 4, background: i === current ? P.brass : 'rgba(30,27,22,0.16)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }} />
        ))}
      </div>
    </div>
  );
}

const BASE = import.meta.env.BASE_URL;
const ALL_THUMBS = ['robomassage1','robomassage2','robomassage3','robomassage4','robomassage5'].map(n => `${BASE}images/${n}.png`);
const COLOR_CONFIG = {
  mint:  { hero: `${BASE}images/robomassage1.png`, thumbs: ALL_THUMBS },
  blush: { hero: `${BASE}images/robomassage3.png`, thumbs: ALL_THUMBS },
  sky:   { hero: `${BASE}images/robomassage4.png`, thumbs: ALL_THUMBS },
};

function CartDrawer({ cart, open, onClose, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <>
      <div onClick={onClose} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 800, background: 'rgba(30,27,22,0.45)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.32s ease' }} />
      <div role="dialog" aria-label="Shopping cart" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 380, background: '#fff', zIndex: 900, display: 'flex', flexDirection: 'column', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.36s cubic-bezier(.32,.72,0,1)', boxShadow: '-8px 0 48px rgba(30,27,22,0.14)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${P.border}`, flexShrink: 0 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: P.charcoal }}>Your Cart</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: P.charcoal, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="3" x2="15" y2="15"/><line x1="15" y1="3" x2="3" y2="15"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: P.brass, display: 'inline-block' }} />
              <span style={{ fontSize: 14.5, color: P.charcoalSoft }}>Your cart is empty</span>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 0', borderBottom: `1px solid ${P.border}` }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14.5, fontWeight: 600, color: P.charcoal, marginBottom: 3, lineHeight: 1.3 }}>{item.name}</div>
                {item.color && <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.charcoalSoft, marginBottom: 10 }}>{item.color}</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${P.border}`, borderRadius: 8, overflow: 'hidden' }}>
                    <button className="pp-drawer-qty-btn" onClick={() => onUpdateQty(item.id, -1)}>−</button>
                    <span style={{ width: 30, textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, borderLeft: `1px solid ${P.border}`, borderRight: `1px solid ${P.border}`, lineHeight: '30px' }}>{item.qty}</span>
                    <button className="pp-drawer-qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11.5, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.08em', color: P.charcoalSoft, textDecoration: 'underline', padding: 0 }}>Remove</button>
                </div>
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: P.charcoal, flexShrink: 0, paddingTop: 2 }}>${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: `1px solid ${P.border}`, flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: P.charcoalSoft }}>Subtotal</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: P.charcoal }}>${total.toFixed(2)}</span>
            </div>
            <button className="pp-atc" onClick={onCheckout} style={{ margin: 0 }}>Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default function MiniMassager() {
  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [color, setColor] = useState('sky');
  const [heroImg, setHeroImg] = useState(`${BASE}images/robomassage5.png`);
  const [zoom, setZoom] = useState({ active: false, x: 0.5, y: 0.5, clientX: 0, clientY: 0, rect: null });
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [viewerCount, setViewerCount] = useState(40);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef(null);

  const totalCartItems = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    const t = setInterval(() => setViewerCount(Math.floor(Math.random() * 15) + 33), 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (heroRef.current) setShowStickyBar(heroRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.pp-reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('pp-revealed'); obs.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addToCart = () => {
    const colorLabel = color.charAt(0).toUpperCase() + color.slice(1);
    const id = `mini-massager::${color}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id, name: 'Mini Handheld Percussion Massager', color: colorLabel, price: 29.99, qty }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const checkoutCart = async () => {
    if (cart.length === 0) return;
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map(i => ({ name: `${i.name} (${i.color})`, price: i.price, qty: i.qty })) }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error', err);
      alert('Unable to process checkout. Please try again.');
    }
  };

  const ZOOM_FACTOR = 2.5;
  const LENS_R = 90;

  const handleColorSelect = (key) => { setColor(key); setHeroImg(COLOR_CONFIG[key].hero); };
  const handleThumbClick  = (src) => setHeroImg(src);

  const handleZoomMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({ active: true, x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)), clientX: e.clientX, clientY: e.clientY, rect });
  };
  const handleZoomLeave = () => setZoom(z => ({ ...z, active: false }));

  useEffect(() => {
    if (sessionStorage.getItem('ddi_popup_dismissed')) return;
    const t = setTimeout(() => setShowPopup(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => { setShowPopup(false); sessionStorage.setItem('ddi_popup_dismissed', '1'); };

  return (
    <div style={{ minHeight: '100vh', background: P.linen, color: P.charcoal, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }

        .pp-nav { position: sticky; top: 0; z-index: 100; background: rgba(251,249,244,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid ${P.border}; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; overflow: hidden; }
        .pp-nav::after { content: ''; position: absolute; bottom: 0; left: 0; height: 1px; width: 0; background: ${P.brass}; animation: pp-nav-border 0.8s ease 0.2s forwards; }
        .pp-nav-brand { display: flex; align-items: center; gap: 8px; }
        .pp-brand-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; }
        .pp-brand-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.charcoalSoft}; }
        .pp-nav-right { display: flex; align-items: center; gap: 20px; }
        .pp-nav-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.charcoal}; background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; transition: color 0.18s; display: flex; align-items: center; }
        .pp-nav-link:hover { color: ${P.brass}; }
        .pp-nav-quiz { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.brass}; background: transparent; border: 1.5px solid ${P.brass}; border-radius: 20px; padding: 6px 13px; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: background 0.18s, color 0.18s; white-space: nowrap; }
        .pp-nav-quiz:hover { background: ${P.brass}; color: #fff; }
        .pp-cart-icon-btn { background: none; border: none; cursor: pointer; position: relative; padding: 7px; color: ${P.charcoal}; display: flex; align-items: center; border-radius: 10px; transition: background 0.15s; flex-shrink: 0; }
        .pp-cart-icon-btn:hover { background: ${P.sageBg}; }
        .pp-cart-badge { position: absolute; top: 1px; right: 1px; background: ${P.brass}; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-family: 'IBM Plex Mono', monospace; font-size: 9px; display: flex; align-items: center; justify-content: center; font-weight: 600; pointer-events: none; line-height: 1; }

        .pp-hero { max-width: 1100px; margin: 0 auto; padding: 56px 24px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        @media (max-width: 720px) { .pp-hero { grid-template-columns: 1fr; gap: 32px; padding: 32px 20px; } }

        .pp-badge { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: ${P.brass}; background: ${P.brassLight}; border-radius: 6px; padding: 4px 10px; display: inline-block; margin-bottom: 14px; position: relative; overflow: hidden; }
        .pp-badge::after { content: ''; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%); background-size: 200% 100%; animation: pp-shimmer 3s ease-in-out 1s infinite; }
        .pp-headline { font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 16px; }
        @media (max-width: 480px) { .pp-headline { font-size: 30px; } }

        .pp-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; }
        .pp-price { font-family: 'Space Grotesk', sans-serif; font-size: 48px; font-weight: 800; color: ${P.charcoal}; position: relative; display: inline-block; line-height: 1; }
        .pp-price::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; width: 0; background: ${P.brass}; animation: pp-underline 0.9s ease 0.5s forwards; }
        .pp-price-strike { font-size: 18px; color: ${P.charcoalSoft}; text-decoration: line-through; }
        .pp-save { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: ${P.sage}; background: ${P.sageBg}; padding: 3px 8px; border-radius: 5px; letter-spacing: 0.08em; }

        .pp-bullets { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 10px; }
        .pp-bullet { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; line-height: 1.55; color: ${P.charcoalSoft}; }
        .pp-bullet-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; flex-shrink: 0; margin-top: 6px; box-shadow: 0 0 0 0 rgba(176,125,58,0.4); animation: pp-dot-glow 3s ease-in-out infinite; }

        .pp-qty-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .pp-qty-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${P.charcoalSoft}; }
        .pp-qty-ctrl { display: flex; align-items: center; border: 1px solid ${P.border}; border-radius: 10px; overflow: hidden; }
        .pp-qty-btn { width: 38px; height: 38px; background: transparent; border: none; font-size: 18px; cursor: pointer; color: ${P.charcoal}; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
        .pp-qty-btn:hover { background: ${P.sageBg}; }
        .pp-qty-num { width: 40px; text-align: center; font-family: 'IBM Plex Mono', monospace; font-size: 14px; border-left: 1px solid ${P.border}; border-right: 1px solid ${P.border}; line-height: 38px; }

        .pp-atc { width: 100%; padding: 16px 18px; background: ${P.brass}; color: #fff; border: none; border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; margin-bottom: 10px; transition: background 0.18s; position: relative; overflow: hidden; }
        .pp-atc:hover { background: #9A6B2F; }
        .pp-atc::after { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent); animation: pp-btn-shimmer 4s ease-in-out 2s infinite; pointer-events: none; }
        .pp-buy-now { width: 100%; padding: 14px 18px; background: transparent; color: ${P.charcoal}; border: 1.5px solid rgba(30,27,22,0.28); border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; margin-bottom: 16px; transition: border-color 0.18s, background 0.18s; }
        .pp-buy-now:hover { border-color: ${P.charcoal}; background: rgba(30,27,22,0.04); }

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
        .pp-benefit-desc { font-size: 13.5px; color: ${P.charcoalSoft}; line-height: 1.65; margin: 0; }

        .pp-desc { max-width: 680px; margin: 0 auto; }
        .pp-desc p { font-size: 15.5px; line-height: 1.78; color: ${P.charcoalSoft}; margin: 0 0 18px; }
        .pp-specs { max-width: 680px; margin: 32px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid ${P.border}; }
        @media (max-width: 560px) { .pp-specs { grid-template-columns: repeat(2, 1fr); } }
        .pp-spec { padding: 18px 0; border-bottom: 1px solid ${P.border}; }
        .pp-spec:not(:nth-child(3n)) { border-right: 1px solid ${P.border}; padding-right: 24px; }
        .pp-spec:not(:nth-child(3n+1)) { padding-left: 24px; }
        .pp-spec-label { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: ${P.haze}; margin-bottom: 5px; }
        .pp-spec-value { font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 600; color: ${P.charcoal}; }

        .pp-review-card { background: #fff; border: 1px solid ${P.border}; border-radius: 18px; padding: 26px 22px; height: 100%; box-sizing: border-box; }
        .pp-carousel-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 1px solid ${P.border}; cursor: pointer; display: flex; align-items: center; justify-content: center; color: ${P.charcoal}; z-index: 2; box-shadow: 0 2px 8px rgba(30,27,22,0.09); transition: background 0.15s, border-color 0.15s; padding: 0; }
        .pp-carousel-arrow:hover:not(:disabled) { background: ${P.sageBg}; border-color: rgba(30,27,22,0.25); }
        .pp-carousel-arrow:disabled { opacity: 0.3; cursor: default; }
        .pp-carousel-arrow-prev { left: 0; }
        .pp-carousel-arrow-next { right: 0; }
        .pp-review-stars { display: flex; gap: 3px; margin-bottom: 12px; }
        .pp-review-text { font-size: 14px; line-height: 1.72; color: ${P.charcoalSoft}; margin: 0 0 16px; font-style: italic; }
        .pp-review-name { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${P.charcoal}; }

        .pp-cta-section { background: ${P.charcoal}; padding: 80px 24px; text-align: center; }
        .pp-cta-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(251,249,244,0.45); margin-bottom: 14px; }
        .pp-cta-title { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; color: ${P.linen}; margin: 0 0 14px; }
        @media (max-width: 480px) { .pp-cta-title { font-size: 26px; } }
        .pp-cta-sub { font-size: 16px; color: rgba(251,249,244,0.6); margin: 0 0 36px; line-height: 1.65; }
        .pp-cta-btn { display: inline-block; padding: 17px 36px; background: ${P.brass}; color: #fff; border: none; border-radius: 14px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.18s; }
        .pp-cta-btn:hover { background: #9A6B2F; }

        .pp-divider { border: none; border-top: 1px solid ${P.border}; margin: 0; }

        .pp-hero-wrap { width: 100%; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 20px; }
        .pp-hero-img { width: 100%; height: 100%; object-fit: cover; display: block; animation: pp-hero-zoom 8s ease forwards; transform-origin: center center; }
        .pp-thumbs { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
        .pp-thumb-btn { padding: 0; background: none; border: none; border-radius: 10px; cursor: pointer; outline-offset: 3px !important; transition: opacity 0.15s; width: 80px; aspect-ratio: 1 / 1; overflow: hidden; flex-shrink: 0; }
        .pp-thumb-btn:hover { opacity: 0.82; }
        .pp-thumb-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pp-swatches { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
        .pp-swatch-btn { display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; padding: 4px; border-radius: 50px; }
        .pp-swatch-circle { width: 26px; height: 26px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        .pp-swatch-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: ${P.charcoalSoft}; }

        .pp-drawer-qty-btn { width: 30px; height: 30px; background: transparent; border: none; font-size: 16px; cursor: pointer; color: ${P.charcoal}; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
        .pp-drawer-qty-btn:hover { background: ${P.sageBg}; }

        .pp-viewer-dot { width: 7px; height: 7px; border-radius: 50%; background: #3D9E65; display: inline-block; flex-shrink: 0; animation: pp-pulse 2s ease-in-out infinite; }
        .pp-viewer-row { display: flex; align-items: center; gap: 7px; margin-bottom: 16px; }
        .pp-viewer-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: ${P.charcoalSoft}; }
        .pp-stock-row { display: flex; align-items: center; gap: 7px; margin-bottom: 16px; }
        .pp-stock-dot { width: 6px; height: 6px; border-radius: 50%; background: ${P.brass}; display: inline-block; flex-shrink: 0; }
        .pp-stock-text { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: ${P.brass}; }

        .pp-sticky-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 500; background: rgba(251,249,244,0.96); backdrop-filter: blur(12px); border-top: 1px solid ${P.border}; padding: 14px 24px; display: flex; align-items: center; gap: 16px; transform: translateY(100%); transition: transform 0.36s cubic-bezier(.32,.72,0,1); }
        .pp-sticky-bar--visible { transform: translateY(0); }
        .pp-sticky-name { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 700; color: ${P.charcoal}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pp-sticky-meta { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.1em; color: ${P.charcoalSoft}; text-transform: uppercase; margin-top: 2px; }
        .pp-sticky-atc { flex-shrink: 0; padding: 12px 22px; background: ${P.brass}; color: #fff; border: none; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.18s; white-space: nowrap; }
        .pp-sticky-atc:hover { background: #9A6B2F; }

        .pp-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .pp-revealed { opacity: 1; transform: translateY(0); }

        @keyframes pp-shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        @keyframes pp-btn-shimmer { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes pp-underline { to { width: 100%; } }
        @keyframes pp-hero-zoom { from { transform: scale(1); } to { transform: scale(1.03); } }
        @keyframes pp-nav-border { to { width: 100%; } }
        @keyframes pp-dot-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(176,125,58,0.4); } 50% { box-shadow: 0 0 0 5px rgba(176,125,58,0); } }
        @keyframes pp-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.45; transform: scale(0.75); } }

        @media (prefers-reduced-motion: reduce) { .pp-atc, .pp-qty-btn, .pp-cta-btn, .pp-thumb-btn { transition: none; } .pp-badge::after, .pp-atc::after, .pp-hero-img, .pp-nav::after, .pp-bullet-dot, .pp-viewer-dot { animation: none; } .pp-price::after { width: 100%; animation: none; } .pp-reveal, .pp-revealed { opacity: 1; transform: none; transition: none; } }
      `}</style>

      <nav className="pp-nav">
        <div className="pp-nav-brand">
          <span className="pp-brand-dot" />
          <span className="pp-brand-text">Digital Detox Initiative</span>
        </div>
        <div className="pp-nav-right">
          <Link to="/products" className="pp-nav-link">All Products</Link>
          <Link to="/quiz" className="pp-nav-quiz">
            Find Your Fix
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="2" y1="6.5" x2="11" y2="6.5"/><polyline points="7,2.5 11,6.5 7,10.5"/>
            </svg>
          </Link>
          <button className="pp-cart-icon-btn" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${totalCartItems} item${totalCartItems !== 1 ? 's' : ''}`}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h16l-1.4 9a2 2 0 01-2 1.7H6.4a2 2 0 01-2-1.7L3 8z"/><path d="M8 8V6a3 3 0 116 0v2"/>
            </svg>
            {totalCartItems > 0 && <span className="pp-cart-badge">{totalCartItems}</span>}
          </button>
        </div>
      </nav>

      <section className="pp-hero" ref={heroRef}>
        <div>
          <div className="pp-hero-wrap" onMouseMove={handleZoomMove} onMouseLeave={handleZoomLeave} style={{ cursor: zoom.active ? 'none' : 'default' }}>
            <img src={heroImg} alt="Mini Handheld Percussion Massager" className="pp-hero-img" />
          </div>
          <div className="pp-thumbs">
            {ALL_THUMBS.map((src) => (
              <button key={src} onClick={() => handleThumbClick(src)} className="pp-thumb-btn" style={{ outline: heroImg === src ? `2px solid ${P.brass}` : '2px solid transparent' }} aria-label="Select image">
                <img src={src} alt="" className="pp-thumb-img" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="pp-badge">Bestseller</div>
          <h1 className="pp-headline">
            Mini Handheld<br />
            <span style={{ fontWeight: 600 }}>Percussion Massager</span>
          </h1>
          <StarRow rating={4.7} count={2341} />
          <div className="pp-viewer-row">
            <span className="pp-viewer-dot" />
            <span className="pp-viewer-text">{viewerCount} people viewing this right now</span>
          </div>

          <div className="pp-swatches">
            {[
              { key: 'mint',  label: 'Mint',  fill: '#A8D5B5' },
              { key: 'blush', label: 'Blush', fill: '#F2C4CE' },
              { key: 'sky',   label: 'Sky',   fill: '#A8C8E8' },
            ].map(s => (
              <button key={s.key} onClick={() => handleColorSelect(s.key)} className="pp-swatch-btn" aria-label={s.label} title={s.label} style={{ outline: color === s.key ? `2px solid ${P.brass}` : '2px solid transparent', outlineOffset: 2 }}>
                <span className="pp-swatch-circle" style={{ background: s.fill, border: '1px solid rgba(30,27,22,0.12)' }} />
                <span className="pp-swatch-label">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="pp-stock-row">
            <span className="pp-stock-dot" />
            <span className="pp-stock-text">Only 11 left in stock</span>
          </div>

          <div className="pp-price-row">
            <span className="pp-price">$29.99</span>
            <span className="pp-price-strike">$59.99</span>
            <span className="pp-save">SAVE 50%</span>
          </div>

          <ul className="pp-bullets">
            <li className="pp-bullet"><span className="pp-bullet-dot" />Instant vibration therapy for tight shoulders, neck, and lower back after hours at a screen</li>
            <li className="pp-bullet"><span className="pp-bullet-dot" />3 intensity levels from gentle relaxation to deep percussion muscle relief</li>
            <li className="pp-bullet"><span className="pp-bullet-dot" />Whisper-quiet motor and compact design - use it at your desk without disturbing anyone</li>
          </ul>

          <div className="pp-qty-row">
            <span className="pp-qty-label">Qty</span>
            <div className="pp-qty-ctrl">
              <button className="pp-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="pp-qty-num">{qty}</span>
              <button className="pp-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <button className="pp-atc" onClick={addToCart}>Add to Cart</button>
          <button className="pp-buy-now" onClick={() => goToCheckout('Mini Handheld Percussion Massager', 29.99 * qty)}>Buy Now</button>

          <div className="pp-trust">
            <span className="pp-trust-badge"><span className="pp-trust-dot" />Free Shipping</span>
            <span className="pp-trust-badge"><span className="pp-trust-dot" />30-Day Guarantee</span>
            <span className="pp-trust-badge"><span className="pp-trust-dot" />Ships in 3 Days</span>
          </div>
        </div>
      </section>

      <hr className="pp-divider" />

      <section className="pp-section pp-reveal">
        <div className="pp-section-label">Why it works</div>
        <h2 className="pp-section-title">Designed for desk-life recovery</h2>
        <div className="pp-benefits-grid">
          {[
            { type: 'percuss', name: '6 Intensity Levels',           desc: 'Brushless motor with six settings lets you dial from gentle surface relaxation to deep tissue percussion - real relief at any sensitivity.' },
            { type: 'quiet',   name: 'Whisper-Quiet at Your Desk',   desc: 'Under 45 decibels means you can use it mid-meeting, mid-call, or in a quiet office without a second thought.' },
            { type: 'charge',  name: '3 Hours Per Charge',           desc: 'A full charge gets you through an entire work week of daily sessions on a single USB-C top-up.' },
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

      <section className="pp-section pp-reveal">
        <div className="pp-section-label">About this product</div>
        <h2 className="pp-section-title">Percussion Relief. Anywhere You Need It.</h2>
        <div className="pp-desc">
          <p>The Mini Handheld Percussion Massager delivers targeted vibration therapy at up to 3,200 percussions per minute through a high-torque brushless motor sealed inside an ergonomic body small enough to fit in a coat pocket. Three interchangeable intensity levels let you move from gentle surface relaxation to deep tissue percussion depending on how your body is feeling that day.</p>
          <p>The spherical silicone head is engineered to glide over muscle bellies without catching on bone or joint. Apply it to the base of your skull, across your trapezius, or down your lumbar and feel the vibration penetrate 12mm into the muscle tissue - far deeper than manual massage or foam rolling can reach.</p>
          <p>The whisper-quiet motor runs at under 45 decibels - quieter than a normal conversation - so you can use it at your desk between calls without anyone noticing. A single charge lasts up to 2 hours of continuous use. Comes with a USB charging cable and a soft travel pouch. At just 86 grams it weighs less than most smartphones, and the single-button control means there is no learning curve - press once to start, press again to cycle through all six intensity levels, hold to turn off.</p>
        </div>
        <div className="pp-specs">
          {[
            { label: 'Motor',    value: 'Brushless High-Torque' },
            { label: 'Speeds',   value: '6 Intensity Levels' },
            { label: 'Battery',  value: '500mAh, up to 2 hrs' },
            { label: 'Charging', value: 'USB, 5V 1A' },
            { label: 'Weight',   value: '86g - lighter than a smartphone' },
            { label: 'Colors',   value: 'Mint, Blush, Sky Blue' },
            { label: 'Control',  value: 'One-Button Operation' },
          ].map(s => (
            <div key={s.label} className="pp-spec">
              <div className="pp-spec-label">{s.label}</div>
              <div className="pp-spec-value">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="pp-divider" />

      <section className="pp-section pp-reveal">
        <div className="pp-section-label">Customer reviews</div>
        <h2 className="pp-section-title">What people are saying</h2>
        <ReviewCarousel reviews={REVIEWS} />
      </section>

      <section className="pp-cta-section pp-reveal">
        <div className="pp-cta-label">Ready to release</div>
        <h2 className="pp-cta-title">Three minutes. Three thousand percussions. Total release.</h2>
        <p className="pp-cta-sub">Free shipping on every order. 30-day guarantee.</p>
        <button className="pp-cta-btn" onClick={() => goToCheckout('Mini Handheld Percussion Massager', 29.99)}>
          Get Yours Now - $29.99
        </button>
      </section>

      <div className={`pp-sticky-bar${showStickyBar ? ' pp-sticky-bar--visible' : ''}`} aria-hidden={!showStickyBar}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="pp-sticky-name">Mini Handheld Percussion Massager</div>
          <div className="pp-sticky-meta">{color.charAt(0).toUpperCase() + color.slice(1)} · $29.99</div>
        </div>
        <button className="pp-sticky-atc" onClick={addToCart}>Add to Cart</button>
      </div>

      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateCartQty} onRemove={removeFromCart} onCheckout={checkoutCart} />

      {showPopup && <Popup onDismiss={handleDismiss} />}

      {zoom.active && zoom.rect && (
        <div aria-hidden="true" style={{ position: 'fixed', left: zoom.clientX - LENS_R, top: zoom.clientY - LENS_R, width: LENS_R * 2, height: LENS_R * 2, borderRadius: '50%', border: '2px solid #B07D3A', boxShadow: '0 4px 20px rgba(30,27,22,0.22)', backgroundImage: `url(${heroImg})`, backgroundSize: `${zoom.rect.width * ZOOM_FACTOR}px ${zoom.rect.height * ZOOM_FACTOR}px`, backgroundPosition: `${-(zoom.x * zoom.rect.width * ZOOM_FACTOR) + LENS_R}px ${-(zoom.y * zoom.rect.height * ZOOM_FACTOR) + LENS_R}px`, zIndex: 300, pointerEvents: 'none', overflow: 'hidden' }} />
      )}
    </div>
  );
}

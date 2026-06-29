import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=1920&q=80',
  'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&q=80',
  'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=1920&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=80',
  'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1920&q=80',
];

const QUESTIONS = [
  {
    key: 'screenHours',
    text: 'How many hours a day are you on screens?',
    options: ['Under 3 hours', '4 to 6 hours', '7 to 9 hours', '10 or more hours'],
  },
  {
    key: 'setup',
    text: "What's your primary screen setup?",
    options: ['Laptop at a desk', 'Phone in hands or lap', 'Multiple monitors', 'On the couch, in bed, or the floor'],
  },
  {
    key: 'pain',
    text: 'Where do you feel tension most?',
    options: ['Base of skull and neck', 'Shoulders and upper back', 'Eyes and forehead', 'Wrists and hands'],
  },
  {
    key: 'sleep',
    text: "How's your sleep?",
    options: ['Solid 7 to 8 hours', 'Takes forever to fall asleep', 'Wake up exhausted', 'Completely chaotic'],
  },
  {
    key: 'movement',
    text: 'How often do you move throughout the day?',
    options: ['Every hour', 'A couple times a day', 'Rarely', 'I forget I have a body'],
  },
  {
    key: 'clenching',
    text: 'Where do you notice tensing or clenching?',
    options: ['Jaw and face', 'Shoulders constantly raised', 'Hands gripped tight', 'All of the above'],
  },
  {
    key: 'mentalState',
    text: 'What is your mental state by midday?',
    options: ['Sharp and focused', 'Foggy and slow', 'Anxious and restless', 'Completely checked out'],
  },
  {
    key: 'endOfDay',
    text: 'How do you feel at the end of the day?',
    options: ['Fine mentally and physically', 'Neck and shoulders locked up', 'Head is pounding', 'Completely cooked'],
  },
];

const PRODUCTS = {
  neck: {
    name: 'Cervical Decompression Neck Relaxer',
    price: 29.99,
    profileName: 'Tech Neck',
    diagnosis: 'Your screen habits are loading significant stress on your cervical spine. Forward head posture from sustained screen use is compressing the discs and nerve roots at the base of your skull.',
    symptoms: ['Base of skull compression', 'Forward head posture pattern', 'Cervical nerve root tension'],
    prescription: 'The Cervical Decompression Neck Relaxer uses passive traction to restore your natural C-curve and decompress affected segments in just 10 minutes daily.',
  },
  eyes: {
    name: 'Roller Ball Massager',
    price: 24.99,
    profileName: 'Screen Strain',
    diagnosis: 'Your screen exposure is triggering chronic eye strain and tension headaches. Digital eye fatigue creates a referred pain pattern that radiates from your eyes to the base of your skull.',
    symptoms: ['Digital eye fatigue', 'Tension headache pattern', 'Temporalis muscle tightness'],
    prescription: 'The Roller Ball Massager targets your temples, jawline, and orbital ridge to relieve the facial tension that builds from screen glare and sustained focus.',
  },
  shoulders: {
    name: 'Back Stretcher Pillow',
    price: 34.99,
    profileName: 'Shoulder Load',
    diagnosis: 'Your upper trapezius and rhomboid muscles have chronically shortened from sustained screen posture. This is a classic presentation of upper crossed syndrome from prolonged desk use.',
    symptoms: ['Upper trapezius hypertonicity', 'Rhomboid shortening', 'Thoracic kyphosis pattern'],
    prescription: 'The Back Stretcher Pillow opens your thoracic spine and releases the fascia across your shoulders, restoring your natural range of motion.',
  },
  wrists: {
    name: 'Compression Gloves',
    price: 29.99,
    profileName: 'Wrist Tension',
    diagnosis: 'Repetitive micro-movements from typing and scrolling are creating cumulative strain in your wrist flexors and carpal tunnel. This pattern precedes most repetitive strain injuries.',
    symptoms: ['Wrist flexor overuse', 'Carpal tunnel compression', 'Grip fatigue pattern'],
    prescription: 'Compression Gloves provide targeted compression to reduce inflammation and support your tendons throughout the workday.',
  },
  mental: {
    name: 'Mini Handheld Massager',
    price: 29.99,
    profileName: 'Digital Burnout',
    diagnosis: 'Your nervous system is showing signs of chronic digital overstimulation. Screen-induced cortisol elevation is affecting your cognitive baseline and emotional regulation throughout the day.',
    symptoms: ['Nervous system dysregulation', 'Cortisol elevation pattern', 'Attentional fatigue'],
    prescription: 'The Mini Handheld Massager activates the parasympathetic nervous system through targeted vibration therapy, shifting you from fight-or-flight to rest-and-digest.',
  },
  posture: {
    name: 'Posture Corrector',
    price: 24.99,
    profileName: 'Postural Collapse',
    diagnosis: 'Extended laptop use is training your body into a forward-collapsed posture pattern. Your deep postural stabilizers have become inhibited from sustained static loading.',
    symptoms: ['Deep stabilizer inhibition', 'Thoracic flexion pattern', 'Anterior pelvic tilt'],
    prescription: 'The Posture Corrector provides proprioceptive feedback to re-train your postural muscles and open your chest throughout the workday.',
  },
};

function scoreAnswers(answers) {
  const { pain, setup, endOfDay, mentalState, movement } = answers;
  if (pain === 'Base of skull and neck' || setup === 'On the couch, in bed, or the floor') return 'neck';
  if (pain === 'Eyes and forehead' || endOfDay === 'Head is pounding') return 'eyes';
  if (pain === 'Shoulders and upper back') return 'shoulders';
  if (pain === 'Wrists and hands') return 'wrists';
  if (mentalState === 'Completely checked out' || mentalState === 'Anxious and restless') return 'mental';
  if (movement === 'I forget I have a body' && setup === 'Laptop at a desk') return 'posture';
  return 'neck';
}

function getStage(screenHours) {
  if (screenHours === 'Under 3 hours') return 1;
  if (screenHours === '4 to 6 hours') return 2;
  return 3;
}

const ARC_R = 80;
const ARC_LENGTH = Math.PI * ARC_R;

function SignalGauge({ progress }) {
  const pct = Math.max(0, Math.min(1, progress));
  const offset = ARC_LENGTH * (1 - pct);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
      <svg viewBox="0 0 200 108" style={{ width: 176, height: 'auto' }} aria-hidden="true">
        <defs>
          <linearGradient id="gaugeGrad" gradientUnits="userSpaceOnUse" x1="20" y1="100" x2="180" y2="100">
            <stop offset="0%" stopColor="#B07D3A" />
            <stop offset="100%" stopColor="#3A5230" />
          </linearGradient>
        </defs>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="rgba(156,150,138,0.22)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="url(#gaugeGrad)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${ARC_LENGTH}`}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.55s cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 160, marginTop: -4 }}>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: '0.1em', color: '#9C968A' }}>START</span>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: '0.1em', color: '#9C968A' }}>DONE</span>
      </div>
    </div>
  );
}

async function goToCheckout(productName, productPrice, items) {
  try {
    const body = items ? { items } : { productName, productPrice };
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch (err) {
    console.error('Checkout error', err);
    alert('Unable to process checkout. Please try again.');
  }
}

export default function App() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [bgIndex, setBgIndex] = useState(0);
  const [bgLoaded, setBgLoaded] = useState([false, false, false, false, false]);

  useEffect(() => {
    BG_IMAGES.forEach((src, i) => {
      const img = new window.Image();
      img.onload = () => setBgLoaded(prev => { const n = [...prev]; n[i] = true; return n; });
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBgIndex(i => (i + 1) % BG_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleAnswer = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setStep(s => s + 1);
  };

  const isDone = step >= QUESTIONS.length;
  const dominantKey = isDone ? scoreAnswers(answers) : null;
  const product = isDone ? PRODUCTS[dominantKey] : null;
  const stage = isDone ? getStage(answers.screenHours) : null;
  const otherProducts = isDone
    ? Object.entries(PRODUCTS).filter(([k]) => k !== dominantKey).map(([, v]) => v)
    : [];

  if (isDone && product) {
    return (
      <div style={{ minHeight: '100vh', background: '#FBF9F4', fontFamily: "'Inter',system-ui,sans-serif", color: '#1E1B16' }}>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 96px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 44 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B07D3A', display: 'inline-block' }} />
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,27,22,0.55)' }}>Digital Detox Initiative</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: '#EEF2EB', border: '1px solid rgba(58,82,48,0.25)', borderRadius: 8, marginBottom: 18 }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3A5230' }}>Tech Neck Stage {stage}</span>
          </div>

          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1.1, margin: '0 0 18px', letterSpacing: '-0.01em' }}>
            {product.profileName}
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.78, color: 'rgba(30,27,22,0.7)', margin: '0 0 32px', maxWidth: 560 }}>
            {product.diagnosis}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 44 }}>
            {product.symptoms.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: '#fff', border: '1px solid rgba(30,27,22,0.08)', borderRadius: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B07D3A', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '0.04em' }}>{s}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid rgba(30,27,22,0.1)', borderRadius: 22, overflow: 'hidden', marginBottom: 52 }}>
            <div style={{ width: '100%', height: 280, background: '#EEF2EB', border: '2px dashed #C8D4C2', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.1em', color: 'rgba(58,82,48,0.4)' }}>PRODUCT IMAGE</span>
            </div>
            <div style={{ padding: '28px 28px 32px' }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9C968A', marginBottom: 10 }}>Your prescribed solution</div>
              <h2
                style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, margin: '0 0 10px', cursor: dominantKey === 'shoulders' ? 'pointer' : 'default' }}
                onClick={() => dominantKey === 'shoulders' && navigate('/back-stretcher')}
              >{product.name}</h2>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, color: '#1E1B16', marginBottom: 16 }}>${product.price.toFixed(2)}</div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(30,27,22,0.65)', margin: '0 0 26px' }}>{product.prescription}</p>
              <button
                className="ddi-btn-brass"
                onClick={() => dominantKey === 'shoulders' ? navigate('/back-stretcher') : goToCheckout(product.name, product.price)}
                style={{ width: '100%', padding: '16px 18px', background: '#B07D3A', color: '#fff', border: 'none', borderRadius: 14, fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
              >
                {dominantKey === 'shoulders' ? 'View the Back Stretcher' : `Claim My Kit for $${product.price.toFixed(2)}`}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 52 }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9C968A', marginBottom: 22 }}>Also detected in your profile</div>
            <div className="ddi-other-grid">
              {otherProducts.map(p => (
                <div key={p.name} style={{ background: '#fff', border: '1px solid rgba(30,27,22,0.08)', borderRadius: 18, overflow: 'hidden' }}>
                  <div style={{ height: 128, background: '#EEF2EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '0.1em', color: 'rgba(58,82,48,0.38)' }}>IMAGE</span>
                  </div>
                  <div style={{ padding: '16px 16px 18px' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#B07D3A', marginBottom: 14 }}>${p.price.toFixed(2)}</div>
                    <button
                      className="ddi-btn-outline"
                      onClick={() => goToCheckout(p.name, p.price)}
                      style={{ width: '100%', padding: '10px 12px', background: 'transparent', color: '#1E1B16', border: '1px solid rgba(30,27,22,0.18)', borderRadius: 10, fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                    >
                      Add to Kit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#1E1B16', borderRadius: 22, padding: '44px 32px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(251,249,244,0.38)', marginBottom: 14 }}>Complete Recovery System</div>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, color: '#FBF9F4', margin: '0 0 10px' }}>The Full Detox Kit</h3>
            <p style={{ fontSize: 15, color: 'rgba(251,249,244,0.6)', margin: '0 0 10px', lineHeight: 1.65 }}>All 6 recovery tools for every zone your screen time is hitting.</p>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: '#B07D3A', marginBottom: 28 }}>
              $99.99{' '}
              <span style={{ fontSize: 16, color: 'rgba(251,249,244,0.35)', textDecoration: 'line-through', fontWeight: 400 }}>$179.94</span>
            </div>
            <button
              className="ddi-btn-brass"
              onClick={() => goToCheckout(null, null, Object.values(PRODUCTS).map(p => ({ name: p.name, price: p.price })))}
              style={{ padding: '16px 40px', background: '#B07D3A', color: '#fff', border: 'none', borderRadius: 14, fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
            >
              Get the Full Kit for $99.99
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  const gaugeProgress = step / QUESTIONS.length;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', boxSizing: 'border-box' }}>
      <style>{GLOBAL_STYLES}</style>

      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: bgLoaded[i] && i === bgIndex ? 1 : 0,
            transition: 'opacity 1.4s ease-in-out',
          }}
        />
      ))}

      {!bgLoaded.some(Boolean) && (
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#2D3A28' }} />
      )}

      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.32)' }} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 460,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRadius: 24,
        padding: '36px 32px',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 22 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#B07D3A', display: 'inline-block' }} />
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,27,22,0.52)' }}>Digital Detox Initiative</span>
        </div>

        <SignalGauge progress={gaugeProgress} />

        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9C968A', textAlign: 'center', marginBottom: 14 }}>
          Question {step + 1} of {QUESTIONS.length}
        </div>

        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 21, fontWeight: 600, lineHeight: 1.32, color: '#1E1B16', margin: '0 0 22px', textAlign: 'center' }}>
          {q.text}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map(opt => (
            <button
              key={opt}
              className="ddi-option"
              onClick={() => handleAnswer(q.key, opt)}
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(30,27,22,0.14)',
                borderRadius: 14,
                fontFamily: "'Inter',sans-serif", fontSize: 14.5, color: '#1E1B16',
                textAlign: 'left', cursor: 'pointer',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }

  .ddi-option { transition: background 0.16s, border-color 0.16s, transform 0.16s; }
  .ddi-option:hover { background: rgba(255,255,255,0.96) !important; border-color: #B07D3A !important; transform: translateX(2px); }
  .ddi-option:focus-visible { outline: 2px solid #B07D3A; outline-offset: 2px; }

  .ddi-btn-brass { transition: background 0.18s; }
  .ddi-btn-brass:hover { background: #9A6B2F !important; }
  .ddi-btn-outline { transition: background 0.16s, border-color 0.16s; }
  .ddi-btn-outline:hover { background: #F4F6F1 !important; border-color: #3A5230 !important; }

  .ddi-other-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (max-width: 480px) {
    .ddi-other-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 360px) {
    h1 { font-size: 30px !important; }
    h2 { font-size: 18px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ddi-option, .ddi-btn-brass, .ddi-btn-outline { transition: none !important; }
    .ddi-option:hover { transform: none !important; }
  }
`;

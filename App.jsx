import React, { useState } from 'react';

/* ---------------------------------------------------------------
   THE DIGITAL DETOX INITIATIVE — quiz funnel
   Design language: a paper-warm "analog instrument" reading the
   user's burnout signal. A single signature element — the Signal
   Gauge — carries the idea through every step, then resolves into
   the result. Colors and type are inlined/scoped so this renders
   identically with or without a Tailwind build step.
----------------------------------------------------------------*/

const palette = {
  linen: '#FBF9F4',
  charcoal: '#262019',
  charcoalSoft: 'rgba(38,32,25,0.7)',
  moss: '#3F5436',
  brass: '#B68A4E',
  haze: '#A39C8E',
};

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y}`;
}

function SignalGauge({ progress, eyebrow, headline }) {
  // progress: 0 (wired) -> 1 (grounded)
  const needleDeg = -88 + 176 * Math.max(0, Math.min(1, progress));
  return (
    <div className="ddi-gauge-wrap">
      <svg viewBox="0 0 200 116" className="ddi-gauge-svg" aria-hidden="true">
        <path d={arcPath(100, 100, 82, 180, 124)} stroke={palette.brass} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d={arcPath(100, 100, 82, 116, 64)} stroke={palette.haze} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.45" />
        <path d={arcPath(100, 100, 82, 56, 0)} stroke={palette.moss} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />
        <g style={{ transform: `rotate(${needleDeg}deg)`, transformOrigin: '100px 100px', transition: 'transform 0.7s cubic-bezier(.4,0,.2,1)' }}>
          <line x1="100" y1="100" x2="100" y2="30" stroke={palette.charcoal} strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="5" fill={palette.charcoal} />
      </svg>
      <div className="ddi-gauge-scale">
        <span>WIRED</span>
        <span>GROUNDED</span>
      </div>
      <div className="ddi-gauge-caption">
        <div className="ddi-gauge-label">{eyebrow}</div>
        {headline && <div className="ddi-gauge-sub">{headline}</div>}
      </div>
    </div>
  );
}

const SCREEN_TIME_OPTIONS = ['Under 3 hours (Healthy)', '3 to 6 hours (Moderate)', '6+ hours (Heavy Scroll)'];
const STRESS_OPTIONS = [
  { label: 'Restless hands & twitchy scrolling thumbs', value: 'restless_fingers' },
  { label: 'Racing thoughts, mental fog, short attention span', value: 'racing_thoughts' },
  { label: 'Tight shoulders, neck pain, and clenching jaw', value: 'shoulder_tension' },
];
const HOBBY_OPTIONS = ['Drawing or doodling', 'Puzzles and board games', 'Reading physical prints', 'Working with my hands'];

export default function DigitalDetoxQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ screenTime: '', stressType: '', hobby: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleNext = (field, value) => {
    setAnswers({ ...answers, [field]: value });
    setStep(step + 1);
  };

  const submitToGemini = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      if (!response.ok) throw new Error(`Server responded ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error communicating with Gemini', err);
      setError("Couldn't reach the diagnostics server. Check that the backend is running, then try again.");
    }
    setLoading(false);
  };

  const gaugeProgress = step >= 4 ? 1 : step / 4;

  return (
    <div className="ddi-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        .ddi-root{min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;padding:48px 20px;
          background-color:${palette.linen};
          background-image:radial-gradient(circle at 16% 12%, rgba(38,32,25,0.045), transparent 55%), radial-gradient(circle at 88% 0%, rgba(182,138,78,0.07), transparent 50%);
          font-family:'Inter',system-ui,sans-serif;color:${palette.charcoal};box-sizing:border-box;}
        .ddi-root *{box-sizing:border-box;}
        .ddi-shell{width:100%;max-width:420px;}
        .ddi-brand{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:26px;}
        .ddi-brand-dot{width:6px;height:6px;border-radius:50%;background:${palette.brass};}
        .ddi-brand-text{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${palette.charcoalSoft};}
        .ddi-card{background:#fff;border:1px solid rgba(38,32,25,0.1);border-radius:22px;padding:38px 32px;
          box-shadow:0 28px 54px -30px rgba(38,32,25,0.38), 0 2px 8px rgba(38,32,25,0.05);}

        .ddi-gauge-wrap{display:flex;flex-direction:column;align-items:center;margin-bottom:24px;}
        .ddi-gauge-svg{width:168px;height:auto;}
        .ddi-gauge-scale{display:flex;justify-content:space-between;width:152px;margin-top:-6px;
          font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:0.1em;color:${palette.haze};}
        .ddi-gauge-caption{margin-top:12px;text-align:center;}
        .ddi-gauge-label{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.14em;text-transform:uppercase;color:${palette.haze};}
        .ddi-gauge-sub{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;color:${palette.charcoal};margin-top:3px;}

        .ddi-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;color:${palette.haze};margin-bottom:10px;text-align:center;}
        .ddi-h1{font-family:'Space Grotesk',sans-serif;font-size:29px;line-height:1.18;font-weight:700;letter-spacing:-0.01em;margin:0 0 14px;text-align:center;}
        .ddi-h2{font-family:'Space Grotesk',sans-serif;font-size:20px;line-height:1.32;font-weight:600;margin:0 0 18px;}
        .ddi-p{font-size:15px;line-height:1.62;color:${palette.charcoalSoft};margin:0 0 24px;text-align:center;}

        .ddi-option{display:block;width:100%;text-align:left;padding:14px 16px;margin-bottom:10px;
          border:1px solid rgba(38,32,25,0.13);border-radius:14px;background:transparent;
          font-family:'Inter',sans-serif;font-size:14.5px;color:${palette.charcoal};cursor:pointer;
          transition:border-color .18s ease, background-color .18s ease, transform .18s ease;}
        .ddi-option:hover{border-color:${palette.moss};background:#F4F6F1;transform:translateX(2px);}
        .ddi-option:focus-visible{outline:2px solid ${palette.moss};outline-offset:2px;}

        .ddi-btn{display:block;width:100%;padding:15px 18px;border:none;border-radius:14px;
          font-family:'Inter',sans-serif;font-size:15px;font-weight:600;cursor:pointer;
          transition:background-color .18s ease, opacity .18s ease;}
        .ddi-btn-primary{background:${palette.charcoal};color:${palette.linen};}
        .ddi-btn-primary:hover{background:${palette.moss};}
        .ddi-btn-primary:disabled{opacity:.55;cursor:default;}
        .ddi-btn-primary:focus-visible{outline:2px solid ${palette.brass};outline-offset:2px;}

        .ddi-loading-row{display:flex;align-items:center;justify-content:center;gap:5px;}
        .ddi-dot{width:5px;height:5px;border-radius:50%;background:${palette.brass};animation:ddi-pulse 1.1s infinite ease-in-out;}
        .ddi-dot:nth-child(2){animation-delay:.15s;}
        .ddi-dot:nth-child(3){animation-delay:.3s;}
        @keyframes ddi-pulse{0%,80%,100%{opacity:.25;transform:scale(.8);}40%{opacity:1;transform:scale(1);}}

        .ddi-result-banner{background:#EEF1EA;border:1px solid rgba(63,84,54,0.25);border-radius:16px;
          padding:16px 18px;margin-bottom:20px;text-align:center;}
        .ddi-result-label{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:${palette.moss};margin-bottom:4px;}
        .ddi-result-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:${palette.charcoal};}
        .ddi-quote{font-size:14.5px;line-height:1.65;color:${palette.charcoalSoft};font-style:italic;margin:0 0 22px;text-align:center;}
        .ddi-kit-label{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.14em;text-transform:uppercase;color:${palette.haze};margin-bottom:10px;}
        .ddi-kit-list{list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:8px;}
        .ddi-kit-item{display:flex;align-items:center;gap:10px;padding:11px 14px;background:#FAF8F4;
          border:1px solid rgba(38,32,25,0.08);border-radius:12px;font-family:'IBM Plex Mono',monospace;font-size:12.5px;color:${palette.charcoal};}
        .ddi-kit-dot{width:6px;height:6px;border-radius:50%;background:${palette.brass};flex-shrink:0;}

        .ddi-error{background:#F7EFE9;border:1px solid rgba(182,138,78,0.4);border-radius:12px;
          padding:14px 16px;font-size:13.5px;color:#6B5A3F;margin-bottom:18px;text-align:center;}

        @media (max-width:380px){.ddi-card{padding:30px 22px;}.ddi-h1{font-size:24px;}}
        @media (prefers-reduced-motion: reduce){.ddi-option,.ddi-btn,.ddi-dot{transition:none;animation:none;}}
      `}</style>

      <div className="ddi-shell">
        <div className="ddi-brand">
          <span className="ddi-brand-dot" />
          <span className="ddi-brand-text">Digital Detox Initiative</span>
        </div>

        <div className="ddi-card">
          {step < 4 && (
            <SignalGauge
              progress={gaugeProgress}
              eyebrow={step === 0 ? '60-second signal check' : `Step ${step} of 3`}
              headline={step === 0 ? 'Currently: overstimulated' : null}
            />
          )}

          {/* Step 0: Landing hook */}
          {step === 0 && (
            <div>
              <h1 className="ddi-h1">Stressed? Look down.</h1>
              <p className="ddi-p">
                That's the phone again. Two minutes of staring back at us won't fix it — but three quick
                questions might. We'll read your burnout signal and build a physical kit to pull you offline.
              </p>
              <button className="ddi-btn ddi-btn-primary" onClick={() => setStep(1)}>
                Start Free Reset Assessment
              </button>
            </div>
          )}

          {/* Step 1: Screen time */}
          {step === 1 && (
            <div>
              <h2 className="ddi-h2">What does your average daily screen time look like right now?</h2>
              {SCREEN_TIME_OPTIONS.map((opt) => (
                <button key={opt} className="ddi-option" onClick={() => handleNext('screenTime', opt)}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Physical stress */}
          {step === 2 && (
            <div>
              <h2 className="ddi-h2">Where do you physically feel your digital stress the most?</h2>
              {STRESS_OPTIONS.map((opt) => (
                <button key={opt.value} className="ddi-option" onClick={() => handleNext('stressType', opt.value)}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Nostalgia tracker */}
          {step === 3 && (
            <div>
              <h2 className="ddi-h2">Before smartphones took over, what used to relax you?</h2>
              {HOBBY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className="ddi-option"
                  onClick={() => { setAnswers({ ...answers, hobby: opt }); setStep(4); }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Submit to backend */}
          {step === 4 && !result && (
            <div style={{ textAlign: 'center' }}>
              <h2 className="ddi-h2" style={{ textAlign: 'center' }}>
                {loading ? 'Reading your signal…' : 'Ready for your reading'}
              </h2>
              <p className="ddi-p">
                {loading ? 'Gemini is curating your off-grid physical solution.' : "Three answers in — let's see what they add up to."}
              </p>
              {error && <div className="ddi-error">{error}</div>}
              <button className="ddi-btn ddi-btn-primary" onClick={submitToGemini} disabled={loading}>
                {loading ? (
                  <span className="ddi-loading-row">
                    <span className="ddi-dot" /><span className="ddi-dot" /><span className="ddi-dot" />
                  </span>
                ) : (
                  'Generate My Custom Detox Kit'
                )}
              </button>
            </div>
          )}

          {/* Step 5: Result */}
          {result && (
            <div>
              <SignalGauge progress={1} eyebrow="Your profile" headline={result.burnout_profile_name} />
              <p className="ddi-quote">"{result.empathetic_diagnosis_summary}"</p>
              <div className="ddi-kit-label">Included in your custom box</div>
              <ul className="ddi-kit-list">
                {result.recommended_skus.map((sku) => (
                  <li key={sku} className="ddi-kit-item">
                    <span className="ddi-kit-dot" />
                    {sku}
                  </li>
                ))}
              </ul>
              <button className="ddi-btn ddi-btn-primary">Claim Box &amp; Disconnect ($59.00)</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

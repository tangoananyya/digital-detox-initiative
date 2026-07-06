import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#1E1B16', color: '#F2EDE4', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        .ddi-footer-inner { max-width: 1200px; margin: 0 auto; padding: 48px 40px 32px; }
        .ddi-footer-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; margin-bottom: 32px; }
        .ddi-footer-brand { display: flex; align-items: center; gap: 8px; }
        .ddi-footer-dot { width: 6px; height: 6px; border-radius: 50%; background: #B07D3A; flex-shrink: 0; }
        .ddi-footer-name { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(242,237,228,0.55); }
        .ddi-footer-links { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .ddi-footer-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(242,237,228,0.55); text-decoration: none; transition: color 0.15s; }
        .ddi-footer-link:hover { color: #B07D3A; }
        .ddi-footer-divider { border: none; border-top: 1px solid rgba(242,237,228,0.08); margin: 0 0 20px; }
        .ddi-footer-copy { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.1em; color: rgba(242,237,228,0.28); text-align: center; }
        @media (max-width: 600px) { .ddi-footer-inner { padding: 40px 20px 24px; } .ddi-footer-top { flex-direction: column; align-items: flex-start; gap: 16px; } }
      `}</style>
      <div className="ddi-footer-inner">
        <div className="ddi-footer-top">
          <div className="ddi-footer-brand">
            <span className="ddi-footer-dot" />
            <span className="ddi-footer-name">Digital Detox Initiative</span>
          </div>
          <nav className="ddi-footer-links" aria-label="Footer navigation">
            <Link to="/home" className="ddi-footer-link">Home</Link>
            <Link to="/products" className="ddi-footer-link">Products</Link>
            <Link to="/quiz" className="ddi-footer-link">Quiz</Link>
            <Link to="/contact" className="ddi-footer-link">Contact</Link>
          </nav>
        </div>
        <hr className="ddi-footer-divider" />
        <p className="ddi-footer-copy">© 2026 The Digital Detox Initiative. All rights reserved.</p>
      </div>
    </footer>
  );
}

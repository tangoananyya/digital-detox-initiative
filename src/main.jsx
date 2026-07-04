import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './global.css';

import HomePage from './HomePage.jsx';
import ProductPage from './ProductPage.jsx';
import BackStretcher from './BackStretcher.jsx';
import BallMassager from './BallMassager.jsx';
import MiniMassager from './MiniMassager.jsx';
import PostureCorrector from './PostureCorrector.jsx';
import CompressionGloves from './CompressionGloves.jsx';
import ProductsPage from './ProductsPage.jsx';
import App from './App.jsx';
import Success from './Success.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLoc, setDisplayLoc] = useState(location);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'exit' | 'enter'

  useEffect(() => {
    if (location.key === displayLoc.key) return;

    // Fade out current page
    setPhase('exit');

    const t = setTimeout(() => {
      // Swap to new page (still invisible)
      setDisplayLoc(location);
      setPhase('enter');
      // Double RAF ensures browser paints the enter state before transitioning to idle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('idle'));
      });
    }, 210);

    return () => clearTimeout(t);
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const opacity  = phase === 'idle' ? 1 : 0;
  const ty       = phase === 'idle' ? 0 : 10;
  const duration = phase === 'exit' ? '0.2s' : '0.3s';

  return (
    <div style={{
      opacity,
      transform: `translateY(${ty}px)`,
      transition: `opacity ${duration} ease, transform ${duration} ease`,
      willChange: 'opacity, transform',
    }}>
      <Routes location={displayLoc}>
        <Route path="/"              element={<ProductPage />} />
        <Route path="/back-stretcher" element={<BackStretcher />} />
        <Route path="/roller"        element={<BallMassager />} />
        <Route path="/massager"      element={<MiniMassager />} />
        <Route path="/posture"       element={<PostureCorrector />} />
        <Route path="/gloves"        element={<CompressionGloves />} />
        <Route path="/products"      element={<ProductsPage />} />
        <Route path="/home"          element={<HomePage />} />
        <Route path="/quiz"          element={<App />} />
        <Route path="/success"       element={<Success />} />
      </Routes>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage.jsx';
import BackStretcher from './BackStretcher.jsx';
import BallMassager from './BallMassager.jsx';
import MiniMassager from './MiniMassager.jsx';
import PostureCorrector from './PostureCorrector.jsx';
import CompressionGloves from './CompressionGloves.jsx';
import ProductsPage from './ProductsPage.jsx';
import App from './App.jsx';
import Success from './Success.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/digital-detox-kit-backend">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/back-stretcher" element={<BackStretcher />} />
        <Route path="/roller" element={<BallMassager />} />
        <Route path="/massager" element={<MiniMassager />} />
        <Route path="/posture" element={<PostureCorrector />} />
        <Route path="/gloves" element={<CompressionGloves />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/quiz" element={<App />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

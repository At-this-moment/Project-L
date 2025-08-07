import { forwardRef, useMemo, useRef, useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Korean from './pages/Korean';
import English from './pages/English';
import LightRays from './components/LightRays';
import Galaxy from './components/Galaxy';
import Logo from './components/Logo';
import "./components/VariableProximity.css";

// import Ballpit from './components/Ballpit';
// import Lanyard from './components/Lanyard';
// import BlobCursor from './components/BlobCursor';
// import Magnifier from "./components/Magnifier";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#/home") {
      window.location.replace("https://leehyunjae.info/#/ko");
    }
  }, []);

  return (
    <>
      {/* 고정 로고 */}
      {!isMobile && (
        <div className="fixed-logo">
          <Logo width={64} height={64} isMobile={false} />
        </div>
      )}


      {/* 모바일: Galaxy */}
      {isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Galaxy />
        </div>
      )}

      {/* PC: LightRays */}
      {!isMobile && (
        <LightRays
          raysOrigin="right"
          raysColor="#ff00ff"
          raysSpeed={0.2}
          lightSpread={0.01}
          rayLength={3.0}
          fadeDistance={2}
          saturation={3.0}
          followMouse={true}
          mouseInfluence={1.0}
          noiseAmount={0.0}
          distortion={0.0}
        />
      )}

      {/* 콘텐츠 라우팅 + 애니메이션 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/ko" replace />} />
          <Route path="/ko" element={<Korean isMobile={isMobile} />} /> 
          <Route path="/en" element={<English isMobile={isMobile} />} />
        </Routes>

      </motion.div>
    </>
  );
}

export default App;
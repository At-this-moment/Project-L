// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import Projects from "./pages/Projects";
import Videos from "./pages/Videos";
import Korean from "./pages/Korean";
import LightRays from "./components/LightRays";
import Galaxy from "./components/Galaxy";
import SiteNav from "./components/SiteNav"; 
import "./components/VariableProximity.css";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#/home") {
      window.location.replace("https://leehyunjae.info/#/ko");
    }
  }, []);

  return (
    <>
      {/* 배경 */}
      {isMobile ? (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Galaxy />
        </div>
      ) : (
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

      <SiteNav isMobile={isMobile} />

      {/* 콘텐츠 라우팅 + 애니메이션 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/ko" replace />} />
          <Route path="/ko" element={<Korean isMobile={isMobile} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/videos" element={<Videos />} />
          {/* <Route path="/en" element={<English isMobile={isMobile} />} /> */}
        </Routes>
      </motion.div>
    </>
  );
}

export default App;
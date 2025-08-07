import { useState, useEffect } from 'react';
import { parseLogoImage } from './MetallicPaint';
import MetallicPaint from './MetallicPaint';

export default function Logo({ width = 64, height = 64, isMobile = false }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (isMobile) return;
    const img = new Image();
    img.src = '/assets/logo_v2.png?v=2';
    img.crossOrigin = 'Anonymous';
    img.onload = async () => {
      const file = await fetch(img.src).then(res => res.blob());
      const parsed = await parseLogoImage(file);
      setImageData(parsed.imageData);
    };
  }, [isMobile]);

  return (
    <div style={{ width, height }}>
      {isMobile ? (
        <img
          src="/assets/logo_mobile_v2.png"
          alt="Mobile Logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        imageData && (
          <MetallicPaint
            imageData={imageData}
            params={{
              patternScale: 5,
              refraction: 0,
              edge: 0,
              patternBlur: 0.1,
              liquid: 0.07,
              speed: 0.5,
            }}
          />
        )
      )}
    </div>
  );
}

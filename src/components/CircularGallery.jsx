import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function CircularGallery({
  items = [],
  radius = 0.46,        // 컨테이너 대비 반지름 비율 (0~1)
  autoRotate = true,
  rotateSpeed = 10,     // deg/s
  focusScale = 1.06,
  gap = 0,              // 남겨둠 (상자 사이 여유는 카드 width로 커버)
  onItemClick,
}) {
  const [baseDeg, setBaseDeg] = useState(0);
  const count = items.length || 1;

  // 자동 회전
  useEffect(() => {
    if (!autoRotate) return;
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setBaseDeg((d) => d + rotateSpeed * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate, rotateSpeed]);

  const prepared = useMemo(() => {
    const step = 360 / count;
    return items.map((it, i) => ({
      ...it,
      theta: step * i,
      key: it.id ?? i
    }));
  }, [items, count]);

  // 휠로 회전
  const onWheel = (e) => {
    setBaseDeg((d) => d + (e.deltaY > 0 ? 8 : -8));
  };

  return (
    <div
      onWheel={onWheel}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'visible',
        userSelect: 'none',
        touchAction: 'pan-y'
      }}
    >
      {prepared.map(({ key, src, alt, title, subtitle, theta }, idx) => {
        const deg = baseDeg + theta;
        const rad = (deg * Math.PI) / 180;
        const x = Math.cos(rad) * radius; // -radius..+radius
        const y = Math.sin(rad) * radius;

        return (
          <motion.button
            key={key}
            onClick={() => onItemClick?.(items[idx], idx)}
            whileHover={{ scale: focusScale }}
            style={{
              position: 'absolute',
              left: `${50 + x * 50}%`,   // 50% 기준에서 퍼센트 이동
              top: `${50 + y * 50}%`,
              transform: 'translate(-50%, -50%)',
              background: 'transparent',
              border: 'none', padding: 0, cursor: 'pointer',
              outline: 'none'
            }}
          >
            <figure
              style={{
                width: 'min(180px, 36vw)',
                height: 'min(300px, 60vw)',
                boxShadow: '0 12px 30px rgba(0,0,0,.45)',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#111',
                display: 'grid',
                gridTemplateRows: '1fr auto',
              }}
            >
              <img
                src={src}
                alt={alt ?? title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              {(title || subtitle) && (
                <figcaption style={{ padding: '10px 12px', fontSize: 14, background: 'rgba(0,0,0,.6)' }}>
                  <div style={{ fontWeight: 700 }}>{title}</div>
                  <div style={{ opacity: .8 }}>{subtitle}</div>
                </figcaption>
              )}
            </figure>
          </motion.button>
        );
      })}
    </div>
  );
}

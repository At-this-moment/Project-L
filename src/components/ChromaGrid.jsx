// src/components/ChromaGrid.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export const ChromaGrid = ({ items, className = "" }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 접근성: 모션 최소화 설정 시 애니메이션 생략
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const cards = root.querySelectorAll(".chroma-card");
    const imgs  = root.querySelectorAll(".chroma-media img");
    const tl = gsap.timeline();

    // 카드 자체 등장
    tl.from(cards, {
      opacity: 0,
      y: 24,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.out",
      stagger: { each: 0.08, from: "start" }, // 위에서 아래 순서로
      clearProps: "transform,opacity",
    }, 0);

    // 이미지 살짝 늦게 페이드인
    tl.from(imgs, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: { each: 0.04 },
    }, 0.05);

    // 구분선 라인 그려지듯
    const lines = root.querySelectorAll(".divider");
    tl.from(lines, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.4,
      ease: "power2.out",
      stagger: { each: 0.02 },
      clearProps: "transform",
    }, 0.15);

    return () => tl.kill();
  }, []);

  return (
    <div ref={rootRef} className={`chroma-grid no-spotlight ${className}`}>
      {items.map((c, i) => (
        <article key={i} className="chroma-card row-layout" title={c.title} style={{ "--card-border": c.borderColor || "#2a2a2a" }}>
          <div className="chroma-media">
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              <img src={c.image} alt={c.title} loading="lazy" />
            </a>
          </div>
          <div className="chroma-body">
            <h3 className="name">
              {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer">{c.title}</a> : c.title}
            </h3>
            <div className="divider" />
            {c.subtitle && <p className="role">{c.subtitle}</p>}
            {c.subtitle && <div className="divider" />}
            {c.description && <p className="desc">{c.description}</p>}
            {c.date && <div className="divider" />}
            {c.date && <p className="date">{c.date}</p>}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
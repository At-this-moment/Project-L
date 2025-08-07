"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./BlobCursor.css";

export default function BlobCursor() {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  useEffect(() => {
    const moveHandler = (e) => {
      const x = "clientX" in e ? e.clientX : e.touches?.[0]?.clientX;
      const y = "clientY" in e ? e.clientY : e.touches?.[0]?.clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x,
          y,
          duration: isLead ? 0.1 : 0.5,
          ease: isLead ? "power3.out" : "power1.out",
        });
      });
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("touchmove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("touchmove", moveHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className="blob-container">
      <div className="blob-main">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => (blobsRef.current[i] = el)}
            className={`blob blob-${i} circle`}
          >
            <div className={`inner-dot inner-dot-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

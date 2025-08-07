"use client";

import { useRef, useEffect, useState } from "react";
import "./Magnifier.css";

export default function Magnifier({ zoom = 2, size = 200, children }) {
    const [position, setPosition] = useState({ x: -9999, y: -9999 });
  
    useEffect(() => {
      const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
  
    return (
      <div
        className="magnifier"
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
        }}
      >
        <div
          className="magnified-content"
          style={{
            transform: `scale(${zoom}) translate(-${position.x}px, -${position.y}px)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }  
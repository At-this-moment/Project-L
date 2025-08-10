// src/components/ProjectsGrid.jsx
import React from 'react';
import TiltedCard from './TiltedCard';
import './TiltedCard.css';

export default function ProjectsGrid({ items = [], className = '' }) {
  return (
    <div className={`projects-grid ${className}`}>
      {items.map((p) => {
        const image = p.image ?? p.src;
        const caption = p.description ?? p.subtitle ?? '';
        const href = p.href ?? (p.id ? `/projects/${p.id}` : '#');
        return (
          <a
            key={p.id ?? p.title}
            href={href}
            className="project-card-link"
            aria-label={p.title}
          >
            <TiltedCard
              imageSrc={image}
              altText={p.title}
              captionText={caption}
              containerHeight="auto"
              containerWidth="100%"
              imageHeight="220px"
              imageWidth="100%"
              scaleOnHover={1.06}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={!!caption}
              displayOverlayContent={false}
            />
          </a>
        );
      })}
    </div>
  );
}
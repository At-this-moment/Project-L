// src/components/Logo.jsx
export default function Logo({
  width = 56,
  height = 56,
  isMobile = false,
  srcDesktop = '/logo.png',       // public/logo.png
  srcMobile = '/logo_mobile.png', // public/logo_mobile.png
  alt = 'Site Logo',
}) {
  const src = isMobile ? srcMobile : srcDesktop;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      draggable={false}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}
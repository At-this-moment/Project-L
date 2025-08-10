// src/components/SiteNav.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function SiteNav({ isMobile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(v => !v);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const linkClass = (path) => (pathname === path ? 'active' : '');

  const EMAIL = 'qnfdlf1997@gmail.com';
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Project L | Portfolio Inquiry')}&body=${encodeURIComponent('안녕하세요, 이현재님.\n\n(여기에 내용을 작성해주세요.)')}`;

  return (
    <>
      {/* 데스크톱 네비: 로고 + 세로 링크 */}
      <nav className="desktop-nav">
        <div
          className="nav-logo"
          onClick={() => navigate('/ko')}
          title="Home"
        >
          <Logo width={56} height={56} isMobile={false} />
        </div>

        <div className="nav-links">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); navigate('/ko'); }}
            className={linkClass('/ko')}
            aria-current={pathname === '/ko' ? 'page' : undefined}
          >
            Home
          </a>

          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
            className={linkClass('/projects')}
            aria-current={pathname === '/projects' ? 'page' : undefined}
          >
            Projects
          </a>

          <a
            href="#videos"
            onClick={(e) => { e.preventDefault(); navigate('/videos'); }}
            className={linkClass('/videos')}
            aria-current={pathname === '/videos' ? 'page' : undefined}
          >
            Videos
          </a>

          <a href="https://github.com/At-this-moment" target="_blank" rel="noopener noreferrer">
            Github <span className="highlight">↗</span>
          </a>
          <a href="https://velog.io/@qnfrma1997/series" target="_blank" rel="noopener noreferrer">
            Blog <span className="highlight">↗</span>
          </a>
          <a href={mailto} aria-label="Send me an email">
            Contact Me <span className="highlight">↗</span>
          </a>
        </div>
      </nav>

      {/* 모바일 헤더: 햄버거 + 중앙 로고 */}
      <div className="mobile-header">
        <button className="hamburger" onClick={toggleMobile}>☰</button>
        <div
          className="logo-mobile"
          onClick={() => { setMobileOpen(false); navigate('/ko'); }}
          title="Home"
        >
          <Logo width={36} height={36} isMobile />
        </div>
      </div>

      {/* 모바일 네비: 펼침 메뉴 */}
      <nav id="mobile-nav" className={`mobile-nav ${mobileOpen ? 'show' : ''}`}>
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); navigate('/ko'); setMobileOpen(false); }}
          className={linkClass('/ko')}
          aria-current={pathname === '/ko' ? 'page' : undefined}
        >
          Home
        </a>

        <a
          href="#projects"
          onClick={(e) => { e.preventDefault(); navigate('/projects'); setMobileOpen(false); }}
          className={linkClass('/projects')}
          aria-current={pathname === '/projects' ? 'page' : undefined}
        >
          Projects
        </a>

        <a
          href="#videos"
          onClick={(e) => { e.preventDefault(); navigate('/videos'); setMobileOpen(false); }}
          className={linkClass('/videos')}
          aria-current={pathname === '/videos' ? 'page' : undefined}
        >
          Videos
        </a>

        <a href="https://github.com/At-this-moment" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
          Github <span className="highlight">↗</span>
        </a>
        <a href="https://velog.io/@qnfrma1997/series" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
          Blog <span className="highlight">↗</span>
        </a>
        <a href={mailto} onClick={() => setMobileOpen(false)} aria-label="Send me an email">
          Contact Me <span className="highlight">↗</span>
        </a>
      </nav>
    </>
  );
}
